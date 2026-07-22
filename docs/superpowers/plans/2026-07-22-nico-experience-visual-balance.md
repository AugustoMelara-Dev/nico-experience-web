# Nico Experience Visual Balance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the complete Nico Experience site with a cleaner brand lockup, lighter hero treatment, centered footer identity, balanced section rhythm, and a scalable accommodation catalog.

**Architecture:** Preserve the existing content-driven Next.js App Router architecture. Add one reusable property-card/catalog boundary, keep featured-property presentation independent from the catalog, and centralize all visual calibration in existing theme tokens and components rather than introducing another design system.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/Radix, Framer Motion, next/image, Vitest, Playwright browser verification.

## Global Constraints

- Preserve existing data, routes, PDFs, maps, WhatsApp behavior, SEO, dark mode, and accessibility.
- Keep Casa Palac as the property name and “frente a la playa” only as a location descriptor.
- Do not publish unconfirmed prices, capacity, inventory, reviews, videos, or policies.
- Use semantic theme tokens, existing shadcn components, Lucide icons, and Tailwind composition.
- Do not add a new font, CSS file, design system, or inline styles.
- The catalog must support additional active properties through content only.

---

### Task 1: Clean brand lockup and footer balance

**Files:**
- Modify: `components/brand-logo.tsx`
- Modify: `components/footer.tsx`
- Modify: `config/brand.ts`
- Create: `public/brand/nico-experience-lockup-transparent.webp`
- Test: `tests/brand.test.ts`
- Test: `tests/shell-ui.test.ts`

**Interfaces:**
- Consumes: `brandConfig`, `businessConfig`, `siteConfig`, `BrandLogo`.
- Produces: a transparent full lockup for footer use and a centered footer composition.

- [ ] **Step 1: Add failing source assertions**

Assert that `brandConfig.logoWeb` points to the transparent lockup, that the footer no longer gives `BrandLogo` a bordered card, and that the footer brand block uses centered alignment.

- [ ] **Step 2: Run focused tests and confirm failure**

Run: `pnpm test -- tests/brand.test.ts tests/shell-ui.test.ts`

Expected: FAIL because the old logo asset and left-aligned footer are still present.

- [ ] **Step 3: Produce and wire the cleaned logo asset**

Create a tightly bounded transparent WebP that preserves the provided icon, wordmark, descriptor, and tagline. Update `brandConfig.logoWeb` and make the full `BrandLogo` render without a border, card background, or excess padding.

- [ ] **Step 4: Center and simplify the footer**

Render a centered brand introduction followed by a balanced navigation/contact grid. Keep Maps and WhatsApp external-link security attributes and remove the repeated location from the copyright row.

- [ ] **Step 5: Run focused tests and commit**

Run: `pnpm test -- tests/brand.test.ts tests/shell-ui.test.ts`

Expected: PASS.

Commit: `feat: refine brand lockup and footer`

### Task 2: Soften hero color and improve composition

**Files:**
- Modify: `components/hero.tsx`
- Modify: `app/globals.css`
- Test: `tests/hero-ui.test.ts`

**Interfaces:**
- Consumes: `brandConfig.heroImage`, brand theme tokens, existing Button variants.
- Produces: a lower-opacity localized hero scrim with preserved contrast.

- [ ] **Step 1: Add failing hero assertions**

Assert that the hero no longer uses the near-opaque `via ... /90` navy overlay, keeps left-aligned content, and uses a localized gradient plus neutral veil.

- [ ] **Step 2: Run the test and confirm failure**

Run: `pnpm test -- tests/hero-ui.test.ts`

Expected: FAIL on the old overlay classes.

- [ ] **Step 3: Implement the lighter treatment**

Use a left-side navy scrim that fades before the image focal point, a subtle neutral bottom fade, a tighter readable text column, and existing gold/outline button hierarchy. Preserve `useReducedMotion`.

- [ ] **Step 4: Run the test and commit**

Run: `pnpm test -- tests/hero-ui.test.ts`

Expected: PASS.

Commit: `feat: soften the editorial hero`

### Task 3: Create scalable accommodation catalog cards

**Files:**
- Create: `components/property-card.tsx`
- Create: `components/property-catalog.tsx`
- Modify: `app/alojamientos/page.tsx`
- Modify: `components/pricing.tsx`
- Test: `tests/property-ui.test.ts`

**Interfaces:**
- Consumes: `Property`, `activeProperties`, `featuredProperties`, `WhatsAppLink`.
- Produces: `PropertyCard({ property, priority? })` and `PropertyCatalog({ properties })`.

- [ ] **Step 1: Add failing catalog assertions**

Assert that `/alojamientos` renders `PropertyCatalog` from `activeProperties`, the catalog uses a responsive grid, and homepage `Pricing` remains driven by `featuredProperties`.

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `pnpm test -- tests/property-ui.test.ts`

Expected: FAIL because the catalog still reuses the featured homepage composition.

- [ ] **Step 3: Implement reusable cards and catalog**

Build an image-led shadcn Card with fixed aspect ratio, confirmed location/amenities, “Ver alojamiento,” and “Consultar” actions. Render active properties in a one/two/three-column responsive grid without assumptions about property count.

- [ ] **Step 4: Update the catalog page**

Keep its editorial introduction and PDF action, then render `PropertyCatalog` directly. Keep `Pricing` exclusive to the homepage featured story.

- [ ] **Step 5: Run focused tests and commit**

Run: `pnpm test -- tests/property-ui.test.ts`

Expected: PASS.

Commit: `feat: scale the accommodation catalog`

### Task 4: Harmonize the complete site rhythm

**Files:**
- Modify: `components/partners.tsx`
- Modify: `components/service-cards.tsx`
- Modify: `components/pricing.tsx`
- Modify: `components/faq.tsx`
- Modify: `components/closing-cta.tsx`
- Modify: `app/contacto/page.tsx`
- Modify: `app/alojamientos/[slug]/page.tsx`
- Test: `tests/home-sections.test.ts`
- Test: `tests/contact-ui.test.ts`
- Test: `tests/property-ui.test.ts`

**Interfaces:**
- Consumes: existing section content and shadcn components.
- Produces: consistent section headers, container widths, vertical spacing, and action hierarchy.

- [ ] **Step 1: Add structural regression assertions**

Assert consistent `max-w-7xl`, mobile `px-4`, desktop `md:px-8`, restrained section spacing, centered supporting headers where appropriate, and semantic Card/Separator use.

- [ ] **Step 2: Run focused tests and confirm failure**

Run: `pnpm test -- tests/home-sections.test.ts tests/contact-ui.test.ts tests/property-ui.test.ts`

Expected: FAIL where the current compositions diverge.

- [ ] **Step 3: Apply the rhythm audit**

Adjust only composition classes and component structure: align service introduction, accommodation heading, FAQ, CTA, contact introduction/map, and property detail sections. Do not change confirmed content or functionality.

- [ ] **Step 4: Run focused tests and commit**

Run: `pnpm test -- tests/home-sections.test.ts tests/contact-ui.test.ts tests/property-ui.test.ts`

Expected: PASS.

Commit: `feat: harmonize site-wide visual rhythm`

### Task 5: Visual and functional verification

**Files:**
- Modify: `README.md`
- Generate ignored evidence: `output/playwright/visual-balance-*.png`

**Interfaces:**
- Consumes: production build and local server.
- Produces: verified screenshots and maintenance notes.

- [ ] **Step 1: Run the complete quality gate**

Run in order: `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.

Expected: zero lint/type errors, all tests passing, and a successful production build.

- [ ] **Step 2: Verify browser behavior**

At 1440, 1024, and 390 px in light and dark themes, inspect `/`, `/alojamientos`, `/alojamientos/casa-palac`, and `/contacto`. Confirm no overflow, broken images, JavaScript errors, or failed resources; verify Sheet, theme toggle, lightbox, map, WhatsApp, PDFs, redirects, and 404 behavior.

- [ ] **Step 3: Update maintenance documentation**

Document the transparent logo asset, catalog component boundary, and how a future property enters the responsive grid through `content/properties.ts`.

- [ ] **Step 4: Commit the verified refinement**

Commit: `docs: finalize visual balance handoff`

### Task 6: Publish and verify production

**Files:**
- No source changes expected.

**Interfaces:**
- Consumes: clean verified branch.
- Produces: updated GitHub branch/PR and a Vercel production deployment.

- [ ] **Step 1: Push the current branch**

Run: `git push -u origin agent/restore-original-ui`

Expected: branch is synchronized with origin and the existing draft PR updates.

- [ ] **Step 2: Deploy to Vercel production**

Run: `vercel deploy . --prod -y --scope augusto-jose-melara-millas-projects`

Expected: deployment reaches `Ready` and receives the canonical alias `https://nico-experience-web.vercel.app`.

- [ ] **Step 3: Repeat public browser checks**

Verify the same routes and interactions against the canonical URL. Require zero JavaScript errors, zero broken images, working map and WhatsApp links, valid PDFs, 404 for unknown slugs, and 308 for the legacy Casa Palac slug.
