import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { siteConfig } from "@/config/site";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: "Nico Experience | Hospedajes en Honduras", template: "%s | Nico Experience" },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_HN",
    siteName: siteConfig.name,
    title: "Nico Experience | Hospedajes en Honduras",
    description: siteConfig.description,
    images: [{ url: "/images/casa-vip/piscina-noche-principal.webp", width: 1280, height: 853, alt: "Piscina iluminada de Casa VIP" }],
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: ["/images/casa-vip/piscina-noche-principal.webp"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <a href="#contenido" className="fixed left-3 top-3 z-[100] -translate-y-24 bg-forest px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0">Saltar al contenido</a>
        <NavBar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
