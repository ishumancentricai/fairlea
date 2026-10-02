import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from 'react-router'

import { NotFoundContent } from '@/components/layout/not-found-content'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { siteConfig } from '../site.config.js'
import './index.css'

export const meta = () => [
  { title: siteConfig.title },
  { name: 'description', content: siteConfig.description },
]

export function Layout({ children }) {
  return (
    <html lang={siteConfig.locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <Meta />
        <Links />
      </head>
      <body>
        <a
          className="sr-only z-50 rounded-md bg-background px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:ring-2 focus:ring-ring"
          href="#main-content"
        >
          Skip to content
        </a>
        <div className="flex min-h-svh flex-col bg-background text-foreground">
          <SiteHeader />
          <main className="flex flex-1" id="main-content">
            {children}
          </main>
          <SiteFooter />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundContent />
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20">
      <p className="text-sm font-medium text-destructive">Unexpected error</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        This page could not be displayed
      </h1>
      <p className="mt-4 text-muted-foreground">
        Please try again later or return to the home page.
      </p>
      {import.meta.env.DEV && error instanceof Error ? (
        <pre className="mt-8 overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          {error.stack}
        </pre>
      ) : null}
    </section>
  )
}
