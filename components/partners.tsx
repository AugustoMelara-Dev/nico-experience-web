"use client"

import { motion } from "framer-motion"
import { BedDouble, BriefcaseBusiness, FileText, MonitorSmartphone, Plane } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
    <section className="max-w-(--breakpoint-md) w-full mx-auto px-4 py-24 gap-10 md:px-8 flex flex-col justify-center items-center text-center">
      <motion.div
        initial={{ y: 20, opacity: 0, filter: "blur(3px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: "spring", bounce: 0 }}
        className="flex flex-col gap-3"
      >
        <h2 className="text-xl font-semibold sm:text-2xl bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          ¿Cómo podemos ayudarte?
        </h2>
      </motion.div>
      <div className="grid w-full grid-cols-2 place-items-center gap-8 sm:grid-cols-5">
        <TooltipProvider>
          {services.map((service, index) => {
            const Icon = icons[service.icon]
            return <Tooltip key={service.slug}>
              <TooltipTrigger asChild>
                <div className="shrink-0">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1, type: "spring", bounce: 0 }}
                  >
                    <Icon className="size-8" aria-hidden="true" />
                  </motion.div>
                </div>
              </TooltipTrigger>
              <TooltipContent>{service.shortLabel}</TooltipContent>
            </Tooltip>
          })}
        </TooltipProvider>
      </div>
    </section>
  )
}
