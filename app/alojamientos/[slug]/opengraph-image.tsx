import { ImageResponse } from "next/og"
import { headers } from "next/headers"

import { SocialCard } from "@/components/social-card"
import { siteConfig } from "@/config/site"
import { getProperty } from "@/content/properties"

export const alt = "Alojamiento presentado por Nico Experience"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const runtime = "edge"

type ImageProps = { params: Promise<{ slug: string }> }

export default async function PropertyOpenGraphImage({ params }: ImageProps) {
  const { slug } = await params
  const property = getProperty(slug)
  const requestHeaders = await headers()
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host")
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http"
  const origin = host ? `${protocol}://${host}` : siteConfig.siteUrl

  return new ImageResponse(
    <SocialCard
      eyebrow={property?.locationLabel ?? "Alojamiento"}
      title={property?.name ?? "Nico Experience"}
      description={
        property?.shortDescription ??
        "Conoce nuestros alojamientos y consulta directamente con el equipo."
      }
      imageUrl={new URL(
        property?.socialImage ?? "/images/social/nico-experience.jpg",
        origin,
      ).toString()}
    />,
    size,
  )
}
