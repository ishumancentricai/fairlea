import { access, copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { absoluteUrl, pageRoutes, siteConfig } from '../site.config.js'

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
)
const outputDirectory = path.join(projectRoot, 'dist', 'client')
const prerenderedNotFoundPath = path.join(outputDirectory, '404', 'index.html')

function routeOutputPath(pathname) {
  if (pathname === '/') {
    return path.join(outputDirectory, 'index.html')
  }

  return path.join(
    outputDirectory,
    pathname.replace(/^\/+|\/+$/g, ''),
    'index.html',
  )
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

await access(prerenderedNotFoundPath)
await mkdir(outputDirectory, { recursive: true })
await copyFile(prerenderedNotFoundPath, path.join(outputDirectory, '404.html'))

const sitemapEntries = pageRoutes
  .filter((page) => page.indexable)
  .map((page) => `  <url><loc>${escapeXml(absoluteUrl(page.path))}</loc></url>`)
  .join('\n')

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  sitemapEntries,
  '</urlset>',
  '',
].join('\n')

const robots = [
  'User-agent: *',
  'Allow: /',
  `Sitemap: ${siteConfig.origin}/sitemap.xml`,
  '',
].join('\n')

await Promise.all([
  writeFile(path.join(outputDirectory, 'sitemap.xml'), sitemap, 'utf8'),
  writeFile(path.join(outputDirectory, 'robots.txt'), robots, 'utf8'),
])

const expectedFiles = [
  ...pageRoutes.map((page) => routeOutputPath(page.path)),
  path.join(outputDirectory, '404.html'),
  path.join(outputDirectory, 'CNAME'),
  path.join(outputDirectory, 'robots.txt'),
  path.join(outputDirectory, 'sitemap.xml'),
]

await Promise.all(expectedFiles.map((file) => access(file)))

await Promise.all(
  pageRoutes.map(async (page) => {
    const html = await readFile(routeOutputPath(page.path), 'utf8')

    if (!html.includes(absoluteUrl(page.path)) || !html.includes(page.title)) {
      throw new Error(`Incomplete prerendered content for ${page.path}`)
    }
  }),
)

const notFoundHtml = await readFile(
  path.join(outputDirectory, '404.html'),
  'utf8',
)

if (
  !notFoundHtml.includes('Page not found') ||
  !notFoundHtml.includes('noindex, nofollow')
) {
  throw new Error('Incomplete prerendered 404 page')
}

console.log(
  `Static output verified: ${pageRoutes.length} routes and Pages metadata.`,
)
