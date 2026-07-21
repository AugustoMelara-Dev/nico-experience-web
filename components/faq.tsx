"use client"

import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

const accordionItems = [
  {
    title: "¿Cómo puedo solicitar ayuda?",
    content: <div className="text-muted-foreground">Selecciona el servicio que necesitas, cuéntanos brevemente tu caso y continúa la conversación por WhatsApp. El mensaje se prepara con la información que tú proporcionas.</div>,
  },
  {
    title: "¿Qué servicios ofrece Nico Experience?",
    content: <div className="text-muted-foreground">Brindamos atención personalizada para viajes, hospedaje, trámites, gestiones y soluciones digitales, adaptándonos a las necesidades de cada cliente.</div>,
  },
  {
    title: "¿Cómo consulto un alojamiento?",
    content: <div className="text-muted-foreground">Abre la ficha del alojamiento o selecciona Hospedaje en el formulario. Puedes indicar fecha aproximada, cantidad de personas y tu consulta antes de continuar por WhatsApp.</div>,
  },
  {
    title: "¿Dónde se encuentra Casa Palac?",
    content: <div className="text-muted-foreground">Puedes abrir la ubicación oficial en <Link href="https://maps.app.goo.gl/BhDjLciEvjhp8pBN8?g_st=iw" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Maps</Link>.</div>,
  },
  {
    title: "¿Dónde atiende Nico Experience?",
    content: <div className="text-muted-foreground">Nico Experience está ubicada en Tocoa, Colón. La atención y el alcance de cada solicitud se confirman directamente según el servicio.</div>,
  },
  {
    title: "¿Qué sucede después de enviar la consulta?",
    content: <div className="text-muted-foreground">WhatsApp se abrirá con un mensaje preparado. Revísalo, envíalo y recibirás atención personalizada para definir los siguientes pasos.</div>,
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
        <p className="max-w-xl text-muted-foreground text-center">Información útil antes de contarnos qué necesitas.</p>
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
