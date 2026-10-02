import { Menu } from '@base-ui/react/menu'
import { Check, ChevronDown, Globe2, Monitor, Moon, Sun } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

import { switchLocalePath } from '../../../site.config.js'
import { useLocale } from '@/components/providers/locale-provider'
import { useTheme } from '@/components/providers/theme-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const itemClassName =
  'flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground'

function SettingsMenu({
  accessibleLabel,
  options,
  triggerContent,
  value,
  onValueChange,
}) {
  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label={accessibleLabel}
        render={<Button size="sm" variant="outline" />}
      >
        {triggerContent}
        <ChevronDown aria-hidden="true" data-icon="inline-end" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner align="end" className="z-50" sideOffset={6}>
          <Menu.Popup className="min-w-40 rounded-lg border bg-popover p-1 text-popover-foreground shadow-md outline-none">
            <Menu.RadioGroup onValueChange={onValueChange} value={value}>
              {options.map((option) => {
                const Icon = option.icon

                return (
                  <Menu.RadioItem
                    className={cn(itemClassName, 'pr-8')}
                    closeOnClick
                    key={option.value}
                    value={option.value}
                  >
                    <Icon aria-hidden="true" />
                    <span>{option.label}</span>
                    <Menu.RadioItemIndicator className="ml-auto">
                      <Check aria-hidden="true" />
                    </Menu.RadioItemIndicator>
                  </Menu.RadioItem>
                )
              })}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

export function SiteSettings() {
  const { locale, messages } = useLocale()
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const ThemeIcon = { system: Monitor, light: Sun, dark: Moon }[theme]

  const languageOptions = [
    { value: 'en', label: messages.language.en, icon: Globe2 },
    { value: 'de', label: messages.language.de, icon: Globe2 },
  ]
  const themeOptions = [
    { value: 'system', label: messages.theme.system, icon: Monitor },
    { value: 'light', label: messages.theme.light, icon: Sun },
    { value: 'dark', label: messages.theme.dark, icon: Moon },
  ]

  function changeLocale(nextLocale) {
    if (nextLocale === locale) {
      return
    }

    navigate(
      `${switchLocalePath(location.pathname, nextLocale)}${location.search}${location.hash}`,
    )
  }

  return (
    <div className="flex items-center gap-2">
      <SettingsMenu
        accessibleLabel={messages.language.label}
        onValueChange={changeLocale}
        options={languageOptions}
        triggerContent={
          <>
            <Globe2 aria-hidden="true" data-icon="inline-start" />
            <span>{locale.toUpperCase()}</span>
          </>
        }
        value={locale}
      />
      <SettingsMenu
        accessibleLabel={messages.theme.label}
        onValueChange={setTheme}
        options={themeOptions}
        triggerContent={
          <>
            <ThemeIcon aria-hidden="true" data-icon="inline-start" />
            <span className="sr-only">{messages.theme[theme]}</span>
          </>
        }
        value={theme}
      />
    </div>
  )
}
