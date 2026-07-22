import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

describe("presentación de alojamientos", () => {
  it("separa el catálogo escalable de la historia destacada", () => {
    const catalogPage = readFileSync(
      join(process.cwd(), "app/alojamientos/page.tsx"),
      "utf8",
    )
    const catalog = readFileSync(
      join(process.cwd(), "components/property-catalog.tsx"),
      "utf8",
    )
    const card = readFileSync(
      join(process.cwd(), "components/property-card.tsx"),
      "utf8",
    )
    const pricing = readFileSync(
      join(process.cwd(), "components/pricing.tsx"),
      "utf8",
    )

    expect(catalogPage).toContain("activeProperties")
    expect(catalogPage).toContain("<PropertyCatalog")
    expect(catalogPage).not.toContain("<Pricing")
    expect(catalog).toContain("md:grid-cols-2")
    expect(catalog).toContain("xl:grid-cols-3")
    expect(catalog).toContain("properties.length === 1")
    expect(catalog).toContain("mx-auto max-w-md")
    expect(card).toContain("aspect-[4/3]")
    expect(card).toContain("<CardHeader")
    expect(card).toContain("<CardContent")
    expect(card).toContain("<CardFooter")
    expect(pricing).toContain("featuredProperties")
  })

  it("usa un hero fotográfico con acciones para consultar, compartir y explorar", () => {
    const page = readFileSync(
      join(process.cwd(), "app/alojamientos/[slug]/page.tsx"),
      "utf8",
    )
    const hero = readFileSync(
      join(process.cwd(), "components/property-hero.tsx"),
      "utf8",
    )

    expect(page).toContain("<PropertyHero")
    expect(page).not.toContain('aspect-[16/9]')
    expect(hero).toContain("property.featuredImage")
    expect(hero).toContain("<ShareButton")
    expect(hero).toContain('href="#album-title"')
    expect(hero).not.toContain("PdfDownloadLink")
    expect(hero).not.toContain("/pdf")
    expect(hero).toContain("sizes=")
    expect(hero).toContain("border-white/35 bg-black/25 text-white")
  })

  it("usa un hero de fondo y mantiene ubicaciones separadas", () => {
    const hero = readFileSync(
      join(process.cwd(), "components/property-hero.tsx"),
      "utf8",
    )
    const page = readFileSync(
      join(process.cwd(), "app/alojamientos/[slug]/page.tsx"),
      "utf8",
    )
    expect(hero).toContain("absolute inset-0")
    expect(hero).toContain("property.featuredImage")
    expect(hero).toContain("bg-linear-to-r")
    expect(hero).not.toContain("from-[color:var(--brand-navy)]/95")
    expect(page).toContain("property.mapUrl")
    expect(page).not.toContain("BusinessLocation")
    expect(page).toContain("md:px-8")
    expect(page).not.toContain("md:px-6")
  })
})
