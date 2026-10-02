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
const bodyTextModules = import.meta.glob(
  [
    '../team/**/body.en.mdx',
    '../team/**/body.de.mdx',
    '../events/**/body.en.mdx',
    '../events/**/body.de.mdx',
    '../research/**/body.en.mdx',
    '../research/**/body.de.mdx',
  ],
  { eager: true, import: 'default', query: '?raw' },
)

function collect(modules, defineEntry) {
  const ids = new Set()

  return Object.entries(modules).map(([modulePath, candidate]) => {
    const entry = defineEntry(candidate)
    const directory = modulePath.slice(0, -'/index.js'.length)
    const englishBody = bodyModules[`${directory}/body.en.mdx`]
    const germanBody = bodyModules[`${directory}/body.de.mdx`]
    const englishBodyText = bodyTextModules[`${directory}/body.en.mdx`]
    const germanBodyText = bodyTextModules[`${directory}/body.de.mdx`]

    if (ids.has(entry.id)) {
      throw new Error(`Duplicate content id: ${entry.id}`)
    }

    if (Boolean(englishBody) !== Boolean(germanBody)) {
      throw new Error(`${entry.id}: body.en.mdx and body.de.mdx must be paired`)
    }

    if (
      englishBody &&
      (typeof englishBodyText !== 'string' ||
        typeof germanBodyText !== 'string')
    ) {
      throw new Error(`${entry.id}: MDX body text could not be indexed`)
    }

    ids.add(entry.id)

    return Object.freeze({
      ...entry,
      ...(englishBody
        ? {
            body: Object.freeze({ en: englishBody, de: germanBody }),
            bodyText: Object.freeze({
              en: englishBodyText,
              de: germanBodyText,
            }),
          }
        : {}),
    })
  })
}

function assertUniqueOrder(entries, groupName) {
  const orders = new Map()

  for (const entry of entries.filter((candidate) => candidate.visible)) {
    if (orders.has(entry.order)) {
      throw new Error(
        `${groupName}: ${orders.get(entry.order)} and ${entry.id} use visible order ${entry.order}`,
      )
    }

    orders.set(entry.order, entry.id)
  }
}

const allTeamMembers = collect(teamModules, defineTeamMember)
const allEvents = collect(eventModules, defineEvent)
const allResearchEntries = collect(researchModules, defineResearchEntry)

assertUniqueOrder(
  allTeamMembers.filter((member) => !member.former),
  'current team members',
)
assertUniqueOrder(
  allTeamMembers.filter((member) => member.former),
  'former team members',
)

for (const category of ['project', 'related']) {
  const categoryEntries = allResearchEntries.filter(
    (entry) => entry.category === category,
  )
  const years = new Set(categoryEntries.map((entry) => entry.year))

  for (const year of years) {
    assertUniqueOrder(
      categoryEntries.filter((entry) => entry.year === year),
      `${category} research entries from ${year}`,
    )
  }
}

export const teamMembers = Object.freeze(
  allTeamMembers
    .filter((member) => member.visible)
    .sort(
      (left, right) =>
        Number(left.former) - Number(right.former) ||
        left.order - right.order ||
        left.name.localeCompare(right.name),
    ),
)

export const events = Object.freeze(
  allEvents
    .filter((event) => event.visible)
    .sort(
      (left, right) =>
        right.startDate.localeCompare(left.startDate) ||
        left.id.localeCompare(right.id),
    ),
)

export const researchEntries = Object.freeze(
  allResearchEntries
    .filter((entry) => entry.visible)
    .sort(
      (left, right) =>
        right.year - left.year ||
        left.order - right.order ||
        left.id.localeCompare(right.id),
    ),
)
