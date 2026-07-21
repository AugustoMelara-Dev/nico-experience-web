"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

export function WhatsAppLink({ message, label = "Consultar por WhatsApp", variant = "default" }: { message: string; label?: string; variant?: "default" | "outline" }) {
  const url = buildWhatsAppUrl(message)
  return (
    <Button asChild variant={variant}>
      <Link href={url ?? "/contacto"} target={url ? "_blank" : undefined} rel={url ? "noopener noreferrer" : undefined}>
        <MessageCircle />
        {label}
      </Link>
    </Button>
  )
}
