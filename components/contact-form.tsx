"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { track } from "@vercel/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function ContactForm() {
  const [notice, setNotice] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = `Hola, soy ${String(form.get("name"))}. Me interesa ${String(form.get("property")) || "un hospedaje"}. Fecha: ${String(form.get("date")) || "por definir"}. Personas: ${String(form.get("guests")) || "por definir"}.`;
    const url = buildWhatsAppUrl(message);
    track("contact_form_submit", { channel: url ? "whatsapp" : "pending" });
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    else setNotice("El número oficial de WhatsApp aún está pendiente de confirmación. Tus datos no fueron enviados ni almacenados.");
  }
  return (
    <form onSubmit={submit} className="rounded-[1.25rem] bg-white p-6 shadow-[0_18px_60px_rgba(23,63,53,.08)] sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-forest">Nombre<input required name="name" autoComplete="name" className="mt-2 h-12 w-full rounded-lg border border-forest/20 bg-sand-light px-4 font-normal text-ink" /></label>
        <label className="text-sm font-semibold text-forest">Hospedaje<input name="property" defaultValue="Casa VIP" className="mt-2 h-12 w-full rounded-lg border border-forest/20 bg-sand-light px-4 font-normal text-ink" /></label>
        <label className="text-sm font-semibold text-forest">Fecha aproximada<input name="date" type="date" className="mt-2 h-12 w-full rounded-lg border border-forest/20 bg-sand-light px-4 font-normal text-ink" /></label>
        <label className="text-sm font-semibold text-forest">Cantidad de personas<input name="guests" type="number" min="1" className="mt-2 h-12 w-full rounded-lg border border-forest/20 bg-sand-light px-4 font-normal text-ink" /></label>
      </div>
      <button type="submit" className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-terracotta px-6 text-sm font-bold text-white hover:bg-terracotta-dark"><Send className="size-4" /> Preparar consulta</button>
      {notice && <p role="status" className="mt-5 rounded-lg bg-sand p-4 text-sm leading-6 text-forest">{notice}</p>}
    </form>
  );
}
