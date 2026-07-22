"use client"

import { motion, useReducedMotion } from "framer-motion"

import { PropertyCard } from "@/components/property-card"
import type { Property } from "@/content/properties"

export function PropertyCatalog({ properties }: { properties: Property[] }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      aria-label="Catálogo de alojamientos"
      className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-8 md:pb-28"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property, index) => (
          <motion.div
            key={property.slug}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
          >
            <PropertyCard property={property} priority={index < 3} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
