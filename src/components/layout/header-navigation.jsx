import { NavLink, useLocation } from 'react-router'

import {
  getPageTranslation,
  localizedPath,
  navigationRoutes,
} from '../../../site.config.js'
import { useLocale } from '@/components/providers/locale-provider'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

function comparablePath(pathname) {
  return `/${pathname.split('/').filter(Boolean).join('/')}/`
}

export function HeaderNavigation() {
  const { locale, messages } = useLocale()
  const location = useLocation()
  const activeRoute = navigationRoutes.find(
    (page) =>
      comparablePath(localizedPath(locale, page.id)) ===
      comparablePath(location.pathname),
  )

  return (
    <nav aria-label={messages.primaryNavigation} className="shrink-0">
      <Tabs value={activeRoute?.id ?? ''}>
        <TabsList className="h-9 gap-5 px-0" variant="line">
          {navigationRoutes.map((page) => (
            <TabsTrigger
              className="h-9 flex-none rounded-none px-0.5 text-sm hover:text-[#008557] dark:hover:text-[#008557] data-active:text-[#008557] data-active:after:bg-[#008557] dark:data-active:text-[#008557]"
              key={page.id}
              render={<NavLink end to={localizedPath(locale, page.id)} />}
              value={page.id}
            >
              {getPageTranslation(page.id, locale).title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  )
}
