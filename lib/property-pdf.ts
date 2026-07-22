import { resolve, sep } from "node:path"
import { readFileSync } from "node:fs"
import type { Property } from "@/content/properties"

export function selectPropertyPdfImages(property: Property) {
  return property.media
    .filter(
      (item) =>
        item.type === "image" && item.includeInPdf && Boolean(item.pdfSrc),
    )
    .slice(0, 6)
}

export function propertyPdfFilename(property: Property) {
  return `nico-experience-${property.slug}.pdf`
}

export function catalogPdfFilename() {
  return "nico-experience-catalogo-alojamientos.pdf"
}

export function publicAssetPath(src: string) {
  const relative = src.replace(/^\/+/, "")
  const root = resolve(process.cwd(), "public")
  const destination = resolve(root, relative)

  if (!destination.startsWith(`${root}${sep}`)) {
    throw new Error("Ruta de activo inválida")
  }

  return destination
}

export function publicAssetBuffer(src: string) {
  return readFileSync(publicAssetPath(src))
}

export function pdfResponse(buffer: Uint8Array, filename: string) {
  const body = Uint8Array.from(buffer).buffer

  return new Response(body, {
    headers: {
      "Cache-Control":
        "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": "application/pdf",
    },
  })
}
