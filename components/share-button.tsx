"use client"

import { Check, Share2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function ShareButton({
  title,
  className,
}: {
  title: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function share() {
    const data = { title, text: `Conoce ${title} en Nico Experience`, url: window.location.href }
    if (navigator.share) {
      await navigator.share(data)
      return
    }
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <Button
      type="button"
      variant="outline"
      className={className}
      onClick={share}
    >
      {copied ? (
        <Check data-icon="inline-start" />
      ) : (
        <Share2 data-icon="inline-start" />
      )}
      {copied ? "Enlace copiado" : "Compartir"}
    </Button>
  )
}
