// MODELO · Datos del negocio y del sitio.
// Es la única fuente de verdad: si cambia el teléfono o el dominio, se cambia
// aquí y se vuelve a construir la web con `npm run build`.

export const negocio = {
  nombre: 'CleanGreen',
  nombreComercial: 'Clean & Green Servicios',
  lema: 'Seriedad, limpieza y buen trabajo.',
  descripcion:
    'Limpieza de casas y pisos, jardinería, desbroce de parcelas, mantenimiento y cuidado de segundas residencias en Amposta, Alcanar, Sant Carles de la Ràpita y alrededores.',
  // Número FICTICIO provisional (el mismo que la web de CleanGreen): cámbialo
  // por el real antes de dar la web a conocer (ver README).
  telefono: '+34600123456',
  telefonoVisible: '600 12 34 56',
  whatsapp: '34600123456',
  comarca: 'Montsià',
  zonasPrincipales: ['Amposta', 'Alcanar', 'Sant Carles de la Ràpita'],
  // Dominio previsto. Mientras no esté comprado, la web se publica con la URL de
  // GitHub Pages (el flujo de publicación la pasa en SITIO_URL) o la de Vercel.
  dominio: 'https://cleangreenmontsia.es/',
};

// En Vercel, el dominio de producción del proyecto: el *.vercel.app y, cuando se
// añada en Vercel, el dominio propio. Vercel lo da sin «https://».
const enVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/`;

export const sitio = {
  // URL absoluta para canonical, Open Graph, sitemap y datos estructurados.
  url: process.env.SITIO_URL || enVercel || negocio.dominio,
  // Prefijo de las rutas internas: «/» con dominio propio,
  // «/cleangreenmontsia.es/» si se publica en riuko97.github.io/cleangreenmontsia.es/.
  base: process.env.BASE_PATH || '/',
  idioma: 'es-ES',
  actualizado: '2026-10-28',
};

export const mensajes = {
  whatsapp: 'Hola, CleanGreen. Quiero pedir presupuesto.',
};
