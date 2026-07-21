import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { brandConfig } from "../config/brand"

describe("identidad de Nico Experience", () => {
  it("expone los colores y textos aprobados", () => {
    expect(brandConfig.colors).toEqual({
      navy: "#061E68",
      gold: "#D6993A",
      goldLight: "#E4C07C",
    })
    expect(brandConfig.tagline).toBe(
      "Experiencias que conectan, soluciones que impulsan.",
    )
    expect(brandConfig.descriptor).toBe("Viajes · Negocios · Soluciones")
  })

  it("mantiene disponibles los activos optimizados", () => {
    for (const src of [
      brandConfig.logoWeb,
      brandConfig.logoCompactWeb,
      brandConfig.logoPdf,
      brandConfig.heroImage,
    ]) {
      expect(
        existsSync(
          join(process.cwd(), "public", src.replace(/^\/+/, "")),
        ),
      ).toBe(true)
    }
  })

  it("integra los tokens de marca y el logotipo en el shell", () => {
    const globals = readFileSync(
      join(process.cwd(), "app/globals.css"),
      "utf8",
    )
    const navbar = readFileSync(
      join(process.cwd(), "components/navbar.tsx"),
      "utf8",
    )
    const footer = readFileSync(
      join(process.cwd(), "components/footer.tsx"),
      "utf8",
    )
    const brandLogo = readFileSync(
      join(process.cwd(), "components/brand-logo.tsx"),
      "utf8",
    )

    expect(globals).toContain("--brand-navy: #061e68")
    expect(globals).toContain("--brand-gold: #d6993a")
    expect(navbar).toContain("<BrandLogo")
    expect(footer).toContain("<BrandLogo")
    expect(brandConfig.logoCompactWeb).toBe(
      "/brand/nico-experience-wordmark-transparent.webp",
    )
    expect(brandLogo).toContain("dark:invert")
    expect(brandLogo).toContain("bg-white")
  })

  it("presenta una imagen editorial y las dos rutas principales", () => {
    const hero = readFileSync(
      join(process.cwd(), "components/hero.tsx"),
      "utf8",
    )

    expect(hero).toContain("brandConfig.heroImage")
    expect(hero).toContain('href="/contacto"')
    expect(hero).toContain('href="/alojamientos"')
    expect(hero).toContain("sizes=")
  })
})
