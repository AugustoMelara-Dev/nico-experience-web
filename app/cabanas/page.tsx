import type { Metadata } from "next";
import { activeProperties } from "@/content/properties";
import { PropertyCard } from "@/components/property-card";

export const metadata: Metadata = { title: "Cabañas", description: "Explora los hospedajes activos de Nico Experience en Honduras.", alternates: { canonical: "/cabanas" } };

export default function PropertiesPage() {
  return <main id="contenido"><section className="bg-forest py-20 text-white sm:py-28"><div className="container-site"><h1 className="max-w-4xl font-display text-6xl font-semibold leading-none sm:text-8xl">Cabañas para vivir a tu ritmo</h1><p className="mt-7 max-w-xl leading-8 text-white/75">Fotografías reales, información clara y una página propia para compartir cada hospedaje.</p></div></section><section className="section-space bg-sand"><div className="container-site"><div className="space-y-10">{activeProperties.map((property) => <PropertyCard key={property.slug} property={property} />)}</div></div></section></main>;
}
