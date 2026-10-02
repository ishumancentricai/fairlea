import { PageShell } from '@/components/layout/page-shell'
import { createPageMeta } from '@/lib/meta'

export const meta = () => createPageMeta('events')

export default function EventsPage() {
  return <PageShell pageId="events" />
}
