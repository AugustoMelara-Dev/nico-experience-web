import { z } from "zod"

const mediaCategorySchema = z.enum([
  "piscina",
  "terraza",
  "sala",
  "comedor",
  "cocina",
  "habitacion",
  "bano",
  "exterior",
  "area-social",
  "otros",
])

const propertyMediaSchema = z.object({
  type: z.enum(["image", "video"]),
  src: z.string().min(1),
  alt: z.string().min(1).optional(),
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  category: mediaCategorySchema.optional(),
  poster: z.string().min(1).optional(),
})

const propertySchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  locationLabel: z.string().min(1).optional(),
  mapUrl: z.url().optional(),
  featuredImage: z.string().min(1),
  media: z.array(propertyMediaSchema),
  amenities: z.array(
    z.object({
      label: z.string().min(1),
      icon: z.enum(["waves", "house", "cooking-pot", "bed", "hammock", "map-pin"]),
      confirmed: z.boolean(),
    }),
  ),
  rooms: z.array(
    z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      bed: z.string().min(1).optional(),
      confirmed: z.boolean(),
    }),
  ).optional(),
  kitchenInventory: z.array(z.string().min(1)).optional(),
  capacity: z.number().int().positive().optional(),
  bedrooms: z.number().int().positive().optional(),
  bathrooms: z.number().int().positive().optional(),
  price: z.object({
    amount: z.number().positive(),
    currency: z.enum(["HNL", "USD"]),
    unit: z.enum(["night", "person", "package"]),
    note: z.string().min(1).optional(),
  }).optional(),
  videos: z.array(
    z.object({
      title: z.string().min(1),
      url: z.string().min(1),
      provider: z.enum(["local", "youtube", "facebook", "instagram", "tiktok", "other"]),
      poster: z.string().min(1).optional(),
    }),
  ).default([]),
  reviews: z.array(
    z.object({
      name: z.string().min(1),
      comment: z.string().min(1),
      rating: z.number().int().min(1).max(5).optional(),
      source: z.string().min(1).optional(),
      verified: z.boolean(),
    }),
  ).default([]),
  whatsappMessage: z.string().min(1),
  featured: z.boolean(),
  active: z.boolean(),
})

export type PropertyMedia = z.infer<typeof propertyMediaSchema>
export type Property = z.infer<typeof propertySchema>

const image = (name: string) => `/images/casa-palac-frente-a-playa/${name}.webp`
const photo = (
  name: string,
  title: string,
  description: string,
  alt: string,
  category: z.infer<typeof mediaCategorySchema>,
): PropertyMedia => ({ type: "image", src: image(name), title, description, alt, category })

export const properties = z.array(propertySchema).parse([
  {
    slug: "casa-palac",
    name: "Casa Palac",
    shortDescription: "Una casa ubicada frente a la playa, con espacios para descansar y compartir.",
    description:
      "Casa Palac está ubicada frente a la playa y reúne ambientes interiores, terrazas de madera, piscina y áreas de descanso. Las fotografías muestran espacios pensados para compartir con calma durante una estadía junto al mar.",
    locationLabel: "Frente a la playa",
    mapUrl: "https://maps.app.goo.gl/BhDjLciEvjhp8pBN8?g_st=iw",
    featuredImage: image("piscina-noche-principal"),
    media: [
      photo("piscina-noche-principal", "Piscina iluminada", "Una piscina iluminada que transforma la noche en un espacio agradable para relajarse y compartir.", "Piscina iluminada de Casa Palac rodeada por terrazas de madera", "piscina"),
      photo("piscina-terraza-noche-01", "Piscina y terraza", "La piscina se integra con las terrazas de madera para disfrutar el exterior durante la noche.", "Vista nocturna de la piscina junto a una terraza de madera", "piscina"),
      photo("piscina-terraza-noche-02", "Terraza junto a la piscina", "Un rincón exterior para conversar y descansar junto a la piscina iluminada.", "Mobiliario de terraza junto a la piscina iluminada", "terraza"),
      photo("piscina-terraza-noche-03", "Ambiente nocturno", "La iluminación permite apreciar la conexión entre piscina, terraza y áreas exteriores.", "Piscina y estructuras de madera iluminadas durante la noche", "piscina"),
      photo("piscina-exterior-noche", "Exterior nocturno", "Una vista amplia del área exterior y la piscina durante la noche.", "Vista exterior nocturna de la piscina de Casa Palac", "exterior"),
      photo("terraza-noche-01", "Terraza por la noche", "Una terraza techada para descansar y compartir al finalizar el día.", "Terraza techada de madera iluminada durante la noche", "terraza"),
      photo("terraza-dia", "Terraza durante el día", "Un espacio exterior de madera para conversar y disfrutar el entorno.", "Terraza de madera con mesa y vegetación alrededor", "terraza"),
      photo("terraza-vista", "Área de estar exterior", "Un espacio cómodo para descansar, conversar y disfrutar la brisa.", "Área de estar exterior bajo una estructura de madera", "terraza"),
      photo("exterior-deck", "Deck exterior", "Las plataformas de madera conectan distintas áreas exteriores de la propiedad.", "Deck de madera en el exterior de Casa Palac", "exterior"),
      photo("exterior-escaleras", "Conexión exterior", "Escaleras exteriores comunican los distintos niveles de las terrazas.", "Escaleras exteriores entre terrazas de madera", "exterior"),
      photo("exterior-estacionamiento", "Acceso exterior", "Una vista del acceso de la propiedad rodeado de vegetación.", "Acceso exterior de la propiedad con palmeras", "exterior"),
      photo("corredor-hamacas", "Corredor con hamacas", "Un corredor techado con hamacas para tomar una pausa y descansar.", "Corredor techado de madera con hamacas", "area-social"),
      photo("sala-principal", "Sala principal", "Una sala para conversar y descansar con acceso hacia el exterior.", "Sala con sofás y puertas hacia la terraza", "sala"),
      photo("sala-comedor", "Sala y comedor", "Sala y comedor integrados para compartir con comodidad durante la estadía.", "Sala y comedor conectados con ventanales hacia la terraza", "comedor"),
      photo("comedor-cocina", "Comedor y cocina", "El comedor se encuentra junto a la cocina para facilitar los momentos compartidos.", "Comedor junto a la cocina con acabados de madera", "comedor"),
      photo("cocina-principal", "Cocina", "Cocina disponible para preparar alimentos durante la estadía.", "Cocina con gabinetes de madera y electrodomésticos visibles", "cocina"),
      photo("cocina-mesada", "Área de preparación", "Una vista del área de preparación y lavado de la cocina.", "Mesada y fregadero de la cocina", "cocina"),
      photo("cocina-02", "Espacio de cocina", "Otro ángulo del espacio destinado a preparar alimentos.", "Vista adicional del interior de la cocina", "cocina"),
      photo("habitacion-01", "Habitación", "Una habitación de ambiente cálido pensada para el descanso.", "Habitación con cama y techo de madera", "habitacion"),
      photo("habitacion-02", "Espacio para descansar", "Un ambiente interior sencillo y acogedor para descansar.", "Habitación con cama y ventana lateral", "habitacion"),
      photo("habitacion-03", "Habitación con luz natural", "Una habitación con ventana y acabados de madera visibles.", "Habitación con cama, cortinas claras y aire acondicionado visible", "habitacion"),
      photo("habitacion-literas", "Habitación con varias camas", "Un espacio de descanso con varias camas visibles.", "Habitación con litera y otras camas visibles", "habitacion"),
      photo("bano-01", "Baño", "Un baño con acabados en tonos naturales.", "Baño con ducha y lavamanos", "bano"),
      photo("bano-tina", "Baño con tina", "Una vista del baño y la tina visible en la fotografía.", "Baño con tina de hidromasaje visible", "bano"),
      photo("pasillo-interior", "Pasillo interior", "El pasillo comunica los distintos ambientes interiores de la casa.", "Pasillo interior con puertas y acabados de madera", "otros"),
    ],
    amenities: [
      { label: "Frente a la playa", icon: "map-pin", confirmed: true },
      { label: "Piscina", icon: "waves", confirmed: true },
      { label: "Sala y comedor", icon: "house", confirmed: true },
      { label: "Cocina", icon: "cooking-pot", confirmed: true },
      { label: "Habitaciones", icon: "bed", confirmed: true },
      { label: "Áreas de descanso", icon: "hammock", confirmed: true },
    ],
    rooms: [
      {
        name: "Habitaciones",
        description: "Las fotografías muestran distintas habitaciones y opciones de descanso. La distribución y capacidad exactas están pendientes de confirmación.",
        confirmed: true,
      },
    ],
    kitchenInventory: [
      "Estufa",
      "Refrigeradora",
      "Microondas",
      "Gabinetes",
      "Área de trabajo",
    ],
    videos: [],
    reviews: [],
    whatsappMessage: "Hola, vi Casa Palac en la página de Nico Experience y me gustaría consultar disponibilidad.",
    featured: true,
    active: true,
  },
])

export const activeProperties = properties.filter((property) => property.active)
export const featuredProperties = activeProperties.filter((property) => property.featured)

export function getProperty(slug: string) {
  return activeProperties.find((property) => property.slug === slug)
}
