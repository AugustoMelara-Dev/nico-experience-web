"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { getProperty } from "@/content/properties"
import { siteConfig } from "@/config/site"

export default function Footer() {
  const year = new Date().getFullYear()
  const property = getProperty("casa-palac")!
  const whatsappUrl = buildWhatsAppUrl("Hola, vi la página de Nico Experience y me gustaría recibir información sobre sus servicios.")
  const footerLinks = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/#servicios" },
    { name: "Alojamientos", href: "/alojamientos" },
    { name: "Casa Palac", href: `/alojamientos/${property.slug}` },
    { name: "Preguntas", href: "/#preguntas" },
  ]

  return (
    <footer className="w-full border-t bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
            <div className="space-y-3">
              <Link href="/" className="inline-block text-xl font-medium tracking-tight transition-opacity hover:opacity-80">Nico Experience</Link>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Turismo y soluciones integrales con atención personalizada para viajes, hospedaje, trámites, gestiones y soluciones digitales.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Enlaces</h3>
              <div className="flex flex-col gap-2">
                {footerLinks.map((item) => <Link key={item.name} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item.name}</Link>)}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Contacto</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><MapPin className="size-4" aria-hidden="true" /><span>Tocoa, Colón</span></div>
                <div className="flex items-center gap-2"><Phone className="size-4" aria-hidden="true" /><span>{siteConfig.phone}</span></div>
                <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Link href={whatsappUrl ?? "/contacto"} target={whatsappUrl ? "_blank" : undefined} rel={whatsappUrl ? "noopener noreferrer" : undefined} aria-label="Consultar por WhatsApp"><MessageCircle className="h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col items-center justify-between gap-2 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
            <span>© {year} Nico Experience. Todos los derechos reservados.</span>
            <span className="font-medium">Tocoa, Colón · Honduras</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
