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
    brandName: 'FAIRLEA @ University of Bayreuth',
    home: Object.freeze({
      subtitle:
        'An interdisciplinary investigation in the context of cryptoasset forensics',
      logoAlt: 'FAIRLEA logo',
    }),
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
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
    }),
    dialog: Object.freeze({ close: 'Close' }),
    gallery: Object.freeze({
      description: 'Image gallery for {title}',
      openImage: 'Open image {index} of {count} from {title}',
      previous: 'Previous image',
      next: 'Next image',
      position: 'Image {current} of {count}',
    }),
    search: Object.freeze({
      open: 'Open search',
      label: 'Search FAIRLEA',
      title: 'Search',
      description: 'Search across FAIRLEA content.',
      placeholder: 'Search names, publications or events…',
      hintTitle: 'What can I search for?',
      hint: 'Search team members and their biographies, research publications, and event titles and descriptions.',
      noResults: 'No matching results were found.',
      resultCount: '{count} results',
      types: Object.freeze({
        team: 'Team',
        research: 'Research',
        event: 'Event',
      }),
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
    team: Object.freeze({
      former: 'Former team members',
      openProfile: 'Highlight profile for {name}',
      profileDescription: 'Profile of {name}',
    }),
    event: Object.freeze({ date: 'Date', location: 'Location' }),
  }),
  de: Object.freeze({
    skipToContent: 'Zum Inhalt springen',
    primaryNavigation: 'Hauptnavigation',
    legalNavigation: 'Rechtliche Navigation',
    homeLabel: 'FAIRLEA-Startseite',
    brandName: 'FAIRLEA @ Universität Bayreuth',
    home: Object.freeze({
      subtitle:
        'Eine interdisziplinäre Untersuchung im Kontext der Kryptoasset-Forensik',
      logoAlt: 'FAIRLEA-Logo',
    }),
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
      switchToLight: 'Zum hellen Design wechseln',
      switchToDark: 'Zum dunklen Design wechseln',
    }),
    dialog: Object.freeze({ close: 'Schließen' }),
    gallery: Object.freeze({
      description: 'Bildergalerie für {title}',
      openImage: 'Bild {index} von {count} der Veranstaltung {title} öffnen',
      previous: 'Vorheriges Bild',
      next: 'Nächstes Bild',
      position: 'Bild {current} von {count}',
    }),
    search: Object.freeze({
      open: 'Suche öffnen',
      label: 'FAIRLEA durchsuchen',
      title: 'Suche',
      description: 'Durchsuchen Sie die Inhalte von FAIRLEA.',
      placeholder: 'Namen, Publikationen oder Veranstaltungen suchen…',
      hintTitle: 'Wonach kann ich suchen?',
      hint: 'Durchsuchen Sie Teammitglieder und ihre Biografien, Forschungspublikationen sowie Veranstaltungstitel und -beschreibungen.',
      noResults: 'Es wurden keine passenden Treffer gefunden.',
      resultCount: '{count} Treffer',
      types: Object.freeze({
        team: 'Team',
        research: 'Forschung',
        event: 'Veranstaltung',
      }),
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
    team: Object.freeze({
      former: 'Ehemalige Teammitglieder',
      openProfile: 'Profil von {name} hervorheben',
      profileDescription: 'Profil von {name}',
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

/**
 * @param {string} template
 * @param {Record<string, string | number>} values
 */
export function formatMessage(template, values) {
  return Object.entries(values).reduce(
    (message, [name, value]) => message.replaceAll(`{${name}}`, String(value)),
    template,
  )
}

export function getDocumentLocale(pathname) {
  return localeFromPathname(pathname) ?? defaultLocale
}
