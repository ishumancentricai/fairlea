import { PageShell } from '@/components/layout/page-shell'
import { createPageMeta } from '@/lib/meta'

export const meta = ({ params }) => createPageMeta('imprint', params.locale)

export default function ImprintPage() {
  return <PageShell pageId="imprint" />
}
