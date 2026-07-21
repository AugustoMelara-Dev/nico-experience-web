"use client"

import { motion } from "framer-motion"
import { BedDouble, CookingPot, House, MapPin, Waves, Armchair } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const features = [
  { name: "Frente a playa", icon: MapPin },
  { name: "Piscina", icon: Waves },
  { name: "Áreas de descanso", icon: Armchair },
  { name: "Cocina", icon: CookingPot },
  { name: "Habitaciones", icon: BedDouble },
  { name: "Sala y comedor", icon: House },
]

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
          Lo que encontrarás
        </h2>
      </motion.div>
      <div className="w-full grid grid-cols-3 sm:grid-cols-6 grid-rows-3 sm:grid-rows-1 gap-5 place-items-center">
        <TooltipProvider>
          {features.map((feature, index) => (
            <Tooltip key={feature.name}>
              <TooltipTrigger asChild>
                <div className="shrink-0">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1, type: "spring", bounce: 0 }}
                  >
                    <feature.icon className="size-8" aria-hidden="true" />
                  </motion.div>
                </div>
              </TooltipTrigger>
              <TooltipContent>{feature.name}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </section>
  )
}
