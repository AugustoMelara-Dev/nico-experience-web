"use client"

import Image from "next/image"
import Link from "next/link"
import { CheckIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { WhatsAppLink } from "@/components/whatsapp-link"
import { featuredProperties } from "@/content/properties"

export default function Pricing() {
  return (
    <section id="alojamientos" className="mx-auto w-full max-w-7xl px-3 py-16 sm:px-4 sm:py-24 md:px-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12 flex flex-col gap-3 text-center sm:mb-16"
      >
        <h2 className="text-xl font-semibold sm:text-2xl bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          Una experiencia para compartir
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground text-center">
          Descubre Casa Palac, explora sus espacios reales y consulta directamente con Nico Experience.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6 md:grid-cols-3 md:gap-8">
        {featuredProperties.map((property, index) => (
          <motion.div
            key={property.slug}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative md:col-start-2 md:scale-[1.03]"
          >
            <Card className="relative h-full rounded-2xl border-2 border-primary bg-primary/5 shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="whitespace-nowrap rounded-full border-2 border-primary bg-card px-3 py-1 text-xs font-medium sm:px-4 sm:text-sm">
                  Frente a la playa
                </span>
              </div>
              <CardContent className="p-4 pt-6 sm:p-6 sm:pt-8">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl border border-border">
                  <Image src={property.featuredImage} alt={`Piscina iluminada de ${property.name}`} fill quality={90} sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="mb-5 text-center sm:mb-6">
                  <h3 className="mb-2 text-lg font-semibold sm:text-xl">{property.name}</h3>
                  <p className="mb-3 text-sm text-muted-foreground sm:mb-4">{property.shortDescription}</p>
                  <div className="text-lg font-semibold">Consulta disponibilidad</div>
                </div>
                <Separator className="my-4 sm:my-6" />
                <ul className="space-y-2.5 sm:space-y-3">
                  {property.amenities.filter((item) => item.confirmed).slice(0, 5).map((item) => (
                    <li key={item.label} className="flex items-center text-xs sm:text-sm">
                      <CheckIcon className="mr-2 h-4 w-4 shrink-0 text-primary sm:mr-3" />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex-col gap-2 p-4 pt-0 sm:p-6 sm:pt-0">
                <Button asChild className="w-full" size="lg">
                  <Link href={`/alojamientos/${property.slug}`}>Ver alojamiento</Link>
                </Button>
                <WhatsAppLink message={property.whatsappMessage} label="Consultar" variant="outline" />
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
