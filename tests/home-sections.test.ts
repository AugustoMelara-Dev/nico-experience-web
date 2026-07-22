import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

const source = (path: string) =>
  readFileSync(join(process.cwd(), path), "utf8")

describe("secciones editoriales", () => {
  it("evita la grilla SaaS repetitiva de servicios", () => {
    const services = source("components/service-cards.tsx")
    expect(services).toContain("divide-y")
    expect(services).toContain("service.slug")
    expect(services).not.toContain("lg:grid-cols-3")
  })

  it("incluye un cierre orientado a contacto", () => {
    expect(source("app/page.tsx")).toContain("<ClosingCta")
  })
})
