import { PageShell } from '@/components/layout/page-shell'
import { createPageMeta } from '@/lib/meta'

export const meta = () => createPageMeta('research')

export default function ResearchPage() {
  return <PageShell pageId="research" />
}
