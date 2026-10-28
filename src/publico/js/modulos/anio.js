// Año actual en el pie (el HTML ya trae el año de construcción por si no hay JS).
export function iniciarAnio() {
  const anio = String(new Date().getFullYear());
  document.querySelectorAll('[data-anio]').forEach(el => { el.textContent = anio; });
}
