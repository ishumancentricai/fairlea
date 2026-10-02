import { PageShell } from '@/components/layout/page-shell'
import { createPageMeta } from '@/lib/meta'

export const meta = () => createPageMeta('news')

export default function NewsPage() {
  return <PageShell pageId="news" />
}
