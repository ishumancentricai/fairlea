import { localizedPath } from '../../site.config.js'
import {
  events,
  researchEntries,
  teamMembers,
} from '@/content/data/collections'

function cleanMarkdown(value = '') {
  return value
    .replace(/^---[\s\S]*?---/u, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/gu, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, '$1')
    .replace(/[`*_>#~-]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()
}

function normalize(value) {
  return value
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase()
}

export function createSearchIndex(locale) {
  const team = teamMembers.map((member) => {
    const translation = member.translations[locale]
    const description = cleanMarkdown(
      member.bodyText?.[locale] ?? translation.biography.join(' '),
    )

    return {
      id: `team:${member.id}`,
      type: 'team',
      title: member.name,
      subtitle: translation.role ?? '',
      description,
      href: `${localizedPath(locale, 'team')}#${member.id}`,
    }
  })

  const research = researchEntries.map((entry) => ({
    id: `research:${entry.id}`,
    type: 'research',
    title: entry.citation,
    subtitle: String(entry.year),
    description: cleanMarkdown(
      entry.bodyText?.[locale] ?? entry.translations?.[locale].summary ?? '',
    ),
    href: `${localizedPath(locale, 'research')}#${entry.id}`,
  }))

  const eventResults = events.map((event) => {
    const translation = event.translations[locale]

    return {
      id: `event:${event.id}`,
      type: 'event',
      title: translation.title,
      subtitle: translation.location,
      description: cleanMarkdown(
        event.bodyText?.[locale] ?? translation.summary ?? '',
      ),
      href: `${localizedPath(locale, 'events')}#${event.id}`,
    }
  })

  return [...team, ...research, ...eventResults].map((entry) => ({
    ...entry,
    searchValue: normalize(
      `${entry.title} ${entry.subtitle} ${entry.description}`,
    ),
  }))
}

export function searchIndex(index, query) {
  const normalizedQuery = normalize(query.trim())

  if (!normalizedQuery) {
    return []
  }

  const terms = normalizedQuery.split(/\s+/u)

  return index
    .filter((entry) => terms.every((term) => entry.searchValue.includes(term)))
    .map((entry) => {
      const normalizedTitle = normalize(entry.title)
      const normalizedSubtitle = normalize(entry.subtitle)
      let score = 0

      if (normalizedTitle === normalizedQuery) score += 100
      if (normalizedTitle.startsWith(normalizedQuery)) score += 50
      if (normalizedTitle.includes(normalizedQuery)) score += 25
      if (normalizedSubtitle.includes(normalizedQuery)) score += 10

      return { entry, score }
    })
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.entry.title.localeCompare(right.entry.title),
    )
    .map(({ entry }) => entry)
}
