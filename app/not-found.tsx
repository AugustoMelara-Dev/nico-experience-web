import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main id="contenido" className="min-h-[70svh] px-4 py-28">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
        <span className="rounded-full border border-border bg-card px-2 py-1 text-sm">404</span>
        <h1 className="text-4xl font-medium tracking-tighter sm:text-6xl bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
          Esta página no está disponible
        </h1>
        <p className="text-muted-foreground">El alojamiento no existe o no está activo.</p>
        <Button asChild><Link href="/alojamientos">Ver alojamientos</Link></Button>
      </div>
    </main>
  )
}
