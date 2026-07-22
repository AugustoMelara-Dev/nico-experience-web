import { ImageResponse } from "next/og"
import { headers } from "next/headers"

import { SocialCard } from "@/components/social-card"
import { brandConfig } from "@/config/brand"
import { siteConfig } from "@/config/site"

export const alt = "Nico Experience, turismo y soluciones integrales"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const runtime = "edge"

export default async function OpenGraphImage() {
  const requestHeaders = await headers()
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host")
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http"
  const origin = host ? `${protocol}://${host}` : siteConfig.siteUrl

  return new ImageResponse(
    <SocialCard
      eyebrow="Viajes · Hospedaje · Gestiones"
      title="Soluciones para avanzar con confianza"
      description="Atención personalizada para viajes, hospedaje, trámites, gestiones y soluciones digitales."
      imageUrl={new URL(brandConfig.socialImage, origin).toString()}
    />,
    size,
  )
}
