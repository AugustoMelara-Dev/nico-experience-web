# Nico Experience Web

Landing de Nico Experience, empresa de turismo y soluciones integrales ubicada en Tocoa, Colón. La web presenta servicios de viajes, hospedaje, trámites, gestiones y soluciones digitales con atención personalizada.

El proyecto está adaptado desde [`gonzalochale/saas-landing-template`](https://github.com/gonzalochale/saas-landing-template). La tipografía, los tokens, el glow, navbar, tarjetas, FAQ, animaciones, dark mode y comportamiento responsive de la plantilla original se conservan como base visual.

## Rutas

- `/` — landing principal del negocio, servicios, alojamiento destacado y preguntas frecuentes.
- `/alojamientos` — catálogo de propiedades activas.
- `/alojamientos/casa-palac` — micrositio canónico de Casa Palac, ubicada frente a la playa.
- `/contacto` — formulario que prepara una consulta contextual y continúa por WhatsApp.

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

## Agregar otro alojamiento

1. Guarda sus fotografías optimizadas en `public/images/<slug>/` y conserva los originales fuera de esa carpeta pública.
2. Agrega un objeto validado por Zod en `content/properties.ts`.
3. Define un `slug` único, nombre, descripciones, `featuredImage` y medios con título, descripción, categoría y texto alternativo.
4. Incluye únicamente ubicación, características, inventario, capacidad, precio y políticas confirmadas.
5. Marca `active: true` cuando esté listo para publicarse y `featured: true` si debe aparecer en inicio.
6. Ejecuta lint, typecheck, pruebas y build. La ruta `/alojamientos/<slug>` y el sitemap se generan automáticamente.

## Actualizar contenido

- Cambiar una fotografía: reemplaza el derivado en `public/images/<slug>/` manteniendo el nombre o actualiza `src` en `content/properties.ts`. Conserva proporción y original.
- Agregar un video: añade una entrada a `videos` con título, URL, proveedor y poster opcional. Los archivos locales no deben reproducirse automáticamente.
- Modificar una descripción: edita la propiedad o la entrada de `media` correspondiente en `content/properties.ts`.
- Actualizar la cocina: modifica `kitchenInventory` únicamente con elementos confirmados.
- Agregar un testimonio: incorpora una entrada real y autorizada en `content/testimonials.ts` con `verified: true`. La sección permanece oculta si la lista está vacía.
- Cambiar un servicio: edita `content/services.ts`; los iconos disponibles están limitados por el esquema Zod.
- Cambiar WhatsApp: actualiza `NEXT_PUBLIC_WHATSAPP_NUMBER` y `NEXT_PUBLIC_PHONE` localmente y en Vercel.
- Regenerar fotografías: ejecuta `py -3 scripts/optimize-property-photos.py` desde los originales preservados y revisa visualmente el resultado.

## Datos confirmados

- Empresa: Nico Experience.
- Ubicación del negocio: Tocoa, Colón.
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
