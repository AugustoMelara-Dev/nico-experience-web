import type { Metadata } from "next"

import { ContactForm } from "@/components/contact-form"
import Footer from "@/components/footer"
import { BusinessLocation } from "@/components/location/business-location"

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos qué necesitas y continúa la conversación con Nico Experience por WhatsApp.",
  alternates: { canonical: "/contacto" },
}

const allowedServices = new Set([
  "viajes",
  "hospedaje",
  "tramites",
  "gestiones",
  "soluciones-digitales",
  "otro",
] as const)

type ServiceSlug =
  | "viajes"
  | "hospedaje"
  | "tramites"
  | "gestiones"
  | "soluciones-digitales"
  | "otro"

type ContactPageProps = { searchParams: Promise<{ servicio?: string }> }

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { servicio } = await searchParams
  const initialService = allowedServices.has(servicio as never)
    ? (servicio as ServiceSlug)
    : "otro"

  return (
    <main id="contenido">
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:gap-16">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28">
          <span className="text-sm font-medium text-primary">Contacto</span>
          <h1 className="max-w-xl text-4xl font-medium tracking-tighter sm:text-6xl">
            Empecemos por entender qué necesitas
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            Selecciona un servicio y cuéntanos tu caso. Prepararemos un mensaje
            claro para continuar directamente por WhatsApp.
          </p>
          <p className="max-w-lg text-sm leading-6 text-muted-foreground">
            La página no almacena tus datos ni envía el mensaje por ti. Tú
            decides cuándo enviarlo desde WhatsApp.
          </p>
        </div>
        <ContactForm initialService={initialService} />
      </section>

      <BusinessLocation />
      <Footer />
    </main>
  )
}
