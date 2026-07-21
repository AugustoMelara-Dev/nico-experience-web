import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-forest-deep text-white">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-display text-3xl font-semibold">Nico Experience</Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">Hospedajes en Honduras con atención cercana y espacios para disfrutar sin prisa.</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/55">Navegación</p>
          <div className="mt-4 flex flex-col gap-3">{siteConfig.navigation.map((item) => <Link key={item.href} href={item.href} className="w-fit text-sm text-white/80 hover:text-white">{item.label}</Link>)}</div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/55">Información</p>
          <p className="mt-4 text-sm leading-7 text-white/70">WhatsApp, teléfono, redes y ubicación general pendientes de confirmación.</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Nico Experience.</span><span>Plantilla base bajo licencia MIT.</span></div>
      </div>
    </footer>
  );
}
