// VISTA del asistente de presupuesto: lee el formulario, enseña u oculta los
// apartados y pinta la vista previa del mensaje. No decide nada.
const MULTIPLES = ['limpieza', 'jardin', 'residencia'];
const SIMPLES = ['lugar', 'detalle', 'vivienda', 'tamano', 'estado', 'restos', 'frecuencia', 'plazo', 'nombre', 'comentario'];

export class PresupuestoVista {
  constructor(formulario) {
    this.formulario = formulario;
    this.burbuja = formulario.querySelector('[data-burbuja]');
    this.secciones = [...formulario.querySelectorAll('[data-seccion]')];
  }

  leer() {
    const f = new FormData(this.formulario);
    const datos = {
      servicios: [...this.formulario.querySelectorAll('input[name="servicio"]:checked')]
        .map(c => ({ valor: c.value, seccion: c.dataset.seccionActiva })),
    };
    for (const n of MULTIPLES) datos[n] = f.getAll(n).map(String);
    for (const n of SIMPLES) datos[n] = String(f.get(n) ?? '').trim();
    return datos;
  }

  mostrarSecciones(activas) {
    for (const s of this.secciones) s.hidden = !activas.has(s.dataset.seccion);
  }

  pintarMensaje(texto) {
    if (this.burbuja) this.burbuja.textContent = texto;
  }

  marcarServicio(seccion) {
    const casilla = this.formulario.querySelector(`input[name="servicio"][data-seccion-activa="${CSS.escape(seccion)}"]`);
    if (casilla) casilla.checked = true;
    return Boolean(casilla);
  }

  alCambiar(fn) {
    this.formulario.addEventListener('input', fn);
    this.formulario.addEventListener('change', fn);
  }

  alEnviar(fn) {
    this.formulario.addEventListener('submit', e => { e.preventDefault(); fn(); });
  }
}
