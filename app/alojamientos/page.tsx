import type { Metadata } from "next"
import Link from "next/link"
import { MessageCircle } from "lucide-react"

import Footer from "@/components/footer"
import { PropertyCatalog } from "@/components/property-catalog"
import { ShareButton } from "@/components/share-button"
import { Button } from "@/components/ui/button"
import { activeProperties } from "@/content/properties"

export const metadata: Metadata = {
  title: "Alojamientos",
  description:
    "Explora los alojamientos activos de Nico Experience en Honduras.",
  alternates: { canonical: "/alojamientos" },
}

export default function PropertiesPage() {
  return (
    <main id="contenido">
      <section className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center md:px-8 md:py-28">
        <div className="flex max-w-3xl flex-col items-center gap-5">
          <span className="text-sm font-medium text-primary">
            Catálogo activo
          </span>
          <h1 className="text-4xl font-medium tracking-tighter text-pretty sm:text-6xl">
            Alojamientos para elegir con confianza
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Fotografías reales, información prudente y una página individual
            para conocer cada propiedad antes de consultar.
          </p>
        </div>
        <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button asChild>
            <Link href="/contacto?servicio=hospedaje">
              <MessageCircle data-icon="inline-start" aria-hidden="true" />
              Consultar hospedaje
            </Link>
          </Button>
          <ShareButton
            title="Alojamientos de Nico Experience"
            text="Conoce los alojamientos disponibles en Nico Experience."
            url="/alojamientos"
            label="Compartir catálogo"
          />
        </div>
      </section>

      <PropertyCatalog properties={activeProperties} />
      <Footer />
    </main>
  )
}
