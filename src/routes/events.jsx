import { PageShell } from '@/components/layout/page-shell'
import { EventList } from '@/components/content/event-list'
import { createPageMeta } from '@/lib/meta'

export const meta = ({ params }) => createPageMeta('events', params.locale)

export default function EventsPage() {
  return (
    <PageShell pageId="events">
      <EventList />
    </PageShell>
  )
}
