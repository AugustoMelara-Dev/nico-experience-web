import { describe, expect, it } from "vitest";
import { activeProperties, getProperty, properties } from "../content/properties";
import { buildWhatsAppUrl, normalizeWhatsAppNumber } from "../lib/whatsapp";

describe("property content", () => {
  it("publishes only active properties", () => {
    expect(activeProperties.every((property) => property.active)).toBe(true);
    expect(activeProperties.length).toBe(properties.filter((property) => property.active).length);
  });

  it("resolves the valid Casa VIP slug", () => {
    expect(getProperty("casa-vip")?.name).toBe("Casa VIP");
  });

  it("does not resolve an invalid slug", () => {
    expect(getProperty("no-existe")).toBeUndefined();
  });

  it("has essential sharing content", () => {
    const property = getProperty("casa-vip");
    expect(property?.featuredImage).toMatch(/^\/images\//);
    expect(property?.shortDescription.length).toBeGreaterThan(20);
    expect(property?.gallery.length).toBeGreaterThan(0);
  });
});

describe("WhatsApp links", () => {
  it("normalizes an international number", () => {
    expect(normalizeWhatsAppNumber("+504 9999-9999")).toBe("50499999999");
  });

  it("includes number and contextual message", () => {
    const url = buildWhatsAppUrl("Consulta Casa VIP para 4 personas", "+504 9999-9999");
    expect(url).toBe("https://wa.me/50499999999?text=Consulta%20Casa%20VIP%20para%204%20personas");
  });

  it("returns null until a number is configured", () => {
    expect(buildWhatsAppUrl("Hola", "")).toBeNull();
  });
});
