"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import { ExternalLink, MapPin } from "lucide-react"

import { LocationFallback } from "@/components/location/location-fallback"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { businessConfig } from "@/config/business"

const LocationMap = dynamic(
  () => import("@/components/location/location-map"),
  {
    ssr: false,
    loading: () => (
      <div className="flex size-full flex-col justify-end gap-3 p-5">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-52" />
      </div>
    ),
  },
)

export function BusinessLocation() {
  const mapRef = useRef<HTMLDivElement>(null)
  const shouldLoadMap = useInView(mapRef, { once: true, margin: "200px" })
  const [isUnavailable, setIsUnavailable] = useState(false)

  return (
    <section
      aria-labelledby="ubicacion-nico-experience"
      className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8 md:py-28"
    >
      <div className="mb-10 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <div className="flex max-w-2xl flex-col gap-3">
          <span className="text-sm font-medium text-primary">
            Ubicación oficial
          </span>
          <h2
            id="ubicacion-nico-experience"
            className="text-3xl font-medium tracking-tighter sm:text-4xl"
          >
            Estamos en Tocoa, Colón
          </h2>
          <p className="leading-7 text-muted-foreground">
            Consulta la ubicación confirmada de Nico Experience y abre la ruta
            en tu aplicación de mapas.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link
            href={businessConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin data-icon="inline-start" />
            Abrir en Google Maps
            <ExternalLink data-icon="inline-end" />
          </Link>
        </Button>
      </div>

      <div
        ref={mapRef}
        className="h-[24rem] overflow-hidden rounded-2xl border bg-muted sm:h-[30rem]"
      >
        {isUnavailable ? (
          <LocationFallback />
        ) : shouldLoadMap ? (
          <LocationMap onUnavailable={() => setIsUnavailable(true)} />
        ) : (
          <div className="flex size-full flex-col justify-end gap-3 p-5">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-52" />
          </div>
        )}
      </div>
    </section>
  )
}
