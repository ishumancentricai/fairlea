import { PageShell } from '@/components/layout/page-shell'
import { createPageMeta } from '@/lib/meta'

export const meta = ({ params }) => createPageMeta('news', params.locale)

export default function NewsPage() {
  return <PageShell pageId="news" />
}
