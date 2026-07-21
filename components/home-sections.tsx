import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, MessageCircle, UsersRound } from "lucide-react";
import { activeProperties } from "@/content/properties";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { PropertyCard } from "@/components/property-card";
import { TrackedLink } from "@/components/tracked-link";
import Faq from "@/components/faq";

const whatsappUrl = buildWhatsAppUrl("Hola, visité la página de Nico Experience y me gustaría consultar disponibilidad.");

export function HomeHero() {
  return (
    <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-forest text-white lg:min-h-[68svh]">
      <Image src="/images/casa-vip/piscina-noche-principal.webp" alt="Piscina iluminada y terrazas de madera de Casa VIP durante la noche" fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,27,23,.9)_0%,rgba(8,27,23,.58)_42%,rgba(8,27,23,.08)_72%)]" />
      <div className="container-site relative flex min-h-[calc(100svh-5rem)] items-center py-20 lg:min-h-[68svh]">
        <div className="max-w-2xl">
          <h1 className="text-balance font-display text-6xl font-semibold leading-[.92] sm:text-7xl lg:text-[6.5rem]">Tu próxima escapada empieza aquí</h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-white/82 sm:text-lg">Hospedajes para descansar, compartir y disfrutar Honduras a tu ritmo.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/cabanas" className="inline-flex h-13 items-center justify-center gap-2 rounded-lg bg-terracotta px-7 text-sm font-bold text-white hover:bg-terracotta-dark">Ver cabañas <ArrowRight className="size-4" /></Link>
            <TrackedLink eventName="whatsapp_click" eventData={{ source: "home_hero" }} href={whatsappUrl ?? "/contacto"} target={whatsappUrl ? "_blank" : undefined} className="inline-flex h-13 items-center justify-center gap-2 rounded-lg border border-white/65 px-7 text-sm font-bold text-white hover:bg-white/10"><MessageCircle className="size-5" /> Consultar por WhatsApp</TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedProperties() {
  return (
    <section className="section-space bg-sand" aria-labelledby="destacadas">
      <div className="container-site">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div><span className="block h-0.5 w-12 bg-terracotta" /><h2 id="destacadas" className="mt-5 max-w-xl font-display text-5xl font-semibold leading-none text-forest sm:text-6xl">Una estadía para recordar</h2></div>
          <p className="max-w-md text-sm leading-7 text-muted">Conoce cada espacio mediante fotografías reales, información clara y una consulta directa antes de reservar.</p>
        </div>
        <div className="space-y-8">{activeProperties.filter((property) => property.featured).map((property) => <PropertyCard key={property.slug} property={property} />)}</div>
      </div>
    </section>
  );
}

const benefits = [
  { icon: HeartHandshake, title: "Atención personalizada", text: "Te orientamos con información clara antes de confirmar tu estadía." },
  { icon: UsersRound, title: "Espacios para compartir", text: "Ambientes pensados para disfrutar con las personas que elijas." },
  { icon: MessageCircle, title: "Consulta directa", text: "Resuelve tus dudas y consulta fechas disponibles en un solo canal." },
];

export function ExperienceSections() {
  return (
    <>
      <section className="bg-forest text-white">
        <div className="container-site grid gap-12 py-20 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:py-28">
          <div><h2 className="font-display text-5xl font-semibold leading-none sm:text-6xl">Más que hospedaje, una experiencia cercana</h2><div className="mt-7 h-0.5 w-14 bg-terracotta" />
            <div className="mt-10 divide-y divide-white/15">{benefits.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-5 py-6 first:pt-0"><Icon className="mt-1 size-7 shrink-0 text-terracotta" strokeWidth={1.5} /><div><h3 className="font-display text-2xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/70">{text}</p></div></div>)}</div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem]"><Image src="/images/casa-vip/sala-principal.webp" alt="Sala de Casa VIP conectada con la terraza" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" /></div>
        </div>
      </section>
      <section className="section-space bg-sand-light">
        <div className="container-site"><h2 className="max-w-4xl font-display text-5xl font-semibold leading-none text-forest sm:text-6xl">Momentos que se disfrutan sin prisa</h2><div className="mt-6 h-0.5 w-14 bg-terracotta" />
          <div className="mt-12 grid gap-5 md:grid-cols-12 md:items-start">
            <figure className="md:col-span-4"><div className="relative aspect-[3/4] overflow-hidden rounded-[1.1rem]"><Image src="/images/casa-vip/corredor-hamacas.webp" alt="Corredor techado con hamacas" fill sizes="(min-width: 768px) 34vw, 100vw" className="object-cover" /></div><figcaption className="mt-3 font-display text-2xl text-forest">Espacios para descansar</figcaption></figure>
            <figure className="md:col-span-5 md:mt-24"><div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem]"><Image src="/images/casa-vip/sala-comedor.webp" alt="Sala y comedor con ventanales hacia la terraza" fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover" /></div><figcaption className="mt-3 font-display text-2xl text-forest">Sala y comedor</figcaption></figure>
            <figure className="md:col-span-3 md:mt-8"><div className="relative aspect-[3/4] overflow-hidden rounded-[1.1rem]"><Image src="/images/casa-vip/terraza-dia.webp" alt="Terraza de madera durante el día" fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover" /></div><figcaption className="mt-3 font-display text-2xl text-forest">Terraza de madera</figcaption></figure>
          </div>
        </div>
      </section>
      <Faq />
    </>
  );
}
