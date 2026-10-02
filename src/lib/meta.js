import { absoluteUrl, getPageRoute, siteConfig } from '../../site.config.js'

export function createPageMeta(pageId) {
  const page = getPageRoute(pageId)
  const title =
    page.id === 'home'
      ? siteConfig.title
      : `${page.title} | ${siteConfig.shortTitle}`

  return [
    { title },
    { name: 'description', content: page.description },
    {
      name: 'robots',
      content: page.indexable ? 'index, follow' : 'noindex, follow',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: page.description },
    { property: 'og:url', content: absoluteUrl(page.path) },
    { tagName: 'link', rel: 'canonical', href: absoluteUrl(page.path) },
  ]
}

export function createNotFoundMeta() {
  return [
    { title: `Page not found | ${siteConfig.shortTitle}` },
    { name: 'robots', content: 'noindex, nofollow' },
  ]
}
