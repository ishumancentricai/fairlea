import { PageShell } from '@/components/layout/page-shell'
import { createPageMeta } from '@/lib/meta'

export const meta = () => createPageMeta('imprint')

export default function ImprintPage() {
  return <PageShell pageId="imprint" />
}
