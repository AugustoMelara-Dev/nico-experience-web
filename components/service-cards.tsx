"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowUpRight,
  BedDouble,
  BriefcaseBusiness,
  FileText,
  MonitorSmartphone,
  Plane,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { services, type Service } from "@/content/services"

const icons: Record<Service["icon"], typeof Plane> = {
  plane: Plane,
  bed: BedDouble,
  "file-text": FileText,
  briefcase: BriefcaseBusiness,
  "monitor-smartphone": MonitorSmartphone,
}

export default function ServiceCards() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="servicios"
      className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center gap-4 md:mb-16">
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-medium text-primary">
            Todo en un solo lugar
          </span>
          <h2 className="max-w-xl text-3xl font-medium tracking-tighter sm:text-4xl">
            Soluciones pensadas alrededor de ti
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          Desde organizar un viaje hasta resolver una gestión o impulsar una
          necesidad digital, te acompañamos con atención cercana y una ruta
          clara.
        </p>
      </div>

      <div className="divide-y divide-border border-y">
        {services.map((service, index) => {
          const Icon = icons[service.icon]

          return (
            <motion.article
              key={service.slug}
              initial={{ y: shouldReduceMotion ? 0 : 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="grid gap-5 py-7 md:grid-cols-[auto_.55fr_1fr_auto] md:items-center md:gap-8 md:py-9"
            >
              <div className="flex size-11 items-center justify-center rounded-full border bg-card">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                {service.description}
              </p>
              <Button asChild variant="ghost" className="w-fit">
                <Link href={`/contacto?servicio=${service.slug}`}>
                  Consultar
                  <ArrowUpRight data-icon="inline-end" />
                </Link>
              </Button>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
