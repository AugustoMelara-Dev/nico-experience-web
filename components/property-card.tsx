import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import type { Property } from "@/content/properties";
import { formatCurrency } from "@/lib/format";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { TrackedLink } from "@/components/tracked-link";

export function PropertyCard({ property }: { property: Property }) {
  const whatsappUrl = buildWhatsAppUrl(property.whatsappMessage ?? `Hola, quiero consultar disponibilidad para ${property.name}.`);
  return (
    <article className="group grid overflow-hidden rounded-[1.25rem] bg-white shadow-[0_18px_60px_rgba(23,63,53,.08)] md:grid-cols-[1.45fr_.8fr]">
      <Link href={`/cabanas/${property.slug}`} className="relative min-h-80 overflow-hidden">
        <Image src={property.featuredImage} alt={`Vista principal de ${property.name}`} fill sizes="(min-width: 768px) 65vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
      </Link>
      <div className="flex flex-col justify-between p-7 sm:p-9">
        <div>
          <div className="flex items-center gap-2 text-sm text-terracotta"><MapPin className="size-4" aria-hidden="true" />{property.location}</div>
          <h3 className="mt-3 font-display text-4xl font-semibold text-forest">{property.name}</h3>
          <p className="mt-4 text-sm leading-7 text-muted">{property.shortDescription}</p>
          {property.price && <p className="mt-6 text-2xl font-bold text-forest">{formatCurrency(property.price.amount, property.price.currency)} <span className="text-sm font-medium text-muted">/ noche</span></p>}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row md:flex-col xl:flex-row">
          <TrackedLink eventName="property_view" eventData={{ property: property.slug }} href={`/cabanas/${property.slug}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-terracotta px-5 text-sm font-bold text-white hover:bg-terracotta-dark">Ver detalles <ArrowUpRight className="size-4" /></TrackedLink>
          <TrackedLink eventName="whatsapp_click" eventData={{ property: property.slug }} href={whatsappUrl ?? "/contacto"} target={whatsappUrl ? "_blank" : undefined} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-forest/20 px-5 text-sm font-bold text-forest hover:bg-forest/5"><MessageCircle className="size-4" /> Consultar</TrackedLink>
        </div>
      </div>
    </article>
  );
}
