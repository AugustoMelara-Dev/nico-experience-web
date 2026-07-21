"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  verifiedTestimonials,
  type Testimonial,
} from "@/content/testimonials"

function StarIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 text-yellow-500 sm:h-4 sm:w-4"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function TestimonialGrid({ testimonials }: { testimonials: Testimonial[] }) {
  const [showAll, setShowAll] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const visibleCount = isMobile ? 2 : 6

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)")
    const updateIsMobile = () => setIsMobile(mediaQuery.matches)
    updateIsMobile()
    mediaQuery.addEventListener("change", updateIsMobile)
    return () => mediaQuery.removeEventListener("change", updateIsMobile)
  }, [])

  const visibleTestimonials = showAll
    ? testimonials
    : testimonials.slice(0, visibleCount)

  return (
    <section id="testimonios" className="px-3 py-16 sm:px-4 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 flex flex-col gap-3 text-center sm:mb-20"
        >
          <h2 className="bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-xl font-semibold text-transparent sm:text-2xl">
            Experiencias compartidas
          </h2>
          <p className="mx-auto max-w-xl text-center text-muted-foreground">
            Opiniones reales de personas atendidas por Nico Experience.
          </p>
        </motion.div>

        <div className="relative">
          <div className="columns-2 gap-3 space-y-3 sm:gap-8 sm:space-y-8 md:columns-2 lg:columns-3">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                className="mb-3 break-inside-avoid sm:mb-8"
              >
                <div className="rounded-lg border border-border bg-card p-3 transition-colors duration-300 sm:rounded-xl sm:p-6">
                  {testimonial.rating && (
                    <div className="mb-2 flex sm:mb-4" aria-label={`${testimonial.rating} de 5 estrellas`}>
                      {Array.from({ length: testimonial.rating }, (_, star) => (
                        <StarIcon key={star} />
                      ))}
                    </div>
                  )}
                  <p className="mb-4 text-xs leading-snug text-muted-foreground sm:mb-6 sm:text-sm sm:leading-relaxed">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-linear-to-br from-primary/20 to-primary/10 text-xs font-medium sm:h-10 sm:w-10 sm:text-sm">
                      {testimonial.name.split(" ").map((name) => name[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-xs font-semibold sm:text-sm">{testimonial.name}</h3>
                      {testimonial.source && <p className="truncate text-[10px] leading-tight text-muted-foreground sm:text-xs">{testimonial.source}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {!showAll && testimonials.length > visibleCount && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background via-background/90 to-transparent" />
          )}
        </div>

        {!showAll && testimonials.length > visibleCount && (
          <div className="mt-4 flex justify-center">
            <Button variant="ghost" onClick={() => setShowAll(true)}>Ver más</Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default function Testimonials() {
  if (verifiedTestimonials.length === 0) return null
  return <TestimonialGrid testimonials={verifiedTestimonials} />
}
