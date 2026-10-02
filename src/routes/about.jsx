import { PageShell } from '@/components/layout/page-shell'
import { createPageMeta } from '@/lib/meta'

export const meta = ({ params }) => createPageMeta('about', params.locale)

export default function AboutPage() {
  return <PageShell pageId="about" />
}
