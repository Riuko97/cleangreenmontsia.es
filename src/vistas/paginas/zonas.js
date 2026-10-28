// VISTAS · Zonas: índice con mapa y página de cada pueblo.
import { negocio } from '../../modelo/negocio.js';
import { url, ic, RUTAS, unir } from '../utilidades.js';
import { botonWa, botonTel, etiqueta, cabeceraPagina, tarjetaArea, faq, llamada, mapa, listaPueblos } from '../componentes.js';

export function vistaZonas({ zonas, otrosPueblos }) {
  return cabeceraPagina({
    migas: [['Inicio', ''], ['Zonas']],
    etiqueta: 'Zonas', icono: 'i-ubicacion', fondo: 'zonas',
    h1: 'Dónde trabajamos en el Montsià',
    entradilla: 'Trabajamos sobre todo en Amposta, Alcanar y Sant Carles de la Ràpita, y también en los alrededores.',
    acciones: botonWa('Consultar mi zona', { mensaje: 'Hola, CleanGreen. ¿Trabajáis en mi zona?', clase: 'boton--grande' }),
  }) + `
<section class="seccion" aria-label="Mapa y pueblos">
  <div class="contenedor zonas">
    <figure class="mapa" data-revelar>
      ${mapa()}
      <figcaption>Mapa orientativo. Datos: © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">colaboradores de OpenStreetMap</a>.</figcaption>
    </figure>
    <div data-revelar>
      <h2>Tres pueblos y sus alrededores</h2>
      <p class="entradilla">Si estás en otro pueblo de la comarca, escríbenos y te decimos si podemos ir.</p>
      ${listaPueblos(zonas, otrosPueblos)}
    </div>
  </div>
</section>
<section class="seccion seccion--papel2" aria-label="Páginas de cada pueblo">
  <div class="contenedor">
    <div class="tarjetas-zona">
${zonas.map(z => `      <a class="tarjeta-zona" href="${url(RUTAS.zona(z.id))}" data-revelar>${ic('i-ubicacion')}<strong>${z.nombreLargo || z.nombre}</strong><span>${z.entradilla}</span></a>`).join('\n')}
    </div>
  </div>
</section>
${llamada()}`;
}

export function vistaZona({ zona, destacadas, otras }) {
  const mensaje = `Hola, CleanGreen. Quiero pedir presupuesto en ${zona.nombreLargo || zona.nombre}.`;
  return cabeceraPagina({
    migas: [['Inicio', ''], ['Zonas', RUTAS.zonas], [zona.nombre]],
    etiqueta: `${zona.nombreLargo || zona.nombre} · Montsià`, icono: 'i-ubicacion', fondo: 'zonas',
    h1: zona.h1,
    entradilla: zona.entradilla,
    acciones: botonWa('Presupuesto por WhatsApp', { mensaje, clase: 'boton--grande' }) + botonTel(negocio.telefonoVisible, 'boton--borde boton--grande'),
  }) + `
<section class="seccion" aria-labelledby="zona-titulo">
  <div class="contenedor dos-columnas">
    <div class="prosa">
      <h2 id="zona-titulo">Tu casa, tu jardín y tu parcela en ${zona.nombre}</h2>
${zona.parrafos.map(p => `      <p>${p}</p>`).join('\n')}
    </div>
    <div class="lateral">
      <div class="caja-lateral">
        <h2>Cómo pedir presupuesto</h2>
        <ol class="lista-pasos">
          <li>Escríbenos por WhatsApp.</li>
          <li>Mándanos 2 o 3 fotos y la ubicación.</li>
          <li>Te decimos qué haremos y cuánto cuesta.</li>
        </ol>
        ${botonWa('Escribir por WhatsApp', { mensaje })}
      </div>
    </div>
  </div>
  <div class="contenedor">
    <h2 class="titulo-bloque">Servicios en ${zona.nombre}</h2>
    <div class="areas areas--3">
${destacadas.map(a => tarjetaArea(a)).join('\n')}
    </div>
    <p class="mas-enlace"><a class="enlace-flecha" href="${url(RUTAS.servicios)}">Ver las cinco áreas de servicio ${ic('i-flecha')}</a></p>
  </div>
</section>

<section class="seccion seccion--blanca" aria-labelledby="preguntas-titulo">
  <div class="contenedor faq-rejilla">
    <div>
      ${etiqueta('Preguntas')}
      <h2 id="preguntas-titulo">Dudas en ${zona.nombre}</h2>
      <p class="entradilla">¿Estás cerca de ${zona.nombre}? Pregúntanos también por ${unir(zona.cerca, 'o')}.</p>
    </div>
    ${faq(zona.preguntas)}
  </div>
</section>

<section class="seccion" aria-labelledby="otras-titulo">
  <div class="contenedor">
    <h2 id="otras-titulo" class="titulo-bloque">Otras zonas</h2>
    <div class="tarjetas-zona">
${otras.map(o => `      <a class="tarjeta-zona" href="${url(RUTAS.zona(o.id))}">${ic('i-ubicacion')}<strong>${o.nombreLargo || o.nombre}</strong><span>Limpieza, jardinería y mantenimiento</span></a>`).join('\n')}
      <a class="tarjeta-zona" href="${url(RUTAS.zonas)}">${ic('i-ubicacion')}<strong>Mapa de zonas</strong><span>Todos los pueblos en los que trabajamos</span></a>
    </div>
  </div>
</section>

${llamada({ titulo: `¿Tienes una casa o una parcela en ${zona.nombre}?`, mensaje })}`;
}
