"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { brandConfig } from "@/config/brand"

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative isolate flex min-h-[42rem] items-center overflow-hidden [--primary:var(--brand-gold)] [--primary-foreground:var(--brand-navy)]">
      <Image
        src={brandConfig.heroImage}
        alt="Escena editorial de planificación de viajes y atención personalizada"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover object-center lg:object-right"
      />

      <div className="absolute inset-0 bg-linear-to-r from-[color:var(--brand-navy)]/82 via-[color:var(--brand-navy)]/48 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[color:var(--brand-navy)]/10 sm:hidden" />

      <div className="relative mx-auto w-full max-w-(--breakpoint-xl) px-4 py-24 md:px-8 md:py-32">
        <motion.div
          initial={{ y: shouldReduceMotion ? 0 : 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, type: "spring", bounce: 0 }}
          className="flex max-w-xl flex-col items-start gap-6 text-left text-white"
        >
          <span className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-md">
            Tu aliado en Tocoa, Colón
          </span>

          <div className="flex flex-col gap-5">
            <h1 className="max-w-xl text-pretty text-4xl font-medium leading-[1.02] tracking-tighter sm:text-5xl md:text-6xl">
              Viajes, hospedaje y soluciones en un solo lugar
            </h1>
            <p className="max-w-xl text-balance text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
              Atención personalizada para organizar viajes, encontrar dónde
              hospedarte, resolver trámites, gestionar necesidades y avanzar
              con soluciones digitales.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/contacto">
                <MessageCircle data-icon="inline-start" />
                Cuéntanos qué necesitas
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white sm:w-auto"
            >
              <Link href="/alojamientos">
                Explorar alojamientos
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>

          <p className="border-l border-[color:var(--brand-gold)] pl-4 text-sm font-medium text-white/88">
            {brandConfig.tagline}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
