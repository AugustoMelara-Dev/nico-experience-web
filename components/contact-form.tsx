"use client"

import { FormEvent, useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  buildInquiryMessage,
  buildWhatsAppUrl,
  type InquiryInput,
} from "@/lib/whatsapp"

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
  const [isSubmitting, setIsSubmitting] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
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
    setIsSubmitting(false)
  }

  return (
    <Card className="rounded-2xl">
      <form onSubmit={submit}>
        <CardHeader>
          <CardTitle>Prepara tu consulta</CardTitle>
          <CardDescription>
            Usaremos estos datos únicamente para crear el mensaje que abrirás
            en WhatsApp.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="contact-name">Nombre</FieldLabel>
              <Input
                id="contact-name"
                required
                name="name"
                autoComplete="name"
                aria-describedby="contact-name-help"
              />
              <FieldDescription id="contact-name-help">
                Así podremos personalizar tu mensaje.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="contact-service">
                ¿En qué podemos ayudarte?
              </FieldLabel>
              <Select
                value={service}
                onValueChange={(value) =>
                  setService(value as ServiceSelection)
                }
              >
                <SelectTrigger
                  id="contact-service"
                  className="w-full"
                  aria-describedby="contact-service-help"
                >
                  <SelectValue placeholder="Selecciona un servicio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {serviceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription id="contact-service-help">
                Mostraremos campos útiles según tu selección.
              </FieldDescription>
            </Field>

            {service === "hospedaje" ? (
              <>
                <Field>
                  <FieldLabel htmlFor="contact-property">
                    Alojamiento
                  </FieldLabel>
                  <Input
                    id="contact-property"
                    name="property"
                    value="Casa Palac"
                    readOnly
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="contact-date">
                    Fecha aproximada
                  </FieldLabel>
                  <Input id="contact-date" name="date" type="date" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="contact-guests">
                    Cantidad de personas
                  </FieldLabel>
                  <Input
                    id="contact-guests"
                    name="guests"
                    type="number"
                    min="1"
                    inputMode="numeric"
                  />
                </Field>
              </>
            ) : null}

            {service === "viajes" ? (
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="contact-destination">
                  Destino o necesidad
                </FieldLabel>
                <Input id="contact-destination" name="destination" />
              </Field>
            ) : null}

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="contact-details">
                Cuéntanos qué necesitas
              </FieldLabel>
              <Textarea
                id="contact-details"
                required
                name="details"
                rows={5}
                aria-describedby="contact-details-help"
              />
              <FieldDescription id="contact-details-help">
                Incluye los detalles que nos ayuden a entender mejor tu caso.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <Button type="submit" disabled={isSubmitting}>
            <Send data-icon="inline-start" />
            Continuar en WhatsApp
          </Button>
          {notice ? (
            <p
              role="status"
              className="rounded-lg border bg-muted p-4 text-sm leading-6 text-muted-foreground"
            >
              {notice}
            </p>
          ) : null}
        </CardFooter>
      </form>
    </Card>
  )
}
