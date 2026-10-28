// VISTAS · Página de servicios (índice de áreas) y página de cada área.
import { negocio } from '../../modelo/negocio.js';
import { url, ic, RUTAS, enlazar } from '../utilidades.js';
import { botonWa, botonTel, etiqueta, cabeceraPagina, cabeceraSeccion, comparador, ilustracion, imagen, notaIa, tarjetaArea, tarjetaServicio, calendarioIncendios, calendarioAnual, faq, llamada, tarjetaGuia } from '../componentes.js';

// --------------------------------------------------------- Índice de servicios
export function vistaServicios({ areas }) {
  return cabeceraPagina({
    migas: [['Inicio', ''], ['Servicios']],
    etiqueta: 'Servicios',
    h1: 'Servicios de limpieza, jardinería y mantenimiento',
    entradilla: 'Cinco áreas de trabajo para tu casa, tu jardín, tu parcela y tu segunda residencia en el Montsià. Puedes contratarlas por separado o combinarlas.',
    acciones: botonWa('Pedir presupuesto', { clase: 'boton--grande' }) + botonTel(negocio.telefonoVisible, 'boton--borde boton--grande'),
  }) + `
<section class="seccion" aria-label="Áreas de servicio">
  <div class="contenedor">
    <nav class="indice" aria-label="Ir a un área">
      <ul>
${areas.map(a => `        <li class="area-${a.clave}"><a href="#${a.id}">${ic(a.icono)} ${a.nombre}</a></li>`).join('\n')}
      </ul>
    </nav>
${areas.map(a => `    <section class="bloque-area area-${a.clave}" id="${a.id}" aria-labelledby="t-${a.id}" data-revelar>
      <div class="bloque-area__cabecera">
        <div class="bloque-area__foto">${imagen(a.foto, { tamanos: '(min-width: 760px) 440px, 100vw' })}${notaIa()}</div>
        <div>
          <span class="bloque-area__icono">${ic(a.icono)}</span>
          <h2 id="t-${a.id}">${a.nombre}</h2>
          <p>${a.entradilla}</p>
          <a class="boton boton--area" href="${url(RUTAS.area(a.id))}">Ver ${a.corto.toLowerCase()} ${ic('i-flecha')}</a>
        </div>
      </div>
      <ul class="bloque-area__servicios">
${a.servicios.map(s => `        <li><a href="${url(RUTAS.area(a.id))}#${s.id}">${ic(s.icono || 'i-check')}<span><strong>${s.nombre}</strong>${s.texto}</span></a></li>`).join('\n')}
      </ul>
    </section>`).join('\n')}
  </div>
</section>

<section class="seccion seccion--papel2" aria-labelledby="precio-titulo">
  <div class="contenedor">
    ${cabeceraSeccion({ etiqueta: 'Precio', icono: 'i-presupuesto', titulo: '¿Qué influye en el presupuesto?', entradilla: 'No damos precios a ciegas. Estas son las cosas que miramos para calcularlo.', id: 'precio-titulo' })}
    <ul class="factores">
      <li data-revelar><strong>El tamaño</strong><span>Los metros de la vivienda, del jardín o de la parcela.</span></li>
      <li data-revelar><strong>El estado</strong><span>No es lo mismo un repaso que recuperar algo que lleva tiempo sin cuidarse.</span></li>
      <li data-revelar><strong>El tipo de trabajo</strong><span>Una limpieza general, una a fondo, un desbroce con zarzas o una poda.</span></li>
      <li data-revelar><strong>El acceso</strong><span>Si se puede llegar con vehículo, escaleras, pendientes o bancales.</span></li>
      <li data-revelar><strong>Los restos</strong><span>Si hay que retirarlos y cuánto volumen hay.</span></li>
      <li data-revelar><strong>La frecuencia</strong><span>Un mantenimiento periódico sale más a cuenta que esperar a que todo se descontrole.</span></li>
    </ul>
  </div>
</section>

${llamada()}`;
}

// ------------------------------------------------------------ Página de un área
export function vistaArea({ area, relacionadas, guia, zonas }) {
  const mensaje = `Hola, CleanGreen. Quiero pedir presupuesto de ${area.nombre.toLowerCase()}.`;
  const visual = area.comparador ? comparador() : ilustracion(area.foto, area.fotoAlt, { prioridad: true });
  let extra = '';

  if (area.clave === 'parcela') {
    extra = `<section class="seccion seccion--papel2" aria-labelledby="temporada-titulo">
  <div class="contenedor temporada">
    <div data-revelar>
      ${etiqueta('Temporada de incendios', 'i-fuego')}
      <h2 id="temporada-titulo">Antes del verano, la parcela limpia</h2>
      <p class="entradilla">En Cataluña, del 15 de marzo al 15 de octubre es la época de más riesgo de incendio forestal. Una parcela con hierba seca y zarzas es combustible, y en muchos casos tenerla limpia es una obligación del propietario.</p>
      <a class="enlace-flecha" href="${url(RUTAS.guia('normativa-limpieza-de-parcelas'))}">Lee la guía de normativa ${ic('i-flecha')}</a>
    </div>
    ${calendarioIncendios()}
  </div>
</section>`;
  }
  if (area.clave === 'mantenimiento') {
    extra = `<section class="seccion seccion--papel2" aria-labelledby="frecuencia-titulo">
  <div class="contenedor">
    ${cabeceraSeccion({ etiqueta: 'Frecuencia', icono: 'i-calendario', titulo: 'Elige cada cuánto pasamos', entradilla: 'La frecuencia se puede cambiar durante el año: en primavera la vegetación crece más y en invierno menos.', id: 'frecuencia-titulo' })}
    <ul class="frecuencias">
${area.frecuencias.map(([t, d]) => `      <li data-revelar><strong>${t}</strong><span>${d}</span></li>`).join('\n')}
    </ul>
  </div>
</section>
<section class="seccion" aria-labelledby="calendario-titulo">
  <div class="contenedor">
    ${cabeceraSeccion({ etiqueta: 'Calendario', icono: 'i-calendario', titulo: 'Qué hacemos en cada época del año', id: 'calendario-titulo' })}
    ${calendarioAnual(area.calendario)}
  </div>
</section>`;
  }

  const cuerpo = cabeceraPagina({
    migas: [['Inicio', ''], ['Servicios', RUTAS.servicios], [area.nombre]],
    etiqueta: area.nombre,
    icono: area.icono,
    h1: area.h1,
    entradilla: area.entradilla,
    acciones: botonWa('Presupuesto por WhatsApp', { mensaje, clase: 'boton--grande' }) + `<a class="boton boton--borde boton--grande" href="${url(RUTAS.contacto)}?servicio=${area.clave}">${ic('i-presupuesto')} Preparar el mensaje</a>`,
    visual,
    area: area.clave,
  }) + `
<section class="seccion area-${area.clave}" aria-labelledby="servicios-titulo">
  <div class="contenedor">
    <div class="intro-area" data-revelar>
${area.parrafos.map(p => `      <p>${enlazar(p)}</p>`).join('\n')}
    </div>
    <h2 id="servicios-titulo" class="titulo-bloque">Qué hacemos</h2>
    <div class="servicios">
${area.servicios.map(s => tarjetaServicio(s, { enlace: s.area ? url(RUTAS.area(s.area)) : '' })).join('\n')}
    </div>
    <p class="nota-incluye">${ic('i-presupuesto')} Lo que incluye cada trabajo lo dejamos concretado en el presupuesto.</p>
  </div>
</section>

${extra}

<section class="seccion seccion--blanca" aria-labelledby="preguntas-titulo">
  <div class="contenedor faq-rejilla">
    <div>
      ${etiqueta('Preguntas frecuentes')}
      <h2 id="preguntas-titulo">Dudas sobre ${area.corto.toLowerCase()}</h2>
      <p class="entradilla">Trabajamos en ${zonas.map(z => `<a href="${url(RUTAS.zona(z.id))}">${z.nombreLargo || z.nombre}</a>`).join(', ').replace(/, ([^,]*)$/, ' y $1')}, y también en los alrededores.</p>
    </div>
    ${faq(area.preguntas)}
  </div>
</section>

<section class="seccion" aria-labelledby="relacionadas-titulo">
  <div class="contenedor">
    <h2 id="relacionadas-titulo" class="titulo-bloque">También te puede interesar</h2>
    <div class="relacionadas">
${relacionadas.map(a => tarjetaArea(a, { titulo: 'h3' })).join('\n')}
${guia ? tarjetaGuia(guia) : ''}
    </div>
  </div>
</section>

${llamada({ titulo: `¿Hablamos de tu ${area.clave === 'hogar' ? 'casa' : area.clave === 'jardin' ? 'jardín' : area.clave === 'parcela' ? 'parcela' : area.clave === 'residencia' ? 'segunda residencia' : 'mantenimiento'}?`, mensaje })}`;
  return cuerpo;
}
