import type { Metadata, Viewport } from "next";
import "./globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { Providers } from "./providers";
import NavBar from "@/components/navbar";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/config/site";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.name,
  category: "travel",
  title: { default: "Nico Experience | Turismo y soluciones integrales", template: "%s | Nico Experience" },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_HN",
    siteName: siteConfig.name,
    title: "Nico Experience | Turismo y soluciones integrales",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nico Experience | Turismo y soluciones integrales",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.siteUrl,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tocoa",
    addressRegion: "Colón",
    addressCountry: "HN",
  },
  areaServed: { "@type": "Country", name: "Honduras" },
  hasMap: siteConfig.business.mapsUrl,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-HN" suppressHydrationWarning>
      <body className={`${geist.className} overflow-x-clip antialiased`}>
        <a
          href="#contenido"
          className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-md bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-lg transition-transform focus-visible:translate-y-0 focus-visible:ring-2 focus-visible:ring-ring"
        >
          Saltar al contenido
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Providers>
          <NavBar />
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
