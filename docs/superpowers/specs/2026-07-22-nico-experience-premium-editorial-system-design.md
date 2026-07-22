# Nico Experience Premium Editorial System

## Objective

Refine the complete Nico Experience website into a minimal, premium tourism and services experience with a recognizable navy-and-gold identity. The result must feel authored for Nico Experience rather than like a generic SaaS landing page, while remaining accessible, responsive, fast, and easy to extend with new properties and services.

The work covers the shared shell, home page, property catalog, Casa Palac microsite, contact flow, business location, property location presentation, and reusable content/data boundaries. It does not introduce a CMS, authentication, booking engine, admin panel, or unconfirmed business facts.

## Visual approaches considered

### 1. Cinematic full-bleed tourism

Use the neutral editorial travel image across the entire hero with white text and a heavy dark overlay. This immediately communicates travel, but can resemble a conventional hotel banner and can weaken light/dark theme continuity.

### 2. Editorial background field — selected

Use the image as a full hero background while keeping its visual subject weighted to the right. A controlled navy-to-transparent overlay creates a quiet reading field on the left. The content remains asymmetrical, compact, and aligned with the existing template container. This removes the detached image card, communicates tourism immediately, and preserves strong contrast without turning the page into a generic full-screen photograph.

### 3. Modular photographic collage

Use two or three offset photographs around the headline. This would create more visual energy, but adds noise, increases responsive complexity, and would compete with the property gallery.

## Design direction

The chosen direction is **premium coastal editorial**:

- Navy is the structural brand color; gold is a controlled accent for actions, markers, rules, and small highlights.
- Photography supplies atmosphere and human warmth. Decorative gradients, glows, and cards do not compete with it.
- Layouts use the original template's container widths, radii, motion language, theme switcher, and breakpoints.
- Sections rely more on whitespace, separators, clear hierarchy, and varied image scale than on repeated equal cards.
- Copy remains concrete and service-oriented. No SaaS terminology, fake metrics, invented prices, or exaggerated tourism claims.
- The current typography family remains unchanged to protect continuity with the original template. Premium character comes from scale, spacing, weight, line length, and contrast rather than a new font dependency.

## Shared shell

### Navigation

Keep the sticky, blurred navigation and existing desktop interaction. Improve hierarchy by using the compact Nico Experience mark, concise navigation labels, and one gold primary contact action. The mobile menu will use the official shadcn/Radix `Sheet` pattern so focus trapping, keyboard dismissal, and touch targets are handled by a maintained primitive.

The Casa Palac link and the Nico Experience business-location link must be visually and semantically distinct. The business location uses the newly confirmed URL:

`https://maps.app.goo.gl/CV11vyc2QaYzxB1x6`

### Footer

Reduce card-like framing and present three quiet information groups: brand promise, navigation, and contact/location. Include the confirmed business map link, WhatsApp, and Tocoa, Colón. Preserve dark mode and the original footer boundary.

## Home page

### Hero

- Use the existing neutral travel image as an edge-to-edge hero background, not a right-side card.
- Use an editorial left-aligned content column inside the original maximum-width container.
- Apply a navy overlay that is strongest behind the copy and fades toward the image subject.
- Add a subtle bottom fade into the page background so the next section feels connected.
- Retain badge, heading, description, two actions, brand tagline, and Framer Motion entrance choreography.
- Keep height content-driven with a generous minimum height; never use `h-screen`.
- On mobile, shift the image focal point, strengthen the overlay, stack actions full-width, and keep the headline above the fold.
- Respect `prefers-reduced-motion` and avoid autoplay or perpetual motion.

### Service discovery

Retain the compact icon strip as a fast overview, then redesign the detailed service area as an alternating editorial list instead of a generic equal-card grid. Each service has one icon, concrete description, and contextual contact action. Use shadcn `Button` and `Separator`; reserve `Tooltip` for icon-only controls that need an accessible visible label. Do not create a second card system.

### Featured accommodation

Present Casa Palac as a large photographic feature with name, beach descriptor, confirmed amenities, and direct actions. The component must remain data-driven so a second active property automatically joins the catalog without hard-coded layout assumptions.

### Trust and testimonials

Keep the original masonry testimonial design available. Render it only when verified reviews exist. Until then, do not show a decorative empty section or invented social proof.

### FAQ and closing action

Keep the Radix/shadcn accordion. Add a restrained closing contact band that summarizes the one-stop value proposition and sends the visitor to the contextual form or WhatsApp.

## Catalog and property microsite

### Catalog

Use a concise editorial heading, a downloadable-catalog action, and image-led property entries. Filters are excluded until multiple properties make them useful. Active/featured behavior remains driven by the Zod content model.

### Property hero

Keep Casa Palac separate from the main business hero. Use its confirmed pool photograph as an immersive background with a readable overlay, breadcrumb, beach-location badge, description, WhatsApp, share, and PDF actions. Maintain full keyboard access and good mobile contrast.

### Property content

Use section rhythm and separators to reduce visual card repetition. Keep the gallery, confirmed amenities, room notes, kitchen inventory, video support, location action, and FAQ. Gallery enlargement continues to use the maintained Dialog/Carousel primitives.

The current Google Maps link for Casa Palac remains authoritative. An interactive property map will not claim coordinates until a reliable property coordinate is stored explicitly in the property data.

## Business map

Create a reusable, client-only `LocationMap` component powered by `react-map-gl` with `maplibre-gl`. Use OpenFreeMap's maintained public MapLibre style and the required visible attribution. The confirmed short link resolves to coordinates `15.656205, -86.004107`; store these centrally alongside the original Google Maps URL.

Behavior:

- Load the map only when its section approaches the viewport.
- Disable scroll-wheel zoom by default so the page does not trap scrolling.
- Provide compact zoom controls, keyboard focus, a branded marker, and an always-visible “Abrir en Google Maps” action.
- Use the light OpenFreeMap style in light mode and its dark style in dark mode.
- If WebGL or tiles fail, show a styled fallback location panel with the same official Google Maps action; the address journey must never depend solely on the map library.
- Keep the provider/style URL configurable so the tile source can be replaced without rewriting the component.

The interactive business map appears only on the contact page. The home page uses a lightweight location summary and official Google Maps link without loading a second map instance.

## Contact experience

Keep the current privacy-friendly flow that constructs a contextual WhatsApp message without storing customer data. Improve it with shadcn form primitives, explicit labels, helper text, inline validation, service selection, and clear confirmation of what will happen after pressing the button.

The contact page combines the form with business location and hours only if hours are later confirmed. It must not imply office hours, response time, or physical walk-in service without confirmation.

## Component and data architecture

- Centralize brand and business coordinates/links in `config/brand.ts` or a dedicated `config/business.ts`.
- Keep service content in `content/services.ts` and property content in `content/properties.ts`.
- Extend property coordinates as optional validated data rather than inferring them at render time.
- Create focused composition components: immersive hero, editorial service list, featured property, location map, location fallback, closing CTA, and mobile sheet navigation.
- Use Server Components for static content and isolate Framer Motion, map rendering, dialogs, theme interaction, and forms in small Client Components.
- Reuse shadcn/Radix Button, Badge, Card only where hierarchy requires a surface, Sheet, Dialog, Carousel, Accordion, Breadcrumb, Separator, Tooltip, AspectRatio, and Skeleton.
- Add only `react-map-gl`, `maplibre-gl`, and the Radix dependency required by the shadcn Sheet if missing.

## Accessibility and performance

- Maintain AA-level text contrast over every hero focal position.
- Preserve visible focus, semantic headings, landmarks, skip link, keyboard gallery, and safe external-link attributes.
- Honor reduced motion.
- Keep `next/image`, explicit image sizing, responsive `sizes`, AVIF/WebP generation, and priority only for above-the-fold imagery.
- Lazy-load the interactive map and show a matching skeleton while its code and tiles load.
- Avoid inline styles except unavoidable numeric map viewport properties supplied through the library API; visual styling remains in Tailwind and existing tokens.
- Test at 1440, 1024, and 390 pixels in both themes with no horizontal overflow.

## Validation

Automated coverage will verify:

- the new business Maps URL and resolved coordinates;
- distinction between business and Casa Palac locations;
- hero background composition and removal of the detached image card;
- active-property rendering and invalid-slug 404 behavior;
- contextual WhatsApp messages;
- map fallback and accessible external link;
- mobile Sheet navigation, theme switcher, gallery keyboard behavior, PDFs, and lack of fake testimonials;
- lint, typecheck, unit tests, and production build.

Browser verification will cover the complete home, catalog, Casa Palac, and contact journeys in light/dark desktop/tablet/mobile views. Production will be redeployed and opened only after the local visual and technical gates pass.

## Out of scope and pending facts

- No booking or payment engine.
- No administrative CMS.
- No live availability.
- No prices, capacity, policies, opening hours, response-time promises, reviews, or property coordinates unless confirmed.
- No interactive map for Casa Palac until its exact coordinate is stored as confirmed data.
