"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const items = [
  ["¿A qué hora es el check-in?", "Para Casa VIP, el check-in es a partir de las 2:00 p. m."],
  ["¿A qué hora es el check-out?", "Para Casa VIP, el check-out es a las 12:00 m."],
  ["¿Se permiten mascotas?", "No. La regla confirmada para Casa VIP indica que no se permiten mascotas."],
  ["¿Cómo consulto disponibilidad?", "Puedes usar el botón de consulta. El número oficial de WhatsApp se habilitará cuando sea confirmado."],
];

export default function Faq() {
  return (
    <section className="section-space bg-white" aria-labelledby="faq-title"><div className="container-site grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><h2 id="faq-title" className="font-display text-5xl font-semibold text-forest sm:text-6xl">Antes de tu estadía</h2><div className="mt-6 h-0.5 w-14 bg-terracotta" /></div><Accordion type="single" collapsible defaultValue="item-0" className="w-full">{items.map(([title, content], index) => <AccordionItem key={title} value={`item-${index}`} className="border-forest/20"><AccordionTrigger className="py-6 text-left text-base font-semibold text-ink hover:text-terracotta">{title}</AccordionTrigger><AccordionContent className="pb-6 leading-7 text-muted">{content}</AccordionContent></AccordionItem>)}</Accordion></div></section>
  );
}
