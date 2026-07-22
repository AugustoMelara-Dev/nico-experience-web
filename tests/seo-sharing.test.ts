import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

const source = (path: string) =>
  readFileSync(join(process.cwd(), path), "utf8")

describe("SEO, accesibilidad y contenido compartido", () => {
  it("genera tarjetas sociales de marca para el negocio y cada alojamiento", () => {
    const globalOg = source("app/opengraph-image.tsx")
    const propertyOg = source("app/alojamientos/[slug]/opengraph-image.tsx")
    const socialCard = source("components/social-card.tsx")

    expect(globalOg).toContain("SocialCard")
    expect(propertyOg).toContain("property?.socialImage")
    expect(propertyOg).toContain("1200, height: 630")
    expect(socialCard).toContain("Nico Experience")
    expect(socialCard).not.toContain("SaaS")
    expect(existsSync(join(process.cwd(), "app/opengraph-image.png"))).toBe(false)
  })

  it("ofrece una ruta de teclado y datos estructurados locales", () => {
    const layout = source("app/layout.tsx")
    expect(layout).toContain('href="#contenido"')
    expect(layout).toContain("Saltar al contenido")
    expect(layout).toContain('"@type": "LocalBusiness"')
    expect(layout).toContain('lang="es-HN"')
  })

  it("retira por completo la experiencia PDF", () => {
    const packageJson = source("package.json")
    const propertyHero = source("components/property-hero.tsx")
    const catalogPage = source("app/alojamientos/page.tsx")

    expect(packageJson).not.toContain("@react-pdf/renderer")
    expect(propertyHero).not.toContain("PdfDownloadLink")
    expect(catalogPage).not.toContain("PdfDownloadLink")
    expect(catalogPage).toContain("Compartir catálogo")
  })

  it("anuncia el resultado de compartir y conserva un fallback", () => {
    const share = source("components/share-button.tsx")
    expect(share).toContain('aria-live="polite"')
    expect(share).toContain("navigator.clipboard.writeText")
    expect(share).toContain("navigator.canShare")
    expect(share).toContain("No se pudo copiar")
  })
})
