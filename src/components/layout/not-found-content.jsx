import { Link } from 'react-router'

import { localizedPath } from '../../../site.config.js'
import { useLocale } from '@/components/providers/locale-provider'
import { Button } from '@/components/ui/button'

export function NotFoundContent() {
  const { locale, messages } = useLocale()

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center px-6 py-20">
      <p className="text-sm font-medium text-muted-foreground">
        {messages.notFound.eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        {messages.notFound.title}
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
        {messages.notFound.description}
      </p>
      <Button
        className="mt-8"
        render={<Link to={localizedPath(locale, 'home')} />}
      >
        {messages.notFound.backHome}
      </Button>
    </section>
  )
}
