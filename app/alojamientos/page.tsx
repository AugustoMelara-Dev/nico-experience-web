import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Pricing from "@/components/pricing"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Alojamientos",
  description: "Explora los alojamientos activos de Nico Experience en Honduras.",
  alternates: { canonical: "/alojamientos" },
}

export default function PropertiesPage() {
  return (
    <main id="contenido">
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center text-center">
        <span className="w-fit text-sm bg-card px-2 py-1 border border-border rounded-full">Catálogo activo</span>
        <h1 className="max-w-4xl text-4xl font-medium tracking-tighter md:text-6xl text-pretty bg-linear-to-b from-sky-800 dark:from-sky-100 to-foreground dark:to-foreground bg-clip-text text-transparent">Alojamientos de Nico Experience</h1>
        <p className="max-w-2xl text-lg text-muted-foreground text-balance">Fotografías reales, información prudente y una página individual para cada alojamiento.</p>
        <Button asChild variant="outline"><Link href="/alojamientos/casa-palac-frente-a-playa">Conocer Casa Palac</Link></Button>
      </section>
      <Pricing />
      <Footer />
    </main>
  )
}
