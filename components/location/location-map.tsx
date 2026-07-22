"use client"

import { MapPin } from "lucide-react"
import { useTheme } from "next-themes"
import {
  Map as MapView,
  Marker,
  NavigationControl,
} from "react-map-gl/maplibre"

import { businessConfig } from "@/config/business"

export default function LocationMap({
  onUnavailable,
}: {
  onUnavailable: () => void
}) {
  const { resolvedTheme } = useTheme()
  const { latitude, longitude } = businessConfig.coordinates

  return (
    <MapView
      initialViewState={{ latitude, longitude, zoom: 15 }}
      mapStyle={
        resolvedTheme === "dark"
          ? businessConfig.mapStyles.dark
          : businessConfig.mapStyles.light
      }
      scrollZoom={false}
      dragRotate={false}
      pitchWithRotate={false}
      cooperativeGestures
      reuseMaps
      attributionControl={{ compact: true }}
      onError={onUnavailable}
      style={{ width: "100%", height: "100%" }}
      aria-label="Mapa de la ubicación de Nico Experience en Tocoa, Colón"
    >
      <NavigationControl position="top-right" showCompass={false} />
      <Marker latitude={latitude} longitude={longitude} anchor="bottom">
        <div
          className="flex size-11 items-center justify-center rounded-full border-4 border-white bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] shadow-lg"
          aria-label="Nico Experience"
          role="img"
        >
          <MapPin className="size-5" aria-hidden="true" />
        </div>
      </Marker>
    </MapView>
  )
}
