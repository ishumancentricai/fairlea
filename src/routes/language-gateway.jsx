import { Link } from 'react-router'

import { localizedPath, siteConfig } from '../../site.config.js'
import { Button } from '@/components/ui/button'

export const meta = () => [
  { title: `Choose language | ${siteConfig.shortTitle}` },
  { name: 'robots', content: 'noindex, follow' },
]

export default function LanguageGateway() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center px-6 py-20">
      <p className="text-sm font-medium text-muted-foreground">
        FAIRLEA @ University of Bayreuth
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Choose your language / Sprache wählen
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
        You will be redirected automatically. / Sie werden automatisch
        weitergeleitet.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button render={<Link to={localizedPath('en', 'home')} />}>
          English
        </Button>
        <Button
          render={<Link to={localizedPath('de', 'home')} />}
          variant="outline"
        >
          Deutsch
        </Button>
      </div>
    </section>
  )
}
