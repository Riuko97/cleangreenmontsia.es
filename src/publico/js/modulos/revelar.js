// Aparición suave de los bloques al entrar en pantalla.
export function iniciarRevelar() {
  const elementos = document.querySelectorAll('[data-revelar]');
  if (!('IntersectionObserver' in window)) {
    elementos.forEach(el => el.classList.add('visible'));
    return;
  }
  const observador = new IntersectionObserver(entradas => {
    for (const e of entradas) {
      if (e.isIntersecting) { e.target.classList.add('visible'); observador.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  elementos.forEach(el => observador.observe(el));
}
