import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Nosotros", description: "Conoce el enfoque cercano y turístico de Nico Experience.", alternates: { canonical: "/nosotros" } };

export default function AboutPage() {
  return <main id="contenido"><section className="section-space bg-sand"><div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center"><div><h1 className="font-display text-6xl font-semibold leading-none text-forest sm:text-8xl">Hospitalidad que se siente cercana</h1><p className="mt-8 max-w-xl text-base leading-8 text-muted">Nico Experience presenta opciones de hospedaje en Honduras con una comunicación directa y fotografías que permiten conocer los espacios antes de consultar.</p><p className="mt-5 max-w-xl text-base leading-8 text-muted">La prioridad es ayudarte a elegir con información clara, sin promesas que no hayan sido confirmadas y con atención personalizada durante el proceso de consulta.</p><Link href="/cabanas" className="mt-8 inline-flex rounded-lg bg-terracotta px-6 py-3 text-sm font-bold text-white hover:bg-terracotta-dark">Conocer Casa VIP</Link></div><div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]"><Image src="/images/casa-vip/terraza-vista.webp" alt="Terraza de Casa VIP rodeada por vegetación" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></div></div></section></main>;
}
