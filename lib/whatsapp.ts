import { siteConfig } from "@/config/site";

export type InquiryInput = {
  name: string
  service:
    | "viajes"
    | "hospedaje"
    | "tramites"
    | "gestiones"
    | "soluciones-digitales"
    | "otro"
  details: string
  property?: string
  date?: string
  guests?: string
  destination?: string
}

const serviceLabels: Record<InquiryInput["service"], string> = {
  viajes: "Viajes",
  hospedaje: "Hospedaje",
  tramites: "Trámites",
  gestiones: "Gestiones",
  "soluciones-digitales": "Soluciones digitales",
  otro: "Otro",
}

export function buildInquiryMessage(input: InquiryInput) {
  const lines = [
    "Hola, vi la página de Nico Experience y me gustaría recibir ayuda.",
    `Nombre: ${input.name.trim()}`,
    `Servicio: ${serviceLabels[input.service]}`,
    input.property?.trim()
      ? `Alojamiento: ${input.property.trim()}`
      : "",
    input.destination?.trim()
      ? `Destino o necesidad: ${input.destination.trim()}`
      : "",
    input.date?.trim() ? `Fecha aproximada: ${input.date.trim()}` : "",
    input.guests?.trim() ? `Personas: ${input.guests.trim()}` : "",
    `Consulta: ${input.details.trim()}`,
  ]

  return lines.filter(Boolean).join("\n")
}

export function normalizeWhatsAppNumber(value: string) {
  return value.replace(/\D/g, "");
}

export function buildWhatsAppUrl(message: string, number = siteConfig.whatsappNumber) {
  const normalized = normalizeWhatsAppNumber(number);
  if (!normalized) return null;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
