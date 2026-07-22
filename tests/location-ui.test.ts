import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

describe("mapa del negocio", () => {
  it("usa MapLibre de forma accesible y conserva fallback", () => {
    const map = readFileSync(
      join(process.cwd(), "components/location/location-map.tsx"),
      "utf8",
    )
    const section = readFileSync(
      join(process.cwd(), "components/location/business-location.tsx"),
      "utf8",
    )
    expect(map).toContain('from "react-map-gl/maplibre"')
    expect(map).toContain("scrollZoom={false}")
    expect(map).toContain("businessConfig.coordinates")
    expect(section).toContain("LocationFallback")
    expect(section).toContain("businessConfig.mapsUrl")
  })
})
