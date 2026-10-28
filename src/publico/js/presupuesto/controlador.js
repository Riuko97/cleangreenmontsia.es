// CONTROLADOR del asistente de presupuesto: conecta el modelo con la vista.
import { PresupuestoModelo } from './modelo.js';
import { PresupuestoVista } from './vista.js';

const SERVICIOS = ['hogar', 'jardin', 'parcela', 'residencia', 'mantenimiento', 'otro'];

export function iniciarPresupuestos() {
  document.querySelectorAll('form[data-presupuesto]').forEach(iniciar);
}

function iniciar(formulario) {
  const modelo = new PresupuestoModelo({ numero: formulario.dataset.whatsapp, saludo: formulario.dataset.saludo });
  const vista = new PresupuestoVista(formulario);

  const actualizar = () => {
    modelo.actualizar(vista.leer());
    vista.mostrarSecciones(modelo.seccionesActivas());
    vista.pintarMensaje(modelo.mensaje());
  };

  // ?servicio=jardin preselecciona el servicio (enlaces desde cada área).
  const pedido = new URLSearchParams(location.search).get('servicio');
  if (pedido && SERVICIOS.includes(pedido)) vista.marcarServicio(pedido);

  vista.alCambiar(actualizar);
  vista.alEnviar(() => {
    actualizar();
    const url = modelo.enlace();
    const ventana = window.open(url, '_blank');
    if (!ventana) location.href = url;
  });
  actualizar();
}
