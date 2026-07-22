"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, MapPin } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { WhatsAppLink } from "@/components/whatsapp-link"
import { featuredProperties, type Property } from "@/content/properties"

function FeaturedProperty({
  property,
  index,
}: {
  property: Property
  index: number
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={{ y: shouldReduceMotion ? 0 : 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="overflow-hidden rounded-2xl border bg-card lg:grid lg:grid-cols-[1.2fr_.8fr]"
    >
      <div className="relative min-h-80 overflow-hidden lg:min-h-[34rem]">
        <Image
          src={property.featuredImage}
          alt={`Piscina iluminada de ${property.name}`}
          fill
          quality={95}
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover transition-transform duration-700 hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-foreground/35 to-transparent lg:hidden" />
      </div>

      <div className="flex flex-col justify-center gap-7 p-6 sm:p-8 lg:p-10">
        <div className="flex w-fit items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm">
          <MapPin className="size-4" aria-hidden="true" />
          {property.locationLabel}
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-3xl font-medium tracking-tighter sm:text-4xl">
            {property.name}
          </h3>
          <p className="leading-7 text-muted-foreground">
            {property.shortDescription}
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {property.amenities
            .filter((item) => item.confirmed)
            .slice(0, 5)
            .map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {item.label}
              </li>
            ))}
        </ul>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Button asChild size="lg">
            <Link href={`/alojamientos/${property.slug}`}>
              Ver alojamiento
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <WhatsAppLink
            message={property.whatsappMessage}
            label="Consultar"
            variant="outline"
          />
        </div>
      </div>
    </motion.article>
  )
}

export default function Pricing() {
  return (
    <section
      id="alojamientos"
      className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center md:mb-16">
        <div className="flex max-w-2xl flex-col items-center gap-3">
          <span className="text-sm font-medium text-primary">
            Hospedaje seleccionado
          </span>
          <h2 className="text-3xl font-medium tracking-tighter sm:text-4xl">
            Lugares para vivir la experiencia
          </h2>
        </div>
        <p className="max-w-lg leading-7 text-muted-foreground">
          Fotografías reales, información prudente y atención directa para
          ayudarte a elegir con confianza.
        </p>
      </div>

      <div className="grid gap-8">
        {featuredProperties.map((property, index) => (
          <FeaturedProperty
            key={property.slug}
            property={property}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
