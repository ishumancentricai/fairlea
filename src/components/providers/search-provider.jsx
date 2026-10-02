import { createContext, useContext, useMemo, useState } from 'react'

const SearchContext = createContext(null)

export function SearchProvider({ children }) {
  const [open, setOpen] = useState(false)
  const value = useMemo(
    () => ({
      open,
      openSearch: () => setOpen(true),
      closeSearch: () => setOpen(false),
    }),
    [open],
  )

  return <SearchContext value={value}>{children}</SearchContext>
}

export function useSearch() {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error('useSearch must be used within SearchProvider')
  }

  return context
}
