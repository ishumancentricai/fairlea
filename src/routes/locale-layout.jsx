import { Outlet, useParams } from 'react-router'

import { isLocale } from '../../site.config.js'

export default function LocaleLayout() {
  const { locale } = useParams()

  if (!isLocale(locale)) {
    throw new Response('Not found', { status: 404 })
  }

  return <Outlet />
}
