const localeTags = Object.freeze({ en: 'en-GB', de: 'de-DE' })

export function formatEventDate(startDate, endDate, locale, timeZone) {
  const includesTime = startDate.includes('T')
  const formatter = new Intl.DateTimeFormat(localeTags[locale], {
    dateStyle: 'medium',
    ...(includesTime ? { timeStyle: 'short' } : {}),
    timeZone,
  })
  const start = new Date(startDate)

  if (!endDate) {
    return formatter.format(start)
  }

  return formatter.formatRange(start, new Date(endDate))
}
