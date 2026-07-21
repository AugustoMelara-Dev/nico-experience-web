"use client";

import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const whatsappUrl = buildWhatsAppUrl("Hola, visité la página de Nico Experience y me gustaría consultar disponibilidad.");

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-sand-light/95 backdrop-blur-md">
      <nav aria-label="Navegación principal" className="container-site flex h-20 items-center justify-between gap-6">
        <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-forest sm:text-3xl">Nico Experience</Link>
        <div className="hidden items-center gap-8 lg:flex">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={`border-b-2 py-2 text-sm font-semibold transition-colors ${pathname === item.href ? "border-terracotta text-forest" : "border-transparent text-ink hover:text-terracotta"}`}>{item.label}</Link>
          ))}
        </div>
        <div className="hidden lg:block">
          <Link href={whatsappUrl ?? "/contacto"} target={whatsappUrl ? "_blank" : undefined} rel={whatsappUrl ? "noreferrer" : undefined} className="inline-flex h-11 items-center gap-2 rounded-lg bg-forest px-5 text-sm font-bold text-white transition-colors hover:bg-forest-deep">
            <MessageCircle className="size-5" aria-hidden="true" /> Consultar por WhatsApp
          </Link>
        </div>
        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Cerrar menú" : "Abrir menú"} className="grid size-11 place-items-center rounded-lg text-forest hover:bg-forest/10 lg:hidden">{open ? <X /> : <Menu />}</button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-forest/10 bg-sand-light px-4 pb-6 lg:hidden">
          <div className="container-site flex flex-col gap-1 pt-4">
            {siteConfig.navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-semibold text-forest hover:bg-forest/10">{item.label}</Link>)}
            <Link href={whatsappUrl ?? "/contacto"} target={whatsappUrl ? "_blank" : undefined} className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-4 py-3 font-bold text-white"><MessageCircle className="size-5" /> Consultar por WhatsApp</Link>
          </div>
        </div>
      )}
    </header>
  );
}
