import { Link as LinkIcon } from 'lucide-react'
import { Link } from 'react-router'

import {
  footerRoutes,
  getPageTranslation,
  localizedPath,
} from '../../../site.config.js'
import { useLocale } from '@/components/providers/locale-provider'

export function SiteFooter() {
  const { locale, messages } = useLocale()

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {messages.brandName}
        </p>

        <nav aria-label={messages.legalNavigation}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerRoutes.map((page) => (
              <li key={page.id}>
                <Link
                  className="inline-flex items-center gap-1.5 hover:text-foreground"
                  to={localizedPath(locale, page.id)}
                >
                  <LinkIcon aria-hidden="true" className="size-3.5" />
                  {getPageTranslation(page.id, locale).title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
