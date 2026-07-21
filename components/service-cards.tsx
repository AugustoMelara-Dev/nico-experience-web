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
import { services, type Service } from "@/content/services"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const icons: Record<Service["icon"], typeof Plane> = {
  plane: Plane,
  bed: BedDouble,
  "file-text": FileText,
  briefcase: BriefcaseBusiness,
  "monitor-smartphone": MonitorSmartphone,
}

export default function ServiceCards() {
  return (
    <section
      id="servicios"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:py-24 md:px-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", bounce: 0 }}
        className="mb-12 flex flex-col items-center gap-3 text-center sm:mb-16"
      >
        <span className="w-fit rounded-full border border-border bg-card px-2 py-1 text-sm">
          Todo en un solo lugar
        </span>
        <h2 className="bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-xl font-semibold text-transparent sm:text-2xl">
          Soluciones pensadas para ti
        </h2>
        <p className="max-w-2xl text-balance text-muted-foreground">
          Te acompañamos de forma cercana y práctica para encontrar una
          respuesta adaptada a lo que necesitas.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = icons[service.icon]
          return (
            <motion.div
              key={service.slug}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={index > 2 ? "lg:translate-x-1/2" : undefined}
            >
              <Card className="h-full rounded-2xl">
                <CardContent className="space-y-4">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-background">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/contacto?servicio=${service.slug}`}>
                      Consultar
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
