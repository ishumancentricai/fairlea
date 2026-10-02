import { createContext, useContext, useEffect, useMemo } from 'react'

import { isLocale } from '../../../site.config.js'
import { getMessages } from '@/lib/i18n'

const LocaleContext = createContext(null)

export function LocaleProvider({ children, locale }) {
  if (!isLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  useEffect(() => {
    try {
      window.localStorage.setItem('fairlea:locale', locale)
    } catch {
      // The URL remains the source of truth if storage is unavailable.
    }
  }, [locale])

  const value = useMemo(
    () => ({ locale, messages: getMessages(locale) }),
    [locale],
  )

  return <LocaleContext value={value}>{children}</LocaleContext>
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }

  return context
}
