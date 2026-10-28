// MODELO del asistente de presupuesto: guarda lo que ha marcado la persona y
// compone el mensaje de WhatsApp. No sabe nada del HTML.
export class PresupuestoModelo {
  constructor({ numero, saludo }) {
    this.numero = numero;
    this.saludo = saludo;
    this.datos = { servicios: [] };
  }

  // datos.servicios: [{ valor: 'Jardinería', seccion: 'jardin' }, …]
  actualizar(datos) {
    this.datos = { servicios: [], ...datos };
  }

  // Apartados del formulario que tienen sentido según los servicios marcados.
  seccionesActivas() {
    return new Set(this.datos.servicios.map(s => s.seccion).filter(Boolean));
  }

  mensaje() {
    const d = this.datos;
    const activas = this.seccionesActivas();
    const lista = v => (Array.isArray(v) ? v : [v]).filter(Boolean).join(', ');
    const unir = (...partes) => partes.filter(Boolean).join(' · ');
    const lineas = [];
    const linea = (etiqueta, valor) => { if (valor) lineas.push(`• ${etiqueta}: ${valor}`); };

    linea('Servicio', lista(d.servicios.map(s => s.valor)));
    linea('Lugar', unir(d.lugar, d.detalle));
    if (activas.has('hogar')) {
      linea('Vivienda', d.vivienda);
      linea('Limpieza', lista(d.limpieza));
    }
    if (activas.has('jardin')) linea('Jardín', lista(d.jardin));
    if (activas.has('parcela')) {
      linea('Parcela', unir(d.tamano, d.estado));
      linea('Restos', d.restos);
    }
    if (activas.has('residencia')) linea('Segunda residencia', lista(d.residencia));
    linea('Frecuencia', d.frecuencia);
    linea('Para cuándo', d.plazo);
    linea('Comentario', d.comentario);

    const texto = [this.saludo, ...lineas, '', 'Os envío fotos y la ubicación.'];
    if (d.nombre) texto.push(d.nombre);
    return texto.join('\n');
  }

  enlace() {
    return `https://wa.me/${this.numero}?text=${encodeURIComponent(this.mensaje())}`;
  }
}
