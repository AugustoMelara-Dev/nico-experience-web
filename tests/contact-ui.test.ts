import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

describe("contacto premium", () => {
  it("usa controles compartidos y el mapa del negocio", () => {
    const form = readFileSync(
      join(process.cwd(), "components/contact-form.tsx"),
      "utf8",
    )
    const page = readFileSync(
      join(process.cwd(), "app/contacto/page.tsx"),
      "utf8",
    )
    expect(form).toContain('from "@/components/ui/input"')
    expect(form).toContain('from "@/components/ui/select"')
    expect(form).toContain("aria-describedby=")
    expect(page).toContain("<BusinessLocation")
  })
})
