import { PageShell } from '@/components/layout/page-shell'
import { mdxComponents } from '@/components/mdx/mdx-components'
import FoundationContent from '@/content/pages/foundation.mdx'
import { createPageMeta } from '@/lib/meta'

export const meta = () => createPageMeta('home')

export default function HomePage() {
  return (
    <PageShell pageId="home">
      <FoundationContent components={mdxComponents} />
    </PageShell>
  )
}
