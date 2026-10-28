// Genera las imágenes para compartir (Open Graph, 1200 × 630) en src/publico/img/og/.
// Una por área de servicio y otra para la portada, a partir de una plantilla HTML
// con el logo, el título en Playfair Display y la foto del área.
//
// Uso (Playwright solo hace falta para esto; no es dependencia de la web):
//   npm install --no-save playwright && npx playwright install chromium
//   node herramientas/imagenes-og.mjs
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { AREAS } from '../src/modelo/servicios.js';

const { chromium } = createRequire(import.meta.url)('playwright');
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLICO = path.join(RAIZ, 'src/publico');
const DESTINO = path.join(PUBLICO, 'img/og');

const datos = (archivo, tipo) => `data:${tipo};base64,${fs.readFileSync(path.join(PUBLICO, archivo)).toString('base64')}`;
const foto = nombre => datos(`img/fotos/${nombre}-960.webp`, 'image/webp');

// Mismos colores que el sistema de áreas de estilos.css
const COLOR = { hogar: '#2c6e8f', jardin: '#3f7d4e', parcela: '#b07a2a', residencia: '#b85c38', mantenimiento: '#00977a' };

const tarjetas = [
  { archivo: 'inicio', titulo: 'Limpieza, jardinería y mantenimiento en el Montsià', color: '#00977a',
    visual: `<div class="mosaico">${['hogar', 'jardin', 'parcela-despues', 'residencia'].map(f => `<img src="${foto(f)}" alt="">`).join('')}</div>` },
  ...AREAS.map(a => ({
    archivo: a.clave, titulo: a.titulo, color: COLOR[a.clave],
    visual: a.clave === 'parcela'
      ? `<div class="partida"><img src="${foto('parcela-antes')}" alt=""><img src="${foto('parcela-despues')}" alt=""><span class="et et--antes">Antes</span><span class="et et--despues">Después</span></div>`
      : `<img class="unica" src="${foto(a.foto)}" alt="">`,
  })),
];

const plantilla = t => `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
@font-face{font-family:Playfair;src:url(${datos('fonts/playfair-display.woff2', 'font/woff2')}) format('woff2');font-weight:600 800}
@font-face{font-family:Figtree;src:url(${datos('fonts/figtree.woff2', 'font/woff2')}) format('woff2');font-weight:300 900}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;background:#fbf7ef;font-family:Figtree;color:#03241c;display:grid;grid-template-columns:1fr 520px;gap:48px;padding:56px 56px 56px 72px;position:relative}
body::before{content:"";position:absolute;left:0;top:0;bottom:0;width:14px;background:${t.color}}
.texto{display:flex;flex-direction:column;justify-content:space-between}
.logo{height:62px;width:auto;align-self:flex-start}
h1{font-family:Playfair;font-weight:700;font-size:${t.titulo.length > 44 ? 54 : 62}px;line-height:1.08;letter-spacing:-.01em}
.pie{display:flex;flex-direction:column;gap:18px}
.pildora{align-self:flex-start;background:#00735d;color:#fff;font-weight:700;font-size:24px;padding:12px 26px;border-radius:999px}
.zona{font-size:22px;font-weight:600;color:#4d5a52;letter-spacing:.02em}
.visual{position:relative;border-radius:28px;overflow:hidden;border:8px solid #fff;box-shadow:0 18px 40px rgba(3,36,28,.18);background:#f4ecdc}
.visual img{display:block;width:100%;height:100%;object-fit:cover}
.mosaico{display:grid;grid-template-columns:1fr 1fr;gap:6px;height:100%;background:#fff}
.partida{display:grid;grid-template-columns:1fr 1fr;gap:6px;height:100%;background:#fff}
.et{position:absolute;top:16px;font-weight:800;font-size:17px;letter-spacing:.12em;text-transform:uppercase;padding:6px 14px;border-radius:999px}
.et--antes{left:16px;background:rgba(3,36,28,.85);color:#fff}.et--despues{right:16px;background:#fff;color:#03241c}
.ia{position:absolute;left:14px;bottom:14px;background:rgba(3,36,28,.82);color:#fff;font-size:15px;font-weight:600;padding:5px 12px;border-radius:999px}
</style></head><body>
<div class="texto">
  <img class="logo" src="${datos('img/logo-cleangreen.svg', 'image/svg+xml')}" alt="">
  <h1>${t.titulo}</h1>
  <div class="pie"><span class="pildora">Presupuesto sin compromiso</span><span class="zona">Amposta · Alcanar · La Ràpita y alrededores</span></div>
</div>
<div class="visual">${t.visual}<span class="ia">Imagen ilustrativa generada con IA</span></div>
</body></html>`;

fs.mkdirSync(DESTINO, { recursive: true });
const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 } });
for (const t of tarjetas) {
  await pagina.setContent(plantilla(t), { waitUntil: 'load' });
  await pagina.evaluate(() => document.fonts.ready);
  const archivo = path.join(DESTINO, `${t.archivo}.jpg`);
  await pagina.screenshot({ path: archivo, type: 'jpeg', quality: 84 });
  console.log(`${path.relative(RAIZ, archivo)} · ${(fs.statSync(archivo).size / 1024).toFixed(0)} KB`);
}
await navegador.close();
