import { PageShell } from '@/components/layout/page-shell'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { useLocale } from '@/components/providers/locale-provider'
import { PageContent } from '@/content/pages'
import { createPageMeta } from '@/lib/meta'

export const meta = ({ params }) => createPageMeta('about', params.locale)

export default function AboutPage() {
  const { locale } = useLocale()
  return (
    <PageShell pageId="about">
      <PageContent
        components={mdxComponents}
        locale={locale}
        pageId="project-overview"
      />
    </PageShell>
  )
}
