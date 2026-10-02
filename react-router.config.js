import { prerenderPaths } from './site.config.js'

export default {
  appDirectory: 'src',
  basename: '/',
  buildDirectory: 'dist',
  ssr: false,
  prerender: prerenderPaths,
  routeDiscovery: { mode: 'initial' },
}
