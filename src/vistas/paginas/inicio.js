// VISTA · Portada.
import { negocio } from '../../modelo/negocio.js';
import { url, ic, RUTAS } from '../utilidades.js';
import { botonWa, botonTel, etiqueta, cabeceraSeccion, comparador, imagen, notaIa, tarjetaArea, valores, pasos, calendarioAnual, faq, llamada, asistente, mapa, tarjetaGuia, listaPueblos } from '../componentes.js';

export function vistaInicio({ areas, residencia, mantenimiento, zonas, otrosPueblos, guias, preguntas, pasos: listaPasos, valores: listaValores }) {
  return `<section class="heroe" aria-labelledby="titulo-principal">
  <div class="contenedor heroe__rejilla">
    <div class="heroe__texto">
      ${etiqueta('Alcanar · Amposta · La Ràpita · Montsià')}
      <h1 id="titulo-principal">Limpieza, jardinería y mantenimiento en el Montsià</h1>
      <p class="heroe__entrada">Cuidamos tu casa, tu jardín, tu parcela y tu segunda residencia: limpieza de pisos y viviendas, mantenimiento de jardines, desbroce de terrenos y revisiones cuando no estás.</p>
      <div class="acciones">
        ${botonWa('Presupuesto por WhatsApp', { clase: 'boton--grande' })}
        ${botonTel(negocio.telefonoVisible, 'boton--borde boton--grande')}
      </div>
      <ul class="chips">
        <li>${ic('i-check')} Presupuesto sin compromiso</li>
        <li>${ic('i-casa')} Casa, jardín y parcela</li>
        <li>${ic('i-whatsapp')} Todo por WhatsApp</li>
      </ul>
    </div>
    ${comparador()}
  </div>
</section>

<section class="franja" aria-label="Por qué CleanGreen">
  <div class="contenedor">
    <p class="franja__lema">${negocio.lema}</p>
    ${valores(listaValores)}
  </div>
</section>

<section class="seccion" id="servicios" aria-labelledby="areas-titulo">
  <div class="contenedor">
    ${cabeceraSeccion({ etiqueta: 'Servicios', titulo: 'Todo lo que necesitan tu casa, tu jardín y tu parcela', entradilla: 'Cinco áreas de trabajo que puedes contratar por separado o combinar, con un solo contacto para todo.', id: 'areas-titulo' })}
    <div class="areas">
${areas.map(a => tarjetaArea(a)).join('\n')}
    </div>
  </div>
</section>

<section class="seccion seccion--papel2 area-residencia" aria-labelledby="residencia-titulo">
  <div class="contenedor destacado">
    <div class="destacado__visual" data-revelar>
      ${imagen(residencia.foto, { alt: residencia.fotoAlt, tamanos: '(min-width: 980px) 560px, 100vw' })}${notaIa()}
    </div>
    <div data-revelar>
      ${etiqueta('Segundas residencias', 'i-llave')}
      <h2 id="residencia-titulo">Tu casa, cuidada aunque estés lejos</h2>
      <p class="entradilla">${residencia.parrafos[0]}</p>
      <ul class="lista-check">
${residencia.servicios.map(s => `        <li>${ic('i-check')}<span><strong>${s.nombre}.</strong> ${s.texto}</span></li>`).join('\n')}
      </ul>
      <div class="acciones">
        <a class="boton boton--oscuro" href="${url(RUTAS.area(residencia.id))}">Ver el servicio ${ic('i-flecha')}</a>
        ${botonWa('Consultar por WhatsApp', { mensaje: 'Hola, CleanGreen. Tengo una segunda residencia y quería información.' })}
      </div>
    </div>
  </div>
</section>

<section class="seccion" id="presupuesto" aria-labelledby="presupuesto-titulo">
  <div class="contenedor">
    ${cabeceraSeccion({ etiqueta: 'Presupuesto en un minuto', titulo: 'Prepara tu mensaje y envíalo por WhatsApp', entradilla: 'Marca lo que necesitas y te dejamos el mensaje escrito. Al enviarlo, adjunta 2 o 3 fotos y la ubicación.', id: 'presupuesto-titulo' })}
    ${asistente('inicio')}
  </div>
</section>

<section class="seccion seccion--oscura" id="como-trabajamos" aria-labelledby="pasos-titulo">
  <div class="contenedor">
    ${cabeceraSeccion({ etiqueta: 'Cómo trabajamos', titulo: 'Del primer mensaje al trabajo hecho, en cuatro pasos', id: 'pasos-titulo' })}
    ${pasos(listaPasos)}
  </div>
</section>

<section class="seccion area-mantenimiento" id="todo-el-ano" aria-labelledby="ano-titulo">
  <div class="contenedor ano">
    <div class="ano__texto" data-revelar>
      ${etiqueta('Mantenimiento periódico', 'i-calendario')}
      <h2 id="ano-titulo">Un calendario para todo el año</h2>
      <p class="entradilla">${mantenimiento.parrafos[0]}</p>
      <figure class="ano__ilustracion">${imagen(mantenimiento.foto, { alt: mantenimiento.fotoAlt, tamanos: '(min-width: 600px) 520px, 100vw' })}${notaIa()}</figure>
      <a class="boton boton--oscuro" href="${url(RUTAS.area(mantenimiento.id))}">Ver el mantenimiento ${ic('i-flecha')}</a>
    </div>
    ${calendarioAnual(mantenimiento.calendario)}
  </div>
</section>

<section class="aviso-temporada area-parcela" aria-label="Temporada de incendios">
  <div class="contenedor aviso-temporada__fila">
    ${ic('i-fuego')}
    <p><strong>Del 15 de marzo al 15 de octubre es la época de peligro de incendio.</strong> Si tienes una parcela, mejor desbrozarla antes.</p>
    <a class="enlace-flecha" href="${url(RUTAS.guia('normativa-limpieza-de-parcelas'))}">Qué dice la normativa ${ic('i-flecha')}</a>
  </div>
</section>

<section class="seccion" id="zonas" aria-labelledby="zonas-titulo">
  <div class="contenedor zonas">
    <figure class="mapa" data-revelar>
      ${mapa()}
      <figcaption>Mapa orientativo. Datos: © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">colaboradores de OpenStreetMap</a>.</figcaption>
    </figure>
    <div data-revelar>
      ${etiqueta('Dónde trabajamos', 'i-ubicacion')}
      <h2 id="zonas-titulo">En el Montsià, cerca de tu casa</h2>
      <p class="entradilla">Trabajamos sobre todo en Amposta, Alcanar y Sant Carles de la Ràpita, y también en los alrededores. Si estás en otro pueblo de la comarca, escríbenos y te decimos si podemos ir.</p>
      ${listaPueblos(zonas, otrosPueblos)}
    </div>
  </div>
</section>

<section class="seccion seccion--papel2" aria-labelledby="guias-titulo">
  <div class="contenedor">
    ${cabeceraSeccion({ etiqueta: 'Guías', titulo: 'Información útil para propietarios', entradilla: 'Lo que conviene saber sobre la normativa de las parcelas y sobre cómo cuidar una casa que pasa meses cerrada.', id: 'guias-titulo' })}
    <div class="guias">
${guias.map(g => tarjetaGuia(g)).join('\n')}
    </div>
  </div>
</section>

<section class="seccion seccion--blanca" id="preguntas" aria-labelledby="preguntas-titulo">
  <div class="contenedor faq-rejilla">
    <div data-revelar>
      ${etiqueta('Preguntas frecuentes')}
      <h2 id="preguntas-titulo">Lo que nos preguntan antes de empezar</h2>
      <p class="entradilla">¿Tienes otra duda? Escríbenos por WhatsApp y te contestamos.</p>
      ${botonWa('Preguntar por WhatsApp', { mensaje: 'Hola, CleanGreen. Tengo una duda.' })}
    </div>
    ${faq(preguntas)}
  </div>
</section>

${llamada()}`;
}
