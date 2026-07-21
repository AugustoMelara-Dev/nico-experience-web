import type { Metadata } from "next"
import Footer from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = { title: "Contacto", description: "Cuéntanos qué necesitas y continúa la conversación con Nico Experience por WhatsApp.", alternates: { canonical: "/contacto" } }

const allowedServices = new Set(["viajes", "hospedaje", "tramites", "gestiones", "soluciones-digitales", "otro"] as const)

type ContactPageProps = { searchParams: Promise<{ servicio?: string }> }

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { servicio } = await searchParams
  const initialService = allowedServices.has(servicio as never)
    ? servicio as "viajes" | "hospedaje" | "tramites" | "gestiones" | "soluciones-digitales" | "otro"
    : "otro"

  return (
    <main id="contenido">
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-28 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
        <div className="space-y-5">
          <span className="w-fit text-sm bg-card px-2 py-1 border border-border rounded-full">Contacto</span>
          <h1 className="text-4xl font-medium tracking-tighter sm:text-6xl bg-linear-to-b from-sky-800 dark:from-sky-100 to-foreground dark:to-foreground bg-clip-text text-transparent">Cuéntanos qué necesitas</h1>
          <p className="leading-8 text-muted-foreground">Selecciona un servicio y escribe tu consulta. Prepararemos el mensaje con tus datos para continuar directamente por WhatsApp.</p>
        </div>
        <ContactForm initialService={initialService} />
      </section>
      <Footer />
    </main>
  )
}
