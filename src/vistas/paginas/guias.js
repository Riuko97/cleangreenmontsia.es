// VISTAS · Guías: índice y artículo.
import { url, ic, RUTAS, enlazar } from '../utilidades.js';
import { botonWa, etiqueta, cabeceraPagina, faq, llamada, calendarioIncendios, tarjetaGuia, tarjetaArea } from '../componentes.js';

export function vistaGuias({ guias }) {
  return cabeceraPagina({
    migas: [['Inicio', ''], ['Guías']],
    etiqueta: 'Guías', icono: 'i-presupuesto',
    h1: 'Guías para propietarios',
    entradilla: 'Información práctica, con fuentes, sobre la normativa de las parcelas y sobre cómo cuidar una casa que pasa meses cerrada.',
  }) + `
<section class="seccion" aria-label="Lista de guías">
  <div class="contenedor">
    <div class="guias">
${guias.map(g => tarjetaGuia(g, { titulo: 'h2' })).join('\n')}
    </div>
  </div>
</section>
${llamada()}`;
}

const bloque = b => {
  switch (b.tipo) {
    case 'h2': return `<h2>${b.texto}</h2>`;
    case 'p': return `<p>${enlazar(b.html)}</p>`;
    case 'aviso': return `<div class="nota nota--aviso">${ic('i-aviso')}<p>${b.html}</p></div>`;
    case 'nota': return `<div class="nota">${ic(b.icono || 'i-destello')}<p>${enlazar(b.html)}</p></div>`;
    case 'resumen': return `<ul class="resumen">${b.items.map(([i, h]) => `<li>${ic(i)}<span>${h}</span></li>`).join('')}</ul>`;
    case 'checklist': return `<ul class="checklist">${b.items.map(t => `<li>${ic('i-check')}<span>${enlazar(t)}</span></li>`).join('')}</ul>`;
    case 'calendario': return calendarioIncendios();
    case 'tabla': return `<section class="tabla-envoltorio" aria-label="${b.titulo}" tabindex="0"><table class="tabla"><caption class="visualmente-oculto">${b.titulo}</caption><thead><tr>${b.cabecera.map(c => `<th scope="col">${c}</th>`).join('')}</tr></thead><tbody>${b.filas.map(([a, c]) => `<tr><th scope="row">${a}</th><td>${c}</td></tr>`).join('')}</tbody></table></section>`;
    default: return '';
  }
};

export function vistaGuia({ guia, area, fechaLegible }) {
  return cabeceraPagina({
    migas: [['Inicio', ''], ['Guías', RUTAS.guias], [guia.titulo]],
    etiqueta: 'Guía para propietarios', icono: guia.icono,
    h1: guia.h1,
    entradilla: `${guia.entradilla} <span class="fecha">Revisada el <time datetime="${guia.fecha}">${fechaLegible}</time>.</span>`,
    area: area.clave,
  }) + `
<section class="seccion">
  <div class="contenedor dos-columnas">
    <article class="prosa area-${area.clave}">
${guia.bloques.map(bloque).map(h => '      ' + h).join('\n')}
      ${guia.preguntas.length ? `<h2>Preguntas frecuentes</h2>\n      ${faq(guia.preguntas)}` : ''}
      ${guia.fuentes.length ? `<h2>Fuentes</h2>\n      <ol class="fuentes">${guia.fuentes.map(f => `<li>${f}</li>`).join('')}</ol>` : ''}
    </article>
    <div class="lateral">
      <div class="caja-lateral area-${area.clave}">
        ${etiqueta(area.nombre, area.icono)}
        <h2>¿Te ayudamos?</h2>
        <p>${area.resumen}</p>
        ${botonWa('Pedir presupuesto', { mensaje: `Hola, CleanGreen. He leído vuestra guía y quería información sobre ${area.nombre.toLowerCase()}.` })}
        <a class="boton boton--borde" href="${url(RUTAS.area(area.id))}">Ver el servicio</a>
      </div>
    </div>
  </div>
</section>
<section class="seccion seccion--papel2" aria-labelledby="mas-titulo">
  <div class="contenedor">
    <h2 id="mas-titulo" class="titulo-bloque">Sigue leyendo</h2>
    <div class="relacionadas">
      ${tarjetaArea(area)}
    </div>
  </div>
</section>
${llamada()}`;
}
