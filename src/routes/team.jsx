import { PageShell } from '@/components/layout/page-shell'
import { createPageMeta } from '@/lib/meta'

export const meta = () => createPageMeta('team')

export default function TeamPage() {
  return <PageShell pageId="team" />
}
