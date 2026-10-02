import { PageShell } from '@/components/layout/page-shell'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { useLocale } from '@/components/providers/locale-provider'
import FoundationGerman from '@/content/pages/foundation.de.mdx'
import FoundationEnglish from '@/content/pages/foundation.en.mdx'
import { createPageMeta } from '@/lib/meta'

export const meta = ({ params }) => createPageMeta('home', params.locale)

export default function HomePage() {
  const { locale } = useLocale()
  const FoundationContent =
    locale === 'de' ? FoundationGerman : FoundationEnglish

  return (
    <PageShell pageId="home">
      <FoundationContent components={mdxComponents} />
    </PageShell>
  )
}
