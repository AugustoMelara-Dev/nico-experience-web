import type { Metadata } from "next";
import { Clock3, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contacto", description: "Prepara una consulta de disponibilidad con Nico Experience.", alternates: { canonical: "/contacto" } };

export default function ContactPage() {
  return <main id="contenido" className="bg-sand"><section className="container-site grid gap-12 py-16 sm:py-24 lg:grid-cols-[.7fr_1.3fr]"><div><h1 className="font-display text-6xl font-semibold leading-none text-forest sm:text-7xl">Hablemos de tu próxima estadía</h1><p className="mt-6 leading-8 text-muted">Prepara una consulta con la fecha y cantidad de personas. Cuando el canal oficial esté configurado, se abrirá WhatsApp con el mensaje listo.</p><div className="mt-10 space-y-5 text-sm"><p className="flex gap-3"><MessageCircle className="size-5 text-terracotta" /> WhatsApp y teléfono: pendientes de confirmación</p><p className="flex gap-3"><MapPin className="size-5 text-terracotta" /> Zona de atención: Honduras</p><p className="flex gap-3"><Clock3 className="size-5 text-terracotta" /> Horario de atención: pendiente de confirmación</p></div></div><ContactForm /></section></main>;
}
