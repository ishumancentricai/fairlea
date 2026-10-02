import { defineEvent, defineResearchEntry, defineTeamMember } from './schema.js'

const teamModules = import.meta.glob('../team/**/index.js', {
  eager: true,
  import: 'default',
})
const eventModules = import.meta.glob('../events/**/index.js', {
  eager: true,
  import: 'default',
})
const researchModules = import.meta.glob('../research/**/index.js', {
  eager: true,
  import: 'default',
})
const bodyModules = import.meta.glob(
  [
    '../team/**/body.en.mdx',
    '../team/**/body.de.mdx',
    '../events/**/body.en.mdx',
    '../events/**/body.de.mdx',
    '../research/**/body.en.mdx',
    '../research/**/body.de.mdx',
  ],
  { eager: true, import: 'default' },
)

function collect(modules, defineEntry) {
  const ids = new Set()

  return Object.entries(modules).map(([modulePath, candidate]) => {
    const entry = defineEntry(candidate)
    const directory = modulePath.slice(0, -'/index.js'.length)
    const englishBody = bodyModules[`${directory}/body.en.mdx`]
    const germanBody = bodyModules[`${directory}/body.de.mdx`]

    if (ids.has(entry.id)) {
      throw new Error(`Duplicate content id: ${entry.id}`)
    }

    if (Boolean(englishBody) !== Boolean(germanBody)) {
      throw new Error(`${entry.id}: body.en.mdx and body.de.mdx must be paired`)
    }

    ids.add(entry.id)

    return Object.freeze({
      ...entry,
      ...(englishBody
        ? { body: Object.freeze({ en: englishBody, de: germanBody }) }
        : {}),
    })
  })
}

export const teamMembers = Object.freeze(
  collect(teamModules, defineTeamMember).sort(
    (left, right) =>
      left.order - right.order || left.name.localeCompare(right.name),
  ),
)

export const events = Object.freeze(
  collect(eventModules, defineEvent).sort(
    (left, right) =>
      left.order - right.order || right.startDate.localeCompare(left.startDate),
  ),
)

export const researchEntries = Object.freeze(
  collect(researchModules, defineResearchEntry).sort(
    (left, right) =>
      right.year - left.year ||
      left.order - right.order ||
      left.id.localeCompare(right.id),
  ),
)

const expectedIds = Object.freeze({
  team: [
    'christian-rueckert',
    'niklas-kuehl',
    'bernhard-haslhofer',
    'thomas-goger',
    'jana-elsner',
    'leopold-mueller',
    'jannek-sekowski',
    'thomas-niedermayer',
    'michael-froewis',
    'simon-lobinger',
    'sophia-schuetz',
    'anna-kannowski',
    'arian-javaheri',
  ],
  events: [
    'crypto-crime-2026',
    'second-project-meeting-2026',
    'first-project-meeting-2025',
    'kick-off-event-2025',
  ],
  research: [
    'multi-input-heuristic-2026',
    'generative-ai-provider-liability-2026',
    'biometric-remote-identification-2026',
    'vermoegensarrest-kryptodiebstahl-2025',
    'koalitionsvertrag-it-strafrecht-2025',
    'fairness-benefits-xai-2024',
    'ki-als-beweismittel-2023',
    'cryptocurrency-deanonymizations-2022',
    'evidential-value-crypto-investigations-2020',
  ],
})

function assertCollection(name, entries) {
  const ids = entries.map((entry) => entry.id)

  if (JSON.stringify(ids) !== JSON.stringify(expectedIds[name])) {
    throw new Error(
      `${name}: expected ordered ids ${expectedIds[name].join(', ')}, received ${ids.join(', ')}`,
    )
  }
}

assertCollection('team', teamMembers)
assertCollection('events', events)
assertCollection('research', researchEntries)
