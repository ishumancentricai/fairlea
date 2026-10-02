import { mdxComponents } from '@/components/mdx/mdx-components'
import { useLocale } from '@/components/providers/locale-provider'
import fairleaLogo from '@/assets/brand/fairlea-logo.png'
import { PageContent } from '@/content/pages'
import { createPageMeta } from '@/lib/meta'

export const meta = ({ params }) => createPageMeta('home', params.locale)

export default function HomePage() {
  const { locale, messages } = useLocale()
  return (
    <article className="mx-auto w-full max-w-4xl px-6 py-14 sm:py-20">
      <header className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          FAIRLEA – Fair AI Research for Law Enforcement Agencies
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-muted-foreground italic">
          {messages.home.subtitle}
        </p>
        <img
          alt={messages.home.logoAlt}
          className="mx-auto mt-8 w-full max-w-sm rounded-2xl dark:invert"
          height="1446"
          src={fairleaLogo}
          width="1444"
        />
      </header>
      <div className="mt-12 border-t pt-8">
        <PageContent
          components={mdxComponents}
          locale={locale}
          pageId="project-overview"
        />
      </div>
    </article>
  )
}
