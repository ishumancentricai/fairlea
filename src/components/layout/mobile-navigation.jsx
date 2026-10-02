import { Menu } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router'

import {
  getPageTranslation,
  localizedPath,
  navigationRoutes,
} from '../../../site.config.js'
import { SiteSettings } from '@/components/layout/site-settings'
import { useLocale } from '@/components/providers/locale-provider'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function MobileNavigation() {
  const { locale, messages } = useLocale()
  const [open, setOpen] = useState(false)

  function closeMenu() {
    setOpen(false)
  }

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger
        render={
          <Button
            aria-label={messages.menu.open}
            className="lg:hidden"
            size="icon-lg"
            variant="ghost"
          />
        }
      >
        <Menu aria-hidden="true" className="size-5" />
      </SheetTrigger>

      <SheetContent
        className="w-[min(88vw,22rem)]"
        closeLabel={messages.dialog.close}
      >
        <SheetHeader className="border-b px-5 py-5 pr-14">
          <SheetTitle>{messages.menu.title}</SheetTitle>
        </SheetHeader>

        <nav
          aria-label={messages.primaryNavigation}
          className="flex flex-1 flex-col px-4"
        >
          <ul className="space-y-1">
            {navigationRoutes.map((page) => (
              <li key={page.id}>
                <NavLink
                  className={({ isActive }) =>
                    `flex min-h-11 items-center rounded-lg px-3 py-2 font-medium transition-colors hover:bg-muted hover:text-[#008557] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                      isActive
                        ? 'bg-[#008557]/10 text-[#008557]'
                        : 'text-foreground/75'
                    }`
                  }
                  end
                  onClick={closeMenu}
                  to={localizedPath(locale, page.id)}
                >
                  {getPageTranslation(page.id, locale).title}
                </NavLink>
              </li>
            ))}
          </ul>

          <Separator className="my-5" />

          <div className="flex items-center justify-between gap-3">
            <SiteSettings onNavigate={closeMenu} />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
