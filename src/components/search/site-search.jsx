import { useMemo, useState } from 'react'
import { CalendarDays, FlaskConical, Search, Users } from 'lucide-react'
import { Link } from 'react-router'

import { useLocale } from '@/components/providers/locale-provider'
import { useSearch } from '@/components/providers/search-provider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatMessage } from '@/lib/i18n'
import { createSearchIndex, searchIndex } from '@/lib/search'

const typeIcons = {
  team: Users,
  research: FlaskConical,
  event: CalendarDays,
}

export function SiteSearch() {
  const { locale, messages } = useLocale()
  const { open, closeSearch } = useSearch()
  const [query, setQuery] = useState('')
  const index = useMemo(() => createSearchIndex(locale), [locale])
  const results = useMemo(() => searchIndex(index, query), [index, query])
  const hasQuery = query.trim().length > 0

  function close() {
    setQuery('')
    closeSearch()
  }

  function handleOpenChange(nextOpen) {
    if (!nextOpen) {
      close()
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent
        className="h-[calc(100svh-1rem)] w-[calc(100vw-1rem)] max-w-none grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden p-5 sm:h-[75svh] sm:w-[80vw] sm:max-w-5xl sm:p-7"
        closeLabel={messages.dialog.close}
      >
        <DialogHeader className="pr-10">
          <DialogTitle className="text-2xl leading-tight sm:text-3xl">
            {messages.search.title}
          </DialogTitle>
          <DialogDescription>{messages.search.description}</DialogDescription>
        </DialogHeader>

        <label className="flex h-14 items-center gap-3 rounded-xl border bg-background px-4 focus-within:border-[#008557] focus-within:ring-3 focus-within:ring-[#008557]/20">
          <Search aria-hidden="true" className="size-5 text-muted-foreground" />
          <span className="sr-only">{messages.search.label}</span>
          <input
            autoFocus
            className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            onChange={(event) => setQuery(event.target.value)}
            placeholder={messages.search.placeholder}
            type="search"
            value={query}
          />
        </label>

        <div className="min-h-0 overflow-y-auto overscroll-contain pr-1">
          {!hasQuery ? (
            <div className="flex min-h-full flex-col items-center justify-center px-4 py-10 text-center">
              <Search aria-hidden="true" className="size-10 text-[#008557]" />
              <h2 className="mt-4 text-lg font-semibold">
                {messages.search.hintTitle}
              </h2>
              <p className="mt-2 max-w-xl leading-7 text-muted-foreground">
                {messages.search.hint}
              </p>
            </div>
          ) : results.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              {messages.search.noResults}
            </p>
          ) : (
            <div>
              <p
                aria-live="polite"
                className="mb-3 text-sm text-muted-foreground"
              >
                {formatMessage(messages.search.resultCount, {
                  count: results.length,
                })}
              </p>
              <ul className="space-y-2">
                {results.map((result) => {
                  const Icon = typeIcons[result.type]

                  return (
                    <li key={result.id}>
                      <Link
                        className="group flex gap-4 rounded-xl border p-4 transition-[border-color,background-color] hover:border-[#008557]/50 hover:bg-[#008557]/5 focus-visible:ring-2 focus-visible:ring-[#008557]/40 focus-visible:outline-none"
                        onClick={close}
                        to={result.href}
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground group-hover:text-[#008557]">
                          <Icon aria-hidden="true" className="size-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="font-semibold group-hover:text-[#008557]">
                              {result.title}
                            </span>
                            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                              {messages.search.types[result.type]}
                            </span>
                          </span>
                          {result.subtitle ? (
                            <span className="mt-1 block text-sm text-muted-foreground">
                              {result.subtitle}
                            </span>
                          ) : null}
                          {result.description ? (
                            <span className="mt-2 line-clamp-2 block text-sm leading-6 text-muted-foreground">
                              {result.description}
                            </span>
                          ) : null}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
