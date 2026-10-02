import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'

import {
  getLegacyRedirect,
  localizedPath,
  siteConfig,
} from '../../site.config.js'
import { Button } from '@/components/ui/button'

function targetForPath(pathname) {
  const redirect = getLegacyRedirect(pathname)
  return redirect
    ? localizedPath(redirect.locale, redirect.pageId)
    : localizedPath('en', 'home')
}

export const meta = ({ location }) => {
  const target = targetForPath(location.pathname)

  return [
    { title: `Page moved | ${siteConfig.shortTitle}` },
    { name: 'robots', content: 'noindex, follow' },
    { httpEquiv: 'refresh', content: `0;url=${target}` },
    {
      tagName: 'link',
      rel: 'canonical',
      href: new URL(target, siteConfig.origin),
    },
  ]
}

export default function LegacyRedirect() {
  const location = useLocation()
  const target = targetForPath(location.pathname)

  useEffect(() => {
    window.location.replace(`${target}${location.search}${location.hash}`)
  }, [location.hash, location.search, target])

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-balance">
        This page has moved / Diese Seite wurde verschoben
      </h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        Continue to the new address. / Weiter zur neuen Adresse.
      </p>
      <Button className="mt-8" render={<Link to={target} />}>
        Continue / Weiter
      </Button>
    </section>
  )
}
