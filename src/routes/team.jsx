import { PageShell } from '@/components/layout/page-shell'
import { TeamList } from '@/components/content/team-list'
import { createPageMeta } from '@/lib/meta'

export const meta = ({ params }) => createPageMeta('team', params.locale)

export default function TeamPage() {
  return (
    <PageShell pageId="team">
      <TeamList />
    </PageShell>
  )
}
