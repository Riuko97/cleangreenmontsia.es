// Punto de entrada del JavaScript del navegador (módulo ES).
// La web funciona sin JavaScript: estos módulos solo añaden comodidad.
import { iniciarMenu } from './modulos/menu.js';
import { iniciarCabecera } from './modulos/cabecera.js';
import { iniciarComparadores } from './modulos/comparador.js';
import { iniciarRevelar } from './modulos/revelar.js';
import { iniciarAnio } from './modulos/anio.js';
import { iniciarPresupuestos } from './presupuesto/controlador.js';

for (const iniciar of [iniciarMenu, iniciarCabecera, iniciarComparadores, iniciarRevelar, iniciarAnio, iniciarPresupuestos]) {
  try { iniciar(); } catch (e) { console.warn('CleanGreen:', e); }
}
