"use client"

import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

const accordionItems = [
  {
    title: "¿Cómo consulto disponibilidad?",
    content: <div className="text-muted-foreground">Abre la ficha del alojamiento y usa el botón de consulta. El mensaje incluirá automáticamente el nombre de Casa Palac frente a playa.</div>,
  },
  {
    title: "¿Cómo puedo reservar?",
    content: <div className="text-muted-foreground">Primero consulta disponibilidad con Nico Experience. Las condiciones de reserva se confirman directamente antes de realizar cualquier pago.</div>,
  },
  {
    title: "¿Dónde se encuentra Casa Palac?",
    content: <div className="text-muted-foreground">Puedes abrir la ubicación oficial en <Link href="https://maps.app.goo.gl/BhDjLciEvjhp8pBN8?g_st=iw" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Maps</Link>.</div>,
  },
  {
    title: "¿Cuáles son las reglas de ingreso?",
    content: <div className="text-muted-foreground">Los horarios, requisitos y reglas de ingreso están pendientes de confirmación. Solicítalos al consultar para recibir información vigente.</div>,
  },
  {
    title: "¿Cuál es la política de cambios o cancelaciones?",
    content: <div className="text-muted-foreground">Esta política aún no se ha publicado porque falta confirmación del negocio. Se informará antes de completar una reserva.</div>,
  },
]

export default function Faq() {
  return (
    <motion.section
      id="preguntas"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5, type: "spring", bounce: 0 }}
      className="relative w-full max-w-(--breakpoint-xl) mx-auto px-4 py-28 gap-5 md:px-8 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col gap-3 justify-center items-center">
        <h4 className="text-2xl font-bold sm:text-3xl bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">Preguntas frecuentes</h4>
        <p className="max-w-xl text-muted-foreground text-center">Información útil para planear tu consulta y estadía.</p>
      </div>
      <div className="flex w-full max-w-lg">
        <Accordion type="multiple" className="w-full">
          {accordionItems.map((item, index) => (
            <AccordionItem key={item.title} value={`item-${index}`} className="text-muted-foreground">
              <AccordionTrigger className="text-left">{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  )
}
