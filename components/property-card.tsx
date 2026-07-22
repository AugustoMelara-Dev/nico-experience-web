import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { WhatsAppLink } from "@/components/whatsapp-link"
import type { Property } from "@/content/properties"

type PropertyCardProps = {
  property: Property
  priority?: boolean
}

export function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const featuredMedia = property.media.find(
    (item) => item.src === property.featuredImage,
  )
  const amenities = property.amenities
    .filter((item) => item.confirmed)
    .slice(0, 4)

  return (
    <Card className="group h-full gap-0 overflow-hidden py-0 shadow-none transition-colors hover:border-foreground/25">
      <Link
        href={`/alojamientos/${property.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
        aria-label={`Ver ${property.name}`}
      >
        <Image
          src={property.featuredImage}
          alt={featuredMedia?.alt ?? property.name}
          fill
          priority={priority}
          quality={88}
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
        />
      </Link>

      <CardHeader className="gap-4 pt-6">
        {property.locationLabel ? (
          <Badge variant="outline">
            <MapPin data-icon="inline-start" />
            {property.locationLabel}
          </Badge>
        ) : null}
        <div className="flex flex-col gap-2">
          <CardTitle className="text-2xl tracking-tight">
            {property.name}
          </CardTitle>
          <CardDescription className="text-sm leading-6">
            {property.shortDescription}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="mt-auto pb-6">
        <div className="flex flex-wrap gap-2" aria-label="Características confirmadas">
          {amenities.map((amenity) => (
            <Badge key={amenity.label} variant="secondary">
              {amenity.label}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-2 border-t py-5 sm:flex-row">
        <Button asChild className="flex-1">
          <Link href={`/alojamientos/${property.slug}`}>
            Ver alojamiento
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
        <WhatsAppLink
          message={property.whatsappMessage}
          label="Consultar"
          variant="outline"
          className="flex-1"
        />
      </CardFooter>
    </Card>
  )
}
