import { mdxComponents } from '@/components/mdx/mdx-components'
import { useLocale } from '@/components/providers/locale-provider'
import { researchEntries } from '@/content/data/collections'

export function ResearchList() {
  const { locale, messages } = useLocale()

  if (researchEntries.length === 0) {
    return null
  }

  return Object.entries(messages.researchCategories).map(
    ([category, heading]) => {
      const categoryEntries = researchEntries.filter(
        (entry) => entry.category === category,
      )

      if (categoryEntries.length === 0) {
        return null
      }

      return (
        <section className="mt-10 first:mt-0" key={category}>
          <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
          <ol className="mt-6 space-y-8">
            {categoryEntries.map((entry) => {
              const Body = entry.body?.[locale]

              return (
                <li key={entry.id}>
                  <p className="text-sm font-medium text-muted-foreground">
                    {entry.year}
                  </p>
                  <p className="mt-2 leading-7">
                    <a
                      className="font-medium underline underline-offset-4"
                      href={entry.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {entry.citation}
                    </a>
                  </p>
                  {Body ? (
                    <Body components={mdxComponents} />
                  ) : entry.translations ? (
                    <p className="mt-3 leading-7 text-muted-foreground">
                      {entry.translations[locale].summary}
                    </p>
                  ) : null}
                </li>
              )
            })}
          </ol>
        </section>
      )
    },
  )
}
