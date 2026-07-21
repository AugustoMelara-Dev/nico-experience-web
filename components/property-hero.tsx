"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/content/properties"
import { PdfDownloadLink } from "@/components/pdf-download-link"
import { ShareButton } from "@/components/share-button"
import { WhatsAppLink } from "@/components/whatsapp-link"
import { Card, CardContent } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function PropertyHero({ property }: { property: Property }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 pt-10 md:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link
                href="/"
                className="transition-colors hover:text-foreground"
              >
                Inicio
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link
                href="/alojamientos"
                className="transition-colors hover:text-foreground"
              >
                Alojamientos
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{property.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mx-auto grid max-w-(--breakpoint-xl) items-center gap-10 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="flex flex-col items-center space-y-5 text-center lg:items-start lg:text-left"
        >
          {property.locationLabel ? (
            <span className="w-fit rounded-full border border-border bg-card px-2 py-1 text-sm">
              {property.locationLabel}
            </span>
          ) : null}
          <h1 className="max-w-3xl bg-linear-to-b from-primary to-foreground bg-clip-text text-4xl font-medium tracking-tighter text-pretty text-transparent md:text-6xl">
            {property.name}
          </h1>
          <p className="max-w-2xl text-balance text-lg text-muted-foreground">
            {property.shortDescription}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
            <WhatsAppLink
              message={property.whatsappMessage}
              label="Consultar disponibilidad"
            />
            <ShareButton title={property.name} />
            <PdfDownloadLink
              href={`/api/alojamientos/${property.slug}/pdf`}
              label="Descargar ficha"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <Card className="overflow-hidden rounded-2xl">
            <CardContent className="p-3 sm:p-4">
              <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-border">
                <Image
                  src={property.featuredImage}
                  alt={`Vista principal de ${property.name}`}
                  fill
                  priority
                  quality={90}
                  sizes="(min-width: 1024px) 52vw, 92vw"
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, type: "spring", bounce: 0 }}
        className="pointer-events-none absolute -top-32 -z-10 flex h-full w-full items-center justify-end"
      >
        <div className="flex w-3/4 items-center justify-center">
          <div className="h-150 w-12 rounded-3xl bg-light blur-[70px] will-change-transform max-sm:rotate-15 sm:rotate-35" />
        </div>
      </motion.div>
    </section>
  )
}
