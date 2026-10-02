import { Link } from 'react-router'

import { Button } from '@/components/ui/button'

export function NotFoundContent() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center px-6 py-20">
      <p className="text-sm font-medium text-muted-foreground">Error 404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
        The requested page does not exist or has been moved.
      </p>
      <Button className="mt-8" render={<Link to="/" />}>
        Back to home
      </Button>
    </section>
  )
}
