import { Link } from 'react-router'

import { footerRoutes, siteConfig } from '../../../site.config.js'

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.shortTitle}
        </p>

        <nav aria-label="Legal navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerRoutes.map((page) => (
              <li key={page.id}>
                <Link className="hover:text-foreground" to={page.path}>
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
