"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"

import { PdfDownloadLink } from "@/components/pdf-download-link"
import { ShareButton } from "@/components/share-button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { WhatsAppLink } from "@/components/whatsapp-link"
import type { Property } from "@/content/properties"

export function PropertyHero({ property }: { property: Property }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative isolate flex min-h-[42rem] flex-col overflow-hidden [--primary:var(--brand-gold)] [--primary-foreground:var(--brand-navy)]">
      <Image
        src={property.featuredImage}
        alt={`Vista principal de ${property.name}`}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-linear-to-r from-[color:var(--brand-navy)]/95 via-[color:var(--brand-navy)]/72 to-foreground/20" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-foreground/20" />

      <div className="relative mx-auto w-full max-w-(--breakpoint-xl) px-4 pt-8 md:px-8">
        <Breadcrumb>
          <BreadcrumbList className="text-white/70">
            <BreadcrumbItem>
              <Link href="/" className="transition-colors hover:text-white">
                Inicio
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link
                href="/alojamientos"
                className="transition-colors hover:text-white"
              >
                Alojamientos
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">
                {property.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="relative mx-auto flex w-full max-w-(--breakpoint-xl) flex-1 items-center px-4 py-16 md:px-8 md:py-20">
        <motion.div
          initial={{ y: shouldReduceMotion ? 0 : 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, type: "spring", bounce: 0 }}
          className="flex max-w-2xl flex-col items-start gap-6 text-left text-white"
        >
          {property.locationLabel ? (
            <span className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-md">
              {property.locationLabel}
            </span>
          ) : null}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-medium tracking-tighter text-pretty sm:text-5xl md:text-6xl">
              {property.name}
            </h1>
            <p className="max-w-xl text-balance text-lg leading-8 text-white/80">
              {property.shortDescription}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
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
      </div>
    </section>
  )
}
