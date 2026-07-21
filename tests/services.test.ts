import { describe, expect, it } from "vitest"
import { services } from "../content/services"
import { siteConfig } from "../config/site"

describe("servicios de Nico Experience", () => {
  it("publica las cinco líneas confirmadas", () => {
    expect(services.map(({ slug }) => slug)).toEqual([
      "viajes",
      "hospedaje",
      "tramites",
      "gestiones",
      "soluciones-digitales",
    ])
  })

  it("cada servicio tiene contenido utilizable", () => {
    expect(
      services.every(
        (service) => service.title && service.description && service.icon,
      ),
    ).toBe(true)
  })

  it("describe el negocio integral sin limitarlo a hospedajes", () => {
    expect(siteConfig.description).toContain("viajes")
    expect(siteConfig.description).toContain("trámites")
    expect(siteConfig.description).toContain("soluciones digitales")
    expect(siteConfig.description).toContain("Tocoa, Colón")
  })
})
