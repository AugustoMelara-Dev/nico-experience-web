# Nico Experience Web

Catálogo turístico de Nico Experience adaptado desde [`gonzalochale/saas-landing-template`](https://github.com/gonzalochale/saas-landing-template). La UI original —tipografía, tokens, glow, navbar, tarjetas, FAQ, animaciones y responsive— se conserva como fuente de verdad.

## Rutas

- `/` — presentación, características confirmadas, alojamiento destacado y preguntas frecuentes.
- `/alojamientos` — catálogo de propiedades activas.
- `/alojamientos/casa-palac-frente-a-playa` — micrositio de Casa Palac frente a playa con álbum, Maps y consulta.
- `/contacto` — prepara un mensaje contextual sin simular un envío.

Las rutas antiguas `/cabanas`, `/cabanas/casa-vip` y `/nosotros` redirigen a sus destinos vigentes.

## Desarrollo

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Comprobaciones:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Configuración

Las variables públicas están documentadas en `.env.example`. `NEXT_PUBLIC_WHATSAPP_NUMBER` debe contener el número internacional solo con dígitos; por ejemplo, `50499999999`. Mientras esté vacío, los CTA llevan a Contacto y no se inventa un destino.

La configuración general vive en `config/site.ts`. No agregues secretos a variables que comiencen por `NEXT_PUBLIC_`.

## Agregar otro alojamiento

1. Guarda sus fotos optimizadas en `public/images/<slug>/`.
2. Agrega un objeto validado por Zod en `content/properties.ts`.
3. Define un `slug` único, `featuredImage`, media con alt/título/descripción y solo datos confirmados.
4. Marca `active: true` cuando esté listo para publicarse.
5. Ejecuta lint, typecheck, test y build. `/alojamientos/<slug>` y el sitemap se generan automáticamente.

## Actualizar contenido

- Cambiar una fotografía: reemplaza el archivo en `public/images/<slug>/` manteniendo el nombre o actualiza `src` en `content/properties.ts`.
- Agregar un video: añade una entrada a `videos` con título, URL, proveedor y poster opcional. Los archivos locales no usan autoplay.
- Modificar una descripción: edita la propiedad o la entrada de `media` correspondiente en `content/properties.ts`.
- Actualizar el inventario de cocina: completa `kitchenInventory` únicamente con artículos confirmados.
- Cambiar WhatsApp: configura `NEXT_PUBLIC_WHATSAPP_NUMBER` en `.env.local` y en Vercel, con formato internacional.
- Regenerar las fotos desde los originales: ejecuta `py -3 scripts/optimize-property-photos.py`.

## Datos pendientes

- Número oficial de WhatsApp y teléfono.
- Enlaces oficiales de redes sociales.
- Capacidad, cantidad exacta de habitaciones/baños y distribución de camas.
- Inventario confirmado de cocina y otras amenidades.
- Videos, reseñas verificadas, precios, horarios, reglas y política de cancelación.

## Licencia

El código base conserva la licencia MIT incluida en [`license.txt`](./license.txt).
