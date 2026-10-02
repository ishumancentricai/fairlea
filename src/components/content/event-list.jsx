import { useState } from 'react'
import { CalendarDays, MapPin, Maximize2 } from 'lucide-react'

import { EventGallery } from '@/components/content/event-gallery'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { useLocale } from '@/components/providers/locale-provider'
import { events } from '@/content/data/collections'
import { formatEventDate } from '@/lib/date'
import { formatMessage } from '@/lib/i18n'

function EventImageTrigger({
  event,
  image,
  imageIndex,
  imageCount,
  locale,
  messages,
  onOpen,
}) {
  const imageText = image.translations[locale]
  const title = event.translations[locale].title

  return (
    <figure>
      <button
        aria-label={formatMessage(messages.gallery.openImage, {
          index: imageIndex + 1,
          count: imageCount,
          title,
        })}
        className="group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-xl bg-muted/30 text-left ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => onOpen(imageIndex)}
        type="button"
      >
        <img
          alt={imageText.alt}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none"
          height={image.height}
          loading="lazy"
          src={image.src}
          width={image.width}
        />
        <span className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-80 shadow-md backdrop-blur transition-[opacity,transform] group-hover:scale-105 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
          <Maximize2 aria-hidden="true" className="size-4" />
        </span>
      </button>
      {imageText.caption ? (
        <figcaption className="mt-2 text-sm text-muted-foreground">
          {imageText.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function EventPoster({ image, locale }) {
  const imageText = image.translations[locale]

  return (
    <figure>
      <img
        alt={imageText.alt}
        className="w-full rounded-xl bg-muted/30 object-contain"
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

function EventArticle({ event, locale, messages }) {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  const translation = event.translations[locale]
  const Body = event.body?.[locale]
  const posters = event.images.filter((image) => image.kind === 'poster')
  const photos = event.images.filter((image) => image.kind === 'photo')

  function openGallery(imageIndex) {
    setStartIndex(imageIndex)
    setGalleryOpen(true)
  }

  function renderPhoto(image) {
    return (
      <EventImageTrigger
        event={event}
        image={image}
        imageCount={photos.length}
        imageIndex={photos.indexOf(image)}
        key={image.src}
        locale={locale}
        messages={messages}
        onOpen={openGallery}
      />
    )
  }

  return (
    <article
      className="scroll-mt-36 space-y-5 py-12 first:pt-0 last:pb-0"
      id={event.id}
    >
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
      {posters.map((image) => (
        <EventPoster image={image} key={image.src} locale={locale} />
      ))}
      {Body ? (
        <Body components={mdxComponents} />
      ) : translation.summary ? (
        <p className="leading-7 text-muted-foreground">{translation.summary}</p>
      ) : null}
      {photos.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {photos.map((image) => renderPhoto(image))}
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

      {photos.length > 0 ? (
        <EventGallery
          event={event}
          images={photos}
          key={startIndex}
          locale={locale}
          messages={messages}
          onOpenChange={setGalleryOpen}
          open={galleryOpen}
          startIndex={startIndex}
        />
      ) : null}
    </article>
  )
}

export function EventList() {
  const { locale, messages } = useLocale()

  if (events.length === 0) {
    return null
  }

  return (
    <div className="divide-y divide-border">
      {events.map((event) => (
        <EventArticle
          event={event}
          key={event.id}
          locale={locale}
          messages={messages}
        />
      ))}
    </div>
  )
}
