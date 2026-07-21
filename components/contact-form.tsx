"use client"

import { FormEvent, useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  buildInquiryMessage,
  buildWhatsAppUrl,
  type InquiryInput,
} from "@/lib/whatsapp"

const inputClass = "mt-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"

type ServiceSelection = InquiryInput["service"]

const serviceOptions: { value: ServiceSelection; label: string }[] = [
  { value: "viajes", label: "Viajes" },
  { value: "hospedaje", label: "Hospedaje" },
  { value: "tramites", label: "Trámites" },
  { value: "gestiones", label: "Gestiones" },
  { value: "soluciones-digitales", label: "Soluciones digitales" },
  { value: "otro", label: "Otro" },
]

export function ContactForm({
  initialService = "otro",
}: {
  initialService?: ServiceSelection
}) {
  const [notice, setNotice] = useState("")
  const [service, setService] = useState<ServiceSelection>(initialService)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const message = buildInquiryMessage({
      name: String(form.get("name")),
      service,
      details: String(form.get("details")),
      property:
        service === "hospedaje" ? String(form.get("property")) : undefined,
      date: service === "hospedaje" ? String(form.get("date")) : undefined,
      guests:
        service === "hospedaje" ? String(form.get("guests")) : undefined,
      destination:
        service === "viajes" ? String(form.get("destination")) : undefined,
    })
    const url = buildWhatsAppUrl(message)
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
      setNotice("Tu consulta está lista. Continúa en WhatsApp para enviarla.")
    } else {
      setNotice(
        "No fue posible abrir WhatsApp. Tus datos no fueron enviados ni almacenados.",
      )
    }
  }

  return (
    <Card className="rounded-2xl">
      <CardContent>
        <form onSubmit={submit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Nombre
              <input required name="name" autoComplete="name" className={inputClass} />
            </label>
            <label className="text-sm font-medium">
              ¿En qué podemos ayudarte?
              <select
                name="service"
                value={service}
                onChange={(event) => setService(event.target.value as ServiceSelection)}
                className={inputClass}
              >
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            {service === "hospedaje" && (
              <>
                <label className="text-sm font-medium">
                  Alojamiento
                  <input name="property" value="Casa Palac" readOnly className={inputClass} />
                </label>
                <label className="text-sm font-medium">
                  Fecha aproximada
                  <input name="date" type="date" className={inputClass} />
                </label>
                <label className="text-sm font-medium">
                  Cantidad de personas
                  <input name="guests" type="number" min="1" className={inputClass} />
                </label>
              </>
            )}
            {service === "viajes" && (
              <label className="text-sm font-medium sm:col-span-2">
                Destino o necesidad
                <input name="destination" className={inputClass} />
              </label>
            )}
            <label className="text-sm font-medium sm:col-span-2">
              Cuéntanos qué necesitas
              <textarea
                required
                name="details"
                rows={5}
                className={`${inputClass} h-auto resize-y`}
              />
            </label>
          </div>
          <Button type="submit"><Send /> Continuar en WhatsApp</Button>
          {notice && <p role="status" className="rounded-lg border border-border bg-card p-4 text-sm leading-6 text-muted-foreground">{notice}</p>}
        </form>
      </CardContent>
    </Card>
  )
}
