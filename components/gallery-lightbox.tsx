"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Expand } from "lucide-react"
import type { PropertyMedia } from "@/content/properties"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function GalleryLightbox({ images, title }: { images: PropertyMedia[]; title: string }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(0)
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (open) api?.scrollTo(selected, true)
  }, [api, open, selected])

  function openImage(index: number) {
    setSelected(index)
    setOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => openImage(index)}
            className="group relative touch-manipulation overflow-hidden rounded-xl border border-border bg-card text-left transition-[border-color,box-shadow] hover:border-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Ampliar: ${image.title}`}
          >
            <AspectRatio ratio={4 / 3} className="bg-muted">
              <Image src={image.src} alt={image.alt ?? image.title} fill quality={95} sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
            </AspectRatio>
            <span className="absolute right-2 top-2 rounded-full border border-border bg-background/80 p-2 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><Expand className="size-4" aria-hidden="true" /></span>
            <span className="block p-3 text-sm font-medium">{image.title}</span>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[calc(100svh-2rem)] overscroll-contain overflow-y-auto sm:max-w-6xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>Usa las flechas del teclado o los controles para recorrer el álbum.</DialogDescription>
          </DialogHeader>
          <Carousel className="min-w-0" setApi={setApi} opts={{ loop: true, startIndex: selected }} aria-label={`Álbum ${title}`}>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.src}>
                  <figure>
                    <div className="relative mx-auto aspect-[4/3] max-h-[68svh] overflow-hidden rounded-xl border border-border bg-card">
                      <Image src={image.src} alt={image.alt ?? image.title} fill unoptimized sizes="(min-width: 1024px) 80vw, 95vw" className="object-contain" />
                    </div>
                    <figcaption className="mt-4 space-y-1 text-center">
                      <div className="font-medium">{image.title}</div>
                      {image.description && <p className="text-sm text-muted-foreground">{image.description}</p>}
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  )
}
