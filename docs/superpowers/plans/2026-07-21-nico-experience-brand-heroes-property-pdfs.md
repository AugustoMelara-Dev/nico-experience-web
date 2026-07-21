# Nico Experience Brand, Heroes, and Property PDFs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrar la identidad azul marino/dorada de Nico Experience, convertir la landing y los micrositios en experiencias fotográficas de turismo y ofrecer fichas PDF individuales y un catálogo descargable sin inventar datos ni reemplazar el sistema visual existente.

**Architecture:** La UI seguirá usando Next.js App Router, Tailwind, Radix/shadcn y Framer Motion; los cambios de marca se concentran en tokens y componentes pequeños. `content/properties.ts` continúa como fuente única validada con Zod y añade una selección explícita de medios para PDF. Dos Route Handlers Node renderizan documentos React PDF desde esa misma fuente, mientras los activos JPEG específicos para PDF se preparan durante el desarrollo para evitar conversiones costosas en cada solicitud.

**Tech Stack:** Next.js 16.1.6, React 19.2.4, TypeScript 5.9, Tailwind CSS 4, shadcn/ui, Radix UI, Framer Motion, Zod 4, `next/image`, `@react-pdf/renderer`, Vitest, Pillow, Poppler, Vercel.

## Global Constraints

- La marca principal es **Nico Experience** y ofrece viajes, hospedaje, trámites, gestiones y soluciones digitales.
- La propiedad se llama **Casa Palac**; “ubicada frente a la playa” es un descriptor, nunca parte del nombre.
- Mantener tipografía, contenedores, radios, bordes, sombras, navbar sticky/blur, theme switcher, animaciones y breakpoints de la implementación aprobada.
- Aplicar azul marino `#061E68`, dorado `#D6993A` y dorado claro `#E4C07C` mediante tokens existentes; no usar estilos inline ni crear una hoja CSS paralela.
- Conservar claro/oscuro y contraste accesible; el dorado se limita a acentos pequeños.
- No publicar precios, capacidades, disponibilidad, reseñas, reglas, políticas o inventario no confirmado.
- Mantener `GET /api/alojamientos/[slug]/pdf` y `GET /api/alojamientos/catalogo/pdf` como rutas de descarga.
- La ficha individual usa hasta seis imágenes seleccionadas; la galería web conserva las 25 fotografías válidas.
- Las rutas y PDF muestran únicamente propiedades activas; un slug inválido o inactivo devuelve 404.
- No añadir base de datos, CMS, autenticación ni almacenamiento de consultas.
- Preservar originales de marca y fotografía; cualquier mejora debe ser conservadora y verificarse visualmente.

---

## File Map

- `config/brand.ts`: valores de marca y rutas de activos compartidos por web y PDF.
- `app/globals.css`: asignación controlada de tokens primary/ring/light a azul marino y dorado en claro/oscuro.
- `source-assets/brand/nico-experience-logo.jpeg`: copia recuperable del logotipo original entregado.
- `source-assets/hero/nico-experience-neutral.png`: salida original de la imagen generada para el hero.
- `public/brand/nico-experience-logo.webp`: logotipo web optimizado.
- `public/brand/nico-experience-logo.jpg`: logotipo compatible con React PDF.
- `public/images/hero/nico-experience-neutral.webp`: imagen neutral optimizada para `next/image`.
- `public/pdf-assets/<slug>/*.jpg`: seis imágenes por propiedad compatibles con React PDF.
- `scripts/prepare-brand-and-pdf-assets.py`: generación reproducible de WebP/JPEG desde originales sin alterar contenido.
- `components/brand-logo.tsx`: variante compacta y accesible del logo para navbar/footer.
- `components/hero.tsx`: hero dividido de la landing con contenido primero e imagen neutral después.
- `components/navbar.tsx`: integra `BrandLogo` sin alterar sticky, blur, menú móvil ni theme switcher.
- `components/footer.tsx`: integra marca, lema y enlaces existentes.
- `content/properties.ts`: marca explícitamente los medios elegidos para PDF y expone propiedades activas/destacadas.
- `components/pricing.tsx`: catálogo destacado adaptable a una o varias propiedades.
- `components/property-hero.tsx`: cabecera fotográfica reutilizable para cada slug.
- `components/pdf-download-link.tsx`: CTA reutilizable de descarga individual o catálogo.
- `lib/property-pdf.ts`: selección de imágenes, nombres de archivo, URLs canónicas y resolución de activos locales.
- `components/pdf/pdf-theme.ts`: estilos y colores compartidos por documentos PDF.
- `components/pdf/property-pdf-document.tsx`: ficha individual.
- `components/pdf/catalog-pdf-document.tsx`: catálogo de propiedades activas.
- `app/api/alojamientos/[slug]/pdf/route.ts`: descarga individual.
- `app/api/alojamientos/catalogo/pdf/route.ts`: descarga del catálogo.
- `app/alojamientos/[slug]/page.tsx`: consume `PropertyHero` y muestra descarga individual.
- `app/alojamientos/page.tsx`: muestra descarga del catálogo sin enlazar directamente a un único slug.
- `tests/brand.test.ts`: contrato de marca y activos.
- `tests/content.test.ts`: selección PDF, propiedades activas y escalabilidad.
- `tests/property-pdf.test.ts`: helpers, nombres, selección, 404 lógico y catálogo activo.
- `README.md`: instrucciones para marca, nueva propiedad, fotos PDF y descargas.
- `output/pdf/`: muestras finales inspeccionadas; se versionará solo si el repositorio decide conservar evidencia binaria.
- `tmp/pdfs/`: renders temporales de inspección; no se versiona.

---

### Task 1: Brand configuration and reproducible assets

**Files:**
- Create: `config/brand.ts`
- Create: `source-assets/brand/nico-experience-logo.jpeg`
- Create: `source-assets/hero/nico-experience-neutral.png`
- Create: `scripts/prepare-brand-and-pdf-assets.py`
- Create: `public/brand/nico-experience-logo.webp`
- Create: `public/brand/nico-experience-logo.jpg`
- Create: `public/images/hero/nico-experience-neutral.webp`
- Create: `public/pdf-assets/casa-palac/*.jpg`
- Create: `tests/brand.test.ts`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `brandConfig` with `name`, `tagline`, `colors`, `logoWeb`, `logoPdf`, and `heroImage`.
- Produces: JPEG paths matching `PropertyMedia.pdfSrc` added in Task 4.

- [ ] **Step 1: Write the failing brand contract test**

```ts
import { describe, expect, it } from "vitest"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { brandConfig } from "../config/brand"

describe("identidad de Nico Experience", () => {
  it("expone los colores y activos aprobados", () => {
    expect(brandConfig.colors).toEqual({ navy: "#061E68", gold: "#D6993A", goldLight: "#E4C07C" })
    expect(brandConfig.tagline).toBe("Experiencias que conectan, soluciones que impulsan.")
    for (const src of [brandConfig.logoWeb, brandConfig.logoPdf, brandConfig.heroImage]) {
      expect(existsSync(join(process.cwd(), "public", src.replace(/^\/+/, "")))).toBe(true)
    }
  })
})
```

- [ ] **Step 2: Run the test and verify the missing module failure**

Run: `pnpm vitest run tests/brand.test.ts`

Expected: FAIL because `config/brand.ts` does not exist.

- [ ] **Step 3: Add the typed brand configuration**

```ts
export const brandConfig = {
  name: "Nico Experience",
  tagline: "Experiencias que conectan, soluciones que impulsan.",
  descriptor: "Viajes · Negocios · Soluciones",
  colors: { navy: "#061E68", gold: "#D6993A", goldLight: "#E4C07C" },
  logoWeb: "/brand/nico-experience-logo.webp",
  logoPdf: "/brand/nico-experience-logo.jpg",
  heroImage: "/images/hero/nico-experience-neutral.webp",
} as const
```

- [ ] **Step 4: Generate the neutral hero image with the approved image workflow**

Read `C:\Users\melar\.codex\skills\.system\imagegen\SKILL.md` completely, then call the image generation tool with this prompt:

```text
Create a premium horizontal editorial travel still life for a Honduran tourism and integral-solutions company. A tasteful arrangement suggesting trip planning, personal assistance and practical digital coordination: an elegant carry-on detail, folded neutral map without readable labels, notebook, smartphone with blank screen, subtle tropical daylight and a distant soft coastal atmosphere. Navy blue and restrained warm gold accents, realistic photography, clean sophisticated composition, generous negative space, no people, no logos, no readable text, no specific property, no famous destination, no UI mockup. 3:2 landscape composition suitable for a website hero, natural materials, trustworthy and welcoming rather than corporate SaaS.
```

Save the original output as `source-assets/hero/nico-experience-neutral.png`. Do not generate or alter the Nico Experience logo.

- [ ] **Step 5: Preserve the provided logo and implement the asset preparation script**

Copy the exact supplied JPEG to `source-assets/brand/nico-experience-logo.jpeg`. Implement Pillow processing that:

```python
from pathlib import Path
from PIL import Image, ImageEnhance, ImageOps

ROOT = Path(__file__).resolve().parents[1]

def save_web(source: Path, destination: Path, max_size: tuple[int, int], quality: int = 88) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        normalized = ImageOps.exif_transpose(image).convert("RGB")
        normalized.thumbnail(max_size, Image.Resampling.LANCZOS)
        normalized.save(destination, "WEBP", quality=quality, method=6)

def save_pdf_jpeg(source: Path, destination: Path, max_size: tuple[int, int]) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        normalized = ImageOps.exif_transpose(image).convert("RGB")
        normalized.thumbnail(max_size, Image.Resampling.LANCZOS)
        normalized.save(destination, "JPEG", quality=86, optimize=True, progressive=True)
```

Generate the web logo, PDF logo, neutral hero WebP, and the six explicitly selected Casa Palac JPEGs. Apply only a mild contrast/sharpness correction after side-by-side inspection; omit it if it introduces halos or loses shadow detail.

- [ ] **Step 6: Ignore only temporary PDF renders**

Add these exact entries to `.gitignore`:

```gitignore
tmp/pdfs/
output/pdf/
```

- [ ] **Step 7: Run asset generation and verify dimensions and tests**

Run: `py -3 scripts/prepare-brand-and-pdf-assets.py`

Expected: exits 0 and prints every generated destination.

Run: `pnpm vitest run tests/brand.test.ts`

Expected: PASS.

Visually inspect the original logo, optimized logo, generated hero, and all six PDF JPEGs. Confirm no invented property details, unreadable logo, stretching, banding, or aggressive sharpening.

- [ ] **Step 8: Commit the asset foundation**

```bash
git add config/brand.ts source-assets public/brand public/images/hero public/pdf-assets scripts/prepare-brand-and-pdf-assets.py tests/brand.test.ts .gitignore
git commit -m "feat: add Nico Experience brand assets"
```

---

### Task 2: Brand tokens, navbar, and footer

**Files:**
- Create: `components/brand-logo.tsx`
- Modify: `app/globals.css`
- Modify: `components/navbar.tsx`
- Modify: `components/footer.tsx`
- Test: `tests/brand.test.ts`

**Interfaces:**
- Consumes: `brandConfig` from Task 1.
- Produces: `BrandLogo({ compact?: boolean; className?: string })` used by navbar and footer.

- [ ] **Step 1: Extend the failing test with copy and token assertions**

Add checks that `app/globals.css` contains `--brand-navy`, `--brand-gold`, and both light/dark primary values, and that navbar/footer source imports `BrandLogo`.

```ts
const globals = readFileSync(join(process.cwd(), "app/globals.css"), "utf8")
expect(globals).toContain("--brand-navy: #061e68")
expect(globals).toContain("--brand-gold: #d6993a")
expect(readFileSync(join(process.cwd(), "components/navbar.tsx"), "utf8")).toContain("<BrandLogo")
expect(readFileSync(join(process.cwd(), "components/footer.tsx"), "utf8")).toContain("<BrandLogo")
```

- [ ] **Step 2: Run the test and verify failure**

Run: `pnpm vitest run tests/brand.test.ts`

Expected: FAIL because the tokens and component references are absent.

- [ ] **Step 3: Map brand colors into existing theme tokens**

Declare `--brand-navy`, `--brand-gold`, and `--brand-gold-light` in `:root`. Set light `--primary` and `--ring` from navy/gold; set dark `--primary` to a readable light brand value and keep `--primary-foreground` dark. Keep `--background`, `--card`, `--border`, radius, and font unchanged. Replace only the existing blue `--light` glow with a navy-compatible value.

- [ ] **Step 4: Implement the accessible logo component**

Use `next/image` with fixed dimensions, a compact mode that crops no content, and a visible text fallback when images are disabled:

```tsx
export function BrandLogo({ compact = false, className }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image src={brandConfig.logoWeb} alt="Nico Experience" width={compact ? 128 : 180} height={compact ? 40 : 56} className="h-auto w-auto object-contain" priority={compact} />
      <span className="sr-only">{brandConfig.descriptor}</span>
    </span>
  )
}
```

- [ ] **Step 5: Integrate logo without changing navbar behavior**

Replace only the text brand links with `BrandLogo compact`. Preserve `h-16`, sticky positioning, blur calculation, menu animation, dropdown, CTA, and `ThemeSwitcher`. Ensure the mobile logo fits between the menu and theme button at 390 px.

- [ ] **Step 6: Integrate logo and tagline in the footer**

Replace the footer text wordmark with `BrandLogo`, add `brandConfig.tagline` below the institutional description, and keep its existing grid, separator, contact data, links, and animation.

- [ ] **Step 7: Verify tests, lint, and responsive interaction**

Run: `pnpm vitest run tests/brand.test.ts && pnpm lint && pnpm typecheck`

Expected: all commands exit 0.

Open `/` at 390 px and desktop in light/dark mode. Verify the mobile menu, dropdown, theme switcher, sticky blur, focus rings, and logo legibility.

- [ ] **Step 8: Commit the branded shell**

```bash
git add app/globals.css components/brand-logo.tsx components/navbar.tsx components/footer.tsx tests/brand.test.ts
git commit -m "feat: apply Nico Experience brand shell"
```

---

### Task 3: Editorial main hero

**Files:**
- Modify: `components/hero.tsx`
- Test: `tests/brand.test.ts`

**Interfaces:**
- Consumes: `brandConfig.heroImage`.
- Produces: responsive hero with `/contacto` primary CTA and `/alojamientos` secondary CTA.

- [ ] **Step 1: Add failing hero contract assertions**

```ts
const hero = readFileSync(join(process.cwd(), "components/hero.tsx"), "utf8")
expect(hero).toContain("brandConfig.heroImage")
expect(hero).toContain('href="/contacto"')
expect(hero).toContain('href="/alojamientos"')
expect(hero).toContain("sizes=")
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `pnpm vitest run tests/brand.test.ts`

Expected: FAIL because the current hero has no image.

- [ ] **Step 3: Convert the existing hero to a two-column composition**

Keep the badge, heading scale, paragraph, buttons, motion timing and glow. Change the section body to `lg:grid-cols-[1.05fr_.95fr]`, left-align text on large screens, and add a Card-based visual area:

```tsx
<motion.div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
  <div className="flex flex-col items-center space-y-5 text-center lg:items-start lg:text-left">...</div>
  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
    <Card className="overflow-hidden rounded-2xl">
      <CardContent className="p-3 sm:p-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
          <Image src={brandConfig.heroImage} alt="Escena editorial de planificación de viajes y atención personalizada" fill priority quality={90} sizes="(min-width: 1024px) 44vw, 92vw" className="object-cover" />
        </div>
      </CardContent>
    </Card>
  </motion.div>
</motion.div>
```

Do not overlay marketing copy on the generated image.

- [ ] **Step 4: Run targeted checks**

Run: `pnpm vitest run tests/brand.test.ts && pnpm lint && pnpm typecheck`

Expected: PASS and zero lint/type errors.

- [ ] **Step 5: Capture and inspect hero breakpoints**

Run the app and capture `/` at 1440, 1024, and 390 px in light and dark mode. Verify text order, no horizontal overflow, stable image aspect, original typographic scale, CTA visibility, and no overlap with the glow.

- [ ] **Step 6: Commit the hero**

```bash
git add components/hero.tsx tests/brand.test.ts
git commit -m "feat: add editorial landing hero"
```

---

### Task 4: PDF media contract and scalable property catalog

**Files:**
- Modify: `content/properties.ts`
- Modify: `components/pricing.tsx`
- Modify: `app/alojamientos/page.tsx`
- Modify: `tests/content.test.ts`

**Interfaces:**
- Produces: `PropertyMedia.pdfSrc?: string` and `PropertyMedia.includeInPdf: boolean`.
- Produces: exactly six selected Casa Palac images with local JPEG `pdfSrc` values.
- Consumes later: `selectPropertyPdfImages(property)` in Task 6.

- [ ] **Step 1: Write failing content assertions**

```ts
it("selecciona seis imágenes compatibles para la ficha PDF", () => {
  const selected = getProperty("casa-palac")!.media.filter((item) => item.type === "image" && item.includeInPdf)
  expect(selected).toHaveLength(6)
  expect(selected.every((item) => item.pdfSrc?.startsWith("/pdf-assets/casa-palac/") && item.pdfSrc.endsWith(".jpg"))).toBe(true)
})

it("mantiene el catálogo derivado únicamente de propiedades activas", () => {
  expect(featuredProperties.every((property) => property.active && property.featured)).toBe(true)
})
```

- [ ] **Step 2: Run and verify the schema failure**

Run: `pnpm vitest run tests/content.test.ts`

Expected: FAIL because `includeInPdf` and `pdfSrc` do not exist.

- [ ] **Step 3: Extend the Zod media schema and helper**

```ts
const propertyMediaSchema = z.object({
  // existing fields
  includeInPdf: z.boolean().default(false),
  pdfSrc: z.string().min(1).optional(),
}).refine((media) => !media.includeInPdf || (media.type === "image" && Boolean(media.pdfSrc)), {
  message: "Los medios seleccionados para PDF requieren una imagen JPEG local",
})
```

Update `photo()` with an optional `{ includeInPdf, pdfSrc }` options object and select these six distinct spaces: principal pool, daytime terrace, living/dining area, kitchen, representative bedroom, and bathroom. Do not alter the 25-item web gallery.

- [ ] **Step 4: Make the featured cards scale naturally**

Remove `md:col-start-2` and hardcoded copy that assumes only Casa Palac. Use a centered responsive grid with a maximum of three columns, and derive badge text from each property’s `locationLabel`. Keep Card, borders, radius, Button, Separator, motion, and WhatsApp actions unchanged.

- [ ] **Step 5: Remove the single-property catalog CTA**

In `app/alojamientos/page.tsx`, retain the catalog heading and `Pricing`, but replace the hardcoded “Conocer Casa Palac” button with the catalog PDF action added in Task 7. Until Task 7 exists, omit this button rather than linking to one property.

- [ ] **Step 6: Verify content and build contracts**

Run: `pnpm vitest run tests/content.test.ts && pnpm lint && pnpm typecheck`

Expected: PASS.

- [ ] **Step 7: Commit the scalable catalog data**

```bash
git add content/properties.ts components/pricing.tsx app/alojamientos/page.tsx tests/content.test.ts
git commit -m "feat: prepare scalable property catalog"
```

---

### Task 5: Reusable property photo hero and download CTA

**Files:**
- Create: `components/property-hero.tsx`
- Create: `components/pdf-download-link.tsx`
- Modify: `app/alojamientos/[slug]/page.tsx`
- Create: `tests/property-ui.test.ts`

**Interfaces:**
- Consumes: `Property` and its `featuredImage`, `locationLabel`, and `whatsappMessage`.
- Produces: `PropertyHero({ property }: { property: Property })`.
- Produces: `PdfDownloadLink({ href, label }: { href: string; label: string })`.

- [ ] **Step 1: Write failing source contracts**

```ts
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

describe("presentación de alojamientos", () => {
  it("usa hero fotográfico y descarga contextual", () => {
    const page = readFileSync(join(process.cwd(), "app/alojamientos/[slug]/page.tsx"), "utf8")
    expect(page).toContain("<PropertyHero")
    expect(page).not.toContain('aspect-[16/9]')
    const hero = readFileSync(join(process.cwd(), "components/property-hero.tsx"), "utf8")
    expect(hero).toContain("property.featuredImage")
    expect(hero).toContain("/api/alojamientos/${property.slug}/pdf")
  })
})
```

- [ ] **Step 2: Run the test and verify missing files**

Run: `pnpm vitest run tests/property-ui.test.ts`

Expected: FAIL because `property-hero.tsx` does not exist.

- [ ] **Step 3: Implement the PDF download link**

```tsx
export function PdfDownloadLink({ href, label }: PdfDownloadLinkProps) {
  return (
    <Button asChild variant="outline">
      <a href={href} download>
        <Download aria-hidden="true" />
        {label}
      </a>
    </Button>
  )
}
```

- [ ] **Step 4: Implement the property hero**

Move breadcrumb, badge, title, description, WhatsApp, share, download, glow, and featured image into a two-column section. Use a Card visual with `aspect-[4/3]`, `next/image`, `priority`, `quality={90}`, and responsive `sizes`. Keep text first on mobile and do not overlay it on the photograph.

- [ ] **Step 5: Replace duplicated hero markup in the dynamic page**

Render `<PropertyHero property={property} />`, remove the separate 16:9 featured Card, and leave description, amenities, album, equipment, videos, Maps, FAQ, JSON-LD, footer, and 404 behavior intact.

- [ ] **Step 6: Verify tests and visual behavior**

Run: `pnpm vitest run tests/property-ui.test.ts tests/content.test.ts && pnpm lint && pnpm typecheck`

Expected: PASS.

Capture `/alojamientos/casa-palac` at 1440, 1024, and 390 px in light/dark. Verify hero image crop, title readability, button wrapping, breadcrumb overflow, and that gallery/lightbox still work by keyboard.

- [ ] **Step 7: Commit the property hero**

```bash
git add components/property-hero.tsx components/pdf-download-link.tsx app/alojamientos/[slug]/page.tsx tests/property-ui.test.ts
git commit -m "feat: add photo-led property hero"
```

---

### Task 6: PDF helpers, theme, and individual document

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `lib/property-pdf.ts`
- Create: `components/pdf/pdf-theme.ts`
- Create: `components/pdf/property-pdf-document.tsx`
- Create: `tests/property-pdf.test.ts`

**Interfaces:**
- Produces: `selectPropertyPdfImages(property: Property): PropertyMedia[]`.
- Produces: `propertyPdfFilename(property: Property): string`.
- Produces: `publicAssetPath(src: string): string` that rejects traversal and resolves below `public/`.
- Produces: `PropertyPdfDocument({ property, siteUrl }: { property: Property; siteUrl: string })`.

- [ ] **Step 1: Install the server PDF renderer**

Run: `pnpm add @react-pdf/renderer`

Expected: dependency appears in `package.json` and the lockfile updates without peer dependency errors.

- [ ] **Step 2: Write failing helper tests**

```ts
import { describe, expect, it } from "vitest"
import { getProperty } from "../content/properties"
import { propertyPdfFilename, publicAssetPath, selectPropertyPdfImages } from "../lib/property-pdf"

describe("fichas PDF de alojamientos", () => {
  const property = getProperty("casa-palac")!

  it("elige como máximo seis JPEG explícitos", () => {
    const images = selectPropertyPdfImages(property)
    expect(images).toHaveLength(6)
    expect(images.every((image) => image.pdfSrc?.endsWith(".jpg"))).toBe(true)
  })

  it("crea un nombre de descarga estable", () => {
    expect(propertyPdfFilename(property)).toBe("nico-experience-casa-palac.pdf")
  })

  it("impide salir de public al resolver activos", () => {
    expect(() => publicAssetPath("/../package.json")).toThrow("Ruta de activo inválida")
  })
})
```

- [ ] **Step 3: Run and verify missing helpers**

Run: `pnpm vitest run tests/property-pdf.test.ts`

Expected: FAIL because `lib/property-pdf.ts` is missing.

- [ ] **Step 4: Implement pure PDF helpers**

```ts
export function selectPropertyPdfImages(property: Property) {
  return property.media.filter((item) => item.type === "image" && item.includeInPdf && item.pdfSrc).slice(0, 6)
}

export function propertyPdfFilename(property: Property) {
  return `nico-experience-${property.slug}.pdf`
}

export function publicAssetPath(src: string) {
  const relative = src.replace(/^\/+/, "")
  const root = resolve(process.cwd(), "public")
  const destination = resolve(root, relative)
  if (!destination.startsWith(`${root}${sep}`)) throw new Error("Ruta de activo inválida")
  return destination
}
```

- [ ] **Step 5: Run helper tests**

Run: `pnpm vitest run tests/property-pdf.test.ts`

Expected: PASS.

- [ ] **Step 6: Define the PDF theme**

Create shared `StyleSheet` values using only `#061E68`, `#D6993A`, `#E4C07C`, white, and legible neutral grays. Export `pdfStyles` and `pdfColors`; keep A4 margins, 10–11 pt body text, 20–28 pt headings, page numbers, and non-breaking section wrappers.

- [ ] **Step 7: Implement the individual document**

Compose:

1. brand header with JPEG logo;
2. property title and descriptor;
3. main photo and description;
4. confirmed amenities/equipment;
5. a two-column six-photo gallery with title/description captions;
6. clickable Maps, WhatsApp, and canonical microsite links;
7. generation date and page number.

Never render optional values when absent. Use `publicAssetPath()` for every logo/photo. Do not render ratings, prices, capacity, address, or availability unless present and confirmed in the property object.

- [ ] **Step 8: Typecheck and render a smoke sample**

Run: `pnpm typecheck && pnpm vitest run tests/property-pdf.test.ts`

Expected: PASS. Rendering will be wired to HTTP in Task 7.

- [ ] **Step 9: Commit the PDF core**

```bash
git add package.json pnpm-lock.yaml lib/property-pdf.ts components/pdf tests/property-pdf.test.ts
git commit -m "feat: build individual property PDF"
```

---

### Task 7: Individual and catalog PDF APIs

**Files:**
- Create: `components/pdf/catalog-pdf-document.tsx`
- Create: `app/api/alojamientos/[slug]/pdf/route.ts`
- Create: `app/api/alojamientos/catalogo/pdf/route.ts`
- Modify: `app/alojamientos/page.tsx`
- Modify: `tests/property-pdf.test.ts`

**Interfaces:**
- Consumes: `PropertyPdfDocument`, `CatalogPdfDocument`, active property data, and filename helpers.
- Produces: downloadable `application/pdf` responses and 404 JSON for invalid/inactive slugs.

- [ ] **Step 1: Add failing response helper tests**

Extract and test `pdfResponse(buffer, filename)` and `catalogPdfFilename()` in `lib/property-pdf.ts`:

```ts
it("genera cabeceras de descarga seguras", () => {
  const response = pdfResponse(new Uint8Array([37, 80, 68, 70]), "nico-experience-casa-palac.pdf")
  expect(response.headers.get("content-type")).toBe("application/pdf")
  expect(response.headers.get("content-disposition")).toContain('attachment; filename="nico-experience-casa-palac.pdf"')
})

it("nombra el catálogo general", () => {
  expect(catalogPdfFilename()).toBe("nico-experience-catalogo-alojamientos.pdf")
})
```

- [ ] **Step 2: Run and verify failure**

Run: `pnpm vitest run tests/property-pdf.test.ts`

Expected: FAIL because the response helpers are absent.

- [ ] **Step 3: Implement response helpers**

Return `new Response(buffer, { headers })` with `Content-Type`, quoted `Content-Disposition`, and `Cache-Control: public, max-age=0, s-maxage=86400, stale-while-revalidate=604800`.

- [ ] **Step 4: Implement the individual route**

```ts
export const runtime = "nodejs"

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const property = getProperty(slug)
  if (!property) return Response.json({ error: "Alojamiento no encontrado" }, { status: 404 })
  const document = createElement(PropertyPdfDocument, { property, siteUrl: siteConfig.siteUrl })
  const buffer = await renderToBuffer(document)
  return pdfResponse(new Uint8Array(buffer), propertyPdfFilename(property))
}
```

- [ ] **Step 5: Implement the compact catalog document**

Render only `activeProperties`. Each entry contains main PDF JPEG, name, descriptor, short description, confirmed amenities, canonical URL, and contextual WhatsApp link. Use page wrapping so one property section is not split awkwardly. Do not include the full six-photo gallery in the catalog.

- [ ] **Step 6: Implement the catalog route**

Use `renderToBuffer(createElement(CatalogPdfDocument, { properties: activeProperties, siteUrl: siteConfig.siteUrl }))` and return `pdfResponse(..., catalogPdfFilename())` with the Node runtime.

- [ ] **Step 7: Add the catalog download button**

In `app/alojamientos/page.tsx`, add:

```tsx
<PdfDownloadLink href="/api/alojamientos/catalogo/pdf" label="Descargar catálogo PDF" />
```

Keep the catalog heading generic and remove any remaining assumption of a single property.

- [ ] **Step 8: Verify unit, type, lint, and build checks**

Run: `pnpm vitest run tests/property-pdf.test.ts tests/content.test.ts && pnpm lint && pnpm typecheck && pnpm build`

Expected: all commands exit 0 and Next lists both API routes.

- [ ] **Step 9: Commit the API routes**

```bash
git add components/pdf/catalog-pdf-document.tsx app/api/alojamientos app/alojamientos/page.tsx lib/property-pdf.ts tests/property-pdf.test.ts
git commit -m "feat: add downloadable property PDF APIs"
```

---

### Task 8: PDF rendering and visual quality gate

**Files:**
- Generate locally: `output/pdf/nico-experience-casa-palac.pdf`
- Generate locally: `output/pdf/nico-experience-catalogo-alojamientos.pdf`
- Modify: PDF components or assets only if inspection finds defects.

**Interfaces:**
- Consumes: running local API routes.
- Produces: two verified, ignored local PDF artifacts and temporary page renders under `tmp/pdfs/`; the public deliverable remains the live API.

- [ ] **Step 1: Start the production server**

Run: `pnpm build` then `pnpm start` in a persistent terminal.

Expected: server listens locally without runtime errors.

- [ ] **Step 2: Download both PDF responses**

Use PowerShell `Invoke-WebRequest` to save:

```powershell
New-Item -ItemType Directory -Force output/pdf | Out-Null
Invoke-WebRequest http://localhost:3000/api/alojamientos/casa-palac/pdf -OutFile output/pdf/nico-experience-casa-palac.pdf
Invoke-WebRequest http://localhost:3000/api/alojamientos/catalogo/pdf -OutFile output/pdf/nico-experience-catalogo-alojamientos.pdf
```

Expected: both responses are HTTP 200, start with `%PDF`, and have non-zero size.

- [ ] **Step 3: Verify the invalid slug response**

Run:

```powershell
try { Invoke-WebRequest http://localhost:3000/api/alojamientos/no-existe/pdf } catch { $_.Exception.Response.StatusCode.value__ }
```

Expected: `404`.

- [ ] **Step 4: Render every PDF page to PNG with Poppler**

Resolve the bundled/document runtime first if needed, create `tmp/pdfs/casa-palac` and `tmp/pdfs/catalogo`, then run `pdftoppm -png` for each file.

Expected: one PNG per PDF page, with no render errors.

- [ ] **Step 5: Inspect every page visually**

Open all rendered PNG pages and verify:

- logo proportion and legibility;
- correct accents and Spanish glyphs;
- no clipped headings, captions, photos, URLs, or page numbers;
- no empty pages or isolated section headings;
- correct six-photo selection in the individual ficha;
- catalog includes only active properties;
- photographs are sharp enough on mobile without excessive file weight;
- Maps, WhatsApp, and canonical URLs use the confirmed values.

- [ ] **Step 6: Correct defects and repeat the complete render**

If a defect exists, make the smallest change to PDF styles, document structure, or JPEG dimensions. Rebuild, redownload both PDF files, rerender every page, and reinspect all pages—not only the changed page.

- [ ] **Step 7: Commit verified PDF adjustments**

```bash
git add components/pdf public/pdf-assets
git commit -m "fix: polish downloadable property PDFs"
```

Do not version `output/pdf/` or `tmp/pdfs/`. If no source adjustment was required, do not create an empty commit; record checks in the final report.

---

### Task 9: Documentation, complete regression, deployment, and public verification

**Files:**
- Modify: `README.md`
- Modify: `.env.example` only if an existing public URL variable description is incomplete.
- Modify: implementation files only for defects found by verification.

**Interfaces:**
- Produces: reproducible maintenance instructions, pushed GitHub commit, updated PR, and verified Vercel URL.

- [ ] **Step 1: Update maintenance documentation**

Document exact instructions to:

- add a property and select up to six `includeInPdf` media items with JPEG `pdfSrc`;
- regenerate web/PDF images;
- replace the brand logo while preserving its source;
- replace the neutral hero image;
- download an individual ficha and the active catalog;
- add a video or description;
- update kitchen inventory only with confirmed items;
- change WhatsApp through Vercel environment variables.

- [ ] **Step 2: Run the complete automated gate**

Run:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Expected: every command exits 0; no warnings indicate invalid Next routes or unsupported server dependencies.

- [ ] **Step 3: Run the complete local interaction gate**

Verify:

- `/`, `/alojamientos`, and `/alojamientos/casa-palac` load;
- old Casa Palac slug redirects permanently;
- invalid property slug renders 404;
- navbar desktop/mobile, dropdown, sticky blur, and theme switcher work;
- hero buttons work;
- gallery/lightbox works with keyboard;
- Maps opens the supplied URL in a safe new tab;
- WhatsApp contains `Casa Palac` and uses `50493731060`;
- individual and catalog PDF downloads work on a 390 px viewport;
- no fabricated testimonial or unconfirmed value appears;
- browser console has no errors.

- [ ] **Step 4: Capture the final visual comparison**

Capture 1440, 1024, and 390 px screenshots in light and dark for the main landing and Casa Palac. Compare against the current approved baseline, confirming preserved typography, container widths, radii, component language, motion, navigation, and responsive behavior. Record that the photographic editorial change reduces SaaS perception without becoming a different template.

- [ ] **Step 5: Commit documentation and final fixes**

```bash
git add README.md .env.example app components config content lib public scripts tests package.json pnpm-lock.yaml
git commit -m "docs: document branded property workflow"
```

Skip unchanged paths and do not include temporary renders.

- [ ] **Step 6: Push GitHub and update the existing pull request**

Run: `git push origin agent/restore-original-ui`

Expected: remote branch points to the local final commit and the existing draft PR shows the new commits and passing checks.

- [ ] **Step 7: Deploy to Vercel production**

Use the Vercel deployment workflow already connected to this repository. Confirm `NEXT_PUBLIC_SITE_URL=https://nico-experience-web.vercel.app`, `NEXT_PUBLIC_WHATSAPP_NUMBER=50493731060`, and `NEXT_PUBLIC_PHONE=+504 9373-1060`, then deploy the final commit to production.

- [ ] **Step 8: Verify the deployed URL directly**

Open the production URL and repeat the critical route, mobile, dark-mode, Maps, WhatsApp, gallery, console, individual PDF, catalog PDF, and invalid PDF slug checks. Do not report success from deployment status alone.

- [ ] **Step 9: Produce the delivery report**

Report repository, branch, backup commit, upstream reference, final commit, public URL, routes, used/discarded photos, generated neutral image, videos, confirmed/pending data, added library, lint/typecheck/test/build results, PDF inspection, and visual comparison. Include the brief maintenance instructions from README.
