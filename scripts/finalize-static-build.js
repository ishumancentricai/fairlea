import { access, copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  absoluteUrl,
  defaultLocale,
  legacyRedirects,
  localizedPageRoutes,
  localizedPath,
  siteConfig,
  supportedLocales,
} from '../site.config.js'

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

function sitemapAlternates(pageId) {
  return [
    ...supportedLocales.map(
      (locale) =>
        `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(absoluteUrl(localizedPath(locale, pageId)))}" />`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absoluteUrl(localizedPath(defaultLocale, pageId)))}" />`,
  ].join('\n')
}

await access(prerenderedNotFoundPath)
await mkdir(outputDirectory, { recursive: true })
await copyFile(prerenderedNotFoundPath, path.join(outputDirectory, '404.html'))

const sitemapEntries = localizedPageRoutes
  .filter((page) => page.indexable)
  .map((page) =>
    [
      '  <url>',
      `    <loc>${escapeXml(absoluteUrl(page.path))}</loc>`,
      sitemapAlternates(page.id),
      '  </url>',
    ].join('\n'),
  )
  .join('\n')

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
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
  routeOutputPath('/'),
  ...localizedPageRoutes.map((page) => routeOutputPath(page.path)),
  ...legacyRedirects.map((redirect) => routeOutputPath(redirect.path)),
  path.join(outputDirectory, '404.html'),
  path.join(outputDirectory, 'CNAME'),
  path.join(outputDirectory, 'robots.txt'),
  path.join(outputDirectory, 'sitemap.xml'),
]

await Promise.all(expectedFiles.map((file) => access(file)))

await Promise.all(
  localizedPageRoutes.map(async (page) => {
    const html = await readFile(routeOutputPath(page.path), 'utf8')
    const canonical = absoluteUrl(page.path)
    const expectedMarkers = [
      `<html lang="${page.locale}"`,
      canonical,
      page.description,
      'name="robots" content="index, follow"',
      `hrefLang="${page.locale}"`,
      'hrefLang="x-default"',
    ]

    if (expectedMarkers.some((marker) => !html.includes(marker))) {
      throw new Error(
        `Incomplete localized prerendered content for ${page.path}`,
      )
    }

    for (const locale of supportedLocales) {
      if (!html.includes(absoluteUrl(localizedPath(locale, page.id)))) {
        throw new Error(`Missing ${locale} alternate for ${page.path}`)
      }
    }
  }),
)

await Promise.all(
  legacyRedirects.map(async (redirect) => {
    const html = await readFile(routeOutputPath(redirect.path), 'utf8')
    const target = localizedPath(redirect.locale, redirect.pageId)

    if (
      !html.includes('noindex, follow') ||
      !html.includes(`0;url=${target}`) ||
      !html.includes(absoluteUrl(target))
    ) {
      throw new Error(`Incomplete legacy redirect for ${redirect.path}`)
    }
  }),
)

const rootHtml = await readFile(routeOutputPath('/'), 'utf8')

if (
  !rootHtml.includes('Choose your language') ||
  !rootHtml.includes('fairlea:locale') ||
  !rootHtml.includes('fairlea:theme') ||
  !rootHtml.includes('noindex, follow')
) {
  throw new Error('Incomplete language gateway')
}

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

if (
  !sitemap.includes('hreflang="en"') ||
  !sitemap.includes('hreflang="de"') ||
  !sitemap.includes('hreflang="x-default"')
) {
  throw new Error('Incomplete localized sitemap')
}

console.log(
  `Static output verified: ${localizedPageRoutes.length} localized routes, ${legacyRedirects.length} redirects, and Pages metadata.`,
)
