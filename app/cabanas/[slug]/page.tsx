import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bath, BedDouble, ChefHat, Clock3, MapPin, MessageCircle, Palmtree, ShieldCheck, Sparkles, Waves } from "lucide-react";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { ShareButton } from "@/components/share-button";
import { TrackedLink } from "@/components/tracked-link";
import { activeProperties, getProperty } from "@/content/properties";
import { formatCurrency } from "@/lib/format";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return activeProperties.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return {};
  const path = `/cabanas/${property.slug}`;
  return {
    title: property.name,
    description: property.shortDescription,
    alternates: { canonical: path },
    openGraph: { type: "website", title: `${property.name} | Nico Experience`, description: property.shortDescription, url: path, images: [{ url: property.featuredImage, alt: `Vista principal de ${property.name}` }] },
    twitter: { card: "summary_large_image", title: `${property.name} | Nico Experience`, description: property.shortDescription, images: [property.featuredImage] },
  };
}

const highlightIcons = [Waves, Palmtree, Sparkles, ChefHat, BedDouble, Bath];

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();
  const whatsappUrl = buildWhatsAppUrl(property.whatsappMessage ?? `Hola, quiero consultar disponibilidad para ${property.name}.`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    description: property.shortDescription,
    image: property.gallery.map((image) => new URL(image.src, siteConfig.siteUrl).toString()),
    url: new URL(`/cabanas/${property.slug}`, siteConfig.siteUrl).toString(),
    address: { "@type": "PostalAddress", addressCountry: "HN" },
    ...(property.price ? { priceRange: `${formatCurrency(property.price.amount, property.price.currency)} por noche` } : {}),
  };

  return (
    <main id="contenido" className="bg-sand-light">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="bg-sand">
        <div className="container-site py-10 sm:py-14">
          <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-2 text-xs text-muted"><Link href="/">Inicio</Link><span>/</span><Link href="/cabanas">Cabañas</Link><span>/</span><span aria-current="page" className="text-terracotta">{property.name}</span></nav>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div><h1 className="font-display text-7xl font-semibold leading-none text-forest sm:text-8xl">{property.name}</h1><p className="mt-5 flex items-center gap-2 text-sm text-muted"><MapPin className="size-4 text-terracotta" />{property.location}</p><p className="mt-4 max-w-xl leading-7 text-muted">{property.shortDescription}</p></div>
            <div className="lg:border-l lg:border-forest/20 lg:pl-10">{property.price && <p className="font-display text-4xl font-semibold text-forest sm:text-5xl">{formatCurrency(property.price.amount, property.price.currency)} <span className="font-sans text-sm font-medium text-muted">por noche</span></p>}<div className="mt-6 flex flex-col gap-3 sm:flex-row"><TrackedLink eventName="whatsapp_click" eventData={{ property: property.slug }} href={whatsappUrl ?? "/contacto"} target={whatsappUrl ? "_blank" : undefined} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-terracotta px-5 text-sm font-bold text-white hover:bg-terracotta-dark"><MessageCircle className="size-4" /> Consultar disponibilidad</TrackedLink><ShareButton title={property.name} /></div></div>
          </div>
        </div>
        <div className="relative aspect-[16/8] min-h-[22rem] w-full"><Image src={property.featuredImage} alt={`Piscina iluminada de ${property.name}`} fill priority sizes="100vw" className="object-cover" /></div>
      </section>

      <section className="section-space"><div className="container-site grid gap-12 lg:grid-cols-[.65fr_1.35fr]"><div><h2 className="font-display text-5xl font-semibold text-forest">Conoce {property.name}</h2><p className="mt-6 leading-8 text-muted">{property.fullDescription}</p></div><div className="grid grid-cols-2 gap-3"><div className="relative col-span-1 row-span-2 aspect-[3/4] overflow-hidden rounded-xl"><Image src="/images/casa-vip/pasillo-interior.webp" alt="Pasillo interior con techo y acabados de madera" fill sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover" /></div><div className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src="/images/casa-vip/terraza-vista.webp" alt="Terraza de madera con vista al entorno" fill sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover" /></div><div className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src="/images/casa-vip/exterior-estacionamiento.webp" alt="Acceso exterior de la propiedad" fill sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover" /></div></div></div></section>

      <section className="pb-20 sm:pb-28" aria-labelledby="gallery-title"><div className="container-site"><div className="mb-8 flex items-end justify-between gap-5"><div><h2 id="gallery-title" className="font-display text-5xl font-semibold text-forest">Galería</h2><p className="mt-3 text-sm text-muted">Selecciona una fotografía para verla en detalle.</p></div><span className="hidden text-sm text-muted sm:block">{property.gallery.length} fotografías</span></div><GalleryLightbox images={property.gallery} /></div></section>

      <section className="bg-white py-18 sm:py-24"><div className="container-site"><h2 className="font-display text-5xl font-semibold text-forest">Lo que disfrutarás</h2><div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">{property.highlights.map((item, index) => { const Icon = highlightIcons[index % highlightIcons.length]; return <div key={item} className="flex items-center gap-4 border-b border-forest/15 pb-5"><Icon className="size-7 text-terracotta" strokeWidth={1.5} /><span className="font-semibold text-forest">{item}</span></div>; })}</div></div></section>

      <section className="section-space bg-sand"><div className="container-site"><h2 className="font-display text-5xl font-semibold text-forest">Precios y condiciones</h2><div className="mt-9 grid divide-y divide-forest/15 rounded-[1.25rem] bg-sand-light p-6 sm:grid-cols-5 sm:divide-x sm:divide-y-0 sm:p-0">{property.price && <PriceItem label="Renta" value={`${formatCurrency(property.price.amount, property.price.currency)} por noche`} />}{property.additionalPersonPrice && <PriceItem label="Persona adicional" value={formatCurrency(property.additionalPersonPrice, "HNL")} />}{property.deposit && <PriceItem label="Depósito" value={formatCurrency(property.deposit, "HNL")} />}<PriceItem label="Check-in" value={property.checkIn ?? "Por confirmar"} icon={<Clock3 className="size-4" />} /><PriceItem label="Check-out" value={property.checkOut ?? "Por confirmar"} icon={<Clock3 className="size-4" />} /></div><p className="mt-4 text-xs leading-6 text-muted">Condiciones informadas para Casa VIP. Confirma su vigencia y disponibilidad antes de realizar cualquier pago.</p></div></section>

      <section className="section-space bg-sand-light"><div className="container-site grid gap-12 lg:grid-cols-[.55fr_1.45fr]"><div><h2 className="font-display text-5xl font-semibold text-forest">Reglas de la estadía</h2><p className="mt-5 text-sm leading-7 text-muted">Revísalas y confirma que continúan vigentes al momento de consultar.</p></div><ul className="divide-y divide-forest/20">{property.rules.map((rule) => <li key={rule} className="flex gap-4 py-5 first:pt-0"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-terracotta" /><span className="text-sm font-semibold text-forest">{rule}</span></li>)}</ul></div></section>

      <section className="bg-forest py-14 text-white"><div className="container-site flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-display text-4xl font-semibold">¿Listo para consultar tu fecha?</h2><p className="mt-2 text-sm text-white/65">Prepara tu mensaje y confirma la información antes de reservar.</p></div><TrackedLink eventName="whatsapp_click" eventData={{ property: property.slug, source: "closing_cta" }} href={whatsappUrl ?? "/contacto"} target={whatsappUrl ? "_blank" : undefined} className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-terracotta px-6 text-sm font-bold text-white hover:bg-terracotta-dark"><MessageCircle className="size-4" /> Consultar disponibilidad</TrackedLink></div></section>
    </main>
  );
}

function PriceItem({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return <div className="flex min-h-28 flex-col justify-center px-5 py-5 sm:text-center"><span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-muted sm:justify-center">{icon}{label}</span><span className="mt-2 font-display text-2xl font-semibold text-forest">{value}</span></div>;
}
