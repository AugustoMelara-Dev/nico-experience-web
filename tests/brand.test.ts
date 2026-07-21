import { existsSync } from "node:fs"
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
})
