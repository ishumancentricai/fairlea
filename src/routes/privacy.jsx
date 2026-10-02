import { PageShell } from '@/components/layout/page-shell'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { useLocale } from '@/components/providers/locale-provider'
import { PageContent } from '@/content/pages'
import { createPageMeta } from '@/lib/meta'

export const meta = ({ params }) => createPageMeta('privacy', params.locale)

export default function PrivacyPage() {
  const { locale } = useLocale()
  return (
    <PageShell pageId="privacy">
      <PageContent
        components={mdxComponents}
        locale={locale}
        pageId="privacy"
      />
    </PageShell>
  )
}
