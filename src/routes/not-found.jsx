import { NotFoundContent } from '@/components/layout/not-found-content'
import { createNotFoundMeta } from '@/lib/meta'

export const meta = createNotFoundMeta

export default function NotFoundPage() {
  return <NotFoundContent />
}
