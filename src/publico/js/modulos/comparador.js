// Comparador antes / después: el control deslizante mueve la línea divisoria.
// La posición se pasa al CSS con la variable --pos (permitido por la CSP).
const sinMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function iniciarComparadores() {
  document.querySelectorAll('[data-comparador]').forEach(iniciar);
}

function iniciar(el) {
  const control = el.querySelector('input[type="range"]');
  if (!control) return;
  const pintar = valor => {
    const v = Math.round(Number(valor));
    el.style.setProperty('--pos', `${valor}%`);
    control.setAttribute('aria-valuetext', `${v} % del antes y ${100 - v} % del después`);
  };
  control.addEventListener('input', () => pintar(control.value));
  pintar(control.value);

  // Pista: la primera vez que se ve, la línea se mueve un poco para invitar a arrastrar.
  if (sinMovimiento() || !('IntersectionObserver' in window)) return;
  let tocado = false;
  control.addEventListener('pointerdown', () => { tocado = true; }, { once: true });
  control.addEventListener('keydown', () => { tocado = true; }, { once: true });
  const observador = new IntersectionObserver(entradas => {
    if (!entradas.some(e => e.isIntersecting)) return;
    observador.disconnect();
    setTimeout(() => animar(control, pintar, () => tocado), 500);
  }, { threshold: 0.5 });
  observador.observe(el);
}

function animar(control, pintar, tocado) {
  const inicio = Number(control.value);
  const puntos = [inicio, inicio - 14, inicio + 12, inicio];
  const duracion = 1600;
  const t0 = performance.now();
  const suave = t => 0.5 - Math.cos(Math.PI * t) / 2;
  const paso = ahora => {
    if (tocado()) return;
    const t = Math.min((ahora - t0) / duracion, 1);
    const tramo = Math.min(Math.floor(t * 3), 2);
    const local = suave(t * 3 - tramo);
    const valor = puntos[tramo] + (puntos[tramo + 1] - puntos[tramo]) * local;
    control.value = String(valor);
    pintar(control.value);
    if (t < 1) requestAnimationFrame(paso);
  };
  requestAnimationFrame(paso);
}
