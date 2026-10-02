/** @typedef {'en' | 'de'} Locale */

/**
 * @typedef {object} LocalizedPageMetadata
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {object} PageRoute
 * @property {string} id
 * @property {string} segment
 * @property {string} file
 * @property {boolean} indexable
 * @property {boolean} navigation
 * @property {boolean} footer
 * @property {Readonly<Record<Locale, LocalizedPageMetadata>>} translations
 */

export const supportedLocales = Object.freeze(['en', 'de'])
export const defaultLocale = 'en'

export const localeConfig = Object.freeze({
  en: Object.freeze({ label: 'English', htmlLang: 'en', ogLocale: 'en_GB' }),
  de: Object.freeze({ label: 'Deutsch', htmlLang: 'de', ogLocale: 'de_DE' }),
})

export const siteConfig = Object.freeze({
  origin: 'https://fairlea.de',
  title: 'FAIRLEA @ University of Bayreuth',
  shortTitle: 'FAIRLEA',
  defaultLocale,
})

/** @type {readonly PageRoute[]} */
export const pageRoutes = Object.freeze([
  {
    id: 'home',
    segment: '',
    file: './routes/home.jsx',
    indexable: true,
    navigation: false,
    footer: false,
    translations: {
      en: {
        title: 'FAIRLEA',
        description:
          'Fair AI Research for Law Enforcement Agencies: An interdisciplinary investigation in the context of cryptoasset forensics.',
      },
      de: {
        title: 'FAIRLEA',
        description:
          'Faire KI-Forschung für Strafverfolgungsbehörden: Eine interdisziplinäre Untersuchung im Kontext der Kryptoasset-Forensik.',
      },
    },
  },
  {
    id: 'about',
    segment: 'about',
    file: './routes/about.jsx',
    indexable: true,
    navigation: false,
    footer: false,
    translations: {
      en: {
        title: 'About',
        description: 'About the FAIRLEA research project.',
      },
      de: {
        title: 'Über FAIRLEA',
        description: 'Über das Forschungsprojekt FAIRLEA.',
      },
    },
  },
  {
    id: 'events',
    segment: 'events',
    file: './routes/events.jsx',
    indexable: true,
    navigation: true,
    footer: false,
    translations: {
      en: {
        title: 'Events',
        description: 'Events and project meetings from FAIRLEA.',
      },
      de: {
        title: 'Veranstaltungen',
        description: 'Veranstaltungen und Projekttreffen von FAIRLEA.',
      },
    },
  },
  {
    id: 'research',
    segment: 'research',
    file: './routes/research.jsx',
    indexable: true,
    navigation: true,
    footer: false,
    translations: {
      en: {
        title: 'Research',
        description: 'Research and publications from FAIRLEA.',
      },
      de: {
        title: 'Forschung',
        description: 'Forschung und Publikationen von FAIRLEA.',
      },
    },
  },
  {
    id: 'team',
    segment: 'team',
    file: './routes/team.jsx',
    indexable: true,
    navigation: true,
    footer: false,
    translations: {
      en: {
        title: 'Team',
        description: 'The interdisciplinary FAIRLEA research team.',
      },
      de: {
        title: 'Team',
        description: 'Das interdisziplinäre Forschungsteam von FAIRLEA.',
      },
    },
  },
  {
    id: 'imprint',
    segment: 'impressum',
    file: './routes/imprint.jsx',
    indexable: true,
    navigation: false,
    footer: true,
    translations: {
      en: {
        title: 'Legal notice',
        description: 'Legal notice for the FAIRLEA website.',
      },
      de: {
        title: 'Impressum',
        description: 'Impressum der FAIRLEA-Website.',
      },
    },
  },
  {
    id: 'privacy',
    segment: 'datenschutz',
    file: './routes/privacy.jsx',
    indexable: true,
    navigation: false,
    footer: true,
    translations: {
      en: {
        title: 'Privacy policy',
        description: 'Privacy information for the FAIRLEA website.',
      },
      de: {
        title: 'Datenschutzerklärung',
        description: 'Datenschutzerklärung der FAIRLEA-Website.',
      },
    },
  },
])

export const legacyRedirects = Object.freeze([
  { path: '/about/', pageId: 'about', locale: 'en' },
  { path: '/events/', pageId: 'events', locale: 'en' },
  { path: '/research/', pageId: 'research', locale: 'en' },
  { path: '/team/', pageId: 'team', locale: 'en' },
  { path: '/impressum/', pageId: 'imprint', locale: 'de' },
  { path: '/datenschutz/', pageId: 'privacy', locale: 'de' },
])

export function isLocale(value) {
  return supportedLocales.includes(value)
}

export function getPageRoute(id) {
  const page = pageRoutes.find((candidate) => candidate.id === id)

  if (!page) {
    throw new Error(`Unknown page route: ${id}`)
  }

  return page
}

export function getPageTranslation(pageId, locale) {
  if (!isLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  return getPageRoute(pageId).translations[locale]
}

export function localizedPath(locale, pageId) {
  if (!isLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  const { segment } = getPageRoute(pageId)
  return segment ? `/${locale}/${segment}/` : `/${locale}/`
}

export function localeFromPathname(pathname) {
  const candidate = pathname.split('/').filter(Boolean)[0]
  return isLocale(candidate) ? candidate : null
}

export function switchLocalePath(pathname, locale) {
  if (!isLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  const segments = pathname.split('/').filter(Boolean)

  if (isLocale(segments[0])) {
    segments[0] = locale
    return `/${segments.join('/')}/`
  }

  return localizedPath(locale, 'home')
}

export function getLegacyRedirect(pathname) {
  const normalizedPath = `/${pathname.split('/').filter(Boolean).join('/')}/`
  return legacyRedirects.find((redirect) => redirect.path === normalizedPath)
}

export function absoluteUrl(pathname) {
  return new URL(pathname, siteConfig.origin).toString()
}

export const localizedPageRoutes = Object.freeze(
  supportedLocales.flatMap((locale) =>
    pageRoutes.map((page) => ({
      ...page,
      locale,
      path: localizedPath(locale, page.id),
      ...page.translations[locale],
    })),
  ),
)

export const navigationRoutes = Object.freeze(
  pageRoutes.filter((page) => page.navigation),
)

export const footerRoutes = Object.freeze(
  pageRoutes.filter((page) => page.footer),
)

export const prerenderPaths = Object.freeze([
  '/',
  ...localizedPageRoutes.map((page) => page.path.replace(/\/$/, '')),
  ...legacyRedirects.map((redirect) => redirect.path.replace(/\/$/, '')),
  '/404',
])

for (const page of pageRoutes) {
  for (const locale of supportedLocales) {
    const translation = page.translations[locale]

    if (!translation?.title || !translation.description) {
      throw new Error(`Incomplete ${locale} metadata for page: ${page.id}`)
    }
  }
}
