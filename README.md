# Nico Experience Web

Catálogo turístico de Nico Experience construido sobre el historial de [`gonzalochale/saas-landing-template`](https://github.com/gonzalochale/saas-landing-template), conservando su licencia MIT.

## Páginas

- `/` — presentación, hospedaje destacado, beneficios, galería y preguntas frecuentes.
- `/cabanas` — catálogo de propiedades activas.
- `/cabanas/casa-vip` — detalle estable de Casa VIP, galería ampliable, precios, reglas y consulta.
- `/nosotros` — presentación de Nico Experience.
- `/contacto` — formulario que prepara un mensaje de WhatsApp sin simular envíos.

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

Las variables públicas están documentadas en `.env.example`. `NEXT_PUBLIC_WHATSAPP_NUMBER` debe usar formato internacional, solo con dígitos; por ejemplo, `50499999999`. Mientras el número no esté configurado, los CTA llevan a Contacto y el formulario explica que no envió ni almacenó información.

La configuración general vive en `config/site.ts`. No se deben agregar secretos a variables que comiencen por `NEXT_PUBLIC_`.

## Agregar una cabaña

1. Optimiza las fotografías y guárdalas en `public/images/<slug>/`.
2. Agrega un objeto que cumpla `Property` en `content/properties.ts`.
3. Define un `slug` único, `featuredImage`, textos alternativos y solo datos confirmados.
4. Marca `active: true` cuando pueda publicarse.
5. Ejecuta lint, typecheck, test y build. La ruta `/cabanas/<slug>` y el sitemap se generan automáticamente.

## Cambiar fotografías, precios o textos

- Fotografías y textos por propiedad: `content/properties.ts`.
- Precio: campo `price` de la propiedad; depósito y persona adicional tienen campos propios.
- Identidad, contactos, navegación y URL pública: `config/site.ts` y variables de entorno.
- Estilos globales: `app/globals.css`.

## Datos pendientes antes de una campaña comercial

- Número oficial de WhatsApp y teléfono.
- Enlaces oficiales de redes y Google Maps.
- Ubicación más específica y horario de atención.
- Logo oficial.
- Capacidad, cantidad de habitaciones/baños y distribución de camas.
- Inventario confirmado de cocina y otras amenidades.
- Videos y reseñas verificadas.
- Confirmación de que precios, depósito, horarios y reglas de Casa VIP siguen vigentes.

## Despliegue

Configura las variables de `.env.example` en Vercel y usa `pnpm build`. Para conectar un dominio, abre **Project Settings → Domains**, agrega el dominio y aplica los registros DNS que indique Vercel; después actualiza `NEXT_PUBLIC_SITE_URL` con la URL canónica.

## Licencia

El código base se distribuye bajo la licencia MIT incluida en [`license.txt`](./license.txt).
