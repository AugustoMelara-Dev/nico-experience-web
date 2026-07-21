"use client"

import { FormEvent, useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

const inputClass = "mt-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"

export function ContactForm() {
  const [notice, setNotice] = useState("")

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const message = `Hola, vi Casa Palac en la página de Nico Experience. Soy ${String(form.get("name"))}. Fecha aproximada: ${String(form.get("date")) || "por definir"}. Personas: ${String(form.get("guests")) || "por definir"}. Me gustaría consultar disponibilidad.`
    const url = buildWhatsAppUrl(message)
    if (url) window.open(url, "_blank", "noopener,noreferrer")
    else setNotice("El número oficial de WhatsApp está pendiente de configuración. Tus datos no fueron enviados ni almacenados.")
  }

  return (
    <Card className="rounded-2xl">
      <CardContent>
        <form onSubmit={submit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">Nombre<input required name="name" autoComplete="name" className={inputClass} /></label>
            <label className="text-sm font-medium">Alojamiento<input name="property" value="Casa Palac" readOnly className={inputClass} /></label>
            <label className="text-sm font-medium">Fecha aproximada<input name="date" type="date" className={inputClass} /></label>
            <label className="text-sm font-medium">Cantidad de personas<input name="guests" type="number" min="1" className={inputClass} /></label>
          </div>
          <Button type="submit"><Send /> Preparar consulta</Button>
          {notice && <p role="status" className="rounded-lg border border-border bg-card p-4 text-sm leading-6 text-muted-foreground">{notice}</p>}
        </form>
      </CardContent>
    </Card>
  )
}
