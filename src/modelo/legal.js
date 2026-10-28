// MODELO · Textos legales. Los huecos [entre corchetes] los tiene que rellenar el titular.
import { negocio } from './negocio.js';

const P = t => `<span class="pendiente">[${t}]</span>`;

export const LEGALES = [
  {
    id: 'aviso-legal',
    titulo: 'Aviso legal',
    html: `
      <p>En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), estos son los datos del titular de esta web.</p>
      <table>
        <tbody>
          <tr><th scope="row">Titular</th><td>${P('Nombre y apellidos o razón social')}</td></tr>
          <tr><th scope="row">Nombre comercial</th><td>${negocio.nombre} · ${negocio.nombreComercial.replace('&', '&amp;')}</td></tr>
          <tr><th scope="row">NIF</th><td>${P('NIF')}</td></tr>
          <tr><th scope="row">Domicilio</th><td>${P('Dirección completa')}</td></tr>
          <tr><th scope="row">Teléfono y WhatsApp</th><td>${negocio.telefonoVisible}</td></tr>
          <tr><th scope="row">Correo electrónico</th><td>${P('Correo de contacto')}</td></tr>
        </tbody>
      </table>
      <h2>Objeto</h2>
      <p>Esta web informa sobre los servicios de limpieza de viviendas, jardinería, desbroce y limpieza de parcelas, cuidado de segundas residencias y mantenimiento que ofrece el titular en la comarca del Montsià y alrededores, y facilita el contacto por teléfono y WhatsApp.</p>
      <h2>Condiciones de uso</h2>
      <p>El uso de la web es gratuito y no requiere registro. Quien la visita se compromete a hacer un uso correcto de ella y de sus contenidos.</p>
      <h2>Información orientativa</h2>
      <p>Las guías tienen carácter informativo y no constituyen asesoramiento jurídico. Los precios y condiciones de cada trabajo se fijan en el presupuesto correspondiente.</p>
      <h2>Propiedad intelectual</h2>
      <p>Los textos, las imágenes, el logotipo y el diseño de esta web pertenecen a su titular o se usan con licencia. Las fotografías de los servicios y los fondos de las cabeceras son imágenes ilustrativas generadas con inteligencia artificial: no muestran trabajos reales ni a personas del equipo. Las tipografías Playfair Display y Figtree se distribuyen con licencia SIL Open Font License. Los datos del mapa proceden de OpenStreetMap (© colaboradores de OpenStreetMap, licencia ODbL).</p>
      <h2>Enlaces externos</h2>
      <p>La web enlaza a páginas de terceros, como WhatsApp o fuentes oficiales. El titular no se hace responsable de su contenido.</p>
      <h2>Legislación aplicable</h2>
      <p>Estas condiciones se rigen por la legislación española.</p>`,
  },
  {
    id: 'privacidad',
    titulo: 'Política de privacidad',
    html: `
      <p>Aquí te explicamos qué datos personales tratamos y para qué, de acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).</p>
      <h2>Responsable</h2>
      <p>${P('Nombre y apellidos o razón social')}, con NIF ${P('NIF')}, domicilio en ${P('Dirección completa')} y correo ${P('Correo de contacto')}.</p>
      <h2>Esta web no recoge datos por sí misma</h2>
      <p>La web no tiene formularios que envíen datos a un servidor, no usa cookies ni herramientas de analítica y carga sus tipografías desde el propio sitio. El asistente de presupuesto solo prepara un texto en tu navegador: no se guarda ni se envía a ningún sitio hasta que tú decides mandarlo desde WhatsApp.</p>
      <p>La web está alojada en GitHub Pages (GitHub, Inc.), que puede registrar datos técnicos de las visitas, como la dirección IP, por motivos de seguridad.</p>
      <h2>Datos que nos das al contactar</h2>
      <p>Cuando nos escribes por WhatsApp o nos llamas, tratamos tu nombre, tu teléfono, la ubicación y las fotos de la vivienda, el jardín o la parcela y lo que nos cuentes.</p>
      <ul>
        <li><strong>Finalidad:</strong> responder a tu consulta, preparar el presupuesto y, si lo aceptas, organizar y facturar el trabajo.</li>
        <li><strong>Base legal:</strong> la aplicación de medidas precontractuales a petición tuya y, si hay encargo, la ejecución del contrato (art. 6.1.b RGPD), además del cumplimiento de obligaciones legales, como las fiscales.</li>
        <li><strong>Conservación:</strong> el tiempo necesario para atender la consulta y, si hay encargo, durante los plazos legales.</li>
        <li><strong>Destinatarios:</strong> no cedemos tus datos a terceros salvo obligación legal. Si usas WhatsApp, el servicio lo presta WhatsApp Ireland Limited según sus propias condiciones.</li>
      </ul>
      <h2>Tus derechos</h2>
      <p>Puedes pedir el acceso, la rectificación, la supresión, la oposición, la limitación del tratamiento y la portabilidad de tus datos escribiendo a ${P('Correo de contacto')}. Si crees que no hemos atendido bien tu petición, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>).</p>`,
  },
  {
    id: 'cookies',
    titulo: 'Política de cookies',
    html: `
      <p><strong>Esta web no usa cookies.</strong> Tampoco usa herramientas de analítica, publicidad ni contenidos de terceros que las instalen, así que no te mostramos ningún aviso para aceptarlas.</p>
      <p>Al pulsar un enlace de WhatsApp sales de esta web y pasas a un servicio de WhatsApp Ireland Limited, que tiene su propia política de cookies.</p>
      <p>Si algún día añadimos un servicio que use cookies, actualizaremos esta página y te pediremos el consentimiento cuando haga falta.</p>`,
  },
];
