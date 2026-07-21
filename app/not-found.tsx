import Link from "next/link";

export default function NotFound() {
  return <main id="contenido" className="grid min-h-[70svh] place-items-center bg-sand px-4 text-center"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-terracotta">404</p><h1 className="mt-4 font-display text-6xl font-semibold text-forest">Este camino no lleva a una cabaña</h1><p className="mx-auto mt-5 max-w-lg leading-7 text-muted">La página que buscas no existe o el hospedaje ya no está activo.</p><Link href="/cabanas" className="mt-8 inline-flex rounded-lg bg-forest px-6 py-3 text-sm font-bold text-white hover:bg-forest-deep">Ver cabañas activas</Link></div></main>;
}
