import { CalendarDays, MapPin } from 'lucide-react'

import { mdxComponents } from '@/components/mdx/mdx-components'
import { useLocale } from '@/components/providers/locale-provider'
import { events } from '@/content/data/collections'
import { formatEventDate } from '@/lib/date'

export function EventList() {
  const { locale, messages } = useLocale()

  if (events.length === 0) {
    return null
  }

  return (
    <div className="divide-y divide-border">
      {events.map((event) => {
        const translation = event.translations[locale]
        const Body = event.body?.[locale]
        const posters = event.images.filter((image) => image.kind === 'poster')
        const photos = event.images.filter((image) => image.kind === 'photo')

        const renderImage = (image, prominent = false) => {
          const imageText = image.translations[locale]

          return (
            <figure key={image.src}>
              <img
                alt={imageText.alt}
                className={
                  prominent
                    ? 'w-full rounded-xl object-contain'
                    : 'w-full rounded-xl object-cover'
                }
                height={image.height}
                loading="lazy"
                src={image.src}
                width={image.width}
              />
              {imageText.caption ? (
                <figcaption className="mt-2 text-sm text-muted-foreground">
                  {imageText.caption}
                </figcaption>
              ) : null}
            </figure>
          )
        }

        return (
          <article
            className="space-y-5 py-12 first:pt-0 last:pb-0"
            key={event.id}
          >
            {posters.map((image) => renderImage(image, true))}
            <header>
              <h2 className="text-2xl font-semibold tracking-tight">
                {translation.title}
              </h2>
              <dl className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays aria-hidden="true" />
                  <dt className="sr-only">{messages.event.date}</dt>
                  <dd>
                    <time dateTime={event.startDate}>
                      {formatEventDate(
                        event.startDate,
                        event.endDate,
                        locale,
                        event.timeZone,
                      )}
                    </time>
                  </dd>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin aria-hidden="true" />
                  <dt className="sr-only">{messages.event.location}</dt>
                  <dd>{translation.location}</dd>
                </div>
              </dl>
            </header>
            {Body ? (
              <Body components={mdxComponents} />
            ) : translation.summary ? (
              <p className="leading-7 text-muted-foreground">
                {translation.summary}
              </p>
            ) : null}
            {photos.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {photos.map((image) => renderImage(image))}
              </div>
            ) : null}
            {event.links.length > 0 ? (
              <ul className="flex flex-wrap gap-4 text-sm font-medium">
                {event.links.map((link) => (
                  <li key={link.href}>
                    <a
                      className="underline underline-offset-4"
                      href={link.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {link.translations[locale].label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        )
      })}
    </div>
  )
}
