# Nico Experience Web

Landing de Nico Experience, empresa de turismo y soluciones integrales ubicada en Tocoa, Colón. La web presenta servicios de viajes, hospedaje, trámites, gestiones y soluciones digitales con atención personalizada.

El proyecto está adaptado desde [`gonzalochale/saas-landing-template`](https://github.com/gonzalochale/saas-landing-template). La tipografía, los tokens, el glow, navbar, tarjetas, FAQ, animaciones, dark mode y comportamiento responsive de la plantilla original se conservan como base visual.

## Rutas

- `/` — landing principal del negocio, servicios, alojamiento destacado y preguntas frecuentes.
- `/alojamientos` — catálogo de propiedades activas.
- `/alojamientos/casa-palac` — micrositio canónico de Casa Palac, ubicada frente a la playa.
- `/contacto` — formulario que prepara una consulta contextual y continúa por WhatsApp.
- `/alojamientos/casa-palac` — micrositio compartible con galería, ubicación y consulta contextual.

`/alojamientos/casa-palac-frente-a-playa`, `/cabanas`, `/cabanas/casa-vip` y `/nosotros` redirigen a destinos vigentes para conservar enlaces anteriores.

## Desarrollo

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Comprobaciones obligatorias:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Configuración

Las variables públicas están documentadas en `.env.example`:

- `NEXT_PUBLIC_SITE_URL`: URL pública canónica.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número internacional solo con dígitos.
- `NEXT_PUBLIC_PHONE`: formato legible para mostrar en la interfaz.
- variables sociales: enlaces oficiales cuando el negocio los proporcione.

El teléfono confirmado es `+504 9373-1060` y el valor normalizado de WhatsApp es `50493731060`. La configuración general vive en `config/site.ts`. No guardes secretos en variables que comiencen por `NEXT_PUBLIC_`.

La ubicación oficial de Nico Experience se centraliza en `config/business.ts`, con el enlace `https://maps.app.goo.gl/CV11vyc2QaYzxB1x6` y las coordenadas resueltas `15.656205, -86.004107`. El mapa usa MapLibre mediante `react-map-gl`, estilos de OpenFreeMap y un fallback accesible a Google Maps. La ubicación del negocio y la de cada alojamiento son datos distintos y no deben reutilizarse entre sí.

## Agregar otro alojamiento

1. Guarda sus fotografías optimizadas en `public/images/<slug>/` y conserva los originales fuera de esa carpeta pública.
2. Agrega un objeto validado por Zod en `content/properties.ts`.
3. Define un `slug` único, nombre, descripciones, `featuredImage`, `socialImage` y medios con título, descripción, categoría y texto alternativo.
4. Si la ubicación está confirmada, agrega su `mapUrl` y coordenadas propias; no copies las coordenadas del negocio.
5. Incluye únicamente ubicación, características, inventario, capacidad, precio y políticas confirmadas.
6. Marca `active: true` cuando esté listo para publicarse y `featured: true` si debe aparecer en inicio.
7. Ejecuta lint, typecheck, pruebas y build. La ruta `/alojamientos/<slug>`, su tarjeta social y el sitemap se generan automáticamente.

El catálogo visual se genera desde `activeProperties` mediante `components/property-catalog.tsx`. Una propiedad se centra; dos o más pasan automáticamente a una grilla responsive de dos y tres columnas. La composición destacada de la página principal permanece separada en `components/pricing.tsx`.

## Actualizar contenido

- Cambiar una fotografía: reemplaza el derivado en `public/images/<slug>/` manteniendo el nombre o actualiza `src` en `content/properties.ts`. Conserva proporción y original.
- Agregar un video: añade una entrada a `videos` con título, URL, proveedor y poster opcional. Los archivos locales no deben reproducirse automáticamente.
- Modificar una descripción: edita la propiedad o la entrada de `media` correspondiente en `content/properties.ts`.
- Actualizar la cocina: modifica `kitchenInventory` únicamente con elementos confirmados.
- Agregar un testimonio: incorpora una entrada real y autorizada en `content/testimonials.ts` con `verified: true`. La sección permanece oculta si la lista está vacía.
- Cambiar un servicio: edita `content/services.ts`; los iconos disponibles están limitados por el esquema Zod.
- Cambiar WhatsApp: actualiza `NEXT_PUBLIC_WHATSAPP_NUMBER` y `NEXT_PUBLIC_PHONE` localmente y en Vercel.
- Regenerar fotografías: ejecuta `py -3 scripts/optimize-property-photos.py` desde los originales preservados y revisa visualmente el resultado.
- Regenerar tarjetas sociales: ejecuta `py -3 scripts/prepare-social-images.py` y revisa ambos fondos a 1200 × 630 px.
- Regenerar la marca monocromática: ejecuta `py -3 scripts/prepare-brand-assets.py`; conserva `source-assets/brand/nico-experience-logo.jpeg` como fuente recuperable.
- Cambiar el logo: reemplaza únicamente `source-assets/brand/nico-experience-logo.jpeg`, ejecuta el script anterior y revisa navbar, footer, modo claro, modo oscuro y las tarjetas sociales.
- Lockup monocromático del footer: `public/brand/nico-experience-lockup-mono.webp`. Conserva siempre el JPEG original como fuente y valida manualmente texto, símbolo, transparencia y contraste antes de sustituir este derivado.
- Cambiar el hero neutral: reemplaza `source-assets/hero/nico-experience-neutral.png`, ejecuta el script y confirma que la imagen no represente falsamente una propiedad, destino o persona real.

## Contenido compartido

La página principal y cada alojamiento generan una tarjeta social de 1200 × 630 px. Después de cambiar contenido o fotografías, revisa la vista previa de Open Graph y usa el botón “Compartir” para validar el enlace canónico antes de desplegar.

## Datos confirmados

- Empresa: Nico Experience.
- Ubicación del negocio: Tocoa, Colón.
- Maps del negocio: `https://maps.app.goo.gl/CV11vyc2QaYzxB1x6`.
- Servicios: viajes, hospedaje, trámites, gestiones y soluciones digitales.
- Teléfono y WhatsApp: `+504 9373-1060`.
- Propiedad: Casa Palac, ubicada frente a la playa.
- Maps de Casa Palac: `https://maps.app.goo.gl/BhDjLciEvjhp8pBN8?g_st=iw`.
- Cocina documentada en el material proporcionado: estufa, refrigeradora, microondas, gabinetes y área de trabajo.
- Álbum: 25 fotografías.

## Datos aún no publicados

- Enlaces oficiales de redes sociales.
- Capacidad y cantidad exacta de habitaciones, baños y camas.
- Vajilla, utensilios y cualquier equipamiento de cocina adicional.
- Video reproducible.
- Testimonios reales autorizados.
- Precios, disponibilidad, horarios, reglas y política de cambios o cancelaciones.

## Licencia

El código base conserva la licencia MIT incluida en [`license.txt`](./license.txt).
