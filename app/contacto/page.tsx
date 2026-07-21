import type { Metadata } from "next"
import Footer from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = { title: "Contacto", description: "Prepara una consulta de disponibilidad con Nico Experience.", alternates: { canonical: "/contacto" } }

export default function ContactPage() {
  return (
    <main id="contenido">
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-28 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
        <div className="space-y-5">
          <span className="w-fit text-sm bg-card px-2 py-1 border border-border rounded-full">Contacto</span>
          <h1 className="text-4xl font-medium tracking-tighter sm:text-6xl bg-linear-to-b from-sky-800 dark:from-sky-100 to-foreground dark:to-foreground bg-clip-text text-transparent">Consulta tu próxima estadía</h1>
          <p className="leading-8 text-muted-foreground">Prepara un mensaje con fecha y cantidad de personas. El número oficial todavía debe configurarse en el entorno antes de poder abrir WhatsApp.</p>
        </div>
        <ContactForm />
      </section>
      <Footer />
    </main>
  )
}
