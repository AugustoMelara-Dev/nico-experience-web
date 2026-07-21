"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { brandConfig } from "@/config/brand"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <section className="mx-auto flex max-w-(--breakpoint-xl) items-center px-4 py-20 md:px-8 md:py-28">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14"
        >
          <div className="flex flex-col items-center space-y-5 text-center lg:items-start lg:text-left">
            <span className="h-full w-fit rounded-full border border-border bg-card px-2 py-1 text-sm">
              Tu aliado en Tocoa, Colón
            </span>
            <h1 className="max-w-3xl text-pretty bg-linear-to-b from-primary to-foreground bg-clip-text text-4xl font-medium tracking-tighter text-transparent md:text-6xl">
              Viajes, hospedaje y soluciones en un solo lugar
            </h1>
            <p className="max-w-2xl text-balance text-lg text-muted-foreground">
              Atención personalizada para organizar viajes, encontrar dónde
              hospedarte, resolver trámites, gestionar necesidades y avanzar
              con soluciones digitales.
            </p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0 lg:justify-start"
            >
              <Button asChild className="shadow-lg">
                <Link href="/contacto">Cuéntanos qué necesitas</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/alojamientos">Explorar alojamientos</Link>
              </Button>
            </motion.div>
            <p className="text-sm font-medium text-primary">
              {brandConfig.tagline}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="w-full"
          >
            <Card className="overflow-hidden rounded-2xl">
              <CardContent className="p-3 sm:p-4">
                <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-border">
                  <Image
                    src={brandConfig.heroImage}
                    alt="Escena editorial de planificación de viajes y atención personalizada"
                    fill
                    priority
                    quality={90}
                    sizes="(min-width: 1024px) 44vw, 92vw"
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, type: "spring", bounce: 0 }}
        className="pointer-events-none absolute -top-32 flex h-full w-full items-center justify-end"
      >
        <div className="flex w-3/4 items-center justify-center">
          <div className="h-150 w-12 rounded-3xl bg-light blur-[70px] will-change-transform max-sm:rotate-15 sm:rotate-35" />
        </div>
      </motion.div>
    </div>
  )
}
