"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  BedDouble,
  BriefcaseBusiness,
  FileText,
  MonitorSmartphone,
  Plane,
} from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { services, type Service } from "@/content/services"

const icons: Record<Service["icon"], typeof Plane> = {
  plane: Plane,
  bed: BedDouble,
  "file-text": FileText,
  briefcase: BriefcaseBusiness,
  "monitor-smartphone": MonitorSmartphone,
}

export default function Partners() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-9 px-4 py-16 text-center md:px-8 md:py-20">
      <motion.div
        initial={{ y: 20, opacity: 0, filter: "blur(3px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: "spring", bounce: 0 }}
        className="flex max-w-xl flex-col items-center gap-3"
      >
        <span className="text-sm font-medium text-primary">
          Todo empieza con una necesidad
        </span>
        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
          ¿Cómo podemos ayudarte?
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Elige una categoría para preparar una consulta más clara y llegar
          directo al equipo indicado.
        </p>
      </motion.div>
      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-5">
        <TooltipProvider>
          {services.map((service, index) => {
            const Icon = icons[service.icon]
            return (
              <Tooltip key={service.slug}>
                <TooltipTrigger asChild>
                  <Link
                    href={`/contacto?servicio=${service.slug}`}
                    className="group flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border bg-card/40 p-4 transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.07,
                      type: "spring",
                      bounce: 0,
                    }}
                    className="flex flex-col items-center gap-3"
                  >
                    <span className="flex size-10 items-center justify-center rounded-full border bg-card text-primary transition-transform group-hover:-translate-y-0.5">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium">
                      {service.shortLabel}
                    </span>
                  </motion.div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Consultar sobre {service.shortLabel}</TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </div>
    </section>
  )
}
