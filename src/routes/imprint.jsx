import { PageShell } from '@/components/layout/page-shell'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { useLocale } from '@/components/providers/locale-provider'
import { PageContent } from '@/content/pages'
import { createPageMeta } from '@/lib/meta'

export const meta = ({ params }) => createPageMeta('imprint', params.locale)

export default function ImprintPage() {
  const { locale } = useLocale()
  return (
    <PageShell pageId="imprint">
      <PageContent
        components={mdxComponents}
        locale={locale}
        pageId="imprint"
      />
    </PageShell>
  )
}
