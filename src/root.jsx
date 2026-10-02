import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
} from 'react-router'

import { defaultLocale, siteConfig } from '../site.config.js'
import { NotFoundContent } from '@/components/layout/not-found-content'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { LocaleProvider } from '@/components/providers/locale-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { getDocumentLocale, getMessages } from '@/lib/i18n'
import './index.css'

const documentBootstrap = String.raw`(()=>{const e=document.documentElement;const p=location.pathname.split('/').filter(Boolean)[0];const locales=['en','de'];const routeLocale=locales.includes(p)?p:'en';e.lang=routeLocale;let theme='system';try{const stored=localStorage.getItem('fairlea:theme');if(['system','light','dark'].includes(stored))theme=stored}catch{}const dark=theme==='dark'||theme==='system'&&matchMedia('(prefers-color-scheme: dark)').matches;e.dataset.themePreference=theme;e.classList.toggle('dark',dark);e.style.colorScheme=dark?'dark':'light';if(location.pathname==='/'){let locale;try{const stored=localStorage.getItem('fairlea:locale');if(locales.includes(stored))locale=stored}catch{}if(!locale){locale=(navigator.languages||[navigator.language]).map(value=>String(value).toLowerCase().split('-')[0]).find(value=>locales.includes(value))||'en'}location.replace('/'+locale+'/')}})()`

export const meta = () => [{ title: siteConfig.title }]

export function Layout({ children }) {
  const location = useLocation()
  const locale = getDocumentLocale(location.pathname)
  const messages = getMessages(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <script dangerouslySetInnerHTML={{ __html: documentBootstrap }} />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <Meta />
        <Links />
      </head>
      <body>
        <LocaleProvider locale={locale}>
          <ThemeProvider>
            <a
              className="sr-only z-50 rounded-md bg-background px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:ring-2 focus:ring-ring"
              href="#main-content"
            >
              {messages.skipToContent}
            </a>
            <div className="flex min-h-svh flex-col bg-background text-foreground">
              <SiteHeader />
              <main className="flex flex-1" id="main-content">
                {children}
              </main>
              <SiteFooter />
            </div>
          </ThemeProvider>
        </LocaleProvider>
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
  const location = useLocation()
  const locale = getDocumentLocale(location.pathname)
  const messages = getMessages(locale)

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundContent />
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20">
      <p className="text-sm font-medium text-destructive">
        {messages.error.eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        {messages.error.title}
      </h1>
      <p className="mt-4 text-muted-foreground">{messages.error.description}</p>
      {import.meta.env.DEV && error instanceof Error ? (
        <pre className="mt-8 overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          {error.stack}
        </pre>
      ) : null}
    </section>
  )
}

export const handle = { defaultLocale }
