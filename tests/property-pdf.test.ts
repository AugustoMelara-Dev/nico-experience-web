import { describe, expect, it } from "vitest"
import { getProperty } from "../content/properties"
import {
  catalogPdfFilename,
  pdfResponse,
  propertyPdfFilename,
  publicAssetPath,
  selectPropertyPdfImages,
} from "../lib/property-pdf"

describe("fichas PDF de alojamientos", () => {
  const property = getProperty("casa-palac")!

  it("elige como máximo seis JPEG explícitos", () => {
    const images = selectPropertyPdfImages(property)

    expect(images).toHaveLength(6)
    expect(images.every((image) => image.pdfSrc?.endsWith(".jpg"))).toBe(true)
  })

  it("crea nombres de descarga estables", () => {
    expect(propertyPdfFilename(property)).toBe(
      "nico-experience-casa-palac.pdf",
    )
    expect(catalogPdfFilename()).toBe(
      "nico-experience-catalogo-alojamientos.pdf",
    )
  })

  it("impide salir de public al resolver activos", () => {
    expect(() => publicAssetPath("/../package.json")).toThrow(
      "Ruta de activo inválida",
    )
  })

  it("genera cabeceras de descarga seguras", () => {
    const response = pdfResponse(
      new Uint8Array([37, 80, 68, 70]),
      "nico-experience-casa-palac.pdf",
    )

    expect(response.headers.get("content-type")).toBe("application/pdf")
    expect(response.headers.get("content-disposition")).toContain(
      'attachment; filename="nico-experience-casa-palac.pdf"',
    )
  })
})
