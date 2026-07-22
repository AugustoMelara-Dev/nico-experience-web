# Nico Experience: marca, héroes fotográficos y fichas PDF

Fecha: 2026-07-21
Estado: diseño aprobado, pendiente de implementación

## Propósito

Esta especificación amplía `2026-07-21-nico-experience-integral-design.md`. Su alcance es dar más personalidad turística a la landing sin sustituir el lenguaje visual ya recuperado, integrar la marca proporcionada, preparar el sitio para más alojamientos y permitir descargar fichas PDF útiles desde el teléfono.

La decisión central es conservar Radix UI, shadcn/ui, Tailwind, Framer Motion, los tokens y los componentes existentes. La percepción SaaS se reducirá mediante fotografía, redacción, jerarquía de contenido y composición editorial controlada; no mediante un sistema visual nuevo.

## Principios no negociables

- Nico Experience es la marca principal y ofrece viajes, hospedaje, trámites, gestiones y soluciones digitales.
- Los alojamientos son una línea de servicio, no el producto completo del negocio.
- Casa Palac es el nombre de la propiedad. “Ubicada frente a la playa” es un descriptor.
- El sitio debe seguir siendo reconocible como la adaptación cuidada de la plantilla original.
- No se publicarán precios, capacidades, reseñas, reglas, disponibilidad, inventarios ni otros datos no confirmados.
- Toda nueva propiedad se incorporará mediante datos centralizados; no se duplicarán páginas manualmente.

## Identidad de marca

### Activo proporcionado

Se usará como fuente de marca el logotipo entregado con:

- nombre: Nico Experience;
- descriptor: Viajes · Negocios · Soluciones;
- lema: Experiencias que conectan, soluciones que impulsan;
- símbolo de equipaje y avión;
- combinación visual de azul marino y dorado.

El archivo original se conservará sin alteraciones. Se generará un derivado optimizado para web, manteniendo proporción y legibilidad. El logotipo aparecerá de forma contenida en navbar y footer, sin convertir el encabezado en una pieza publicitaria ni alterar su altura y comportamiento sticky.

### Colores

La marca se aplicará mediante los tokens existentes, no mediante colores aislados o estilos inline:

- azul marino principal aproximado: `#061E68`;
- dorado de acento aproximado: `#D6993A`;
- dorado claro de apoyo aproximado: `#E4C07C`;
- neutros, fondos y modo oscuro: los de la plantilla existente.

El azul marino podrá ocupar acciones principales, enlaces activos y detalles de énfasis. El dorado se reservará para acentos pequeños como badges, anillos, indicadores o detalles iconográficos. No se usarán grandes fondos dorados ni combinaciones que reduzcan el contraste. Los estados hover, focus, disabled y dark mode deberán conservar contraste accesible.

## Landing principal

### Hero

El hero evolucionará desde el bloque exclusivamente textual hacia una composición dividida, sin convertirse en una fotografía de pantalla completa:

- columna de contenido: badge, propuesta integral, descripción y CTA;
- columna visual: una imagen neutral y editorial relacionada con viajes, atención y soluciones;
- glow, animaciones, anchos, tipografía y ritmo vertical derivados del hero existente;
- CTA principal hacia la consulta inteligente;
- CTA secundario hacia servicios o alojamientos.

La imagen neutral será original y no representará falsamente una propiedad, destino, oficina o equipo humano específico. Debe evocar organización de viaje, acompañamiento y resolución práctica mediante una escena sobria, luminosa y compatible con azul marino y dorado. No incluirá marcas de terceros, texto generado dentro de la imagen ni personas identificables presentadas como personal real.

En móvil, el contenido aparecerá primero y la imagen después. La imagen tendrá dimensiones conocidas, carga optimizada y recorte estable para evitar layout shift. La imagen LCP se tratará de forma explícita con `next/image` y tamaños responsivos adecuados.

### Ritmo y narrativa

La página principal mantendrá los shells de componentes actuales y los reinterpretará mediante contenido real:

1. propuesta integral de Nico Experience;
2. líneas de servicio;
3. razones prácticas para consultar en un solo lugar;
4. alojamientos destacados;
5. testimonios reales, únicamente cuando existan;
6. consulta guiada por WhatsApp;
7. preguntas frecuentes;
8. contacto y cierre.

Las tarjetas conservarán Card, Badge, Button, borders, radios y sombras existentes. La diferenciación turística provendrá de imágenes, iconos Lucide apropiados y textos orientados a personas, no de nuevas decoraciones.

## Catálogo escalable de alojamientos

`content/properties.ts` continuará como fuente única validada con Zod. Las vistas consumirán únicamente propiedades activas.

La incorporación de otra propiedad requerirá:

1. añadir sus datos confirmados;
2. asignar un slug único;
3. cargar su imagen principal y medios;
4. marcarla como activa cuando esté lista.

El catálogo adaptará automáticamente la cuadrícula o carrusel al número de propiedades. Con una sola propiedad no se mostrarán controles vacíos ni indicios engañosos de inventario. Con varias propiedades, las mismas tarjetas permitirán comparar nombre, descriptor, características confirmadas y acciones.

## Hero de cada alojamiento

Cada `/alojamientos/[slug]` tendrá una cabecera fotográfica basada en `featuredImage`:

- fotografía real de la propiedad;
- nombre de la propiedad;
- descriptor prudente;
- breadcrumb;
- acciones de consultar, compartir y descargar ficha;
- relación visual consistente con Card, Badge y Button existentes;
- lectura clara en claro, oscuro y móvil.

La fotografía tendrá presencia suficiente para comunicar el alojamiento sin crear un micrositio con otra identidad. No se añadirá texto extenso sobre zonas de poco contraste ni degradados de marca nuevos. Cuando sea necesario, el texto y las acciones se ubicarán en un panel del sistema existente junto a la imagen.

## Fichas PDF descargables

### Alcance aprobado

Se ofrecerán ambas descargas:

- ficha individual por alojamiento;
- catálogo general de alojamientos activos.

Rutas previstas:

- `GET /api/alojamientos/[slug]/pdf`;
- `GET /api/alojamientos/catalogo/pdf`.

No se creará una base de datos ni un CMS para esta función. Los PDF se generarán en servidor desde los mismos datos Zod usados por la web, evitando inconsistencias y mantenimiento duplicado.

### Ficha individual

La ficha de cada propiedad incluirá:

- marca Nico Experience;
- nombre y descriptor;
- descripción confirmada;
- fotografía principal;
- hasta seis fotografías representativas seleccionadas desde los medios válidos;
- características y equipamiento confirmados;
- ubicación mediante enlace seguro a Google Maps;
- contacto y mensaje contextual de WhatsApp;
- URL canónica del micrositio;
- fecha de generación para distinguir versiones.

La galería web conservará todas las imágenes. El límite de seis en el PDF busca una descarga rápida, legible y razonable para compartir desde el teléfono.

### Catálogo general

El catálogo incluirá solamente propiedades activas. Cada propiedad tendrá una sección compacta con fotografía principal, nombre, descriptor, resumen, características confirmadas y enlaces de consulta y detalle. El diseño soportará crecimiento sin cambiar la ruta ni la API.

### Comportamiento técnico

- Generación con `@react-pdf/renderer` en un Route Handler compatible con el despliegue de Next.js en Vercel.
- Respuesta `application/pdf` con `Content-Disposition: attachment` y nombre de archivo legible.
- Un slug inexistente o una propiedad inactiva responderá 404.
- Los enlaces de Maps, WhatsApp y web serán clicables cuando el visor PDF lo permita.
- La generación no incluirá datos de cliente ni almacenará consultas.
- Se controlará el tamaño de imágenes antes de componer el documento.
- El endpoint podrá usar caché de contenido estable, sin impedir que un nuevo despliegue publique datos actualizados.

### Diseño del PDF

La ficha será una extensión sobria de la marca, no una réplica exacta de la web. Usará azul marino, acentos dorados, fondos claros, tipografía legible y una jerarquía apropiada para pantalla móvil e impresión. No se dependerá de elementos interactivos para comprender la información.

Antes de cerrar la implementación se generarán muestras reales, se renderizarán todas sus páginas a imágenes y se inspeccionarán visualmente para detectar desbordes, cortes, baja resolución, caracteres incorrectos o enlaces mal compuestos.

## Medios y calidad fotográfica

- Los originales permanecerán recuperables.
- Los derivados web mantendrán proporción y metadatos de orientación correctos.
- Se usará mejora conservadora de nitidez, exposición y compresión cuando beneficie realmente a la fuente.
- No se inventarán elementos, se sustituirán cielos ni se alterará la arquitectura de la propiedad.
- El hero usará una variante de resolución suficiente y el catálogo una variante más liviana.
- El PDF usará variantes específicas para equilibrar calidad y peso.

## Accesibilidad y rendimiento

- Todas las imágenes tendrán texto alternativo basado en contenido visible y confirmado.
- Los CTA serán operables por teclado y tendrán foco visible.
- Los botones de descarga informarán claramente qué archivo se obtiene.
- El hero conservará lectura y orden lógico sin depender de la imagen.
- No habrá autoplay con sonido.
- Las imágenes no críticas usarán carga diferida.
- Se verificarán tamaños responsivos, LCP y ausencia de layout shift en las vistas principales.

## SEO, analítica y valor comercial

La landing funcionará como destino estable para campañas y perfiles sociales: explica todos los servicios, concentra evidencia y llamadas a la acción, ofrece páginas compartibles y permite medir navegación y conversiones mejor que una conversación aislada.

La implementación mantendrá metadata y Open Graph por propiedad. Los PDF enlazarán a las URLs canónicas. La instrumentación futura de Meta Pixel o Conversions API quedará fuera de este alcance salvo que se proporcionen los identificadores y el consentimiento necesario; la arquitectura no impedirá añadirla después.

## Pruebas y puertas de calidad

Además de las pruebas actuales, se validará:

- logo legible en navbar y footer;
- contraste de la paleta en claro y oscuro;
- hero principal a 1440, 1024 y 390 px;
- hero de Casa Palac en los mismos tamaños;
- catálogo correcto con una y con varias propiedades de prueba;
- descarga individual con nombre y contenido correctos;
- descarga de catálogo solamente con propiedades activas;
- 404 de PDF para slug inválido o inactivo;
- ausencia de datos inventados en web y PDF;
- Maps, WhatsApp y URL canónica correctos;
- render visual completo de todos los PDF de prueba;
- lint, typecheck, tests y build;
- verificación de consola, móvil y dark mode en el despliegue público.

## Entrega

La implementación se considerará terminada cuando la web desplegada comunique con claridad que Nico Experience ofrece soluciones integrales, la marca se reconozca sin dominar la plantilla, los alojamientos escalen mediante datos, Casa Palac tenga un hero fotográfico real y ambas modalidades de PDF funcionen y hayan sido inspeccionadas.
