import { siteConfig } from "@/config/site";

export function normalizeWhatsAppNumber(value: string) {
  return value.replace(/\D/g, "");
}

export function buildWhatsAppUrl(message: string, number = siteConfig.whatsappNumber) {
  const normalized = normalizeWhatsAppNumber(number);
  if (!normalized) return null;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
