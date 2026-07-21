import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BedDouble, CookingPot, House, MapPin, Waves, Armchair, ExternalLink } from "lucide-react"
import { activeProperties, getProperty } from "@/content/properties"
import { siteConfig } from "@/config/site"
import { GalleryLightbox } from "@/components/gallery-lightbox"
import { PropertyHero } from "@/components/property-hero"
import { PropertyVideos } from "@/components/property-videos"
import Faq from "@/components/faq"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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
    openGraph: { type: "website", title: `${property.name} | Nico Experience`, description: property.shortDescription, url: path, images: [{ url: property.featuredImage, alt: `Vista principal de ${property.name}` }] },
    twitter: { card: "summary_large_image", title: `${property.name} | Nico Experience`, description: property.shortDescription, images: [property.featuredImage] },
  }
}

const amenityIcons = { waves: Waves, house: House, "cooking-pot": CookingPot, bed: BedDouble, hammock: Armchair, "map-pin": MapPin }

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
    image: images.map((item) => new URL(item.src, siteConfig.siteUrl).toString()),
    url: new URL(`/alojamientos/${property.slug}`, siteConfig.siteUrl).toString(),
    address: { "@type": "PostalAddress", addressCountry: "HN" },
  }

  return (
    <main id="contenido">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PropertyHero property={property} />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-[.65fr_1.35fr]">
        <div>
          <h2 className="text-xl font-semibold sm:text-2xl bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">Conoce la propiedad</h2>
          <p className="mt-5 leading-8 text-muted-foreground">{property.description}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {property.amenities.filter((item) => item.confirmed).map((item) => {
            const Icon = amenityIcons[item.icon]
            return <Card key={item.label} className="rounded-2xl"><CardContent className="flex items-center gap-3 px-5"><Icon className="size-5" /><span className="text-sm font-medium">{item.label}</span></CardContent></Card>
          })}
        </div>
      </section>

      <section aria-labelledby="album-title" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mb-10 text-center">
          <h2 id="album-title" className="text-xl font-semibold sm:text-2xl bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">{property.name}</h2>
          <p className="mt-3 text-muted-foreground">Álbum de la casa ubicada frente a la playa · {images.length} fotografías.</p>
        </div>
        <GalleryLightbox images={images} title={property.name} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl">
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">Distribución de espacios</h2>
              <p className="text-sm leading-7 text-muted-foreground">Las fotografías muestran sala, comedor, cocina, habitaciones, baño con tina de hidromasaje visible, terrazas, piscina y áreas exteriores. La cantidad exacta de habitaciones, baños y capacidad se confirma directamente al consultar.</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">Cocina y equipamiento</h2>
              <p className="text-sm leading-7 text-muted-foreground">La información proporcionada documenta el siguiente equipamiento visible:</p>
              <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                {property.kitchenInventory?.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <PropertyVideos videos={property.videos} />

      <section className="mx-auto max-w-6xl px-4 py-20">
        <Card className="rounded-2xl">
          <CardContent className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold">Ubicación</h2>
              <p className="mt-2 text-sm text-muted-foreground">Consulta la ubicación oficial proporcionada para {property.name}.</p>
            </div>
            <Button asChild><Link href={property.mapUrl!} target="_blank" rel="noopener noreferrer">Ver ubicación en Google Maps <ExternalLink /></Link></Button>
          </CardContent>
        </Card>
      </section>

      <Faq />
      <Footer />
    </main>
  )
}
