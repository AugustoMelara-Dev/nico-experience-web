"use client";

import { Check, Share2 } from "lucide-react";
import { track } from "@vercel/analytics";
import { useState } from "react";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  async function share() {
    const data = { title, text: `Conoce ${title} en Nico Experience`, url: window.location.href };
    track("share_property", { property: title });
    if (navigator.share) await navigator.share(data);
    else { await navigator.clipboard.writeText(window.location.href); setCopied(true); window.setTimeout(() => setCopied(false), 2200); }
  }
  return <button type="button" onClick={share} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-forest/25 px-5 text-sm font-bold text-forest hover:bg-forest/5">{copied ? <Check className="size-4" /> : <Share2 className="size-4" />}{copied ? "Enlace copiado" : "Compartir"}</button>;
}
