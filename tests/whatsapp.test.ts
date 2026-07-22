import { describe, expect, it } from "vitest"
import {
  buildInquiryMessage,
  buildWhatsAppUrl,
} from "../lib/whatsapp"
import { siteConfig } from "../config/site"

describe("consulta contextual", () => {
  it("incluye los datos que el cliente proporciona para hospedaje", () => {
    const message = buildInquiryMessage({
      name: "Ana",
      service: "hospedaje",
      details: "Quiero conocer disponibilidad",
      property: "Casa Palac",
      date: "2026-08-10",
      guests: "4",
    })

    expect(message).toContain("Servicio: Hospedaje")
    expect(message).toContain("Alojamiento: Casa Palac")
    expect(message).toContain("Personas: 4")
  })

  it("omite los campos que el cliente deja vacíos", () => {
    const message = buildInquiryMessage({
      name: "Luis",
      service: "tramites",
      details: "Necesito orientación",
    })

    expect(message).not.toContain("Fecha aproximada:")
    expect(message).not.toContain("Personas:")
  })

  it("abre el número oficial normalizado", () => {
    expect(buildWhatsAppUrl("Hola", "+504 9373-1060")).toBe(
      "https://wa.me/50493731060?text=Hola",
    )
  })

  it("usa el número confirmado como configuración pública", () => {
    expect(siteConfig.whatsappNumber).toBe("50493731060")
    expect(siteConfig.phone).toBe("+504 9373-1060")
  })
})
