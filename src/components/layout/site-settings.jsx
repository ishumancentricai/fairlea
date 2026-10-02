import { ChevronDown, Globe2, Moon, Search, Sun } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

import { switchLocalePath } from '../../../site.config.js'
import { useLocale } from '@/components/providers/locale-provider'
import { useSearch } from '@/components/providers/search-provider'
import { useTheme } from '@/components/providers/theme-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Toggle } from '@/components/ui/toggle'

export function SiteSettings({ onNavigate }) {
  const { locale, messages } = useLocale()
  const { resolvedTheme, setTheme } = useTheme()
  const { openSearch } = useSearch()
  const location = useLocation()
  const navigate = useNavigate()
  const isDark = resolvedTheme === 'dark'
  const themeLabel = isDark
    ? messages.theme.switchToLight
    : messages.theme.switchToDark

  function changeLocale(nextLocale) {
    if (nextLocale === locale) {
      return
    }

    navigate(
      `${switchLocalePath(location.pathname, nextLocale)}${location.search}${location.hash}`,
    )
    onNavigate?.()
  }

  function toggleTheme() {
    setTheme(isDark ? 'light' : 'dark')
  }

  function handleSearch() {
    onNavigate?.()
    openSearch()
  }

  return (
    <TooltipProvider delay={350}>
      <div className="flex shrink-0 items-center gap-2">
        <Tooltip>
          <TooltipTrigger
            render={
              <Toggle
                aria-label={themeLabel}
                onPressedChange={toggleTheme}
                pressed={isDark}
                variant="outline"
              />
            }
          >
            {isDark ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
          </TooltipTrigger>
          <TooltipContent side="bottom">{themeLabel}</TooltipContent>
        </Tooltip>

        <Separator className="h-7" orientation="vertical" />

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger
              render={
                <DropdownMenuTrigger
                  aria-label={messages.language.label}
                  render={<Button variant="ghost" />}
                />
              }
            >
              <Globe2 aria-hidden="true" data-icon="inline-start" />
              <span>{locale.toUpperCase()}</span>
              <ChevronDown aria-hidden="true" data-icon="inline-end" />
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {messages.language.label}
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end" className="min-w-40" sideOffset={8}>
            <DropdownMenuRadioGroup onValueChange={changeLocale} value={locale}>
              <DropdownMenuRadioItem closeOnClick value="en">
                <Globe2 aria-hidden="true" />
                {messages.language.en}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem closeOnClick value="de">
                <Globe2 aria-hidden="true" />
                {messages.language.de}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator className="h-7" orientation="vertical" />

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                aria-label={messages.search.open}
                onClick={handleSearch}
                size="icon"
                variant="ghost"
              />
            }
          >
            <Search aria-hidden="true" />
          </TooltipTrigger>
          <TooltipContent side="bottom">{messages.search.open}</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
