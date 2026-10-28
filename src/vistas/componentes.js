// VISTAS · Componentes reutilizables. Reciben datos y devuelven HTML; no deciden nada.
import fs from 'node:fs';
import { negocio } from '../modelo/negocio.js';
import { PUEBLOS_FORMULARIO } from '../modelo/zonas.js';
import { url, wa, tel, sinCortes, ic, RUTAS, enlazar, esc } from './utilidades.js';

// ---------------------------------------------------------------- Botones
export const botonWa = (texto = 'Presupuesto por WhatsApp', { mensaje, clase = '' } = {}) =>
  `<a class="boton boton--wa ${clase}" href="${wa(mensaje)}" target="_blank" rel="noopener">${ic('i-whatsapp')} ${texto}</a>`;
export const botonTel = (texto = negocio.telefonoVisible, clase = 'boton--borde') =>
  `<a class="boton ${clase}" href="${tel()}">${ic('i-telefono')} ${sinCortes(texto)}</a>`;

// Etiqueta de sección en versalitas, sin icono (estilo formal).
export const etiqueta = texto => `<p class="etiqueta">${texto}</p>`;

// ------------------------------------------------------------------ Migas
export const migas = items => `<nav class="migas" aria-label="Estás aquí"><ol>${items.map(([t, h], i) =>
  i < items.length - 1 ? `<li><a href="${url(h)}">${t}</a></li>` : `<li aria-current="page">${t}</li>`).join('')}</ol></nav>`;

// --------------------------------------------------------------------- FAQ
export const faq = preguntas => `<div class="faq">
${preguntas.map(([q, a]) => `  <details>
    <summary>${q}</summary>
    <div class="faq__respuesta"><p>${enlazar(a)}</p></div>
  </details>`).join('\n')}
</div>`;

// ---------------------------------------------------- Cabecera de sección
export const cabeceraSeccion = ({ etiqueta: et, icono, titulo, entradilla, id, centro = false }) => `<div class="cabecera-seccion${centro ? ' cabecera-seccion--centro' : ''}" data-revelar>
      ${et ? etiqueta(et, icono) : ''}
      <h2${id ? ` id="${id}"` : ''}>${titulo}</h2>
      ${entradilla ? `<p class="entradilla">${entradilla}</p>` : ''}
    </div>`;

// ---------------------------------------------------- Cabecera de página
// Con «fondo», la cabecera lleva una imagen de fondo: la clase .cabecera--<fondo>
// de estilos.css (cabecera-servicio es la clase común a todas las que tienen fondo).
export const cabeceraPagina = ({ migas: m, etiqueta: et, icono = '', h1, entradilla, acciones = '', visual = '', area = '', fondo = '' }) => `<section class="cabecera-pagina${area ? ' area-' + area : ''}${visual ? ' cabecera-pagina--visual' : ''}${fondo ? ` cabecera-servicio cabecera--${fondo}` : ''}">
  <div class="contenedor cabecera-pagina__rejilla">
    <div>
      ${m ? migas(m) : ''}
      ${et ? etiqueta(et, icono) : ''}
      <h1>${h1}</h1>
      ${entradilla ? `<p class="entradilla">${entradilla}</p>` : ''}
      ${acciones ? `<div class="acciones">${acciones}</div>` : ''}
    </div>
    ${visual ? `<div class="cabecera-pagina__visual">${visual}</div>` : ''}
  </div>
</section>`;

// ------------------------------------------------------------------- Fotos
// Cada foto está en AVIF (con WebP de respaldo) a 640, 960 y 1280 px de ancho; las
// genera herramientas/optimizar-fotos.py. Son imágenes ilustrativas generadas con IA:
// lo dicen el alt de las informativas y una nota visible sobre cada foto.
const ANCHOS = [640, 960, 1280];
const variantes = (nombre, formato) => ANCHOS.map(w => `${url(`img/fotos/${nombre}-${w}.${formato}`)} ${w}w`).join(', ');

export const imagen = (nombre, { alt = '', tamanos = '100vw', prioridad = false, clase = '' } = {}) =>
  `<picture><source type="image/avif" srcset="${variantes(nombre, 'avif')}" sizes="${tamanos}"><img${clase ? ` class="${clase}"` : ''} src="${url(`img/fotos/${nombre}-960.webp`)}" srcset="${variantes(nombre, 'webp')}" sizes="${tamanos}" alt="${esc(alt)}" width="1280" height="960"${prioridad ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></picture>`;

// El alt ya lo dice en las fotos informativas; la nota es para quien las ve.
export const notaIa = () => '<span class="nota-ia" aria-hidden="true">Imagen ilustrativa generada con IA</span>';

// Con «pie», la nota de IA va debajo de la foto (en las cabeceras) en lugar de encima.
export const ilustracion = (nombre, alt, { prioridad = false, clase = '', tamanos = '(min-width: 980px) 520px, 100vw', pie = false } = {}) =>
  `<figure class="ilustracion ${clase}">${imagen(nombre, { alt, tamanos, prioridad })}${pie ? '<figcaption class="ilustracion__pie">Imagen ilustrativa generada con IA</figcaption>' : notaIa()}</figure>`;

// Icono propio de cada área (img/areas/<clave>.svg). Decorativo: el nombre va al lado.
export const iconoArea = (area, clase) => `<img class="${clase}" src="${url(`img/areas/${area.clave}.svg`)}" alt="" width="64" height="64" loading="lazy" decoding="async">`;

// ------------------------------------------------- Comparador antes/después
export const comparador = ({ prioridad = true } = {}) => `<div class="comparador-marco">
      <div class="comparador" data-comparador>
        ${imagen('parcela-despues', { alt: 'Imagen ilustrativa generada con IA de una parcela con un olivo y montañas al fondo: a la izquierda, con la hierba alta y seca; a la derecha, desbrozada y limpia.', tamanos: '(min-width: 980px) 520px, 100vw', prioridad })}
        ${imagen('parcela-antes', { clase: 'comparador__antes', tamanos: '(min-width: 980px) 520px, 100vw', prioridad })}
        <span class="comparador__etiqueta comparador__etiqueta--antes">Antes</span>
        <span class="comparador__etiqueta comparador__etiqueta--despues">Después</span>
        <input type="range" min="0" max="100" value="50" step="0.5" aria-label="Desliza para comparar el antes y el después">
        <span class="comparador__linea" aria-hidden="true"></span>
        <span class="comparador__mango" aria-hidden="true">${ic('i-flechas')}</span>
      </div>
      <p class="comparador__pie">${ic('i-flechas')} Imagen ilustrativa generada con IA. Desliza para comparar.</p>
    </div>`;

// ------------------------------------------------------- Tarjetas de área
export const tarjetaArea = (area, { titulo = 'h3', destacada = false } = {}) => `<article class="tarjeta-area area-${area.clave}${destacada ? ' tarjeta-area--destacada' : ''}" data-revelar>
        <div class="tarjeta-area__imagen">${imagen(area.foto, { tamanos: '(min-width: 1000px) 400px, (min-width: 640px) 50vw, 100vw' })}${notaIa()}</div>
        <div class="tarjeta-area__cuerpo">
          ${iconoArea(area, 'tarjeta-area__icono')}
          <${titulo}><a href="${url(RUTAS.area(area.id))}">${area.nombre}</a></${titulo}>
          <p>${area.resumen}</p>
          <ul class="tarjeta-area__lista">
${area.servicios.slice(0, 3).map(s => `            <li>${ic('i-check')} ${s.nombre}</li>`).join('\n')}
          </ul>
          <span class="tarjeta-area__mas" aria-hidden="true">Ver servicios ${ic('i-flecha')}</span>
        </div>
      </article>`;

// ------------------------------------------------- Tarjeta de servicio
export const tarjetaServicio = (s, { enlace } = {}) => `<article class="servicio" id="${s.id}" data-revelar>
        <span class="servicio__icono">${ic(s.icono || 'i-hoja')}</span>
        <h3>${enlace ? `<a href="${enlace}">${s.nombre}</a>` : s.nombre}</h3>
        <p>${s.texto}</p>
        ${s.incluye ? `<ul class="servicio__incluye">
${s.incluye.map(i => `          <li>${ic('i-check')} ${i}</li>`).join('\n')}
        </ul>` : ''}
      </article>`;

// --------------------------------------------------------- Valores y pasos
export const valores = lista => `<ul class="valores">
${lista.map(v => `      <li>${ic(v.icono)}<div><strong>${v.titulo}</strong><span>${v.texto}</span></div></li>`).join('\n')}
    </ul>`;

export const pasos = lista => `<ol class="pasos">
${lista.map((p, i) => `      <li class="paso" data-revelar><span class="paso__num">${i + 1}</span>${ic(p.icono)}<h3>${p.titulo}</h3><p>${p.texto}</p></li>`).join('\n')}
    </ol>`;

// ------------------------------------------------- Calendario de incendios
export const calendarioIncendios = () => `<div class="calendario" data-revelar>
      <p class="calendario__titulo">${ic('i-fuego')} Época de peligro de incendio en Cataluña</p>
      <div class="meses" role="img" aria-label="Época de peligro de incendio: del 15 de marzo al 15 de octubre">
        <div class="meses__fila">${['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => `<span${i >= 2 && i <= 9 ? ' class="riesgo"' : ''}>${m}</span>`).join('')}</div>
        <div class="meses__pista"><i class="meses__riesgo"></i></div>
        <b class="meses__marca meses__marca--ini">15 mar</b>
        <b class="meses__marca meses__marca--fin">15 oct</b>
      </div>
      <ul class="hechos">
        <li>${ic('i-fuego')}<div><strong>Del 15 de marzo al 15 de octubre</strong><p>A menos de 400 metros del bosque, las actividades con riesgo de incendio necesitan autorización.</p></div></li>
        <li>${ic('i-sinfuego')}<div><strong>No se pueden quemar restos de jardinería</strong><p>La Generalitat lo incluye entre las actividades prohibidas: hay que retirarlos o triturarlos.</p></div></li>
        <li>${ic('i-casa')}<div><strong>Urbanizaciones cerca del bosque</strong><p>Las parcelas deben estar sin vegetación seca. Si el propietario no lo hace, el ayuntamiento puede hacerlo y cobrarlo.</p></div></li>
      </ul>
      <p class="fuente">Fuentes: <a href="https://tramits.gencat.cat/ca/tramits/tramits-temes/Autoritzacio-per-a-la-realitzacio-dactivitats-amb-risc-dincendi" target="_blank" rel="noopener">Tràmits gencat</a> y <a href="https://www.diba.cat/documents/d/incendis/diba_franges_web" target="_blank" rel="noopener">Diputació de Barcelona (2025)</a>.</p>
    </div>`;

// ---------------------------------------------------- Calendario del año
export const calendarioAnual = calendario => `<ol class="estaciones">
${calendario.map((c, i) => `      <li class="estacion estacion--${i + 1}" data-revelar>
        <h3>${c.estacion}</h3><p class="estacion__meses">${c.meses}</p>
        <ul>${c.tareas.map(t => `<li>${ic('i-check')} ${t}</li>`).join('')}</ul>
      </li>`).join('\n')}
    </ol>`;

// ---------------------------------------------------------- Llamada final
export const llamada = ({ titulo = '¿Hablamos de tu casa, tu jardín o tu parcela?', texto = 'Escríbenos por WhatsApp con lo que necesitas y, si puedes, 2 o 3 fotos. Te respondemos con un presupuesto sin compromiso.', mensaje } = {}) => `<section class="seccion seccion--llamada" aria-labelledby="llamada-titulo">
  <div class="contenedor">
    <div class="llamada" data-revelar>
      <h2 id="llamada-titulo">${titulo}</h2>
      <p>${texto}</p>
      <div class="acciones">
        ${botonWa('Escríbenos por WhatsApp', { mensaje, clase: 'boton--grande' })}
        ${botonTel(negocio.telefonoVisible, 'boton--borde-claro boton--grande')}
      </div>
    </div>
  </div>
</section>`;

// -------------------------------------------- Asistente de presupuesto (MVC en el cliente)
const grupo = ({ leyenda, nombre, tipo = 'radio', opciones, ayuda = '', seccion = '' }) => `<fieldset class="grupo"${seccion ? ` data-seccion="${seccion}"` : ''}>
          <legend>${leyenda}${ayuda ? ` <small>${ayuda}</small>` : ''}</legend>
          <div class="opciones">
${opciones.map(o => {
  const [valor, extra] = Array.isArray(o) ? o : [o, ''];
  return `            <label class="opcion"><input type="${tipo}" name="${nombre}" value="${valor}"${extra}><span>${valor}</span></label>`;
}).join('\n')}
          </div>
        </fieldset>`;

export const SERVICIOS_FORMULARIO = [
  ['Limpieza de casa o piso', 'hogar'],
  ['Jardinería', 'jardin'],
  ['Desbroce o limpieza de parcela', 'parcela'],
  ['Segunda residencia', 'residencia'],
  ['Mantenimiento periódico', 'mantenimiento'],
  ['Otro trabajo', 'otro'],
];

export const asistente = (id, { mensaje = 'Hola, CleanGreen. Quiero pedir presupuesto.' } = {}) => `<form class="presupuesto" data-presupuesto data-whatsapp="${negocio.whatsapp}" data-saludo="${esc(mensaje)}" novalidate>
      <div class="hoja">
        <div class="hoja__cabecera"><h3>Hoja de encargo</h3><span>Sin compromiso</span></div>
        ${grupo({ leyenda: '¿Qué necesitas?', nombre: 'servicio', tipo: 'checkbox', ayuda: 'Puedes marcar varios', opciones: SERVICIOS_FORMULARIO.map(([t, c]) => [t, ` data-seccion-activa="${c}"`]) })}
        <div class="campos campos--2">
          <div class="campo">
            <label for="lugar-${id}">¿Dónde está?</label>
            <select id="lugar-${id}" name="lugar">
              <option value="">Elige el pueblo</option>
${PUEBLOS_FORMULARIO.map(p => `              <option>${p}</option>`).join('\n')}
            </select>
          </div>
          <div class="campo">
            <label for="detalle-${id}">Calle, partida o urbanización <small>(opcional)</small></label>
            <input id="detalle-${id}" name="detalle" type="text" autocomplete="off" placeholder="Ej.: Partida Sant Joan">
          </div>
        </div>
        ${grupo({ seccion: 'hogar', leyenda: 'La vivienda', nombre: 'vivienda', opciones: ['Piso', 'Casa', 'Apartamento'] })}
        ${grupo({ seccion: 'hogar', leyenda: 'Tipo de limpieza', nombre: 'limpieza', tipo: 'checkbox', ayuda: 'Puedes marcar varios', opciones: ['Limpieza general', 'A fondo', 'Casa vacía', 'Cristales', 'Después de obra o reforma'] })}
        ${grupo({ seccion: 'jardin', leyenda: 'En el jardín', nombre: 'jardin', tipo: 'checkbox', ayuda: 'Puedes marcar varios', opciones: ['Corte de césped', 'Setos y arbustos', 'Poda de árboles pequeños', 'Limpieza de hojas y restos'] })}
        ${grupo({ seccion: 'parcela', leyenda: 'Tamaño de la parcela', nombre: 'tamano', opciones: ['Menos de 500 m²', 'De 500 a 1.000 m²', 'De 1.000 a 5.000 m²', 'Más de 5.000 m²', 'No lo sé'] })}
        ${grupo({ seccion: 'parcela', leyenda: '¿Cómo está la parcela?', nombre: 'estado', opciones: ['Hierba baja', 'Hierba alta', 'Zarzas y matorral', 'Abandonada hace años'] })}
        ${grupo({ seccion: 'parcela', leyenda: '¿Qué hacemos con los restos?', nombre: 'restos', opciones: ['Que os los llevéis', 'Dejarlos agrupados en la parcela', 'Lo hablamos'] })}
        ${grupo({ seccion: 'residencia', leyenda: 'Para tu segunda residencia', nombre: 'residencia', tipo: 'checkbox', ayuda: 'Puedes marcar varios', opciones: ['Revisiones periódicas', 'Casa lista antes de llegar', 'Cierre de temporada', 'Jardín y parcela mientras no estoy'] })}
        ${grupo({ leyenda: '¿Con qué frecuencia?', nombre: 'frecuencia', opciones: ['Una sola vez', 'Cada semana', 'Cada 15 días', 'Cada mes', 'Por temporadas'] })}
        ${grupo({ leyenda: '¿Para cuándo?', nombre: 'plazo', opciones: ['Lo antes posible', 'Este mes', 'Antes del verano', 'Sin prisa'] })}
        <div class="campos campos--2">
          <div class="campo">
            <label for="nombre-${id}">Tu nombre <small>(opcional)</small></label>
            <input id="nombre-${id}" name="nombre" type="text" autocomplete="given-name">
          </div>
          <div class="campo">
            <label for="comentario-${id}">Algo más <small>(opcional)</small></label>
            <textarea id="comentario-${id}" name="comentario" rows="3" placeholder="Accesos, metros, si vives fuera…"></textarea>
          </div>
        </div>
      </div>
      <div class="mensaje">
        <h3 class="visualmente-oculto">Vista previa del mensaje</h3>
        <div class="telefono">
          <div class="telefono__barra"><img src="${url('img/icono-cleangreen.svg')}" alt="" width="36" height="36"><div><strong>CleanGreen</strong><small>WhatsApp · ${negocio.telefonoVisible}</small></div></div>
          <p class="burbuja" data-burbuja>${esc(mensaje)}</p>
        </div>
        <div class="mensaje__acciones">
          <button class="boton boton--wa boton--grande boton--bloque solo-js" type="submit">${ic('i-whatsapp')} Enviar por WhatsApp</button>
          <a class="boton boton--wa boton--grande boton--bloque solo-sin-js" href="${wa(mensaje)}" target="_blank" rel="noopener">${ic('i-whatsapp')} Abrir WhatsApp</a>
          ${botonTel('O llámanos al ' + negocio.telefonoVisible, 'boton--borde boton--bloque')}
        </div>
        <p class="mensaje__nota">${ic('i-camara')}<span>Después de enviar el mensaje, adjunta en el chat <strong>2 o 3 fotos</strong> y la <strong>ubicación</strong>.</span></p>
        <p class="privacidad-nota">Esta web no guarda nada de lo que marcas o escribes: el mensaje solo se envía si tú lo mandas desde WhatsApp. <a href="${url(RUTAS.legal('privacidad'))}">Privacidad</a>.</p>
      </div>
    </form>`;

// ------------------------------------------------------------ Mapa de zonas
let MAPA = null;
export const mapa = () => {
  if (!MAPA) MAPA = JSON.parse(fs.readFileSync(new URL('../modelo/mapa.json', import.meta.url)));
  const m = MAPA;
  const r = d => d.replace(/-?\d+\.\d+/g, n => String(Math.round(+n)));
  const principales = { amposta: 1, alcanar: 1, larapita: 1 };
  const etiquetas = {
    'Amposta': { dx: 9, dy: 18, c: 'p' }, 'Alcanar': { dx: -9, dy: 6, a: 'end', c: 'p' }, "Les Cases d'Alcanar": { dx: 9, dy: 6, c: 's' },
    'La Ràpita': { dx: 10, dy: 6, c: 'p' }, 'Ulldecona': { dx: 8, dy: 5, c: 's' }, 'La Sénia': { dx: 8, dy: 5, c: 's' },
    'Santa Bàrbara': { dx: -8, dy: 5, a: 'end', c: 's' }, 'Masdenverge': { dx: 0, dy: -10, a: 'middle', c: 's' },
    "Sant Jaume d'Enveja": { dx: 8, dy: 14, c: 's' }, 'Godall': { dx: 8, dy: 5, c: 's' }, 'La Galera': { dx: 8, dy: 5, c: 's' },
    'Freginals': { dx: 8, dy: 5, c: 's' }, 'Mas de Barberans': { dx: 8, dy: 5, c: 's' }, 'Deltebre': { dx: 9, dy: -6, c: 'c' },
  };
  const muni = Object.entries(m.mun).map(([k, d]) => `<path class="${principales[k] ? 'mapa-mp' : 'mapa-mo'}" d="${r(d)}"/>`).join('');
  const vecinas = Object.values(m.neigh).map(d => `<path class="mapa-v" d="${r(d)}"/>`).join('');
  const puntos = m.towns.filter(([n]) => n !== 'Vinaròs' && n !== 'Tortosa').map(([n, x, y]) => {
    const e = etiquetas[n] || { dx: 8, dy: 5, c: 's' };
    const rr = e.c === 'p' ? 7.5 : e.c === 'c' ? 4 : 5;
    return `<g class="mapa-t${e.c}"><circle cx="${x}" cy="${y}" r="${rr}"/><text x="${Math.round(x + e.dx)}" y="${Math.round(y + e.dy)}"${e.a ? ` text-anchor="${e.a}"` : ''}>${n}</text></g>`;
  }).join('');
  return `<svg class="mapa-svg" viewBox="0 95 800 410" role="img" aria-labelledby="mapa-titulo mapa-desc">
  <title id="mapa-titulo">Mapa de la comarca del Montsià</title>
  <desc id="mapa-desc">Amposta, Alcanar y Sant Carles de la Ràpita aparecen destacados. También se ven el resto de pueblos del Montsià, el Delta de l'Ebre y las comarcas vecinas.</desc>
  <rect class="mapa-mar" x="0" y="95" width="800" height="410"/>
  <path class="mapa-tierra" d="M0,95 H230 V505 H0 Z"/>
  ${vecinas}${muni}
  <path class="mapa-ola" d="M640,432 q10,-6 20,0 t20,0 t20,0 M560,470 q10,-6 20,0 t20,0 M700,372 q10,-6 20,0 t20,0"/>
  <text class="mapa-rotulo" x="520" y="492">MAR MEDITERRÀNIA</text>
  <text class="mapa-rotulo mapa-rotulo--delta" x="610" y="140">DELTA DE L'EBRE</text>
  ${puntos}
</svg>`;
};

// ------------------------------------------------------------ Otras piezas
export const tarjetaGuia = (g, { titulo = 'h3' } = {}) => `<article class="tarjeta-guia area-${g.claveArea}" data-revelar>
        <p class="tarjeta-guia__tipo">Guía para propietarios</p>
        <${titulo}><a href="${url(RUTAS.guia(g.id))}">${g.titulo}</a></${titulo}>
        <p>${g.resumen}</p>
        <span class="tarjeta-guia__mas">Leer la guía ${ic('i-flecha')}</span>
      </article>`;

export const listaPueblos = (zonas, otros) => `<ul class="pueblos">
${zonas.map(z => `        <li><a href="${url(RUTAS.zona(z.id))}">${ic('i-ubicacion')} ${z.nombre}</a></li>`).join('\n')}
      </ul>
      <p class="pueblos__titulo">Pregúntanos también por:</p>
      <ul class="pueblos pueblos--otros">
${otros.map(p => `        <li><span>${p}</span></li>`).join('\n')}
      </ul>`;
