/**
 * @typedef {object} PageRoute
 * @property {string} id
 * @property {string} path
 * @property {string} routePath
 * @property {string} file
 * @property {string} title
 * @property {string} description
 * @property {boolean} indexable
 * @property {boolean} navigation
 */

export const siteConfig = Object.freeze({
  origin: 'https://fairlea.de',
  title: 'FAIRLEA @ University of Bayreuth',
  shortTitle: 'FAIRLEA',
  description:
    'Fair AI Research for Law Enforcement Agencies: An interdisciplinary investigation in the context of cryptoasset forensics.',
  locale: 'en',
})

/** @type {readonly PageRoute[]} */
export const pageRoutes = Object.freeze([
  {
    id: 'home',
    path: '/',
    routePath: '',
    file: './routes/home.jsx',
    title: 'FAIRLEA',
    description: siteConfig.description,
    indexable: true,
    navigation: false,
  },
  {
    id: 'about',
    path: '/about/',
    routePath: 'about',
    file: './routes/about.jsx',
    title: 'About',
    description: 'About the FAIRLEA research project.',
    indexable: true,
    navigation: false,
  },
  {
    id: 'events',
    path: '/events/',
    routePath: 'events',
    file: './routes/events.jsx',
    title: 'Events',
    description: 'Events and project meetings from FAIRLEA.',
    indexable: true,
    navigation: true,
  },
  {
    id: 'research',
    path: '/research/',
    routePath: 'research',
    file: './routes/research.jsx',
    title: 'Research',
    description: 'Research and publications from FAIRLEA.',
    indexable: true,
    navigation: true,
  },
  {
    id: 'team',
    path: '/team/',
    routePath: 'team',
    file: './routes/team.jsx',
    title: 'Team',
    description: 'The interdisciplinary FAIRLEA research team.',
    indexable: true,
    navigation: true,
  },
  {
    id: 'news',
    path: '/news/',
    routePath: 'news',
    file: './routes/news.jsx',
    title: 'News',
    description: 'News from the FAIRLEA research project.',
    indexable: true,
    navigation: false,
  },
  {
    id: 'imprint',
    path: '/impressum/',
    routePath: 'impressum',
    file: './routes/imprint.jsx',
    title: 'Impressum',
    description: 'Legal notice for the FAIRLEA website.',
    indexable: true,
    navigation: false,
  },
  {
    id: 'privacy',
    path: '/datenschutz/',
    routePath: 'datenschutz',
    file: './routes/privacy.jsx',
    title: 'Datenschutzerklärung',
    description: 'Privacy information for the FAIRLEA website.',
    indexable: true,
    navigation: false,
  },
])

export const prerenderPaths = Object.freeze([
  ...pageRoutes.map((page) =>
    page.path === '/' ? page.path : page.path.replace(/\/$/, ''),
  ),
  '/404',
])

export const navigationRoutes = Object.freeze(
  pageRoutes.filter((page) => page.navigation),
)

export const footerRoutes = Object.freeze(
  pageRoutes.filter((page) => ['imprint', 'privacy'].includes(page.id)),
)

export function getPageRoute(id) {
  const page = pageRoutes.find((candidate) => candidate.id === id)

  if (!page) {
    throw new Error(`Unknown page route: ${id}`)
  }

  return page
}

export function absoluteUrl(pathname) {
  return new URL(pathname, siteConfig.origin).toString()
}
