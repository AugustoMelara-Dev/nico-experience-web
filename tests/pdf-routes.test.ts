import { describe, expect, it } from "vitest"
import { GET as getPropertyPdf } from "../app/api/alojamientos/[slug]/pdf/route"
import { GET as getCatalogPdf } from "../app/api/alojamientos/catalogo/pdf/route"

async function expectPdf(response: Response, filename: string) {
  expect(response.status).toBe(200)
  expect(response.headers.get("content-type")).toBe("application/pdf")
  expect(response.headers.get("content-disposition")).toContain(filename)
  const bytes = new Uint8Array(await response.arrayBuffer())
  expect(new TextDecoder().decode(bytes.slice(0, 4))).toBe("%PDF")
  expect(bytes.length).toBeGreaterThan(10_000)
}

describe("API de fichas PDF", () => {
  it("devuelve 404 para un alojamiento inexistente", async () => {
    const response = await getPropertyPdf(
      new Request("http://localhost/api/alojamientos/no-existe/pdf"),
      { params: Promise.resolve({ slug: "no-existe" }) },
    )

    expect(response.status).toBe(404)
  })

  it("genera la ficha de Casa Palac", async () => {
    const response = await getPropertyPdf(
      new Request("http://localhost/api/alojamientos/casa-palac/pdf"),
      { params: Promise.resolve({ slug: "casa-palac" }) },
    )

    await expectPdf(response, "nico-experience-casa-palac.pdf")
  }, 60_000)

  it("genera el catálogo de alojamientos activos", async () => {
    const response = await getCatalogPdf()

    await expectPdf(
      response,
      "nico-experience-catalogo-alojamientos.pdf",
    )
  }, 60_000)
})
