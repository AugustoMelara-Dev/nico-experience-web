import { z } from "zod"

const businessSchema = z.object({
  name: z.string().min(1),
  locationLabel: z.string().min(1),
  mapsUrl: z.url(),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
  mapStyles: z.object({
    light: z.url(),
    dark: z.url(),
  }),
})

export const businessConfig = businessSchema.parse({
  name: "Nico Experience",
  locationLabel: "Tocoa, Colón · Honduras",
  mapsUrl: "https://maps.app.goo.gl/CV11vyc2QaYzxB1x6",
  coordinates: {
    latitude: 15.656205,
    longitude: -86.004107,
  },
  mapStyles: {
    light: "https://tiles.openfreemap.org/styles/positron",
    dark: "https://tiles.openfreemap.org/styles/dark",
  },
})

export type BusinessConfig = typeof businessConfig
