import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

describe("presentación de alojamientos", () => {
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
