import type { Metadata } from "next"

import Footer from "@/components/footer"
import { PdfDownloadLink } from "@/components/pdf-download-link"
import Pricing from "@/components/pricing"

export const metadata: Metadata = {
  title: "Alojamientos",
  description:
    "Explora los alojamientos activos de Nico Experience en Honduras.",
  alternates: { canonical: "/alojamientos" },
}

export default function PropertiesPage() {
  return (
    <main id="contenido">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="flex max-w-3xl flex-col gap-5">
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
        <PdfDownloadLink
          href="/api/alojamientos/catalogo/pdf"
          label="Descargar catálogo PDF"
        />
      </section>

      <Pricing />
      <Footer />
    </main>
  )
}
