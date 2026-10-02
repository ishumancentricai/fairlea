import { index, route } from '@react-router/dev/routes'

import { legacyRedirects, pageRoutes } from '../site.config.js'

const localizedPages = [
  ...pageRoutes.map((page) =>
    page.segment
      ? route(page.segment, page.file, { id: `page-${page.id}` })
      : index(page.file, { id: 'page-home' }),
  ),
  route('*', './routes/not-found.jsx', { id: 'localized-not-found' }),
]

const legacyRoutes = legacyRedirects.map((redirect) =>
  route(
    redirect.path.replace(/^\/+|\/+$/g, ''),
    './routes/legacy-redirect.jsx',
    { id: `legacy-${redirect.pageId}` },
  ),
)

export default [
  index('./routes/language-gateway.jsx', { id: 'language-gateway' }),
  route('404', './routes/not-found.jsx', { id: 'not-found-document' }),
  ...legacyRoutes,
  route(
    ':locale',
    './routes/locale-layout.jsx',
    { id: 'locale' },
    localizedPages,
  ),
  route('*', './routes/not-found.jsx', { id: 'not-found' }),
]
