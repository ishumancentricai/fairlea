import { NavLink } from 'react-router'

import {
  getPageTranslation,
  localizedPath,
  navigationRoutes,
} from '../../../site.config.js'
import { SiteSettings } from '@/components/layout/site-settings'
import { useLocale } from '@/components/providers/locale-provider'

export function SiteHeader() {
  const { locale, messages } = useLocale()

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <NavLink
          aria-label={messages.homeLabel}
          className="text-lg font-semibold tracking-tight"
          to={localizedPath(locale, 'home')}
        >
          {messages.brandName}
        </NavLink>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4">
          <nav aria-label={messages.primaryNavigation}>
            <ul className="flex flex-wrap items-center gap-1">
              {navigationRoutes.map((page) => (
                <li key={page.id}>
                  <NavLink
                    className={({ isActive }) =>
                      [
                        'inline-flex rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                      ].join(' ')
                    }
                    to={localizedPath(locale, page.id)}
                  >
                    {getPageTranslation(page.id, locale).title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <SiteSettings />
        </div>
      </div>
    </header>
  )
}
