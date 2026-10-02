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
