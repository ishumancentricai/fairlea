import { PageShell } from '@/components/layout/page-shell'
import { ResearchList } from '@/components/content/research-list'
import { createPageMeta } from '@/lib/meta'

export const meta = ({ params }) => createPageMeta('research', params.locale)

export default function ResearchPage() {
  return (
    <PageShell pageId="research">
      <ResearchList />
    </PageShell>
  )
}
