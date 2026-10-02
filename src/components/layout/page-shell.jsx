import { getPageTranslation } from '../../../site.config.js'
import { useLocale } from '@/components/providers/locale-provider'

export function PageShell({ children, pageId }) {
  const { locale } = useLocale()
  const page = getPageTranslation(pageId, locale)

  return (
    <article className="mx-auto w-full max-w-4xl px-6 py-14 sm:py-20">
      <header className="max-w-3xl border-b pb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {page.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          {page.description}
        </p>
      </header>

      <div className="mt-10">{children}</div>
    </article>
  )
}
