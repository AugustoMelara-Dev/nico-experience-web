"use client"

import { Check, Share2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function ShareButton({
  title,
  text,
  url,
  label = "Compartir",
  className,
}: {
  title: string
  text?: string
  url?: string
  label?: string
  className?: string
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")

  async function copyUrl(shareUrl: string) {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setStatus("copied")
    } catch {
      setStatus("error")
    }
    window.setTimeout(() => setStatus("idle"), 2600)
  }

  async function share() {
    const shareUrl = new URL(url ?? window.location.href, window.location.origin).toString()
    const data = {
      title,
      text: text ?? `Conoce ${title} en Nico Experience.`,
      url: shareUrl,
    }

    try {
      if (
        navigator.share &&
        (!navigator.canShare || navigator.canShare(data))
      ) {
        await navigator.share(data)
        return
      }
      await copyUrl(shareUrl)
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return
      await copyUrl(shareUrl)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className={className}
      onClick={share}
      aria-live="polite"
    >
      {status === "copied" ? (
        <Check data-icon="inline-start" aria-hidden="true" />
      ) : (
        <Share2 data-icon="inline-start" aria-hidden="true" />
      )}
      {status === "copied"
        ? "Enlace copiado"
        : status === "error"
          ? "No se pudo copiar"
          : label}
    </Button>
  )
}
