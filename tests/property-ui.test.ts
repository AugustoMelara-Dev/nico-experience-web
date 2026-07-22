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
    expect(card).toContain("aspect-[4/3]")
    expect(card).toContain("<CardHeader")
    expect(card).toContain("<CardContent")
    expect(card).toContain("<CardFooter")
    expect(pricing).toContain("featuredProperties")
  })

  it("usa un hero fotográfico y una descarga contextual", () => {
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
    expect(hero).toContain("/api/alojamientos/${property.slug}/pdf")
    expect(hero).toContain("sizes=")
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
    expect(page).toContain("property.mapUrl")
    expect(page).not.toContain("BusinessLocation")
  })
})
