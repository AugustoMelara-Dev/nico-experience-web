import { describe, expect, it } from "vitest"
import {
  activeProperties,
  featuredProperties,
  getProperty,
  properties,
} from "../content/properties"
import { buildWhatsAppUrl, normalizeWhatsAppNumber } from "../lib/whatsapp"
import sitemap from "../app/sitemap"

const slug = "casa-palac"

describe("contenido de alojamientos", () => {
  it("publica únicamente propiedades activas", () => {
    expect(activeProperties.every((property) => property.active)).toBe(true)
    expect(activeProperties.length).toBe(properties.filter((property) => property.active).length)
  })

  it("publica Casa Palac con identidad y descriptor separados", () => {
    const property = getProperty(slug)!
    expect(property.name).toBe("Casa Palac")
    expect(property.locationLabel).toBe("Frente a la playa")
    expect(property.whatsappMessage).toContain("Casa Palac")
    expect(property.whatsappMessage).not.toContain("Casa Palac frente a playa")
  })

  it("no resuelve un slug inexistente", () => {
    expect(getProperty("no-existe")).toBeUndefined()
  })

  it("incluye las 25 fotografías analizadas y sus textos accesibles", () => {
    const property = getProperty(slug)!
    const images = property.media.filter((item) => item.type === "image")
    expect(images).toHaveLength(25)
    expect(images.every((item) => item.src.startsWith("/images/casa-palac-frente-a-playa/"))).toBe(true)
    expect(images.every((item) => Boolean(item.alt && item.title && item.description))).toBe(true)
  })

  it("selecciona seis imágenes compatibles para la ficha PDF", () => {
    const selected = getProperty(slug)!.media.filter(
      (item) => item.type === "image" && item.includeInPdf,
    )

    expect(selected).toHaveLength(6)
    expect(
      selected.every(
        (item) =>
          item.pdfSrc?.startsWith("/pdf-assets/casa-palac/") &&
          item.pdfSrc.endsWith(".jpg"),
      ),
    ).toBe(true)
  })

  it("mantiene el catálogo derivado únicamente de propiedades activas", () => {
    expect(
      featuredProperties.every(
        (property) => property.active && property.featured,
      ),
    ).toBe(true)
  })

  it("usa la URL oficial de Maps", () => {
    expect(getProperty(slug)?.mapUrl).toBe("https://maps.app.goo.gl/BhDjLciEvjhp8pBN8?g_st=iw")
  })

  it("publica únicamente la URL canónica de Casa Palac en el sitemap", () => {
    const urls = sitemap().map(({ url }) => url)
    expect(urls.some((url) => url.endsWith("/alojamientos/casa-palac"))).toBe(true)
    expect(urls.some((url) => url.endsWith("/alojamientos/casa-palac-frente-a-playa"))).toBe(false)
  })

  it("publica solo inventario documentado y omite datos sin confirmar", () => {
    const property = getProperty(slug)!
    expect(property.reviews).toEqual([])
    expect(property.price).toBeUndefined()
    expect(property.capacity).toBeUndefined()
    expect(property.kitchenInventory).toEqual([
      "Estufa",
      "Refrigeradora",
      "Microondas",
      "Gabinetes",
      "Área de trabajo",
    ])
    expect(property.kitchenInventory).not.toContain("Cafetera")
  })
})

describe("enlaces de WhatsApp", () => {
  it("normaliza un número internacional", () => {
    expect(normalizeWhatsAppNumber("+504 9999-9999")).toBe("50499999999")
  })

  it("incluye el nombre correcto en el mensaje codificado", () => {
    const message = getProperty(slug)!.whatsappMessage
    const url = buildWhatsAppUrl(message, "+504 9999-9999")!
    expect(decodeURIComponent(url)).toContain("Casa Palac")
    expect(url.startsWith("https://wa.me/50499999999?text=")).toBe(true)
  })

  it("no inventa un destino si el número no está configurado", () => {
    expect(buildWhatsAppUrl("Hola", "")).toBeNull()
  })
})
