# Nico Experience Visual Balance Refinement

## Objective

Refine the current premium editorial implementation so the brand feels lighter, more intentional, and ready to present multiple accommodations. The change must preserve the existing Next.js, Tailwind, shadcn/Radix, Framer Motion, content, routes, maps, PDFs, accessibility, and dark-mode architecture.

## Chosen direction

Use a balanced editorial system instead of centering every screen. The homepage hero remains left-aligned because this creates a reliable reading edge over photography. Brand moments that currently feel visually unbalanced—especially the footer logo—become centered and quieter. Navy remains the brand anchor but stops behaving as a full opaque color field.

Rejected alternatives:

1. Center every heading and action. This would make the site more generic and reduce scanability on desktop.
2. Change only the footer logo. This would leave the heavy hero treatment and catalog scalability concerns unresolved.

## Brand asset treatment

- Create a tightly cropped, transparent full brand lockup from the supplied logo.
- Keep the transparent wordmark for compact navbar use.
- Remove the bordered white card around the full footer logo.
- Render the footer mark at a restrained size with guaranteed contrast in light and dark themes.
- Preserve the supplied wording and brand artwork; do not redraw or invent a new logo.

## Homepage hero

- Keep the neutral travel-planning image as a full background.
- Replace the current dominant navy overlay with layered neutral and navy veils at lower opacity.
- Preserve strong text contrast with a localized left-side scrim rather than tinting the entire photograph heavily.
- Retain left alignment on desktop and mobile, but tighten the line length and vertical rhythm.
- Keep gold for the primary action and use a translucent neutral treatment for the secondary action.
- Avoid decorative gradients outside the existing image-legibility layers.

## Footer

- Center the brand lockup, description, and tagline as a single introductory block.
- Place navigation and contact information below it in a balanced two-column layout on desktop and a centered single column on mobile.
- Remove the oversized logo card and redundant location repetition.
- Retain real Maps, phone, and WhatsApp links, safe external-link attributes, and semantic shadcn buttons/separators.

## Accommodation scalability

- The homepage continues to show featured properties with a spacious editorial composition.
- The `/alojamientos` page receives a dedicated catalog grid rather than reusing the homepage featured layout.
- Property cards are data-driven from `activeProperties`; adding a second property must require content only, not layout changes.
- Cards use consistent image ratios, titles, locations, confirmed amenities, and direct actions.
- Empty and single-property states remain visually intentional.

## System-wide balance

- Audit repeated heading alignment, container widths, section spacing, card density, and button hierarchy across homepage, catalog, property, contact, and footer.
- Favor semantic theme tokens and the current component library.
- No new font, design system, inline styles, unverified claims, prices, ratings, or reviews.
- Keep motion subtle and respect reduced-motion preferences.

## Validation

- Run lint, typecheck, tests, and production build.
- Verify 1440 px, 1024 px, and 390 px in light and dark themes.
- Confirm no horizontal overflow, broken images, console errors, or invalid links.
- Verify the navbar, mobile sheet, lightbox, business map, WhatsApp flow, both PDFs, 404 behavior, and redirect behavior.
- Deploy to Vercel and repeat the critical browser checks against the public URL.
