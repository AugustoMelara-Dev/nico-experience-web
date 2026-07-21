import type { MetadataRoute } from "next";
import { activeProperties } from "@/content/properties";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/cabanas", "/nosotros", "/contacto"];
  return [
    ...routes.map((route) => ({ url: `${siteConfig.siteUrl}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...activeProperties.map((property) => ({ url: `${siteConfig.siteUrl}/cabanas/${property.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 })),
  ];
}
