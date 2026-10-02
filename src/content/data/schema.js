import { supportedLocales } from '../../../site.config.js'

/**
 * @typedef {object} LocalizedTeamMember
 * @property {string} [role]
 * @property {readonly string[]} biography
 */

/**
 * @typedef {object} TeamMember
 * @property {string} id
 * @property {string} name
 * @property {{src: string, alt: string, width: number, height: number}} image
 * @property {number} order
 * @property {readonly {label: string, href: string}[]} links
 * @property {Readonly<Record<'en' | 'de', LocalizedTeamMember>>} translations
 */

/**
 * @typedef {object} LocalizedEvent
 * @property {string} title
 * @property {string} location
 * @property {string} [summary]
 */

/**
 * @typedef {object} Event
 * @property {string} id
 * @property {string} startDate ISO 8601 date or date-time with offset.
 * @property {string} [endDate] ISO 8601 date or date-time with offset.
 * @property {string} timeZone IANA time zone.
 * @property {number} order
 * @property {readonly {src: string, width: number, height: number, kind: 'poster' | 'photo', translations: Record<'en' | 'de', {alt: string, caption?: string}>}[]} images
 * @property {readonly {href: string, translations: Record<'en' | 'de', {label: string}>}[]} links
 * @property {Readonly<Record<'en' | 'de', LocalizedEvent>>} translations
 */

/**
 * @typedef {object} ResearchEntry
 * @property {string} id
 * @property {string} citation
 * @property {string} href
 * @property {number} year
 * @property {number} order
 * @property {'project' | 'related'} category
 * @property {Readonly<Record<'en' | 'de', {summary: string}>>} [translations]
 */

const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const datePattern = /^\d{4}-\d{2}-\d{2}(?:T.*(?:Z|[+-]\d{2}:\d{2}))?$/

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function assertString(value, field, id) {
  assert(
    typeof value === 'string' && value.trim().length > 0,
    `${id}: ${field} must be a non-empty string`,
  )
}

function assertOrder(value, id) {
  assert(Number.isFinite(value), `${id}: order must be a finite number`)
}

function assertPositiveInteger(value, field, id) {
  assert(
    Number.isInteger(value) && value > 0,
    `${id}: ${field} must be a positive integer`,
  )
}

function assertStringArray(value, field, id) {
  assert(
    Array.isArray(value) && value.length > 0,
    `${id}: ${field} is required`,
  )

  for (const [index, item] of value.entries()) {
    assertString(item, `${field}[${index}]`, id)
  }
}

function assertId(entry, type) {
  assertString(entry?.id, 'id', type)
  assert(idPattern.test(entry.id), `${entry.id}: id must use kebab-case`)
}

function assertLocalized(translations, fields, id) {
  assert(
    translations && typeof translations === 'object',
    `${id}: translations are required`,
  )

  for (const locale of supportedLocales) {
    const translation = translations[locale]
    assert(translation, `${id}: missing ${locale} translation`)

    for (const field of fields) {
      assertString(translation[field], `translations.${locale}.${field}`, id)
    }
  }
}

function assertLinks(links, id, localized = false) {
  assert(Array.isArray(links), `${id}: links must be an array`)

  for (const [index, link] of links.entries()) {
    assertString(link.href, `links[${index}].href`, id)

    if (localized) {
      assertLocalized(link.translations, ['label'], id)
    } else {
      assertString(link.label, `links[${index}].label`, id)
    }
  }
}

function assertDate(value, field, id) {
  assertString(value, field, id)
  assert(
    datePattern.test(value) && !Number.isNaN(Date.parse(value)),
    `${id}: ${field} must be an ISO 8601 date or offset date-time`,
  )
}

function deepFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) {
    return value
  }

  for (const nestedValue of Object.values(value)) {
    deepFreeze(nestedValue)
  }

  return Object.freeze(value)
}

/** @param {TeamMember} entry */
export function defineTeamMember(entry) {
  assertId(entry, 'team member')
  assertString(entry.name, 'name', entry.id)
  assertString(entry.image?.src, 'image.src', entry.id)
  assertString(entry.image?.alt, 'image.alt', entry.id)
  assertPositiveInteger(entry.image?.width, 'image.width', entry.id)
  assertPositiveInteger(entry.image?.height, 'image.height', entry.id)
  assertOrder(entry.order, entry.id)
  assertLinks(entry.links, entry.id)
  assertLocalized(entry.translations, [], entry.id)

  const hasRole = supportedLocales.some(
    (locale) => entry.translations[locale].role !== undefined,
  )

  for (const locale of supportedLocales) {
    if (hasRole) {
      assertString(
        entry.translations[locale].role,
        `translations.${locale}.role`,
        entry.id,
      )
    }

    assertStringArray(
      entry.translations[locale].biography,
      `translations.${locale}.biography`,
      entry.id,
    )
  }

  return deepFreeze(entry)
}

/** @param {Event} entry */
export function defineEvent(entry) {
  assertId(entry, 'event')
  assertDate(entry.startDate, 'startDate', entry.id)

  if (entry.endDate) {
    assertDate(entry.endDate, 'endDate', entry.id)
    assert(
      Date.parse(entry.endDate) >= Date.parse(entry.startDate),
      `${entry.id}: endDate must not precede startDate`,
    )
  }

  assertString(entry.timeZone, 'timeZone', entry.id)
  try {
    new Intl.DateTimeFormat('en', { timeZone: entry.timeZone })
  } catch {
    throw new Error(`${entry.id}: timeZone must be a valid IANA time zone`)
  }
  assertOrder(entry.order, entry.id)
  assertLocalized(entry.translations, ['title', 'location'], entry.id)

  const hasSummary = supportedLocales.some(
    (locale) => entry.translations[locale].summary !== undefined,
  )

  if (hasSummary) {
    assertLocalized(
      entry.translations,
      ['title', 'location', 'summary'],
      entry.id,
    )
  }
  assertLinks(entry.links, entry.id, true)
  assert(Array.isArray(entry.images), `${entry.id}: images must be an array`)

  for (const [index, image] of entry.images.entries()) {
    assertString(image.src, `images[${index}].src`, entry.id)
    assertPositiveInteger(image.width, `images[${index}].width`, entry.id)
    assertPositiveInteger(image.height, `images[${index}].height`, entry.id)
    assert(
      ['poster', 'photo'].includes(image.kind),
      `${entry.id}: images[${index}].kind must be poster or photo`,
    )
    assertLocalized(image.translations, ['alt'], entry.id)

    if (
      image.translations.en.caption !== undefined ||
      image.translations.de.caption !== undefined
    ) {
      assertLocalized(image.translations, ['alt', 'caption'], entry.id)
    }
  }

  return deepFreeze(entry)
}

/** @param {ResearchEntry} entry */
export function defineResearchEntry(entry) {
  assertId(entry, 'research entry')
  assertString(entry.citation, 'citation', entry.id)
  assertString(entry.href, 'href', entry.id)
  assert(
    Number.isInteger(entry.year) && entry.year > 1900,
    `${entry.id}: year must be a valid integer`,
  )
  assertOrder(entry.order, entry.id)
  assert(
    ['project', 'related'].includes(entry.category),
    `${entry.id}: unsupported research category`,
  )

  if (entry.translations) {
    assertLocalized(entry.translations, ['summary'], entry.id)
  }

  return deepFreeze(entry)
}
