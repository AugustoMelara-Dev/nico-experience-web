# Nico Experience: evolución controlada de la landing

Fecha: 2026-07-21  
Estado: aprobado como dirección (enfoque 1)

## Objetivo

Convertir la implementación actual en la landing principal de Nico Experience, una empresa de turismo y soluciones integrales ubicada en Tocoa, Colón. La web debe comunicar viajes, hospedaje, trámites, gestiones y soluciones digitales, manteniendo la calidad y la base visual de la plantilla original sin conservar la sensación de producto SaaS.

Los alojamientos serán una línea de servicio dentro del negocio. Cada propiedad seguirá teniendo un micrositio compartible y generado desde datos centralizados.

## Decisiones confirmadas

- La marca principal es **Nico Experience**.
- El alojamiento se llama **Casa Palac**.
- “Frente a la playa” es una característica o descriptor, no parte del nombre.
- Redacción base: **Casa Palac, ubicada frente a la playa**.
- La URL canónica será `/alojamientos/casa-palac`.
- La URL anterior `/alojamientos/casa-palac-frente-a-playa` redirigirá permanentemente a la URL canónica.
- El WhatsApp confirmado es `+504 9373-1060`, normalizado como `50493731060`.
- Nico Experience está ubicada en Tocoa, Colón.
- El enlace oficial de Maps de Casa Palac continúa siendo `https://maps.app.goo.gl/BhDjLciEvjhp8pBN8?g_st=iw`.
- No se publicarán precios, capacidades, reglas, políticas, reseñas ni inventarios que no hayan sido confirmados.

## Dirección visual

Se conservará el sistema visual original del repositorio: tipografía, variables de color, modos claro y oscuro, escalas tipográficas, contenedores, radios, bordes, sombras, navegación sticky con blur, selector de tema, componentes Radix/shadcn, animaciones y breakpoints.

La sensación SaaS se reducirá mediante contenido, ritmo y composición, no mediante una identidad visual nueva:

- El hero hablará de acompañamiento y soluciones integrales, no solamente de hospedajes.
- La franja de iconos representará las cinco líneas de servicio.
- Se incorporarán fotografías reales en tarjetas y recorridos donde aporten contexto.
- Las secciones tendrán títulos humanos y orientados a necesidades del cliente.
- Los CTA usarán lenguaje de servicio: “Cuéntanos qué necesitas”, “Explorar alojamientos” y “Hablar por WhatsApp”.
- No se añadirán paletas, fuentes, sombras, gradientes de marca ni hojas CSS paralelas.

El resultado debe sentirse como la misma plantilla original adaptada con intención a un negocio turístico y de servicios, no como otra plantilla ni como un panel de software.

## Arquitectura de información

### Página principal

1. Navbar original adaptado a Inicio, Servicios, Alojamientos, Casa Palac, Preguntas y Contacto.
2. Hero de Nico Experience con propuesta de valor integral y CTA principal de consulta.
3. Franja animada de servicios: viajes, hospedajes, trámites, gestiones y soluciones digitales.
4. Sección de servicios usando los shells de tarjetas originales.
5. Sección de alojamiento destacado para Casa Palac.
6. Testimonios con el masonry original, únicamente si existen testimonios reales y autorizados. El componente quedará preparado y se ocultará mientras no haya datos válidos.
7. Flujo de consulta por WhatsApp.
8. FAQ general del negocio, con preguntas específicas de hospedaje cuando corresponda.
9. Footer original con descripción integral, ubicación y contacto real.

### Catálogo y micrositio

- `/alojamientos` mostrará únicamente propiedades activas.
- `/alojamientos/casa-palac` será la URL canónica de la propiedad inicial.
- El micrositio conservará navbar, footer, tokens, tarjetas, botones y animaciones del sitio principal.
- El contenido se organizará en presentación, galería, características confirmadas, espacios, cocina, habitaciones, baño, video cuando exista, ubicación, preguntas, compartir y consulta.
- Un slug desconocido responderá con 404.

## Casa Palac y el PDF

El PDF proporcionado tiene 15 páginas y 25 fotografías. Su principal aporte es la separación correcta entre el nombre “Casa Palac” y el descriptor “Frente a la playa”, además de una narrativa por ambientes.

La web podrá reutilizar esta secuencia:

1. Piscina iluminada.
2. Terraza con vista al mar.
3. Exteriores y acceso.
4. Área social y terraza.
5. Sala y comedor.
6. Cocina equipada.
7. Habitaciones.
8. Baño y tina de hidromasaje visible.
9. Distribución interior.
10. Ubicación.

El PDF reserva un espacio para video, pero no contiene un enlace reproducible. Tampoco contiene testimonios. Estas secciones no deben publicarse con placeholders engañosos.

El texto de cocina podrá mencionar únicamente lo documentado en el PDF y visible en las fotografías: estufa, refrigeradora, microondas, gabinetes y área de trabajo. No se afirmará la existencia de vajilla, cafetera, utensilios u otros elementos sin confirmación adicional.

## Fotografías

Las 25 fotografías válidas se mantendrán vinculadas a Casa Palac con título, descripción, categoría y texto alternativo. La galería seguirá usando `next/image`, Carousel y Dialog, con navegación por teclado y móvil.

La mejora de imagen será conservadora:

- preservar los originales;
- corregir orientación y dimensiones cuando sea necesario;
- producir derivados WebP/AVIF apropiados para web;
- evitar recompresión destructiva y layout shift;
- no inventar detalles, sustituir cielos ni alterar la realidad de los espacios;
- conservar una salida anterior recuperable para comparar calidad.

## Consulta inteligente por WhatsApp

No se necesita una API para el alcance actual. Los datos no necesitan almacenarse ni pasar por un servidor: el navegador construirá un enlace `wa.me` seguro y abrirá WhatsApp con un mensaje contextual.

El formulario ofrecerá:

- tipo de servicio: viaje, hospedaje, trámite, gestión, solución digital u otro;
- nombre del cliente;
- campo libre para explicar la necesidad;
- campos condicionales según la selección;
- propiedad, fechas y cantidad de personas cuando se consulte hospedaje;
- destino o necesidad principal cuando se consulte un viaje;
- descripción y plazo aproximado para trámites, gestiones o soluciones digitales.

El mensaje incluirá la selección y solamente los datos escritos por el cliente. El número se configurará como `NEXT_PUBLIC_WHATSAPP_NUMBER=50493731060` localmente y en Vercel. Si en el futuro se requiere historial, CRM, correo interno o métricas de consultas, se podrá añadir un endpoint; no se creará infraestructura innecesaria ahora.

## Contenido y testimonios

La descripción institucional confirmada será la base editorial: Nico Experience ofrece atención personalizada para viajes, hospedaje, trámites, gestiones y soluciones digitales, buscando una solución confiable, práctica y eficiente en un solo lugar.

La sección Testimonials original se recuperará como componente condicionado por datos. Cada entrada exigirá nombre o atribución autorizada, comentario real, fuente cuando aplique y estado verificado. Con una lista vacía, la sección no se renderizará en producción.

## Modelo de datos

Se mantendrá Zod y se separarán dos dominios sencillos:

- servicios generales de Nico Experience;
- propiedades y medios de alojamiento.

La propiedad cambiará su `slug` a `casa-palac` y su `name` a `Casa Palac`. “Frente a la playa” se almacenará como ubicación, descriptor o característica confirmada. Las rutas, metadata, breadcrumbs, sitemap, JSON-LD prudente y mensajes de WhatsApp consumirán esos datos centralizados.

## SEO y compatibilidad

- Metadata global centrada en Nico Experience y sus servicios integrales.
- Metadata de Casa Palac centrada en alojamiento frente a la playa.
- Canonical para `/alojamientos/casa-palac`.
- Redirección permanente desde el slug anterior.
- Open Graph con fotografía real de Casa Palac.
- Sitemap y robots actualizados.
- Sin dirección exacta, precio, calificación, disponibilidad ni capacidad inventados.

## Accesibilidad y experiencia

- Flujo completo por teclado en navbar, menús, formulario, carrusel y diálogo.
- Etiquetas explícitas y mensajes de validación comprensibles.
- Foco visible con los tokens originales.
- Alternativas textuales para todas las fotografías.
- Sin autoplay con sonido.
- Botones externos con atributos seguros.
- Estados claros si WhatsApp o un video no están configurados.

## Verificación

Se validarán `/`, `/alojamientos`, `/alojamientos/casa-palac`, la redirección anterior, el 404, Maps, WhatsApp contextual, propiedades inactivas, ausencia de testimonios falsos, dark mode, menú móvil, lightbox y ausencia de autoplay invasivo.

El cierre exige lint, typecheck, pruebas y build, además de comparación visual en 1440 px, 1024 px y 390 px, claro y oscuro. Después se desplegará en Vercel y se abrirá la URL pública para verificar navegación, imágenes, consola, Maps, WhatsApp y responsive.

