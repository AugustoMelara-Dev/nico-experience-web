"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { brandConfig } from "@/config/brand"
import { businessConfig } from "@/config/business"
import { siteConfig } from "@/config/site"
import { getProperty } from "@/content/properties"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

export default function Footer() {
  const shouldReduceMotion = useReducedMotion()
  const year = new Date().getFullYear()
  const property = getProperty("casa-palac")!
  const whatsappUrl = buildWhatsAppUrl(
    "Hola, vi la página de Nico Experience y me gustaría recibir información sobre sus servicios.",
  )
  const footerLinks = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/#servicios" },
    { name: "Alojamientos", href: "/alojamientos" },
    { name: "Casa Palac", href: `/alojamientos/${property.slug}` },
    { name: "Preguntas", href: "/#preguntas" },
  ]

  return (
    <footer className="w-full border-t bg-card/35">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-10 sm:gap-12"
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center gap-5">
            <Link
              href="/"
              className="inline-flex transition-opacity hover:opacity-80"
              aria-label="Nico Experience, inicio"
            >
              <BrandLogo />
            </Link>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Turismo y soluciones integrales con atención personalizada para
              viajes, hospedaje, trámites, gestiones y soluciones digitales.
            </p>
            <p className="text-sm font-medium text-primary">
              {brandConfig.tagline}
            </p>
          </div>

          <Separator />

          <div className="mx-auto grid w-full max-w-3xl gap-10 text-center md:grid-cols-2 md:text-left">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <h2 className="text-sm font-semibold">Explorar</h2>
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-start">
                {footerLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 md:items-start">
              <h2 className="text-sm font-semibold">Contacto y ubicación</h2>
              <Link
                href={businessConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground md:justify-start"
              >
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>{businessConfig.locationLabel}</span>
                <ExternalLink className="mt-0.5 size-3.5" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="size-4" aria-hidden="true" />
                <span>{siteConfig.phone}</span>
              </a>
              <Button asChild variant="outline" className="w-fit">
                <Link
                  href={whatsappUrl ?? "/contacto"}
                  target={whatsappUrl ? "_blank" : undefined}
                  rel={whatsappUrl ? "noopener noreferrer" : undefined}
                >
                  <MessageCircle data-icon="inline-start" />
                  WhatsApp
                </Link>
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <span>© {year} Nico Experience. Todos los derechos reservados.</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
