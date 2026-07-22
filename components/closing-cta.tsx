import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { businessConfig } from "@/config/business"

export default function ClosingCta() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="grid gap-8 overflow-hidden rounded-2xl border bg-card p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12">
        <div className="flex max-w-3xl flex-col gap-4">
          <span className="text-sm font-medium text-primary">
            Una conversación puede aclararlo todo
          </span>
          <h2 className="text-3xl font-medium tracking-tighter sm:text-4xl">
            Cuéntanos qué necesitas. Buscamos contigo la mejor solución.
          </h2>
          <Link
            href={businessConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <MapPin className="size-4" aria-hidden="true" />
            {businessConfig.locationLabel}
          </Link>
        </div>
        <Button asChild size="lg">
          <Link href="/contacto">
            Iniciar consulta
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
