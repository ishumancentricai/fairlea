import { NavLink } from 'react-router'

import { navigationRoutes, siteConfig } from '../../../site.config.js'

export function SiteHeader() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <NavLink
          aria-label={`${siteConfig.shortTitle} home`}
          className="text-lg font-semibold tracking-tight"
          to="/"
        >
          {siteConfig.shortTitle}
        </NavLink>

        <nav aria-label="Primary navigation">
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
                  to={page.path}
                >
                  {page.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
