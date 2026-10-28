// Sombra de la cabecera fija en cuanto la página se desplaza (figura-fondo).
export function iniciarCabecera() {
  const cabecera = document.querySelector('.cabecera');
  if (!cabecera) return;
  let pendiente = false;
  const actualizar = () => { cabecera.classList.toggle('con-sombra', window.scrollY > 8); pendiente = false; };
  window.addEventListener('scroll', () => {
    if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); }
  }, { passive: true });
  actualizar();
}
