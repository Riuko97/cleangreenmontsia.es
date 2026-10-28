# SEO técnico implementado

Lista de lo que hace la web para posicionarse, y dónde está en el código. `npm run check` (`src/controlador/comprobar.js`) comprueba casi todo de forma automática en cada construcción y en cada publicación.

## Estructura y URL

- [x] **URL limpias y descriptivas**, en carpetas con barra final: `/servicios/jardineria/`, `/zonas/alcanar/`, `/guias/normativa-limpieza-de-parcelas/`. Las genera `construir.js` (`<ruta>/index.html`).
- [x] **Una página por intención de búsqueda:** cinco áreas de servicio, tres páginas por pueblo (Amposta, Alcanar, La Ràpita), dos guías, contacto y el índice de servicios, de zonas y de guías.
- [x] **Enlazado interno:** menú con submenú de áreas, pie con todos los servicios, zonas y guías, «También te puede interesar» en cada área y enlaces entre zonas. La auditoría avisa si alguna página queda huérfana.
- [x] **Migas de pan** visibles en todas las páginas interiores, con su `BreadcrumbList`.

## Etiquetas del `<head>` (`src/vistas/plantilla.js`)

- [x] **Título** único por página, de 60 caracteres como máximo, con la marca al final (`… | CleanGreen`).
- [x] **Meta description** única, de 70 a 160 caracteres.
- [x] **Un único `h1`** por página.
- [x] **Canonical** absoluto en todas las páginas indexables.
- [x] **hreflang** `es-ES` y `x-default` apuntando a la propia página (web en un solo idioma).
- [x] **Meta robots:** `index, follow, max-image-preview:large` en las páginas indexables; `noindex, follow` en las legales y en la 404.
- [x] `lang="es-ES"`, `viewport`, `theme-color` y manifiesto (`site.webmanifest`) con iconos.

## Rastreo

- [x] **sitemap.xml** con las 15 páginas indexables y su fecha (`seo.sitemap`). Las legales y la 404 no están, y la auditoría comprueba que coincida con las etiquetas robots.
- [x] **robots.txt** con la línea `Sitemap:` y una política para bots de IA: se permiten los bots de búsqueda que citan la web (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot) y se bloquean los de entrenamiento (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, Bytespider).
- [x] **llms.txt** con un resumen del negocio y la lista de páginas, para asistentes de IA.
- [x] Página **404** propia (GitHub Pages la sirve sola).

## Datos estructurados (schema.org, JSON-LD) por tipo de página

| Página | Tipos |
|---|---|
| Todas | `LocalBusiness` (nombre, teléfono, zona de servicio con `City` y `AdministrativeArea`, catálogo de servicios con `OfferCatalog` y `Offer`) |
| Portada | `WebSite`, `WebPage`, `FAQPage` |
| Índices (servicios, zonas, guías) | `CollectionPage`, `ItemList`, `BreadcrumbList` |
| Cada área de servicio | `WebPage`, `Service` con su catálogo, `FAQPage`, `BreadcrumbList`, `ImageObject` |
| Cada pueblo | `WebPage`, `Service` limitado a ese pueblo, `FAQPage`, `BreadcrumbList` |
| Cada guía | `Article` (con fecha de revisión), `FAQPage`, `BreadcrumbList` |
| Contacto | `ContactPage`, `BreadcrumbList` |

Se generan en `src/controlador/seo.js` y se asignan a cada página en `rutas.js`. La auditoría comprueba que todos sean JSON válido. No se incluyen opiniones, valoraciones ni precios inventados.

## Compartir en redes y WhatsApp

- [x] **Open Graph** (`og:title`, `og:description`, `og:url`, `og:image` de 1200 × 630 con su `alt`, `og:locale es_ES`) y `twitter:card summary_large_image`.
- [x] **Una imagen por área** en `img/og/` (portada, limpieza, jardinería, parcelas, segundas residencias y mantenimiento). Las guías usan la de su área. La auditoría comprueba que cada imagen exista.

## Rendimiento

- [x] **Nada de terceros:** ni fuentes de Google, ni librerías, ni analítica. Todo sale del mismo dominio.
- [x] **Fotos optimizadas:** AVIF con respaldo WebP, en 640, 960 y 1280 px, con `srcset` y `sizes` para que cada pantalla descargue solo lo que necesita; `width` y `height` para que no salte el contenido; `loading="lazy"` fuera de la primera pantalla y `fetchpriority="high"` en la del comparador de portada.
- [x] **Tipografías** propias, recortadas y precargadas (`preload`), con `font-display: swap`.
- [x] **Una hoja de estilos y JavaScript en módulos**, con huella en la URL (`?v=…`) para que el navegador no use versiones viejas.
- [x] **HTML minificado** al construir.

## Seguridad y privacidad

- [x] **Política de seguridad de contenidos (CSP)** en cada página: `default-src 'self'`; el único script en línea va autorizado por su huella SHA-256; `style-src 'self'` (sin estilos en línea); `object-src 'none'`.
- [x] `referrer` `strict-origin-when-cross-origin`.
- [x] Sin cookies ni formularios que envíen datos: el asistente solo prepara un mensaje de WhatsApp en el navegador.

## Accesibilidad (también cuenta para el SEO)

- [x] Textos alternativos en todas las imágenes informativas (las decorativas llevan `alt=""`), y la auditoría lo comprueba.
- [x] Contraste AA, foco visible, navegación con teclado, `prefers-reduced-motion` y web usable sin JavaScript.
- [x] 0 incidencias de axe-core en todas las páginas, a 1440 y 390 px, y HTML sin errores en html-validate.

## Auditoría: `npm run check`

Revisa en `dist/`, página a página: título y descripción (existencia y longitud), canonical dentro del sitio, un solo `h1`, `lang`, Open Graph completo y que exista su imagen, `alt` en todas las imágenes, JSON-LD válido, enlaces internos rotos (incluidas las anclas) y la base de las rutas. Después cruza las páginas con el sitemap, busca páginas huérfanas y comprueba que `robots.txt` tenga la línea `Sitemap:`. Si hay errores, termina con código 1 y el flujo de publicación se detiene.

## Pendiente cuando haya dominio

- Dar de alta la propiedad en **Google Search Console** y enviar `https://cleangreenmontsia.es/sitemap.xml`.
- Crear o reclamar la ficha de **Google Business Profile** con el mismo nombre, teléfono y zona que la web.
