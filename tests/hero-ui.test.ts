import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

describe("hero editorial", () => {
  it("usa la imagen como fondo y elimina la tarjeta lateral", () => {
    const hero = readFileSync(
      join(process.cwd(), "components/hero.tsx"),
      "utf8",
    )
    expect(hero).toContain(
      'className="object-cover object-center lg:object-right"',
    )
    expect(hero).toContain("absolute inset-0")
    expect(hero).toContain("from-[color:var(--brand-navy)]")
    expect(hero).toContain("to-transparent")
    expect(hero).toContain("max-w-xl")
    expect(hero).not.toContain("via-[color:var(--brand-navy)]/90")
    expect(hero).not.toContain("<Card")
    expect(hero).not.toContain("lg:grid-cols")
  })
})
