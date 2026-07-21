const env = (value: string | undefined) => value?.trim() ?? ""

export const siteConfig = {
  name: "Nico Experience",
  description: "Hospedajes para descansar, compartir y disfrutar Honduras a tu ritmo.",
  siteUrl: env(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000",
  whatsappNumber: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  phone: env(process.env.NEXT_PUBLIC_PHONE),
  social: {
    instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    facebook: env(process.env.NEXT_PUBLIC_FACEBOOK_URL),
    tiktok: env(process.env.NEXT_PUBLIC_TIKTOK_URL),
  },
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Alojamientos", href: "/alojamientos" },
    { label: "Casa Palac", href: "/alojamientos/casa-palac" },
    { label: "Preguntas", href: "/#preguntas" },
    { label: "Contacto", href: "/contacto" },
  ],
} as const

export type SiteConfig = typeof siteConfig
