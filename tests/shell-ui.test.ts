import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

const source = (path: string) =>
  readFileSync(join(process.cwd(), path), "utf8")

describe("shell editorial", () => {
  it("usa Sheet para el menú móvil y la ubicación del negocio", () => {
    const navbar = source("components/navbar.tsx")
    const providers = source("app/providers.tsx")
    expect(navbar).toContain('from "@/components/ui/sheet"')
    expect(navbar).toContain("businessConfig.mapsUrl")
    expect(navbar).not.toContain("AnimatePresence")
    expect(providers).toContain('defaultTheme="light"')
  })

  it("muestra la ubicación confirmada en el footer", () => {
    const footer = source("components/footer.tsx")
    expect(footer).toContain("businessConfig.locationLabel")
    expect(footer).toContain("businessConfig.mapsUrl")
    expect(footer).toContain("items-center text-center")
    expect(footer).toContain("md:grid-cols-2")
    expect(footer).not.toContain("lg:grid-cols-[1.35fr_.65fr_1fr]")
  })
})
