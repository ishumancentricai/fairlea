import { NavLink } from 'react-router'

import { localizedPath } from '../../../site.config.js'
import fairleaLogo from '@/assets/brand/fairlea-logo.png'
import { HeaderNavigation } from '@/components/layout/header-navigation'
import { MobileNavigation } from '@/components/layout/mobile-navigation'
import { SiteSettings } from '@/components/layout/site-settings'
import { useLocale } from '@/components/providers/locale-provider'
import { Separator } from '@/components/ui/separator'

export function SiteHeader() {
  const { locale, messages } = useLocale()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 shadow-xs backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <NavLink
          aria-label={messages.homeLabel}
          className="inline-flex min-w-0 items-center gap-3 rounded-lg text-sm font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
          end
          to={localizedPath(locale, 'home')}
        >
          <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-950 shadow-sm ring-1 ring-black/10 dark:bg-white">
            <img
              alt=""
              className="size-full object-cover dark:invert"
              height="1446"
              src={fairleaLogo}
              width="1444"
            />
          </span>
          <span className="leading-tight sm:hidden">FAIRLEA</span>
          <span className="hidden leading-tight sm:inline">
            {messages.brandName}
          </span>
        </NavLink>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <HeaderNavigation />
          <Separator className="h-7" orientation="vertical" />
          <SiteSettings />
        </div>

        <div className="ml-auto lg:hidden">
          <MobileNavigation />
        </div>
      </div>
    </header>
  )
}
