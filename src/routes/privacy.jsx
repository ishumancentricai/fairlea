import { PageShell } from '@/components/layout/page-shell'
import { createPageMeta } from '@/lib/meta'

export const meta = ({ params }) => createPageMeta('privacy', params.locale)

export default function PrivacyPage() {
  return <PageShell pageId="privacy" />
}
