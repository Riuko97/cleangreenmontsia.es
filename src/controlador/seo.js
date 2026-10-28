// CONTROLADOR · SEO técnico: datos estructurados (schema.org), sitemap, robots.txt,
// llms.txt, manifiesto y política de seguridad de contenidos (CSP).
import { negocio, sitio } from '../modelo/negocio.js';
import { AREAS } from '../modelo/servicios.js';
import { absoluta, RUTAS, sinEtiquetas } from '../vistas/utilidades.js';

const ciudades = () => [
  ...negocio.zonasPrincipales.map(name => ({ '@type': 'City', name })),
  { '@type': 'AdministrativeArea', name: 'Montsià' },
];

// ------------------------------------------------------------- Entidades
export const negocioLD = () => ({
  '@type': 'LocalBusiness',
  '@id': absoluta('#negocio'),
  name: negocio.nombre,
  alternateName: negocio.nombreComercial,
  description: negocio.descripcion,
  slogan: negocio.lema,
  url: absoluta(''),
  telephone: negocio.telefono,
  image: absoluta('img/og/inicio.jpg'),
  logo: absoluta('img/logo-cleangreen-completo.svg'),
  areaServed: ciudades(),
  knowsAbout: AREAS.flatMap(a => a.servicios.map(s => s.nombre)),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de CleanGreen',
    itemListElement: AREAS.map(a => ({
      '@type': 'OfferCatalog',
      name: a.nombre,
      url: absoluta(RUTAS.area(a.id)),
      itemListElement: a.servicios.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.nombre } })),
    })),
  },
});

export const webLD = () => ({
  '@type': 'WebSite', '@id': absoluta('#web'), url: absoluta(''), name: negocio.nombre,
  inLanguage: sitio.idioma, publisher: { '@id': absoluta('#negocio') },
});

export const paginaLD = ({ ruta, titulo, descripcion, tipo = 'WebPage', conMigas = true, imagen }) => ({
  '@type': tipo,
  '@id': absoluta(ruta) + '#pagina',
  url: absoluta(ruta),
  name: titulo,
  description: descripcion,
  inLanguage: sitio.idioma,
  isPartOf: { '@id': absoluta('#web') },
  about: { '@id': absoluta('#negocio') },
  ...(imagen ? { primaryImageOfPage: { '@type': 'ImageObject', url: absoluta(imagen) } } : {}),
  ...(conMigas ? { breadcrumb: { '@id': absoluta(ruta) + '#migas' } } : {}),
  dateModified: sitio.actualizado,
});

export const migasLD = (ruta, items) => ({
  '@type': 'BreadcrumbList', '@id': absoluta(ruta) + '#migas',
  itemListElement: items.map(([name, r], i) => ({ '@type': 'ListItem', position: i + 1, name, item: absoluta(r) })),
});

export const servicioLD = (area, { zona } = {}) => ({
  '@type': 'Service',
  '@id': absoluta(RUTAS.area(area.id)) + '#servicio',
  name: area.nombre,
  serviceType: area.nombre,
  description: area.resumen,
  url: absoluta(RUTAS.area(area.id)),
  image: absoluta(`img/og/${area.clave}.jpg`),
  provider: { '@id': absoluta('#negocio') },
  areaServed: zona ? { '@type': 'City', name: zona } : ciudades(),
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: area.nombre,
    itemListElement: area.servicios.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.nombre, description: s.texto } })),
  },
});

export const listaLD = (ruta, elementos) => ({
  '@type': 'ItemList', '@id': absoluta(ruta) + '#lista',
  itemListElement: elementos.map(([name, r], i) => ({ '@type': 'ListItem', position: i + 1, name, url: absoluta(r) })),
});

export const faqLD = (ruta, preguntas) => ({
  '@type': 'FAQPage', '@id': absoluta(ruta) + '#faq',
  mainEntity: preguntas.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: sinEtiquetas(a).replace(/\{\{[^}]+\}\}/g, '') } })),
});

export const articuloLD = (guia, ruta) => ({
  '@type': 'Article', '@id': absoluta(ruta) + '#articulo',
  headline: guia.h1, description: guia.descripcion, inLanguage: sitio.idioma,
  datePublished: guia.fecha, dateModified: guia.fecha,
  author: { '@id': absoluta('#negocio') }, publisher: { '@id': absoluta('#negocio') },
  image: absoluta(`img/og/${AREAS.find(a => a.id === guia.area).clave}.jpg`),
  mainEntityOfPage: { '@id': absoluta(ruta) + '#pagina' },
});

export const grafo = nodos => ({ '@context': 'https://schema.org', '@graph': nodos.filter(Boolean) });

// ------------------------------------------------------- Archivos de rastreo
export const sitemap = paginas => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas.filter(p => p.meta.indexar !== false && !p.archivo).map(p => `  <url>
    <loc>${absoluta(p.ruta)}</loc>
    <lastmod>${sitio.actualizado}</lastmod>
    <priority>${p.prioridad || '0.6'}</priority>
  </url>`).join('\n')}
</urlset>
`;

// Misma política que la tarea B07: buscadores y buscadores de IA sí;
// bots de entrenamiento de IA, no.
export const robots = () => `# ${negocio.nombre} · ${absoluta('')}
User-agent: *
Allow: /

# Bots de búsqueda de IA: pueden citar la web en sus respuestas.
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
Allow: /

# Bots de entrenamiento de IA: no pueden usar el contenido para entrenar modelos.
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: Meta-ExternalAgent
User-agent: Bytespider
Disallow: /

Sitemap: ${absoluta('sitemap.xml')}
`;

// llms.txt: resumen en Markdown para buscadores con IA (propuesta llmstxt.org).
export const llms = paginas => `# ${negocio.nombre} (${negocio.nombreComercial})

> ${negocio.descripcion} Presupuesto sin compromiso por WhatsApp (${negocio.telefonoVisible}).

## Servicios
${AREAS.map(a => `- [${a.nombre}](${absoluta(RUTAS.area(a.id))}): ${a.resumen}`).join('\n')}

## Zonas
${paginas.filter(p => p.ruta.startsWith('zonas/') && p.ruta !== RUTAS.zonas).map(p => `- [${p.meta.titulo.replace(/ \|.*$/, '')}](${absoluta(p.ruta)})`).join('\n')}

## Guías
${paginas.filter(p => p.ruta.startsWith('guias/') && p.ruta !== RUTAS.guias).map(p => `- [${p.meta.titulo.replace(/ \|.*$/, '')}](${absoluta(p.ruta)}): ${p.meta.descripcion}`).join('\n')}

## Contacto
- WhatsApp y teléfono: ${negocio.telefonoVisible}
- [Pedir presupuesto](${absoluta(RUTAS.contacto)})
`;

export const manifiesto = () => JSON.stringify({
  name: `${negocio.nombre} · Limpieza, jardinería y mantenimiento`,
  short_name: negocio.nombre,
  lang: 'es',
  start_url: sitio.base,
  scope: sitio.base,
  display: 'browser',
  background_color: '#fbf7ef',
  theme_color: '#fbf7ef',
  icons: [
    { src: `${sitio.base}img/icono-192.png`, sizes: '192x192', type: 'image/png' },
    { src: `${sitio.base}img/icono-512.png`, sizes: '512x512', type: 'image/png' },
    { src: `${sitio.base}img/icono-maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2) + '\n';

// Política de seguridad de contenidos: solo recursos propios; el único script en
// línea se autoriza por su huella SHA-256. Sin 'unsafe-inline'.
export const csp = huellaScript => [
  "default-src 'self'",
  `script-src 'self' 'sha256-${huellaScript}'`,
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');
