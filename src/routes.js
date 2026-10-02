import { index, route } from '@react-router/dev/routes'

import { pageRoutes } from '../site.config.js'

const publicRoutes = pageRoutes.map((page) =>
  page.routePath ? route(page.routePath, page.file) : index(page.file),
)

export default [...publicRoutes, route('*', './routes/not-found.jsx')]
