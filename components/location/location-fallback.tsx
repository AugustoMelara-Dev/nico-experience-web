import Link from "next/link"
import { ExternalLink, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { businessConfig } from "@/config/business"

export function LocationFallback() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-5 bg-card p-8 text-center sm:min-h-96">
      <div className="flex size-12 items-center justify-center rounded-full border bg-background text-primary">
        <MapPin className="size-5" aria-hidden="true" />
      </div>
      <div className="flex max-w-md flex-col gap-2">
        <h3 className="text-xl font-semibold">Encuéntranos en Tocoa</h3>
        <p className="text-sm leading-6 text-muted-foreground">
          El mapa interactivo no está disponible en este momento. Puedes abrir
          la ubicación oficial directamente en Google Maps.
        </p>
      </div>
      <Button asChild>
        <Link
          href={businessConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir en Google Maps
          <ExternalLink data-icon="inline-end" />
        </Link>
      </Button>
    </div>
  )
}
