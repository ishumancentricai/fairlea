import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react'

const THEME_STORAGE_KEY = 'fairlea:theme'
const THEME_CHANGE_EVENT = 'fairlea:theme-change'
const themeOptions = Object.freeze(['system', 'light', 'dark'])

const ThemeContext = createContext(null)

function isTheme(value) {
  return themeOptions.includes(value)
}

function getThemeSnapshot() {
  if (typeof document === 'undefined') {
    return 'system'
  }

  const preference = document.documentElement.dataset.themePreference
  return isTheme(preference) ? preference : 'system'
}

function getSystemSnapshot() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

function applyTheme(preference) {
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolved =
    preference === 'system' ? (systemDark ? 'dark' : 'light') : preference

  document.documentElement.dataset.themePreference = preference
  document.documentElement.classList.toggle('dark', resolved === 'dark')
  document.documentElement.style.colorScheme = resolved
}

function subscribeTheme(listener) {
  function handleStorage(event) {
    if (event.key !== THEME_STORAGE_KEY) {
      return
    }

    const preference = isTheme(event.newValue) ? event.newValue : 'system'
    applyTheme(preference)
    listener()
  }

  window.addEventListener(THEME_CHANGE_EVENT, listener)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, listener)
    window.removeEventListener('storage', handleStorage)
  }
}

function subscribeSystem(listener) {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', listener)
  return () => media.removeEventListener('change', listener)
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    () => 'system',
  )
  const systemDark = useSyncExternalStore(
    subscribeSystem,
    getSystemSnapshot,
    () => false,
  )

  useEffect(() => {
    applyTheme(theme)
  }, [systemDark, theme])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme:
        theme === 'system' ? (systemDark ? 'dark' : 'light') : theme,
      setTheme(preference) {
        if (!isTheme(preference)) {
          throw new Error(`Unsupported theme: ${preference}`)
        }

        try {
          window.localStorage.setItem(THEME_STORAGE_KEY, preference)
        } catch {
          // The in-memory DOM preference still works when storage is blocked.
        }

        applyTheme(preference)
        window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
      },
    }),
    [systemDark, theme],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
