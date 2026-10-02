import { PageShell } from '@/components/layout/page-shell'
import { createPageMeta } from '@/lib/meta'

export const meta = () => createPageMeta('about')

export default function AboutPage() {
  return <PageShell pageId="about" />
}
