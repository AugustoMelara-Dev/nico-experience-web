import { z } from "zod"

const serviceSchema = z.object({
  slug: z.enum([
    "viajes",
    "hospedaje",
    "tramites",
    "gestiones",
    "soluciones-digitales",
  ]),
  title: z.string().min(1),
  shortLabel: z.string().min(1),
  description: z.string().min(1),
  icon: z.enum([
    "plane",
    "bed",
    "file-text",
    "briefcase",
    "monitor-smartphone",
  ]),
})

export const services = z.array(serviceSchema).parse([
  {
    slug: "viajes",
    title: "Viajes",
    shortLabel: "Viajes",
    description:
      "Atención personalizada para encontrar opciones que se adapten a tu viaje.",
    icon: "plane",
  },
  {
    slug: "hospedaje",
    title: "Hospedaje",
    shortLabel: "Hospedajes",
    description:
      "Alojamientos presentados con información clara y acompañamiento directo.",
    icon: "bed",
  },
  {
    slug: "tramites",
    title: "Trámites",
    shortLabel: "Trámites",
    description:
      "Orientación práctica para avanzar con tus trámites y requisitos.",
    icon: "file-text",
  },
  {
    slug: "gestiones",
    title: "Gestiones",
    shortLabel: "Gestiones",
    description:
      "Apoyo personalizado para coordinar necesidades y encontrar una solución eficiente.",
    icon: "briefcase",
  },
  {
    slug: "soluciones-digitales",
    title: "Soluciones digitales",
    shortLabel: "Soluciones digitales",
    description:
      "Herramientas y apoyo digital adaptados a las necesidades de cada cliente.",
    icon: "monitor-smartphone",
  },
])

export type Service = z.infer<typeof serviceSchema>
export type ServiceSlug = Service["slug"]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}
