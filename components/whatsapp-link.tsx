"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

export function WhatsAppLink({ message, label = "Consultar por WhatsApp", variant = "default", className }: { message: string; label?: string; variant?: "default" | "outline"; className?: string }) {
  const url = buildWhatsAppUrl(message)
  return (
    <Button asChild variant={variant} className={className}>
      <Link href={url ?? "/contacto"} target={url ? "_blank" : undefined} rel={url ? "noopener noreferrer" : undefined}>
        <MessageCircle data-icon="inline-start" />
        {label}
      </Link>
    </Button>
  )
}
