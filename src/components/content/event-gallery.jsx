import { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatMessage } from '@/lib/i18n'

export function EventGallery({
  event,
  images,
  locale,
  messages,
  open,
  onOpenChange,
  startIndex,
}) {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(startIndex + 1)
  const translation = event.translations[locale]
  const hasMultipleImages = images.length > 1

  useEffect(() => {
    if (!api) {
      return undefined
    }

    function updateCurrent() {
      setCurrent(api.selectedScrollSnap() + 1)
    }

    updateCurrent()
    api.on('select', updateCurrent)
    api.on('reInit', updateCurrent)

    return () => {
      api.off('select', updateCurrent)
      api.off('reInit', updateCurrent)
    }
  }, [api])

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent
        className="h-[calc(100svh-1rem)] w-[calc(100vw-1rem)] max-w-none grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden p-4 sm:h-[90svh] sm:w-[70vw] sm:max-w-[70vw] sm:p-6"
        closeLabel={messages.dialog.close}
      >
        <DialogHeader className="pr-10">
          <DialogTitle className="text-xl leading-tight sm:text-2xl">
            {translation.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {formatMessage(messages.gallery.description, {
              title: translation.title,
            })}
          </DialogDescription>
        </DialogHeader>

        <Carousel
          aria-label={formatMessage(messages.gallery.description, {
            title: translation.title,
          })}
          className="h-full min-h-0"
          key={startIndex}
          opts={{ loop: hasMultipleImages, startIndex }}
          setApi={setApi}
        >
          <CarouselContent className="h-full" viewportClassName="h-full">
            {images.map((image, index) => {
              const imageText = image.translations[locale]

              return (
                <CarouselItem
                  aria-label={formatMessage(messages.gallery.position, {
                    current: index + 1,
                    count: images.length,
                  })}
                  className="h-full"
                  key={image.src}
                >
                  <div className="flex h-full min-h-0 flex-col items-center">
                    <div className="flex min-h-0 w-full flex-1 items-center justify-center">
                      <img
                        alt={imageText.alt}
                        className="size-full rounded-xl bg-muted/30 object-contain"
                        height={image.height}
                        src={image.src}
                        width={image.width}
                      />
                    </div>
                    <div className="mt-3 w-full shrink-0 text-center">
                      <p className="text-sm font-medium">{imageText.alt}</p>
                      {imageText.caption ? (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {imageText.caption}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          {hasMultipleImages ? (
            <>
              <CarouselPrevious
                className="left-2 bg-background/90 shadow-md sm:left-4"
                label={messages.gallery.previous}
                size="icon-lg"
              />
              <CarouselNext
                className="right-2 bg-background/90 shadow-md sm:right-4"
                label={messages.gallery.next}
                size="icon-lg"
              />
            </>
          ) : null}
        </Carousel>

        <p
          aria-live="polite"
          className="text-center text-xs text-muted-foreground"
        >
          {formatMessage(messages.gallery.position, {
            current,
            count: images.length,
          })}
        </p>
      </DialogContent>
    </Dialog>
  )
}
