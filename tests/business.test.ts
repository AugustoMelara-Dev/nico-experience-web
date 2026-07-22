import { describe, expect, it } from "vitest"
import { businessConfig } from "../config/business"

describe("ubicación de Nico Experience", () => {
  it("publica el enlace y coordenadas confirmadas del negocio", () => {
    expect(businessConfig.mapsUrl).toBe(
      "https://maps.app.goo.gl/CV11vyc2QaYzxB1x6",
    )
    expect(businessConfig.coordinates).toEqual({
      latitude: 15.656205,
      longitude: -86.004107,
    })
  })

  it("mantiene estilos de mapa sustituibles", () => {
    expect(businessConfig.mapStyles.light).toMatch(/^https:\/\//)
    expect(businessConfig.mapStyles.dark).toMatch(/^https:\/\//)
  })
})
