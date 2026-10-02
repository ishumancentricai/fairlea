import { createElement } from 'react'

import { supportedLocales } from '../../../site.config.js'

const modules = import.meta.glob('./*.{en,de}.mdx', {
  eager: true,
  import: 'default',
})

const pageContents = {}

for (const [modulePath, Content] of Object.entries(modules)) {
  const match = modulePath.match(/^\.\/(.+)\.(en|de)\.mdx$/)

  if (!match) {
    throw new Error(`Unsupported page-content filename: ${modulePath}`)
  }

  const [, pageId, locale] = match
  pageContents[pageId] ??= {}
  pageContents[pageId][locale] = Content
}

for (const [pageId, translations] of Object.entries(pageContents)) {
  for (const locale of supportedLocales) {
    if (!translations[locale]) {
      throw new Error(`${pageId}: missing ${locale} page-content translation`)
    }
  }
}

export function getPageContent(pageId, locale) {
  const Content = pageContents[pageId]?.[locale]

  if (!Content) {
    throw new Error(`Unknown ${locale} page content: ${pageId}`)
  }

  return Content
}

export function PageContent({ components, locale, pageId }) {
  return createElement(getPageContent(pageId, locale), { components })
}
