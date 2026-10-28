// CONTROLADOR · Tabla de rutas: para cada URL decide qué datos del modelo
// necesita, qué vista los pinta y con qué metadatos SEO se publica.
import { negocio } from '../modelo/negocio.js';
import { AREAS, areaPorId } from '../modelo/servicios.js';
import { ZONAS, OTROS_PUEBLOS } from '../modelo/zonas.js';
import { GUIAS } from '../modelo/guias.js';
import { PREGUNTAS_GENERALES, PASOS, VALORES } from '../modelo/preguntas.js';
import { LEGALES } from '../modelo/legal.js';
import { RUTAS } from '../vistas/utilidades.js';
import { vistaInicio } from '../vistas/paginas/inicio.js';
import { vistaServicios, vistaArea } from '../vistas/paginas/servicios.js';
import { vistaZonas, vistaZona } from '../vistas/paginas/zonas.js';
import { vistaGuias, vistaGuia } from '../vistas/paginas/guias.js';
import { vistaContacto, vistaLegal, vistaError } from '../vistas/paginas/contacto.js';
import * as seo from './seo.js';

const marca = t => `${t} | ${negocio.nombre}`;
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const fechaLegible = iso => { const [a, m, d] = iso.split('-').map(Number); return `${d} de ${MESES[m - 1]} de ${a}`; };
const guiasConArea = () => GUIAS.map(g => ({ ...g, claveArea: areaPorId(g.area).clave }));

export function rutas() {
  const r = [];

  // Portada
  r.push({
    ruta: RUTAS.inicio, prioridad: '1.0',
    meta: {
      titulo: marca('Limpieza, jardinería y mantenimiento'),
      descripcion: 'Limpieza de casas y pisos, jardinería, desbroce de parcelas y cuidado de segundas residencias en Alcanar, Amposta y La Ràpita. Presupuesto sin compromiso.',
      imagen: 'img/og/inicio.jpg',
    },
    cuerpo: () => vistaInicio({
      areas: AREAS, residencia: areaPorId('segundas-residencias'), mantenimiento: areaPorId('mantenimiento-periodico'),
      zonas: ZONAS, otrosPueblos: OTROS_PUEBLOS, guias: guiasConArea(), preguntas: PREGUNTAS_GENERALES, pasos: PASOS, valores: VALORES,
    }),
    jsonld: m => [seo.negocioLD(), seo.webLD(), seo.paginaLD({ ruta: '', titulo: m.titulo, descripcion: m.descripcion, conMigas: false, imagen: m.imagen }), seo.faqLD('', PREGUNTAS_GENERALES)],
  });

  // Servicios
  r.push({
    ruta: RUTAS.servicios, prioridad: '0.9',
    meta: {
      titulo: marca('Servicios para casa, jardín y parcela'),
      descripcion: 'Limpieza de casas y pisos, jardinería, desbroce de parcelas, cuidado de segundas residencias y mantenimiento periódico en el Montsià. Presupuesto sin compromiso.',
    },
    cuerpo: () => vistaServicios({ areas: AREAS }),
    jsonld: m => [seo.negocioLD(), seo.paginaLD({ ruta: RUTAS.servicios, titulo: m.titulo, descripcion: m.descripcion, tipo: 'CollectionPage' }),
      seo.migasLD(RUTAS.servicios, [['Inicio', ''], ['Servicios', RUTAS.servicios]]),
      seo.listaLD(RUTAS.servicios, AREAS.map(a => [a.nombre, RUTAS.area(a.id)]))],
  });

  for (const area of AREAS) {
    const ruta = RUTAS.area(area.id);
    r.push({
      ruta, prioridad: '0.9',
      meta: { titulo: marca(area.titulo), descripcion: area.descripcion, imagen: `img/og/${area.clave}.jpg`, imagenAlt: area.ilustracionAlt },
      cuerpo: () => vistaArea({
        area,
        relacionadas: area.relacionadas.map(areaPorId),
        guia: area.guia ? guiasConArea().find(g => g.id === area.guia) : null,
        zonas: ZONAS,
      }),
      jsonld: m => [seo.negocioLD(), seo.paginaLD({ ruta, titulo: m.titulo, descripcion: m.descripcion, imagen: m.imagen }),
        seo.migasLD(ruta, [['Inicio', ''], ['Servicios', RUTAS.servicios], [area.nombre, ruta]]),
        seo.servicioLD(area), seo.faqLD(ruta, area.preguntas)],
    });
  }

  // Zonas
  r.push({
    ruta: RUTAS.zonas, prioridad: '0.7',
    meta: { titulo: marca('Zonas de trabajo en el Montsià'), descripcion: 'Trabajamos en Amposta, Alcanar y Sant Carles de la Ràpita y en los alrededores: limpieza, jardinería, desbroce y cuidado de segundas residencias.' },
    cuerpo: () => vistaZonas({ zonas: ZONAS, otrosPueblos: OTROS_PUEBLOS }),
    jsonld: m => [seo.negocioLD(), seo.paginaLD({ ruta: RUTAS.zonas, titulo: m.titulo, descripcion: m.descripcion, tipo: 'CollectionPage' }),
      seo.migasLD(RUTAS.zonas, [['Inicio', ''], ['Zonas', RUTAS.zonas]]),
      seo.listaLD(RUTAS.zonas, ZONAS.map(z => [z.nombreLargo || z.nombre, RUTAS.zona(z.id)]))],
  });
  for (const zona of ZONAS) {
    const ruta = RUTAS.zona(zona.id);
    r.push({
      ruta, prioridad: '0.8',
      meta: { titulo: marca(zona.titulo), descripcion: zona.descripcion },
      cuerpo: () => vistaZona({ zona, destacadas: zona.destacadas.map(areaPorId), otras: ZONAS.filter(z => z.id !== zona.id) }),
      jsonld: m => [seo.negocioLD(), seo.paginaLD({ ruta, titulo: m.titulo, descripcion: m.descripcion }),
        seo.migasLD(ruta, [['Inicio', ''], ['Zonas', RUTAS.zonas], [zona.nombre, ruta]]),
        ...zona.destacadas.map(id => ({ ...seo.servicioLD(areaPorId(id), { zona: zona.nombreLargo || zona.nombre }), '@id': seo.servicioLD(areaPorId(id))['@id'].replace('#servicio', `#servicio-${zona.id}`) })),
        seo.faqLD(ruta, zona.preguntas)],
    });
  }

  // Guías
  r.push({
    ruta: RUTAS.guias, prioridad: '0.6',
    meta: { titulo: marca('Guías para propietarios'), descripcion: 'Guías prácticas con fuentes: normativa de limpieza de parcelas e incendios en Cataluña y cómo cerrar y abrir una segunda residencia.' },
    cuerpo: () => vistaGuias({ guias: guiasConArea() }),
    jsonld: m => [seo.negocioLD(), seo.paginaLD({ ruta: RUTAS.guias, titulo: m.titulo, descripcion: m.descripcion, tipo: 'CollectionPage' }),
      seo.migasLD(RUTAS.guias, [['Inicio', ''], ['Guías', RUTAS.guias]]),
      seo.listaLD(RUTAS.guias, GUIAS.map(g => [g.titulo, RUTAS.guia(g.id)]))],
  });
  for (const guia of GUIAS) {
    const ruta = RUTAS.guia(guia.id);
    const area = areaPorId(guia.area);
    r.push({
      ruta, prioridad: '0.7',
      meta: { titulo: marca(guia.tituloSEO || guia.titulo), descripcion: guia.descripcion, imagen: `img/og/${area.clave}.jpg`, tipoOG: 'article' },
      cuerpo: () => vistaGuia({ guia, area, fechaLegible: fechaLegible(guia.fecha) }),
      jsonld: m => [seo.negocioLD(), seo.paginaLD({ ruta, titulo: m.titulo, descripcion: m.descripcion, imagen: m.imagen }),
        seo.migasLD(ruta, [['Inicio', ''], ['Guías', RUTAS.guias], [guia.titulo, ruta]]),
        seo.articuloLD(guia, ruta), guia.preguntas.length ? seo.faqLD(ruta, guia.preguntas) : null],
    });
  }

  // Contacto
  r.push({
    ruta: RUTAS.contacto, prioridad: '0.8',
    meta: { titulo: marca('Pide presupuesto sin compromiso'), descripcion: 'Prepara tu mensaje y envíalo por WhatsApp con fotos y ubicación, o llámanos. Presupuesto sin compromiso en Amposta, Alcanar, La Ràpita y alrededores.' },
    cuerpo: () => vistaContacto(),
    jsonld: m => [seo.negocioLD(), seo.paginaLD({ ruta: RUTAS.contacto, titulo: m.titulo, descripcion: m.descripcion, tipo: 'ContactPage' }),
      seo.migasLD(RUTAS.contacto, [['Inicio', ''], ['Contacto', RUTAS.contacto]])],
  });

  // Legales (no indexables)
  for (const legal of LEGALES) {
    r.push({
      ruta: RUTAS.legal(legal.id),
      meta: { titulo: marca(legal.titulo), descripcion: `${legal.titulo} de la web de ${negocio.nombre}, servicios de limpieza, jardinería y mantenimiento en el Montsià.`, indexar: false },
      cuerpo: () => vistaLegal({ legal }),
    });
  }

  // Página de error
  r.push({
    ruta: '404.html', archivo: '404.html',
    meta: { titulo: marca('Página no encontrada'), descripcion: 'La página que buscas no existe. Vuelve al inicio o consulta nuestros servicios de limpieza, jardinería y mantenimiento.', indexar: false },
    cuerpo: () => vistaError(),
  });

  // Datos estructurados: un único grafo por página.
  for (const p of r) p.meta.jsonld = p.jsonld ? seo.grafo(p.jsonld(p.meta)) : null;
  return r;
}
