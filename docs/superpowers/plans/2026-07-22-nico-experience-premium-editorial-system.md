# Nico Experience Premium Editorial System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the complete Nico Experience website into a maintainable premium coastal-editorial experience with immersive photographic heroes, a confirmed business map, refined service/property journeys, and accessible shadcn/Radix interactions.

**Architecture:** Keep content and business facts in validated central modules, render static page composition with Next.js Server Components, and isolate motion, navigation, forms, gallery, theme, and MapLibre behavior in focused Client Components. Reuse the existing template tokens and shadcn/Radix primitives; add MapLibre only for the confirmed Nico Experience business location and retain Google Maps links as resilient fallbacks.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, Tailwind CSS 4, shadcn/Radix UI, Framer Motion 12, next-themes, Lucide React, Zod 4, react-map-gl, maplibre-gl, Vitest, Playwright browser verification, Vercel.

## Global Constraints

- Nico Experience remains a tourism and integral-services business: viajes, hospedaje, trámites, gestiones, and soluciones digitales.
- Casa Palac is the property name; “ubicada frente a la playa” is a descriptor, never part of the name.
- Business Maps URL is exactly `https://maps.app.goo.gl/CV11vyc2QaYzxB1x6` and confirmed coordinates are latitude `15.656205`, longitude `-86.004107`.
- Casa Palac keeps its separate official Maps URL `https://maps.app.goo.gl/BhDjLciEvjhp8pBN8?g_st=iw`.
- Preserve the original template container widths, theme switcher, breakpoints, radii, motion language, and current typography family.
- Use brand navy `#061E68`, gold `#D6993A`, and light gold `#E4C07C` through existing theme tokens.
- Do not publish prices, capacity, opening hours, response times, policies, reviews, property coordinates, or availability unless confirmed.
- Testimonials remain hidden until verified review data exists.
- Interactive maps must retain visible attribution and an official Google Maps fallback.
- No CMS, authentication, booking engine, payment flow, autoplay media, inline visual style system, or new font dependency.

---

### Task 1: Centralize business location and install map dependencies

**Files:**
- Create: `config/business.ts`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `config/site.ts`
- Test: `tests/business.test.ts`

**Interfaces:**
- Produces: `businessConfig` with `{ name, locationLabel, mapsUrl, coordinates: { latitude, longitude }, mapStyles: { light, dark } }`.
- Consumes: Existing `brandConfig`, site metadata, and confirmed business facts.

- [ ] **Step 1: Write the failing business-location test**

```ts
import { describe, expect, it } from "vitest"
import { businessConfig } from "../config/business"

describe("ubicación de Nico Experience", () => {
  it("publica el enlace y coordenadas confirmadas del negocio", () => {
    expect(businessConfig.mapsUrl).toBe(
      "https://maps.app.goo.gl/CV11vyc2QaYzxB1x6",
    )
    expect(businessConfig.coordinates).toEqual({
      latitude: 15.656205,
      longitude: -86.004107,
    })
  })

  it("mantiene estilos de mapa sustituibles", () => {
    expect(businessConfig.mapStyles.light).toMatch(/^https:\/\//)
    expect(businessConfig.mapStyles.dark).toMatch(/^https:\/\//)
  })
})
```

- [ ] **Step 2: Run the new test and confirm the missing-module failure**

Run: `pnpm test -- tests/business.test.ts`

Expected: FAIL because `config/business.ts` does not exist.

- [ ] **Step 3: Add the confirmed business configuration**

```ts
import { z } from "zod"

const businessSchema = z.object({
  name: z.string().min(1),
  locationLabel: z.string().min(1),
  mapsUrl: z.url(),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
  mapStyles: z.object({ light: z.url(), dark: z.url() }),
})

export const businessConfig = businessSchema.parse({
  name: "Nico Experience",
  locationLabel: "Tocoa, Colón · Honduras",
  mapsUrl: "https://maps.app.goo.gl/CV11vyc2QaYzxB1x6",
  coordinates: { latitude: 15.656205, longitude: -86.004107 },
  mapStyles: {
    light: "https://tiles.openfreemap.org/styles/positron",
    dark: "https://tiles.openfreemap.org/styles/dark",
  },
})
```

- [ ] **Step 4: Install the official React MapLibre bindings**

Run: `pnpm add react-map-gl maplibre-gl`

Expected: `package.json` and `pnpm-lock.yaml` contain both dependencies without replacing existing UI libraries.

- [ ] **Step 5: Run the focused tests and commit**

Run: `pnpm test -- tests/business.test.ts tests/brand.test.ts`

Expected: both test files PASS.

```bash
git add config/business.ts config/site.ts package.json pnpm-lock.yaml tests/business.test.ts
git commit -m "feat: centralize Nico Experience location"
```

### Task 2: Build the shadcn mobile Sheet and refine the shared shell

**Files:**
- Create: `components/ui/sheet.tsx`
- Modify: `components/navbar.tsx`
- Modify: `components/footer.tsx`
- Modify: `components/brand-logo.tsx`
- Test: `tests/shell-ui.test.ts`

**Interfaces:**
- Consumes: `businessConfig.mapsUrl`, `BrandLogo`, existing Button, DropdownMenu, ThemeSwitcher, and Radix Dialog dependency.
- Produces: accessible mobile navigation with `Sheet`, correctly separated business/property links, and a quieter editorial footer.

- [ ] **Step 1: Write a failing shell contract test**

```ts
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

const source = (path: string) =>
  readFileSync(join(process.cwd(), path), "utf8")

describe("shell editorial", () => {
  it("usa Sheet para el menú móvil y la ubicación del negocio", () => {
    const navbar = source("components/navbar.tsx")
    expect(navbar).toContain('from "@/components/ui/sheet"')
    expect(navbar).toContain("businessConfig.mapsUrl")
    expect(navbar).not.toContain("AnimatePresence")
  })

  it("muestra la ubicación confirmada en el footer", () => {
    const footer = source("components/footer.tsx")
    expect(footer).toContain("businessConfig.locationLabel")
    expect(footer).toContain("businessConfig.mapsUrl")
  })
})
```

- [ ] **Step 2: Run the shell test and confirm it fails**

Run: `pnpm test -- tests/shell-ui.test.ts`

Expected: FAIL because `Sheet` and `businessConfig` are not used.

- [ ] **Step 3: Add the official shadcn Sheet wrapper**

Create `components/ui/sheet.tsx` using the repository's existing `cn` helper and `@radix-ui/react-dialog`. Export `Sheet`, `SheetTrigger`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, and `SheetFooter`. Match the current shadcn component conventions in `components/ui/dialog.tsx`; use existing theme tokens only.

- [ ] **Step 4: Replace the custom mobile animation with Sheet**

In `components/navbar.tsx`, keep the sticky blur and desktop dropdown, then use this structure for mobile:

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" aria-label="Abrir menú">
      <Menu aria-hidden="true" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="w-[88vw] max-w-sm">
    <SheetHeader>
      <SheetTitle className="sr-only">Navegación principal</SheetTitle>
      <BrandLogo compact />
    </SheetHeader>
    <nav aria-label="Navegación móvil" className="mt-8 grid gap-1">
      {menuItems.map((item) => (
        <SheetClose asChild key={item.name}>
          <Link href={item.href} className="rounded-md px-3 py-3 text-base font-medium hover:bg-muted">
            {item.name}
          </Link>
        </SheetClose>
      ))}
    </nav>
  </SheetContent>
</Sheet>
```

Use `businessConfig.mapsUrl` for “Ubicación de Nico Experience” and keep `/alojamientos/casa-palac` for Casa Palac.

- [ ] **Step 5: Refine footer composition and run tests**

Use a three-group responsive grid separated by existing borders/negative space. Keep `BrandLogo`, WhatsApp, navigation, `businessConfig.locationLabel`, and a safe external Maps link.

Run: `pnpm test -- tests/shell-ui.test.ts tests/brand.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit the shell**

```bash
git add components/ui/sheet.tsx components/navbar.tsx components/footer.tsx components/brand-logo.tsx tests/shell-ui.test.ts
git commit -m "feat: refine premium navigation shell"
```

### Task 3: Replace the split hero with an immersive editorial background

**Files:**
- Modify: `components/hero.tsx`
- Modify: `tests/brand.test.ts`
- Test: `tests/hero-ui.test.ts`

**Interfaces:**
- Consumes: `brandConfig.heroImage`, Button, Link, Framer Motion, existing theme tokens.
- Produces: a full-background, left-readable hero without the detached image Card.

- [ ] **Step 1: Write the failing hero composition test**

```ts
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

describe("hero editorial", () => {
  it("usa la imagen como fondo y elimina la tarjeta lateral", () => {
    const hero = readFileSync(
      join(process.cwd(), "components/hero.tsx"),
      "utf8",
    )
    expect(hero).toContain('className="object-cover object-center lg:object-right"')
    expect(hero).toContain("absolute inset-0")
    expect(hero).toContain("from-[color:var(--brand-navy)]")
    expect(hero).not.toContain("<Card")
    expect(hero).not.toContain("lg:grid-cols")
  })
})
```

- [ ] **Step 2: Run the hero test and confirm it fails**

Run: `pnpm test -- tests/hero-ui.test.ts`

Expected: FAIL because the current hero still uses a split Card layout.

- [ ] **Step 3: Implement the immersive hero**

Use one relative `section` with a content-driven `min-h-[42rem]`, an absolute `next/image`, a navy gradient strongest on the left, a bottom fade into `background`, and a left-aligned content column. Retain the approved copy and CTA destinations. Use `motion.div` only for transform/opacity entrances and include `useReducedMotion()` to turn movement into opacity-only behavior.

Core visual structure:

```tsx
<section className="relative isolate flex min-h-[42rem] items-center overflow-hidden">
  <Image
    src={brandConfig.heroImage}
    alt="Escena editorial de planificación de viajes y atención personalizada"
    fill
    priority
    quality={90}
    sizes="100vw"
    className="object-cover object-center lg:object-right"
  />
  <div className="absolute inset-0 bg-linear-to-r from-[color:var(--brand-navy)] via-[color:var(--brand-navy)]/88 to-[color:var(--brand-navy)]/20" />
  <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
  <div className="relative mx-auto w-full max-w-(--breakpoint-xl) px-4 py-24 md:px-8 md:py-32">
    <div className="max-w-2xl text-white">{/* badge, heading, copy, CTAs, tagline */}</div>
  </div>
</section>
```

- [ ] **Step 4: Run hero and brand tests**

Run: `pnpm test -- tests/hero-ui.test.ts tests/brand.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the hero**

```bash
git add components/hero.tsx tests/hero-ui.test.ts tests/brand.test.ts
git commit -m "feat: add immersive editorial hero"
```

### Task 4: Replace SaaS-like home cards with editorial service and property sections

**Files:**
- Modify: `components/service-cards.tsx`
- Modify: `components/pricing.tsx`
- Modify: `components/partners.tsx`
- Create: `components/closing-cta.tsx`
- Modify: `app/page.tsx`
- Test: `tests/home-sections.test.ts`

**Interfaces:**
- Consumes: `services`, `featuredProperties`, Button, Separator, Tooltip, Image, WhatsAppLink.
- Produces: alternating service rows, image-led featured properties, a lightweight business-location summary, and closing CTA.

- [ ] **Step 1: Write the failing home-section test**

```ts
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8")

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
```

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `pnpm test -- tests/home-sections.test.ts`

Expected: FAIL with the current three-column card grid and missing `ClosingCta`.

- [ ] **Step 3: Implement alternating service rows**

Render services inside a `divide-y divide-border` container. Each row uses `md:grid-cols-[auto_1fr_auto]`, a restrained icon block, title/description, and a contextual outline Button. Keep staggered entrance motion but no perpetual animation.

- [ ] **Step 4: Convert featured accommodation into an image-led editorial feature**

For one property, use a wide `lg:grid-cols-[1.2fr_.8fr]` composition with the image occupying the larger column and content/actions in the other. For two or more properties, map the same component into an auto-fit grid. Keep active/featured derivation and all text from `content/properties.ts`.

- [ ] **Step 5: Add the closing contact band and location summary**

`ClosingCta` must render a concise brand promise, `/contacto`, WhatsApp, and a safe link to `businessConfig.mapsUrl`. Use one bordered surface and no background map instance.

- [ ] **Step 6: Run tests and commit**

Run: `pnpm test -- tests/home-sections.test.ts tests/services.test.ts tests/content.test.ts`

Expected: PASS.

```bash
git add components/service-cards.tsx components/pricing.tsx components/partners.tsx components/closing-cta.tsx app/page.tsx tests/home-sections.test.ts
git commit -m "feat: create editorial home journey"
```

### Task 5: Add the lazy MapLibre business-location experience

**Files:**
- Create: `components/location/location-map.tsx`
- Create: `components/location/location-fallback.tsx`
- Create: `components/location/business-location.tsx`
- Modify: `app/layout.tsx`
- Test: `tests/location-ui.test.ts`

**Interfaces:**
- Consumes: `businessConfig`, `useTheme`, Map/Marker/NavigationControl from `react-map-gl/maplibre`, MapLibre CSS.
- Produces: `BusinessLocation` with one lazy map instance and an always-available Google Maps fallback/action.

- [ ] **Step 1: Write a failing map contract test**

```ts
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

describe("mapa del negocio", () => {
  it("usa MapLibre de forma accesible y conserva fallback", () => {
    const map = readFileSync(join(process.cwd(), "components/location/location-map.tsx"), "utf8")
    const section = readFileSync(join(process.cwd(), "components/location/business-location.tsx"), "utf8")
    expect(map).toContain('from "react-map-gl/maplibre"')
    expect(map).toContain("scrollZoom={false}")
    expect(map).toContain("businessConfig.coordinates")
    expect(section).toContain("LocationFallback")
    expect(section).toContain("businessConfig.mapsUrl")
  })
})
```

- [ ] **Step 2: Run the map test and confirm it fails**

Run: `pnpm test -- tests/location-ui.test.ts`

Expected: FAIL because the location components do not exist.

- [ ] **Step 3: Build `LocationFallback`**

Render a themed bordered panel with MapPin, `businessConfig.locationLabel`, a short factual description, and a Button linking to `businessConfig.mapsUrl` with `target="_blank"` and `rel="noopener noreferrer"`.

- [ ] **Step 4: Build the isolated MapLibre client component**

Use `Map`, `Marker`, and `NavigationControl` from `react-map-gl/maplibre`. Select `businessConfig.mapStyles.dark` only when `resolvedTheme === "dark"`; otherwise use the light style. Use zoom `15`, `scrollZoom={false}`, `dragRotate={false}`, `pitchWithRotate={false}`, and a branded accessible marker. On `onError`, call `onUnavailable()` so the parent replaces the map with `LocationFallback`.

- [ ] **Step 5: Lazy-load the map near the viewport**

In `BusinessLocation`, use a ref with Framer Motion `useInView(ref, { once: true, margin: "200px" })`. Before intersection, show a shadcn-style Skeleton composition. Dynamically import `LocationMap` with `next/dynamic` and `ssr: false` inside this Client Component. Never mount a second map on the home page.

- [ ] **Step 6: Import MapLibre CSS once and verify**

Add `import "maplibre-gl/dist/maplibre-gl.css"` to `app/layout.tsx` after the application stylesheet import.

Run: `pnpm test -- tests/location-ui.test.ts tests/business.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit the location experience**

```bash
git add components/location app/layout.tsx tests/location-ui.test.ts
git commit -m "feat: add interactive business map"
```

### Task 6: Refine contact UX and integrate the confirmed business location

**Files:**
- Create: `components/ui/input.tsx`
- Create: `components/ui/textarea.tsx`
- Create: `components/ui/label.tsx`
- Create: `components/ui/select.tsx`
- Create: `components/ui/skeleton.tsx`
- Modify: `components/contact-form.tsx`
- Modify: `app/contacto/page.tsx`
- Test: `tests/contact-ui.test.ts`

**Interfaces:**
- Consumes: `BusinessLocation`, `buildInquiryMessage`, `buildWhatsAppUrl`, existing service values.
- Produces: labelled shadcn form controls, contextual fields, inline validation/notice, and a contact page containing the only interactive business map.

- [ ] **Step 1: Write a failing contact UI contract test**

```ts
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

describe("contacto premium", () => {
  it("usa controles compartidos y el mapa del negocio", () => {
    const form = readFileSync(join(process.cwd(), "components/contact-form.tsx"), "utf8")
    const page = readFileSync(join(process.cwd(), "app/contacto/page.tsx"), "utf8")
    expect(form).toContain('from "@/components/ui/input"')
    expect(form).toContain('from "@/components/ui/select"')
    expect(form).toContain('aria-describedby=')
    expect(page).toContain("<BusinessLocation")
  })
})
```

- [ ] **Step 2: Run the contact UI test and confirm it fails**

Run: `pnpm test -- tests/contact-ui.test.ts`

Expected: FAIL because the form still uses manual HTML classes and the page lacks the map.

- [ ] **Step 3: Add only the required shadcn form primitives**

Create Input, Textarea, Label, Select, and Skeleton components following the repository's `Button`/`Dialog` conventions, `cn` helper, existing tokens, and current radius values. Install no form framework and no schema resolver because the flow is small and already typed.

- [ ] **Step 4: Refactor `ContactForm`**

Replace `inputClass` and raw controls with shared primitives. Keep labels above fields, add helper IDs, set required fields, retain contextual service fields, and keep the current no-storage behavior. Disable the submit Button only while opening WhatsApp, then restore it immediately. Preserve the live `role="status"` notice.

- [ ] **Step 5: Compose the contact page**

Use an editorial page heading, the form, a Separator, and `<BusinessLocation />`. Do not add office hours or response promises.

- [ ] **Step 6: Run tests and commit**

Run: `pnpm test -- tests/contact-ui.test.ts tests/whatsapp.test.ts tests/services.test.ts`

Expected: PASS.

```bash
git add components/ui/input.tsx components/ui/textarea.tsx components/ui/label.tsx components/ui/select.tsx components/ui/skeleton.tsx components/contact-form.tsx app/contacto/page.tsx tests/contact-ui.test.ts
git commit -m "feat: refine contextual contact journey"
```

### Task 7: Refine catalog and Casa Palac microsite without inventing data

**Files:**
- Modify: `app/alojamientos/page.tsx`
- Modify: `components/property-hero.tsx`
- Modify: `app/alojamientos/[slug]/page.tsx`
- Modify: `components/gallery-lightbox.tsx`
- Modify: `components/property-videos.tsx`
- Modify: `tests/property-ui.test.ts`
- Modify: `tests/content.test.ts`

**Interfaces:**
- Consumes: `activeProperties`, `Property`, PropertyHero, GalleryLightbox, PropertyVideos, Breadcrumb, Separator, AspectRatio, PDF/WhatsApp/share actions.
- Produces: editorial catalog, immersive property hero, quieter content rhythm, and preserved data-driven 404/SEO/PDF behavior.

- [ ] **Step 1: Extend the failing property UI test**

```ts
it("usa un hero de fondo y mantiene ubicaciones separadas", () => {
  const hero = readFileSync(join(process.cwd(), "components/property-hero.tsx"), "utf8")
  const page = readFileSync(join(process.cwd(), "app/alojamientos/[slug]/page.tsx"), "utf8")
  expect(hero).toContain("absolute inset-0")
  expect(hero).toContain("property.featuredImage")
  expect(hero).toContain("bg-linear-to-r")
  expect(page).toContain("property.mapUrl")
  expect(page).not.toContain("BusinessLocation")
})
```

- [ ] **Step 2: Run property tests and confirm the new assertions fail**

Run: `pnpm test -- tests/property-ui.test.ts tests/content.test.ts`

Expected: FAIL on the new immersive-background assertion.

- [ ] **Step 3: Refine catalog heading and property listing**

Keep the PDF action, factual copy, active-property source, and a layout that supports one or many properties. Remove SaaS-like pricing language and avoid empty filters.

- [ ] **Step 4: Convert `PropertyHero` into an immersive background**

Use the confirmed featured photograph as an absolute background with a restrained dark overlay, bottom fade, breadcrumb, badge, heading, description, and three actions. Ensure every button remains visible at 390 px and all text meets contrast requirements.

- [ ] **Step 5: Reduce content-card repetition**

Use section headings, `Separator`, and two-column editorial layouts for description, amenities, room notes, kitchen inventory, gallery, videos, and location. Keep cards only for functional grouping. Retain the official property Maps Button; do not render the business MapLibre component on this page.

- [ ] **Step 6: Verify gallery and video behavior**

Keep Dialog/Carousel keyboard navigation, focus return, image titles/descriptions, AspectRatio for videos, no autoplay with sound, and external fallbacks.

- [ ] **Step 7: Run tests and commit**

Run: `pnpm test -- tests/property-ui.test.ts tests/content.test.ts tests/property-pdf.test.ts tests/pdf-routes.test.ts`

Expected: PASS.

```bash
git add app/alojamientos/page.tsx components/property-hero.tsx 'app/alojamientos/[slug]/page.tsx' components/gallery-lightbox.tsx components/property-videos.tsx tests/property-ui.test.ts tests/content.test.ts
git commit -m "feat: refine editorial property experience"
```

### Task 8: Complete responsive, accessibility, visual, and deployment verification

**Files:**
- Modify: `README.md`
- Modify: tests only if a verified regression is found
- Evidence: `C:/Users/melar/.codex/visualizations/2026/07/22/`

**Interfaces:**
- Consumes: the complete implementation and production environment variables.
- Produces: verified local build, responsive screenshots, updated maintenance instructions, GitHub branch/PR update, and verified Vercel production URL.

- [ ] **Step 1: Document maintenance**

Add the exact business-location fields, map provider/style replacement instructions, MapLibre fallback behavior, how to add a property, and the rule that property coordinates remain absent until confirmed.

- [ ] **Step 2: Run the complete technical gate**

Run:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Expected: every command exits 0 and all test files pass.

- [ ] **Step 3: Run local browser verification**

Start `pnpm start` after the production build. Verify `/`, `/alojamientos`, `/alojamientos/casa-palac`, and `/contacto` at 1440×1000, 1024×900, and 390×844 in light and dark modes. Record:

- no horizontal overflow;
- no broken images or console errors;
- hero copy contrast and focal position;
- Sheet open/close/focus behavior;
- contextual WhatsApp popup contents;
- business map marker, attribution, controls, fallback, and Maps URL;
- Casa Palac Maps URL remains separate;
- gallery ArrowRight/Escape behavior;
- PDF responses and invalid-slug 404 behavior.

- [ ] **Step 4: Compare against the design specification**

Confirm the site reads as premium tourism/services rather than SaaS, uses fewer repeated cards, retains original template proportions/components, uses brand colors consistently, and contains no invented facts.

- [ ] **Step 5: Commit documentation and verified fixes**

```bash
git add README.md tests
git commit -m "docs: document premium experience maintenance"
```

If no test or README changes remain, do not create an empty commit.

- [ ] **Step 6: Publish and deploy**

Push `agent/restore-original-ui`, update the existing draft PR, deploy to the linked Vercel production project with the existing `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, and `NEXT_PUBLIC_PHONE`, then wait for deployment status `Ready`.

- [ ] **Step 7: Verify production in a real browser**

Open `https://nico-experience-web.vercel.app` and repeat the critical desktop/mobile checks, map interaction/fallback, WhatsApp, Maps, gallery, PDFs, console, images, redirects, and 404 checks. Do not declare completion from deployment status alone.

---

## Plan self-review

- Every requirement in the approved specification maps to Tasks 1–8.
- The business and property locations remain separate at both data and UI levels.
- The only new runtime packages are `react-map-gl` and `maplibre-gl`; Sheet uses the already-installed Radix Dialog dependency.
- Interactive maps are isolated to a lazy Client Component with a non-map fallback.
- No task introduces unconfirmed hours, prices, capacity, reviews, policies, or property coordinates.
- All new component interfaces and configuration field names are consistent across tasks.
- No CMS, booking system, payment flow, or unrelated refactor is included.
