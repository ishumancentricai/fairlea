import { prerenderPaths } from './site.config.js'

export default {
  appDirectory: 'src',
  basename: '/',
  buildDirectory: 'dist',
  ssr: false,
  prerender: prerenderPaths,
  routeDiscovery: { mode: 'initial' },
  future: {
    v8_middleware: true,
    v8_passThroughRequests: true,
    v8_splitRouteModules: true,
    v8_trailingSlashAwareDataRequests: true,
    v8_viteEnvironmentApi: true,
  },
}
