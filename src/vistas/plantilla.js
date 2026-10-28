// VISTAS · Documento base: <head>, cabecera, pie y barra de contacto del móvil.
import { negocio, sitio } from '../modelo/negocio.js';
import { AREAS } from '../modelo/servicios.js';
import { ZONAS } from '../modelo/zonas.js';
import { GUIAS } from '../modelo/guias.js';
import { url, absoluta, wa, tel, sinCortes, ic, esc, RUTAS } from './utilidades.js';
import { iconoArea } from './componentes.js';

// Script mínimo en línea: marca que hay JavaScript antes de pintar (evita saltos).
// Su huella SHA-256 se declara en la política de seguridad (CSP).
export const SCRIPT_JS = "document.documentElement.className='js'";

// El fondo de la cabecera es lo más grande de la primera pantalla (el LCP), pero
// el navegador no lo descubre hasta leer el CSS. Se precarga la misma versión AVIF
// que elige estilos.css en cada ancho, con las mismas media queries; los
// navegadores sin AVIF ignoran la precarga y usan el WebP.
const VERSIONES_FONDO = [
  ['(max-width: 700px)', 'movil-640'],
  ['(min-width: 701px) and (max-width: 1440px)', '1440'],
  ['(min-width: 1441px)', '1920'],
];
const precargaFondo = fondo => VERSIONES_FONDO.map(([media, version]) =>
  `<link rel="preload" href="${url(`img/fondos/${fondo}-${version}.avif`)}" as="image" type="image/avif" media="${media}" fetchpriority="high">\n`).join('');

function cabeza({ meta, recursos, fondo }) {
  const canonica = absoluta(meta.ruta);
  const imagen = absoluta(meta.imagen || 'img/og/inicio.jpg');
  return `<!DOCTYPE html>
<html lang="es-ES" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(meta.titulo)}</title>
<meta name="description" content="${esc(meta.descripcion)}">
<meta name="robots" content="${meta.indexar === false ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
${meta.indexar === false ? '' : `<link rel="canonical" href="${canonica}">
<link rel="alternate" hreflang="es-ES" href="${canonica}">
<link rel="alternate" hreflang="x-default" href="${canonica}">
`}<meta http-equiv="Content-Security-Policy" content="${recursos.csp}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="theme-color" content="#fbf7ef">
<meta name="color-scheme" content="light">
<meta name="format-detection" content="telephone=no">
<link rel="icon" href="${url('favicon.ico')}" sizes="32x32">
<link rel="icon" href="${url('img/icono-cleangreen.svg')}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${url('img/apple-touch-icon.png')}">
<link rel="manifest" href="${url('site.webmanifest')}">
<link rel="preload" href="${url('fonts/playfair-display.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${url('fonts/figtree.woff2')}" as="font" type="font/woff2" crossorigin>
${fondo ? precargaFondo(fondo) : ''}<link rel="stylesheet" href="${recursos.css}">
<script>${SCRIPT_JS}</script>
<script type="module" src="${recursos.js}"></script>
<meta property="og:type" content="${meta.tipoOG || 'website'}">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="${negocio.nombre}">
<meta property="og:title" content="${esc(meta.tituloOG || meta.titulo)}">
<meta property="og:description" content="${esc(meta.descripcion)}">
<meta property="og:url" content="${canonica}">
<meta property="og:image" content="${imagen}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(meta.imagenAlt || 'CleanGreen: limpieza, jardinería y mantenimiento en el Montsià')}">
<meta name="twitter:card" content="summary_large_image">
${meta.jsonld ? `<script type="application/ld+json">${JSON.stringify(meta.jsonld).replace(/</g, '\\u003c')}</script>` : ''}
</head>`;
}

function cabecera(activa) {
  const actual = r => activa === r ? ' aria-current="page"' : '';
  const enServicios = activa.startsWith('servicios/');
  return `<body>
<a class="saltar" href="#contenido">Saltar al contenido</a>
<header class="cabecera">
  <div class="contenedor cabecera__fila">
    <a class="logo" href="${url('')}" aria-label="CleanGreen, ir al inicio"><img src="${url('img/logo-cleangreen.svg')}" alt="CleanGreen" width="2069" height="460"></a>
    <button class="menu-boton" type="button" aria-expanded="false" aria-controls="nav">
      <svg class="icono-menu" aria-hidden="true"><use href="${url('img/iconos.svg')}#i-menu"></use></svg><svg class="icono-cerrar" aria-hidden="true"><use href="${url('img/iconos.svg')}#i-cerrar"></use></svg><span class="menu-boton__texto">Menú</span>
    </button>
    <nav class="nav" id="nav" aria-label="Principal">
      <ul class="nav__lista">
        <li class="nav__grupo">
          <a href="${url(RUTAS.servicios)}"${actual(RUTAS.servicios)}${enServicios && activa !== RUTAS.servicios ? ' class="nav__activo"' : ''}>Servicios</a>
          <button class="nav__desplegar" type="button" aria-expanded="false" aria-controls="submenu-servicios"><span class="visualmente-oculto">Ver las áreas de servicio</span>${ic('i-abajo')}</button>
          <ul class="submenu" id="submenu-servicios">
${AREAS.map(a => `            <li class="area-${a.clave}"><a href="${url(RUTAS.area(a.id))}"${actual(RUTAS.area(a.id))}>${iconoArea(a, 'submenu__icono')}<span><strong>${a.nombre}</strong><small>${a.sub}</small></span></a></li>`).join('\n')}
          </ul>
        </li>
        <li><a href="${url(RUTAS.area('segundas-residencias'))}"${actual(RUTAS.area('segundas-residencias'))}>Segundas residencias</a></li>
        <li><a href="${url(RUTAS.zonas)}"${actual(RUTAS.zonas)}${activa.startsWith('zonas/') && activa !== RUTAS.zonas ? ' class="nav__activo"' : ''}>Zonas</a></li>
        <li><a href="${url(RUTAS.guias)}"${actual(RUTAS.guias)}${activa.startsWith('guias/') && activa !== RUTAS.guias ? ' class="nav__activo"' : ''}>Guías</a></li>
        <li><a href="${url(RUTAS.contacto)}"${actual(RUTAS.contacto)}>Contacto</a></li>
      </ul>
      <div class="nav__extra">
        <a class="boton boton--wa" href="${wa()}" target="_blank" rel="noopener">${ic('i-whatsapp')} Presupuesto por WhatsApp</a>
        <a class="boton boton--borde" href="${tel()}">${ic('i-telefono')} ${sinCortes('Llamar al ' + negocio.telefonoVisible)}</a>
      </div>
    </nav>
    <a class="boton boton--wa cabecera__cta" href="${wa()}" target="_blank" rel="noopener">${ic('i-whatsapp')} Presupuesto</a>
  </div>
</header>
`;
}

function pie() {
  return `
<footer class="pie">
  <div class="contenedor">
    <div class="pie__rejilla">
      <div class="pie__marca">
        <img src="${url('img/logo-cleangreen-blanco.svg')}" alt="CleanGreen" width="2069" height="460" loading="lazy">
        <p>${negocio.descripcion}</p>
        <p class="pie__lema">${negocio.lema}</p>
      </div>
      <div>
        <h2>Servicios</h2>
        <ul>
${AREAS.map(a => `          <li><a href="${url(RUTAS.area(a.id))}">${a.nombre}</a></li>`).join('\n')}
        </ul>
      </div>
      <div>
        <h2>Zonas y guías</h2>
        <ul>
${ZONAS.map(z => `          <li><a href="${url(RUTAS.zona(z.id))}">${z.nombreLargo || z.nombre}</a></li>`).join('\n')}
${GUIAS.map(g => `          <li><a href="${url(RUTAS.guia(g.id))}">${g.titulo}</a></li>`).join('\n')}
        </ul>
      </div>
      <div class="pie__contacto">
        <h2>Contacto</h2>
        <ul>
          <li><a href="${wa()}" target="_blank" rel="noopener">${ic('i-whatsapp')} WhatsApp</a></li>
          <li><a href="${tel()}">${ic('i-telefono')} ${sinCortes(negocio.telefonoVisible)}</a></li>
          <li><a href="${url(RUTAS.contacto)}">${ic('i-presupuesto')} Pedir presupuesto</a></li>
        </ul>
      </div>
    </div>
    <div class="pie__legal">
      <p>© <span data-anio>2026</span> ${negocio.nombre} · ${negocio.nombreComercial.replace('&', '&amp;')}</p>
      <nav aria-label="Información legal">
        <a href="${url(RUTAS.legal('aviso-legal'))}">Aviso legal</a>
        <a href="${url(RUTAS.legal('privacidad'))}">Privacidad</a>
        <a href="${url(RUTAS.legal('cookies'))}">Cookies</a>
      </nav>
    </div>
  </div>
</footer>
<nav class="barra-movil" aria-label="Contacto rápido">
  <a class="boton boton--wa" href="${wa()}" target="_blank" rel="noopener">${ic('i-whatsapp')} WhatsApp</a>
  <a class="boton boton--oscuro" href="${tel()}">${ic('i-telefono')} Llamar</a>
</nav>
</body>
</html>
`;
}

// Documento completo. `activa` es la ruta de la página para marcar el menú.
// El fondo de la cabecera se lee de su clase .cabecera--<fondo>, que pone cabeceraPagina.
export function documento({ meta, cuerpo, recursos }) {
  const fondo = cuerpo.match(/\bcabecera--([a-z-]+)/)?.[1];
  return cabeza({ meta, recursos, fondo }) + cabecera(meta.ruta) + `<main id="contenido">\n${cuerpo}\n</main>\n` + pie();
}
