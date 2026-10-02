/**
 * @typedef {object} TeamMember
 * @property {string} id
 * @property {string} name
 * @property {string} role
 * @property {string} biography
 * @property {string} image
 * @property {readonly {label: string, href: string}[]} links
 */

/**
 * @typedef {object} Event
 * @property {string} id
 * @property {string} title
 * @property {string} startDate ISO 8601 date or date-time.
 * @property {string} [endDate] ISO 8601 date or date-time.
 * @property {string} location
 * @property {string} description
 * @property {readonly string[]} images
 */

/**
 * @typedef {object} Publication
 * @property {string} id
 * @property {string} citation
 * @property {string} href
 * @property {'project' | 'related'} category
 */

/** @type {readonly TeamMember[]} */
export const teamMembers = Object.freeze([])

/** @type {readonly Event[]} */
export const events = Object.freeze([])

/** @type {readonly Publication[]} */
export const publications = Object.freeze([])
