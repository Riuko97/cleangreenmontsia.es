// VISTAS · Utilidades comunes a todas las plantillas.
import { negocio, sitio, mensajes } from '../modelo/negocio.js';

// Ruta interna con el prefijo de publicación (BASE_PATH).
export const url = (ruta = '') => sitio.base + String(ruta).replace(/^\//, '');
// URL absoluta (canonical, Open Graph, datos estructurados).
export const absoluta = (ruta = '') => sitio.url + String(ruta).replace(/^\//, '');

export const RUTAS = {
  inicio: '',
  servicios: 'servicios/',
  area: id => `servicios/${id}/`,
  zonas: 'zonas/',
  zona: id => `zonas/${id}/`,
  guias: 'guias/',
  guia: id => `guias/${id}/`,
  contacto: 'contacto/',
  legal: id => `${id}/`,
};

export const wa = (texto = mensajes.whatsapp) => `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(texto)}`;
export const tel = () => `tel:${negocio.telefono}`;
// Texto de los enlaces de llamada sin saltos de línea dentro del número.
export const sinCortes = t => t.replace(/ /g, '&nbsp;');

export const ic = (id, clase = '') => `<svg class="icono${clase ? ' ' + clase : ''}" aria-hidden="true" focusable="false"><use href="${url('img/iconos.svg')}#${id}"></use></svg>`;

export const esc = s => String(s).replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const sinEtiquetas = s => String(s).replace(/<[^>]+>/g, '');

// Une una lista en castellano: «a, b y c».
export const unir = (lista, conjuncion = 'y') => lista.length < 2 ? lista.join('') : `${lista.slice(0, -1).join(', ')} ${conjuncion} ${lista[lista.length - 1]}`;

// Sustituye los enlaces simbólicos del modelo ({{area:id}}, {{guia:id}}, {{zona:id}}) por rutas reales.
export const enlazar = html => String(html).replace(/\{\{(area|guia|zona):([a-z0-9-]+)\}\}/g, (_, tipo, id) => url(RUTAS[tipo](id)));
