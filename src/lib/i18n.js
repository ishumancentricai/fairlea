import {
  defaultLocale,
  isLocale,
  localeFromPathname,
  supportedLocales,
} from '../../site.config.js'

const messages = Object.freeze({
  en: Object.freeze({
    skipToContent: 'Skip to content',
    primaryNavigation: 'Primary navigation',
    legalNavigation: 'Legal navigation',
    homeLabel: 'FAIRLEA home',
    language: Object.freeze({
      label: 'Change language',
      en: 'English',
      de: 'German',
    }),
    theme: Object.freeze({
      label: 'Change appearance',
      system: 'System',
      light: 'Light',
      dark: 'Dark',
    }),
    notFound: Object.freeze({
      eyebrow: 'Error 404',
      title: 'Page not found',
      description: 'The requested page does not exist or has been moved.',
      backHome: 'Back to home',
    }),
    error: Object.freeze({
      eyebrow: 'Unexpected error',
      title: 'This page could not be displayed',
      description: 'Please try again later or return to the home page.',
    }),
    researchCategories: Object.freeze({
      project: 'Project publication',
      related: 'Related work',
    }),
    event: Object.freeze({ date: 'Date', location: 'Location' }),
  }),
  de: Object.freeze({
    skipToContent: 'Zum Inhalt springen',
    primaryNavigation: 'Hauptnavigation',
    legalNavigation: 'Rechtliche Navigation',
    homeLabel: 'FAIRLEA-Startseite',
    language: Object.freeze({
      label: 'Sprache ändern',
      en: 'Englisch',
      de: 'Deutsch',
    }),
    theme: Object.freeze({
      label: 'Darstellung ändern',
      system: 'System',
      light: 'Hell',
      dark: 'Dunkel',
    }),
    notFound: Object.freeze({
      eyebrow: 'Fehler 404',
      title: 'Seite nicht gefunden',
      description:
        'Die angeforderte Seite existiert nicht oder wurde verschoben.',
      backHome: 'Zur Startseite',
    }),
    error: Object.freeze({
      eyebrow: 'Unerwarteter Fehler',
      title: 'Diese Seite konnte nicht angezeigt werden',
      description:
        'Bitte versuchen Sie es später erneut oder kehren Sie zur Startseite zurück.',
    }),
    researchCategories: Object.freeze({
      project: 'Projektpublikation',
      related: 'Verwandte Forschung',
    }),
    event: Object.freeze({ date: 'Datum', location: 'Ort' }),
  }),
})

function messageShape(value) {
  if (typeof value !== 'object' || value === null) {
    return typeof value
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [
      key,
      messageShape(nestedValue),
    ]),
  )
}

function assertCompleteMessages(value, path) {
  if (typeof value === 'string') {
    if (value.trim().length === 0) {
      throw new Error(`Empty UI message: ${path}`)
    }

    return
  }

  for (const [key, nestedValue] of Object.entries(value)) {
    assertCompleteMessages(nestedValue, `${path}.${key}`)
  }
}

const referenceShape = JSON.stringify(messageShape(messages[defaultLocale]))

for (const locale of supportedLocales) {
  if (JSON.stringify(messageShape(messages[locale])) !== referenceShape) {
    throw new Error(`Incomplete UI messages for locale: ${locale}`)
  }

  assertCompleteMessages(messages[locale], locale)
}

export function getMessages(locale) {
  return messages[isLocale(locale) ? locale : defaultLocale]
}

export function getDocumentLocale(pathname) {
  return localeFromPathname(pathname) ?? defaultLocale
}
