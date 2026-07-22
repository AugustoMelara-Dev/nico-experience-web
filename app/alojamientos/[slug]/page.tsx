import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Armchair,
  BedDouble,
  CookingPot,
  ExternalLink,
  House,
  MapPin,
  Waves,
} from "lucide-react"

import Faq from "@/components/faq"
import Footer from "@/components/footer"
import { GalleryLightbox } from "@/components/gallery-lightbox"
import { PropertyHero } from "@/components/property-hero"
import { PropertyVideos } from "@/components/property-videos"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/config/site"
import { activeProperties, getProperty } from "@/content/properties"

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return activeProperties.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const property = getProperty(slug)
  if (!property) return {}
  const path = `/alojamientos/${property.slug}`
  return {
    title: property.name,
    description: property.shortDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: `${property.name} | Nico Experience`,
      description: property.shortDescription,
      url: path,
      images: [
        {
          url: property.featuredImage,
          alt: `Vista principal de ${property.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.name} | Nico Experience`,
      description: property.shortDescription,
      images: [property.featuredImage],
    },
  }
}

const amenityIcons = {
  waves: Waves,
  house: House,
  "cooking-pot": CookingPot,
  bed: BedDouble,
  hammock: Armchair,
  "map-pin": MapPin,
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const property = getProperty(slug)
  if (!property) notFound()
  const images = property.media.filter((item) => item.type === "image")
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    description: property.shortDescription,
    image: images.map((item) =>
      new URL(item.src, siteConfig.siteUrl).toString(),
    ),
    url: new URL(
      `/alojamientos/${property.slug}`,
      siteConfig.siteUrl,
    ).toString(),
    address: { "@type": "PostalAddress", addressCountry: "HN" },
  }

  return (
    <main id="contenido">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PropertyHero property={property} />

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[.72fr_1.28fr]">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-primary">
            La experiencia
          </span>
          <h2 className="text-3xl font-medium tracking-tighter">
            Conoce la propiedad
          </h2>
          <p className="leading-8 text-muted-foreground">
            {property.description}
          </p>
        </div>
        <div className="divide-y divide-border border-y">
          {property.amenities
            .filter((item) => item.confirmed)
            .map((item) => {
              const Icon = amenityIcons[item.icon]
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 py-4"
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-medium">{item.label}</span>
                </div>
              )
            })}
        </div>
      </section>

      <section
        aria-labelledby="album-title"
        className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28"
      >
        <div className="mb-10 flex max-w-3xl flex-col gap-3">
          <span className="text-sm font-medium text-primary">
            Recorrido visual
          </span>
          <h2
            id="album-title"
            className="text-3xl font-medium tracking-tighter"
          >
            {property.name}
          </h2>
          <p className="leading-7 text-muted-foreground">
            Álbum de la casa ubicada frente a la playa · {images.length}{" "}
            fotografías.
          </p>
        </div>
        <GalleryLightbox images={images} title={property.name} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-10 border-y py-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border">
          <div className="flex flex-col gap-4 md:pr-10">
            <h2 className="text-2xl font-semibold tracking-tight">
              Distribución de espacios
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              Las fotografías muestran sala, comedor, cocina, habitaciones,
              baño con tina de hidromasaje visible, terrazas, piscina y áreas
              exteriores. La cantidad exacta de habitaciones, baños y
              capacidad se confirma directamente al consultar.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:pl-10">
            <h2 className="text-2xl font-semibold tracking-tight">
              Cocina y equipamiento
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              La información proporcionada documenta el siguiente
              equipamiento visible:
            </p>
            <ul className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
              {property.kitchenInventory?.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PropertyVideos videos={property.videos} />

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <Separator className="mb-10" />
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="flex max-w-xl flex-col gap-3">
            <span className="text-sm font-medium text-primary">
              Ubicación de la propiedad
            </span>
            <h2 className="text-3xl font-medium tracking-tighter">
              Consulta la ruta oficial de {property.name}
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              Este enlace corresponde exclusivamente a la propiedad y es
              distinto de la ubicación de atención de Nico Experience.
            </p>
          </div>
          <Button asChild>
            <Link
              href={property.mapUrl!}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver ubicación en Google Maps
              <ExternalLink data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </section>

      <Faq />
      <Footer />
    </main>
  )
}
