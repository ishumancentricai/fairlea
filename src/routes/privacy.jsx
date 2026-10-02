import { PageShell } from '@/components/layout/page-shell'
import { createPageMeta } from '@/lib/meta'

export const meta = () => createPageMeta('privacy')

export default function PrivacyPage() {
  return <PageShell pageId="privacy" />
}
