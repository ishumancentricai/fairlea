import {
  absoluteUrl,
  defaultLocale,
  getPageRoute,
  getPageTranslation,
  isLocale,
  localeConfig,
  localizedPath,
  siteConfig,
  supportedLocales,
} from '../../site.config.js'
import { getMessages } from '@/lib/i18n'

export function createPageMeta(pageId, localeCandidate) {
  const locale = isLocale(localeCandidate) ? localeCandidate : defaultLocale
  const page = getPageRoute(pageId)
  const translation = getPageTranslation(pageId, locale)
  const title =
    page.id === 'home'
      ? siteConfig.title
      : `${translation.title} | ${siteConfig.shortTitle}`
  const path = localizedPath(locale, pageId)
  const alternateLocale = supportedLocales.find(
    (candidate) => candidate !== locale,
  )

  return [
    { title },
    { name: 'description', content: translation.description },
    {
      name: 'robots',
      content: page.indexable ? 'index, follow' : 'noindex, follow',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: translation.description },
    { property: 'og:url', content: absoluteUrl(path) },
    { property: 'og:locale', content: localeConfig[locale].ogLocale },
    {
      property: 'og:locale:alternate',
      content: localeConfig[alternateLocale].ogLocale,
    },
    { tagName: 'link', rel: 'canonical', href: absoluteUrl(path) },
    ...supportedLocales.map((alternate) => ({
      tagName: 'link',
      rel: 'alternate',
      hrefLang: alternate,
      href: absoluteUrl(localizedPath(alternate, pageId)),
    })),
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: absoluteUrl(localizedPath(defaultLocale, pageId)),
    },
  ]
}

export function createNotFoundMeta(localeCandidate) {
  const locale = isLocale(localeCandidate) ? localeCandidate : defaultLocale

  return [
    {
      title: `${getMessages(locale).notFound.title} | ${siteConfig.shortTitle}`,
    },
    { name: 'robots', content: 'noindex, nofollow' },
  ]
}
