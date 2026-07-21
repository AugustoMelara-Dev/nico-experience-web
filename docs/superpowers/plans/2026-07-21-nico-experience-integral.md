# Nico Experience Integral Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir la web actual en la landing integral de Nico Experience, corregir la identidad de Casa Palac y ofrecer consultas contextuales por WhatsApp sin perder el sistema visual original.

**Architecture:** El contenido institucional y de alojamientos se mantiene centralizado y validado con Zod. La interfaz reutiliza los shells existentes de la plantilla; un constructor puro genera mensajes de WhatsApp desde un formulario condicional en cliente, sin API ni persistencia. Casa Palac adopta un slug canónico corto y el slug publicado anteriormente se conserva mediante redirección permanente.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Framer Motion, next-themes, Radix UI/shadcn, Lucide React, Zod, Vitest, Vercel.

## Global Constraints

- El alojamiento se llama exactamente `Casa Palac`; “frente a la playa” es un descriptor.
- La URL canónica es `/alojamientos/casa-palac` y la anterior debe redirigir permanentemente.
- El WhatsApp confirmado es `50493731060`.
- La empresa está ubicada en Tocoa, Colón y ofrece viajes, hospedaje, trámites, gestiones y soluciones digitales.
- No publicar precios, capacidades, políticas, reglas, reseñas ni inventarios no confirmados.
- Conservar tipografía, tokens, navbar sticky/blur, selector de tema, escalas, componentes, animaciones y responsive de la plantilla original.
- No añadir una API, base de datos, autenticación ni sistema de diseño nuevo.
- Mantener las 25 fotografías de Casa Palac y sus originales; optimizar derivados sin alterar la realidad de los espacios.

---

## File Structure

- `content/services.ts`: esquema Zod y contenido de las líneas de servicio.
- `content/testimonials.ts`: esquema y filtro de testimonios reales verificados.
- `content/properties.ts`: fuente única para Casa Palac, medios y datos confirmados.
- `lib/whatsapp.ts`: normalización, creación de mensajes contextuales y URL `wa.me`.
- `components/service-cards.tsx`: tarjetas de las líneas de servicio con el shell visual existente.
- `components/testimonials.tsx`: masonry original, condicionado a datos verificados.
- `components/contact-form.tsx`: formulario dinámico que consume el constructor de mensajes.
- `components/hero.tsx`, `partners.tsx`, `pricing.tsx`, `faq.tsx`, `footer.tsx`, `navbar.tsx`: adaptación editorial sin modificar el sistema visual.
- `app/page.tsx`, `app/contacto/page.tsx`, `app/alojamientos/**`: composición de páginas y metadata.
- `next.config.mjs`, `app/sitemap.ts`, `app/robots.ts`: canonical, redirecciones y descubrimiento.
- `tests/content.test.ts`, `tests/services.test.ts`, `tests/whatsapp.test.ts`: contratos de datos y mensajería.

---

### Task 1: Corregir la identidad y la ruta canónica de Casa Palac

**Files:**
- Modify: `content/properties.ts`
- Modify: `tests/content.test.ts`
- Modify: `next.config.mjs`
- Modify: `components/navbar.tsx`
- Modify: `config/site.ts`
- Modify: `app/alojamientos/page.tsx`

**Interfaces:**
- Produces: `getProperty("casa-palac"): Property | undefined`
- Produces: redirección permanente `/alojamientos/casa-palac-frente-a-playa` → `/alojamientos/casa-palac`

- [ ] **Step 1: Cambiar primero las expectativas del contenido**

```ts
const slug = "casa-palac"

it("publica Casa Palac con identidad y descriptor separados", () => {
  const property = getProperty(slug)!
  expect(property.name).toBe("Casa Palac")
  expect(property.locationLabel).toBe("Frente a la playa")
  expect(property.whatsappMessage).toContain("Casa Palac")
  expect(property.whatsappMessage).not.toContain("Casa Palac frente a playa")
})
```

- [ ] **Step 2: Ejecutar la prueba y confirmar el fallo**

Run: `pnpm test -- tests/content.test.ts`

Expected: FAIL porque el slug y el nombre aún contienen `frente-a-playa`.

- [ ] **Step 3: Corregir los datos centralizados**

```ts
{
  slug: "casa-palac",
  name: "Casa Palac",
  shortDescription: "Una casa ubicada frente a la playa, con espacios para descansar y compartir.",
  description: "Casa Palac está ubicada frente a la playa y reúne ambientes interiores, terrazas de madera, piscina y áreas de descanso para disfrutar una estadía junto al mar.",
  locationLabel: "Frente a la playa",
  whatsappMessage: "Hola, vi Casa Palac en la página de Nico Experience y me gustaría consultar disponibilidad.",
}
```

Conservar las rutas físicas actuales de las imágenes para evitar una migración de archivos sin valor funcional. Corregir todos los títulos y `alt` que conviertan el descriptor en parte del nombre.

- [ ] **Step 4: Añadir redirecciones y actualizar enlaces internos**

```js
{ source: "/alojamientos/casa-palac-frente-a-playa", destination: "/alojamientos/casa-palac", permanent: true },
{ source: "/cabanas/casa-vip", destination: "/alojamientos/casa-palac", permanent: true },
```

Actualizar `config/site.ts`, navbar y catálogo para consumir `/alojamientos/casa-palac`.

- [ ] **Step 5: Verificar y guardar el cambio**

Run: `pnpm test -- tests/content.test.ts && pnpm typecheck`

Expected: PASS.

```bash
git add content/properties.ts tests/content.test.ts next.config.mjs components/navbar.tsx config/site.ts app/alojamientos/page.tsx
git commit -m "fix: separate Casa Palac name from beach descriptor"
```

---

### Task 2: Modelar las líneas de servicio de Nico Experience

**Files:**
- Create: `content/services.ts`
- Create: `tests/services.test.ts`
- Modify: `config/site.ts`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `ServiceSlug`, `Service`, `services`, `getService(slug)`
- Consumes later: formulario, franja de iconos y tarjetas de servicios.

- [ ] **Step 1: Escribir el contrato de servicios**

```ts
import { describe, expect, it } from "vitest"
import { services } from "../content/services"

describe("servicios de Nico Experience", () => {
  it("publica las cinco líneas confirmadas", () => {
    expect(services.map(({ slug }) => slug)).toEqual([
      "viajes", "hospedaje", "tramites", "gestiones", "soluciones-digitales",
    ])
  })

  it("cada servicio tiene contenido utilizable", () => {
    expect(services.every((service) => service.title && service.description && service.icon)).toBe(true)
  })
})
```

- [ ] **Step 2: Confirmar que falla por módulo inexistente**

Run: `pnpm test -- tests/services.test.ts`

Expected: FAIL con error de importación de `content/services`.

- [ ] **Step 3: Crear el modelo validado**

```ts
import { z } from "zod"

const serviceSchema = z.object({
  slug: z.enum(["viajes", "hospedaje", "tramites", "gestiones", "soluciones-digitales"]),
  title: z.string().min(1),
  shortLabel: z.string().min(1),
  description: z.string().min(1),
  icon: z.enum(["plane", "bed", "file-text", "briefcase", "monitor-smartphone"]),
})

export const services = z.array(serviceSchema).parse([
  { slug: "viajes", title: "Viajes", shortLabel: "Viajes", description: "Atención personalizada para encontrar opciones que se adapten a tu viaje.", icon: "plane" },
  { slug: "hospedaje", title: "Hospedaje", shortLabel: "Hospedajes", description: "Alojamientos presentados con información clara y acompañamiento directo.", icon: "bed" },
  { slug: "tramites", title: "Trámites", shortLabel: "Trámites", description: "Orientación práctica para avanzar con tus trámites y requisitos.", icon: "file-text" },
  { slug: "gestiones", title: "Gestiones", shortLabel: "Gestiones", description: "Apoyo personalizado para coordinar necesidades y encontrar una solución eficiente.", icon: "briefcase" },
  { slug: "soluciones-digitales", title: "Soluciones digitales", shortLabel: "Soluciones digitales", description: "Herramientas y apoyo digital adaptados a las necesidades de cada cliente.", icon: "monitor-smartphone" },
])

export type Service = z.infer<typeof serviceSchema>
export type ServiceSlug = Service["slug"]
export const getService = (slug: string) => services.find((service) => service.slug === slug)
```

- [ ] **Step 4: Actualizar descripción global y metadata**

Usar esta descripción en `config/site.ts` y `app/layout.tsx`:

```ts
"Turismo y soluciones integrales en Tocoa, Colón: viajes, hospedaje, trámites, gestiones y soluciones digitales con atención personalizada."
```

- [ ] **Step 5: Verificar y guardar**

Run: `pnpm test -- tests/services.test.ts && pnpm typecheck`

Expected: PASS.

```bash
git add content/services.ts tests/services.test.ts config/site.ts app/layout.tsx
git commit -m "feat: model Nico Experience service lines"
```

---

### Task 3: Construir consultas contextuales de WhatsApp

**Files:**
- Modify: `lib/whatsapp.ts`
- Create: `tests/whatsapp.test.ts`
- Modify: `components/contact-form.tsx`
- Modify: `app/contacto/page.tsx`
- Modify: `.env.example`

**Interfaces:**
- Produces: `InquiryInput`
- Produces: `buildInquiryMessage(input: InquiryInput): string`
- Consumes: `ServiceSlug`, `buildWhatsAppUrl(message, number?)`

- [ ] **Step 1: Escribir pruebas del mensaje dinámico**

```ts
import { describe, expect, it } from "vitest"
import { buildInquiryMessage, buildWhatsAppUrl } from "../lib/whatsapp"

describe("consulta contextual", () => {
  it("incluye campos de hospedaje sin inventar valores", () => {
    const message = buildInquiryMessage({
      name: "Ana", service: "hospedaje", details: "Quiero conocer disponibilidad",
      property: "Casa Palac", date: "2026-08-10", guests: "4",
    })
    expect(message).toContain("Servicio: Hospedaje")
    expect(message).toContain("Alojamiento: Casa Palac")
    expect(message).toContain("Personas: 4")
  })

  it("omite campos vacíos", () => {
    const message = buildInquiryMessage({ name: "Luis", service: "tramites", details: "Necesito orientación" })
    expect(message).not.toContain("Fecha:")
    expect(message).not.toContain("Personas:")
  })

  it("abre el número oficial normalizado", () => {
    expect(buildWhatsAppUrl("Hola", "+504 9373-1060")).toBe("https://wa.me/50493731060?text=Hola")
  })
})
```

- [ ] **Step 2: Ejecutar y confirmar el fallo**

Run: `pnpm test -- tests/whatsapp.test.ts`

Expected: FAIL porque `buildInquiryMessage` aún no existe.

- [ ] **Step 3: Implementar el constructor puro**

```ts
export type InquiryInput = {
  name: string
  service: "viajes" | "hospedaje" | "tramites" | "gestiones" | "soluciones-digitales" | "otro"
  details: string
  property?: string
  date?: string
  guests?: string
  destination?: string
}

const labels: Record<InquiryInput["service"], string> = {
  viajes: "Viajes", hospedaje: "Hospedaje", tramites: "Trámites",
  gestiones: "Gestiones", "soluciones-digitales": "Soluciones digitales", otro: "Otro",
}

export function buildInquiryMessage(input: InquiryInput) {
  const lines = [
    "Hola, vi la página de Nico Experience y me gustaría recibir ayuda.",
    `Nombre: ${input.name.trim()}`,
    `Servicio: ${labels[input.service]}`,
    input.property?.trim() ? `Alojamiento: ${input.property.trim()}` : "",
    input.destination?.trim() ? `Destino o necesidad: ${input.destination.trim()}` : "",
    input.date?.trim() ? `Fecha aproximada: ${input.date.trim()}` : "",
    input.guests?.trim() ? `Personas: ${input.guests.trim()}` : "",
    `Consulta: ${input.details.trim()}`,
  ]
  return lines.filter(Boolean).join("\n")
}
```

- [ ] **Step 4: Adaptar el formulario con campos condicionales**

Usar un `<select>` nativo con el mismo `inputClass`; mostrar propiedad/fecha/personas para `hospedaje`, destino para `viajes` y el campo libre obligatorio para todos. En `submit`, construir `InquiryInput`, llamar `buildInquiryMessage` y abrir `buildWhatsAppUrl(message)`.

Configurar:

```dotenv
NEXT_PUBLIC_WHATSAPP_NUMBER=50493731060
NEXT_PUBLIC_PHONE=+504 9373-1060
```

- [ ] **Step 5: Verificar y guardar**

Run: `pnpm test -- tests/whatsapp.test.ts && pnpm lint && pnpm typecheck`

Expected: PASS.

```bash
git add lib/whatsapp.ts tests/whatsapp.test.ts components/contact-form.tsx app/contacto/page.tsx .env.example
git commit -m "feat: add contextual WhatsApp inquiries"
```

---

### Task 4: Reorientar la página principal al negocio integral

**Files:**
- Create: `components/service-cards.tsx`
- Modify: `components/hero.tsx`
- Modify: `components/partners.tsx`
- Modify: `components/pricing.tsx`
- Modify: `components/navbar.tsx`
- Modify: `components/footer.tsx`
- Modify: `components/faq.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `services`, `featuredProperties`, `siteConfig`
- Produces: secciones `#servicios`, `#alojamientos`, `#preguntas`, `#contacto`.

- [ ] **Step 1: Añadir una prueba estática de contenido público**

```ts
it("describe el negocio integral sin limitarlo a hospedajes", () => {
  expect(siteConfig.description).toContain("viajes")
  expect(siteConfig.description).toContain("trámites")
  expect(siteConfig.description).toContain("soluciones digitales")
  expect(siteConfig.description).toContain("Tocoa, Colón")
})
```

- [ ] **Step 2: Ejecutar y confirmar el fallo previo a la adaptación**

Run: `pnpm test`

Expected: FAIL si la descripción global todavía habla únicamente de hospedajes.

- [ ] **Step 3: Adaptar hero y navegación sin cambiar sus shells**

Contenido del hero:

```text
Badge: Turismo y soluciones integrales en Tocoa, Colón
Título: Encuentra la solución que necesitas con Nico Experience
Descripción: Viajes, hospedaje, trámites, gestiones y soluciones digitales con atención personalizada, práctica y confiable.
CTA principal: Cuéntanos qué necesitas
CTA secundario: Explorar alojamientos
```

La navegación de escritorio y móvil debe incluir Inicio, Servicios, Alojamientos, Preguntas y Contacto, conservando sticky, blur, dropdown y theme switcher.

- [ ] **Step 4: Crear tarjetas y franja de servicios**

`partners.tsx` mapeará los cinco iconos desde `services`. `service-cards.tsx` reutilizará `Card`, `CardContent`, `Button`, las animaciones de entrada y los tamaños de contenedor existentes. Cada CTA enlazará a `/contacto?servicio=<slug>`.

- [ ] **Step 5: Mantener Casa Palac como alojamiento destacado**

`pricing.tsx` conservará el shell original, pero mostrará:

```text
Etiqueta: Frente a la playa
Nombre: Casa Palac
Acciones: Ver alojamiento / Consultar
```

- [ ] **Step 6: Actualizar FAQ y footer**

FAQ general: cómo pedir ayuda, qué servicios atiende Nico Experience, cómo consultar alojamiento, dónde se encuentra Casa Palac y cómo continúa la atención. No publicar políticas sin confirmar. Footer: descripción integral, `Tocoa, Colón`, teléfono real y enlaces actualizados.

- [ ] **Step 7: Componer la home y verificar**

```tsx
<Hero />
<Partners />
<ServiceCards />
<Pricing />
<Testimonials />
<Faq />
<Footer />
```

Run: `pnpm lint && pnpm typecheck && pnpm test`

Expected: PASS.

```bash
git add app/page.tsx components/hero.tsx components/partners.tsx components/service-cards.tsx components/pricing.tsx components/navbar.tsx components/footer.tsx components/faq.tsx
git commit -m "feat: present Nico Experience as an integral service business"
```

---

### Task 5: Recuperar Testimonials sin publicar reseñas falsas

**Files:**
- Create: `content/testimonials.ts`
- Create: `components/testimonials.tsx`
- Modify: `tests/services.test.ts`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `verifiedTestimonials`
- Produces: `<Testimonials />` que devuelve `null` con una lista vacía.

- [ ] **Step 1: Escribir el contrato de publicación segura**

```ts
import { verifiedTestimonials } from "../content/testimonials"

it("no publica testimonios sin contenido real verificado", () => {
  expect(verifiedTestimonials).toEqual([])
})
```

- [ ] **Step 2: Confirmar el fallo por módulo inexistente**

Run: `pnpm test -- tests/services.test.ts`

Expected: FAIL por importación inexistente.

- [ ] **Step 3: Crear el modelo y la colección vacía**

```ts
import { z } from "zod"

const testimonialSchema = z.object({
  name: z.string().min(1),
  comment: z.string().min(1),
  source: z.string().min(1).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  verified: z.literal(true),
})

export const verifiedTestimonials = z.array(testimonialSchema).parse([])
export type Testimonial = z.infer<typeof testimonialSchema>
```

- [ ] **Step 4: Recuperar el masonry original condicionado**

Copiar la estructura visual y animaciones de `upstream/master:components/testimonials.tsx`, sustituir su arreglo ficticio por `verifiedTestimonials` y añadir al inicio:

```tsx
if (verifiedTestimonials.length === 0) return null
```

No renderizar encabezado, estrellas, avatares ni botón “Ver más” cuando la lista esté vacía.

- [ ] **Step 5: Verificar y guardar**

Run: `pnpm test -- tests/services.test.ts && pnpm lint && pnpm typecheck`

Expected: PASS y ninguna reseña visible en producción.

```bash
git add content/testimonials.ts components/testimonials.tsx tests/services.test.ts app/page.tsx
git commit -m "feat: prepare verified testimonials section"
```

---

### Task 6: Actualizar el micrositio y la narrativa visual de Casa Palac

**Files:**
- Modify: `app/alojamientos/[slug]/page.tsx`
- Modify: `components/gallery-lightbox.tsx`
- Modify: `content/properties.ts`
- Modify: `tests/content.test.ts`

**Interfaces:**
- Consumes: `getProperty("casa-palac")`, 25 medios y Maps oficial.
- Produces: metadata canónica, JSON-LD prudente, galería accesible y recorrido por espacios.

- [ ] **Step 1: Ampliar pruebas de contenido confirmado**

```ts
it("documenta el equipamiento visible y evita inventario no confirmado", () => {
  const property = getProperty("casa-palac")!
  expect(property.kitchenInventory).toEqual(["Estufa", "Refrigeradora", "Microondas", "Gabinetes", "Área de trabajo"])
  expect(property.kitchenInventory).not.toContain("Cafetera")
  expect(property.media.filter(({ type }) => type === "image")).toHaveLength(25)
})
```

- [ ] **Step 2: Ejecutar y confirmar el fallo**

Run: `pnpm test -- tests/content.test.ts`

Expected: FAIL porque el inventario documentado aún está vacío.

- [ ] **Step 3: Corregir datos y textos del álbum**

Cambiar el título visible a `Casa Palac` y el subtítulo a `Álbum de la casa ubicada frente a la playa`. Incorporar el inventario documentado en el PDF. Mantener prudentes las cantidades de habitaciones, camas, baños y capacidad.

- [ ] **Step 4: Reordenar el recorrido dentro del shell actual**

Ordenar los medios por piscina, terraza/vista, exteriores, área social, sala/comedor, cocina, habitaciones, baño y distribución. Mantener Carousel + Dialog, `next/image`, tamaños explícitos, navegación por teclado, títulos, descripciones y `alt`.

Actualizar el encabezado:

```text
Badge: Frente a la playa
Título: Casa Palac
Descripción: Una casa ubicada frente a la playa, con piscina, terrazas y espacios para descansar y compartir.
```

- [ ] **Step 5: Mantener video honestamente condicionado**

`PropertyVideos` debe continuar devolviendo `null` si `videos` está vacío. No trasladar a la web el botón sin enlace del PDF.

- [ ] **Step 6: Verificar y guardar**

Run: `pnpm test -- tests/content.test.ts && pnpm lint && pnpm typecheck`

Expected: PASS.

```bash
git add app/alojamientos/[slug]/page.tsx components/gallery-lightbox.tsx content/properties.ts tests/content.test.ts
git commit -m "feat: refine Casa Palac property story"
```

---

### Task 7: Completar SEO, variables y documentación operativa

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `app/robots.ts`
- Modify: `app/layout.tsx`
- Modify: `README.md`
- Modify: `vercel.json` only if environment behavior requires it.

**Interfaces:**
- Consumes: `siteConfig.siteUrl`, `activeProperties`.
- Produces: sitemap con `/alojamientos/casa-palac`, metadata integral y guía de mantenimiento.

- [ ] **Step 1: Actualizar sitemap y metadata**

El sitemap debe generar la URL canónica desde `property.slug`. La metadata global debe usar la descripción integral. La metadata de Casa Palac debe producir `Casa Palac | Nico Experience`, canonical `/alojamientos/casa-palac` y una imagen real.

- [ ] **Step 2: Documentar mantenimiento**

Añadir instrucciones concretas para:

```text
- agregar una propiedad en content/properties.ts;
- añadir o cambiar imágenes en public/images y actualizar media;
- añadir videos en la propiedad;
- editar descripciones y el inventario confirmado;
- agregar testimonios reales verificados;
- cambiar NEXT_PUBLIC_WHATSAPP_NUMBER;
- ejecutar pnpm lint, pnpm typecheck, pnpm test y pnpm build.
```

- [ ] **Step 3: Verificar SEO en build**

Run: `pnpm build`

Expected: build exitoso, ruta estática `/alojamientos/casa-palac` y ningún error de metadata.

- [ ] **Step 4: Guardar**

```bash
git add app/sitemap.ts app/robots.ts app/layout.tsx README.md vercel.json
git commit -m "docs: update SEO and content maintenance guidance"
```

---

### Task 8: Verificación visual, despliegue y evidencia final

**Files:**
- Create/update screenshots outside source control under the visualization workspace.
- No source edits unless a verified defect is found.

**Interfaces:**
- Produces: commit final, deployment público verificado y reporte de entrega.

- [ ] **Step 1: Ejecutar la batería completa**

Run:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Expected: todos los comandos terminan con código 0.

- [ ] **Step 2: Verificar localmente con navegador**

Abrir `/`, `/alojamientos`, `/alojamientos/casa-palac`, la URL anterior y `/contacto`. Confirmar:

```text
- navbar sticky/blur, menú móvil y theme switcher;
- servicios generales visibles;
- Casa Palac con nombre y descriptor separados;
- 25 fotografías y lightbox por teclado;
- Maps exacto y seguro;
- WhatsApp abre 50493731060 con la selección y texto del cliente;
- testimonios ausentes mientras la fuente esté vacía;
- ningún video con autoplay;
- slug inexistente devuelve 404;
- consola sin errores.
```

- [ ] **Step 3: Comparar visualmente**

Capturar 1440 px, 1024 px y 390 px en claro y oscuro. Comparar con el baseline y confirmar que tipografía, tokens, contenedores, radios, navbar, blur y responsive siguen perteneciendo a la plantilla original.

- [ ] **Step 4: Configurar y desplegar en Vercel**

Configurar en producción:

```dotenv
NEXT_PUBLIC_WHATSAPP_NUMBER=50493731060
NEXT_PUBLIC_PHONE=+504 9373-1060
NEXT_PUBLIC_SITE_URL=https://nico-experience-web.vercel.app
```

Desplegar producción, abrir la URL pública y repetir la verificación de inicio, micrositio, galería, Maps, WhatsApp, móvil, dark mode y consola.

- [ ] **Step 5: Cerrar con commit y reporte**

Run: `git status --short && git rev-parse HEAD`

Expected: árbol limpio salvo artefactos locales ignorados; registrar el commit final y la URL verificada en el reporte.

---

## Self-Review

- Cobertura: identidad, negocio integral, servicios, Casa Palac, slug/redirección, WhatsApp, PDF/fotos, testimonios, videos, SEO, accesibilidad, pruebas, comparación y Vercel están asignados a tareas concretas.
- Sin dependencias nuevas: el plan reutiliza Zod, Radix/shadcn, Framer Motion y Vitest existentes.
- Tipos consistentes: `ServiceSlug`, `InquiryInput`, `buildInquiryMessage`, `services`, `verifiedTestimonials` y `getProperty("casa-palac")` conservan los mismos nombres entre tareas.
- Contenido prudente: el PDF solo confirma el inventario enumerado visualmente; reseñas, capacidades, precios, políticas y video continúan sin publicarse.

