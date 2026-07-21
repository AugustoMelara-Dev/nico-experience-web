export type GalleryCategory =
  | "piscina"
  | "terraza"
  | "sala"
  | "comedor"
  | "cocina"
  | "habitacion"
  | "bano"
  | "exterior"
  | "area-social";

export type Property = {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  price?: {
    amount: number;
    currency: "HNL" | "USD";
    unit: "night" | "person" | "package";
    note?: string;
  };
  additionalPersonPrice?: number;
  capacity?: number;
  bedrooms?: number;
  beds?: string[];
  bathrooms?: number;
  checkIn?: string;
  checkOut?: string;
  deposit?: number;
  featuredImage: string;
  gallery: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    category: GalleryCategory;
  }[];
  amenities: { id: string; label: string; icon?: string }[];
  highlights: string[];
  rules: string[];
  videos?: {
    title: string;
    url: string;
    provider?: "youtube" | "facebook" | "instagram" | "tiktok" | "other";
  }[];
  testimonials?: {
    name: string;
    rating?: number;
    comment: string;
    source?: string;
  }[];
  whatsappMessage?: string;
  active: boolean;
  featured?: boolean;
};

const image = (name: string) => `/images/casa-vip/${name}.webp`;

export const properties = [
  {
    slug: "casa-vip",
    name: "Casa VIP",
    shortDescription:
      "Un espacio para compartir, descansar y disfrutar con privacidad.",
    fullDescription:
      "Casa VIP reúne ambientes interiores acogedores con terrazas de madera y una piscina iluminada. Sus espacios invitan a compartir con calma, preparar alimentos durante la estadía y disfrutar distintos rincones para descansar.",
    location: "Honduras",
    price: { amount: 9000, currency: "HNL", unit: "night" },
    additionalPersonPrice: 1000,
    checkIn: "2:00 p. m.",
    checkOut: "12:00 m.",
    deposit: 1500,
    featuredImage: image("piscina-noche-principal"),
    gallery: [
      { src: image("piscina-noche-principal"), alt: "Piscina iluminada de Casa VIP rodeada por terrazas de madera", title: "Piscina iluminada", category: "piscina" },
      { src: image("terraza-noche-01"), alt: "Terraza techada de madera iluminada durante la noche", title: "Terraza por la noche", category: "terraza" },
      { src: image("piscina-exterior-noche"), alt: "Vista exterior nocturna de la piscina y la terraza", title: "Exterior nocturno", category: "piscina" },
      { src: image("terraza-dia"), alt: "Terraza de madera con mesa y vista al entorno tropical", title: "Terraza durante el día", category: "terraza" },
      { src: image("sala-comedor"), alt: "Sala y comedor conectados con ventanales hacia la terraza", title: "Sala y comedor", category: "comedor" },
      { src: image("sala-principal"), alt: "Sala de Casa VIP con sofás y acceso a la terraza", title: "Sala principal", category: "sala" },
      { src: image("comedor-cocina"), alt: "Comedor junto a la cocina con acabados de madera", title: "Comedor y cocina", category: "comedor" },
      { src: image("cocina-principal"), alt: "Cocina con gabinetes de madera, estufa y refrigerador visibles", title: "Cocina", category: "cocina" },
      { src: image("cocina-mesada"), alt: "Área de mesada y fregadero de la cocina", title: "Área de cocina", category: "cocina" },
      { src: image("habitacion-01"), alt: "Habitación con cama doble y techo de madera", title: "Habitación", category: "habitacion" },
      { src: image("habitacion-02"), alt: "Habitación acogedora con cama y ventana lateral", title: "Habitación", category: "habitacion" },
      { src: image("habitacion-03"), alt: "Habitación con cama doble, cortinas claras y aire acondicionado visible", title: "Habitación", category: "habitacion" },
      { src: image("habitacion-literas"), alt: "Habitación con litera y camas visibles", title: "Habitación con varias camas", category: "habitacion" },
      { src: image("bano-01"), alt: "Baño con ducha, lavamanos y acabados en tonos naturales", title: "Baño", category: "bano" },
      { src: image("bano-tina"), alt: "Baño de Casa VIP con tina de hidromasaje visible", title: "Baño con tina", category: "bano" },
      { src: image("corredor-hamacas"), alt: "Corredor techado con hamacas y acabados de madera", title: "Corredor con hamacas", category: "area-social" },
      { src: image("exterior-estacionamiento"), alt: "Exterior de la propiedad con palmeras y área de acceso", title: "Acceso exterior", category: "exterior" },
      { src: image("exterior-escaleras"), alt: "Escaleras exteriores que conectan las terrazas de madera", title: "Exterior", category: "exterior" },
    ],
    amenities: [],
    highlights: [
      "Piscina iluminada",
      "Terrazas de madera",
      "Sala y comedor",
      "Cocina",
      "Habitaciones",
      "Áreas para descansar",
    ],
    rules: [
      "No se permiten mascotas",
      "No fumar",
      "No hay reembolso ni cambio de fecha",
      "Se realiza prechequeo al entrar y al salir",
      "Se recomienda llevar equipo de sonido",
    ],
    whatsappMessage:
      "Hola, vi Casa VIP en la página de Nico Experience y me gustaría consultar disponibilidad para [fecha] y [cantidad de personas].",
    active: true,
    featured: true,
  },
] satisfies Property[];

export const activeProperties = properties.filter((property) => property.active);

export function getProperty(slug: string) {
  return activeProperties.find((property) => property.slug === slug);
}
