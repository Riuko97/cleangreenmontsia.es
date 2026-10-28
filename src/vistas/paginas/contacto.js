// VISTAS · Contacto, páginas legales y página de error.
import { negocio } from '../../modelo/negocio.js';
import { url, ic, RUTAS } from '../utilidades.js';
import { botonWa, botonTel, etiqueta, cabeceraPagina, cabeceraSeccion, asistente, migas, imagen, notaIa } from '../componentes.js';

export function vistaContacto() {
  return cabeceraPagina({
    migas: [['Inicio', ''], ['Contacto']],
    etiqueta: 'Contacto', icono: 'i-whatsapp', fondo: 'contacto',
    h1: 'Pide presupuesto sin compromiso',
    entradilla: 'La forma más rápida es WhatsApp: prepara el mensaje aquí abajo, envíalo y adjunta 2 o 3 fotos y la ubicación. También puedes llamarnos.',
    acciones: botonWa('Abrir WhatsApp', { clase: 'boton--grande' }) + botonTel(negocio.telefonoVisible, 'boton--borde boton--grande'),
  }) + `
<section class="seccion" aria-labelledby="asistente-titulo">
  <div class="contenedor">
    <h2 id="asistente-titulo" class="visualmente-oculto">Preparar el mensaje</h2>
    ${asistente('contacto')}
  </div>
</section>

<section class="seccion seccion--papel2" aria-labelledby="fotos-titulo">
  <div class="contenedor">
    ${cabeceraSeccion({ etiqueta: 'Consejo', icono: 'i-camara', titulo: '¿Qué fotos nos mandas?', entradilla: 'Con unas pocas fotos nos hacemos una idea bastante buena del trabajo.', id: 'fotos-titulo' })}
    <ul class="factores">
      <li class="area-hogar" data-revelar><strong>${ic('i-casa')} Para limpiar una vivienda</strong><span>La cocina, un baño y la estancia más grande. Si es un final de obra, la zona con más polvo.</span></li>
      <li class="area-jardin" data-revelar><strong>${ic('i-hoja')} Para el jardín</strong><span>Una vista general y los setos o árboles que haya que podar.</span></li>
      <li class="area-parcela" data-revelar><strong>${ic('i-desbroce')} Para una parcela</strong><span>Una vista general desde una esquina, la zona más complicada y el acceso.</span></li>
    </ul>
    <p class="consejo-ubicacion">${ic('i-ubicacion')}<span>Y la <strong>ubicación</strong>: en WhatsApp, pulsa el clip y elige «Ubicación», o mándanos la dirección.</span></p>
  </div>
</section>`;
}

export function vistaLegal({ legal }) {
  return `<div class="legal">
  <div class="contenedor contenedor--estrecho">
    ${migas([['Inicio', ''], [legal.titulo]])}
    <h1>${legal.titulo}</h1>
    <div class="prosa">
${legal.html}
    </div>
  </div>
</div>`;
}

export function vistaError() {
  return `<div class="no-encontrada">
  <div class="contenedor contenedor--estrecho">
    <div class="ilustracion-404">${imagen('parcela-despues', { tamanos: '420px' })}${imagen('parcela-antes', { clase: 'ilustracion-404__antes', tamanos: '420px' })}${notaIa()}</div>
    ${etiqueta('Error 404')}
    <h1>Esta página se la ha comido la maleza</h1>
    <p class="entradilla">No encontramos lo que buscas. Puede que el enlace esté mal o que la página ya no exista.</p>
    <div class="acciones acciones--centro">
      <a class="boton boton--oscuro" href="${url('')}">Volver al inicio</a>
      <a class="boton boton--borde" href="${url(RUTAS.servicios)}">${ic('i-casa')} Ver los servicios</a>
      ${botonWa('Escríbenos')}
    </div>
  </div>
</div>`;
}
