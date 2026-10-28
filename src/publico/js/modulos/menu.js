// Menú principal: panel del móvil y submenú de servicios.
const ESCRITORIO = window.matchMedia('(min-width: 901px)');

export function iniciarMenu() {
  const boton = document.querySelector('.menu-boton');
  const nav = document.getElementById('nav');
  if (boton && nav) iniciarPanel(boton, nav);
  document.querySelectorAll('.nav__desplegar').forEach(iniciarSubmenu);
}

function iniciarPanel(boton, nav) {
  const texto = boton.querySelector('.menu-boton__texto');
  const fijar = abierto => {
    boton.setAttribute('aria-expanded', String(abierto));
    if (texto) texto.textContent = abierto ? 'Cerrar' : 'Menú';
    nav.classList.toggle('abierta', abierto);
    document.body.classList.toggle('menu-abierto', abierto);
  };
  const abierto = () => boton.getAttribute('aria-expanded') === 'true';

  boton.addEventListener('click', () => fijar(!abierto()));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && abierto()) { fijar(false); boton.focus(); }
  });
  nav.addEventListener('click', e => { if (e.target.closest('a') && abierto()) fijar(false); });
  ESCRITORIO.addEventListener('change', e => { if (e.matches && abierto()) fijar(false); });
}

function iniciarSubmenu(boton) {
  const grupo = boton.closest('.nav__grupo');
  if (!grupo) return;
  const fijar = abierto => {
    boton.setAttribute('aria-expanded', String(abierto));
    grupo.classList.toggle('abierto', abierto);
  };
  const abierto = () => boton.getAttribute('aria-expanded') === 'true';

  boton.addEventListener('click', () => fijar(!abierto()));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && abierto()) { fijar(false); boton.focus(); }
  });
  document.addEventListener('click', e => { if (abierto() && !grupo.contains(e.target)) fijar(false); });
}
