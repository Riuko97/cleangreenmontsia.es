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

// Etiqueta superior: el número del área (01-05) y su nombre, como en la web.
const tarjetas = [
  { archivo: 'inicio', etiqueta: 'Montsià · Terres de l’Ebre', titulo: 'Limpieza, jardinería y mantenimiento en el Montsià',
    visual: `<div class="mosaico">${['hogar', 'jardin', 'parcela-despues', 'residencia'].map(f => `<img src="${foto(f)}" alt="">`).join('')}</div>` },
  ...AREAS.map((a, i) => ({
    archivo: a.clave, etiqueta: `0${i + 1} · ${a.corto}`, titulo: a.titulo,
    visual: a.clave === 'parcela'
      ? `<div class="partida"><img src="${foto('parcela-antes')}" alt=""><img src="${foto('parcela-despues')}" alt=""><span class="et et--antes">Antes</span><span class="et et--despues">Después</span></div>`
      : `<img class="unica" src="${foto(a.foto)}" alt="">`,
  })),
];

// Misma paleta que estilos.css: marfil, tinta, verde Montsià y ocre.
const plantilla = t => `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
@font-face{font-family:Playfair;src:url(${datos('fonts/playfair-display.woff2', 'font/woff2')}) format('woff2');font-weight:600 800}
@font-face{font-family:Figtree;src:url(${datos('fonts/figtree.woff2', 'font/woff2')}) format('woff2');font-weight:300 900}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;background:#f6f3ec url(${datos('img/topo.svg', 'image/svg+xml')}) center/cover no-repeat;font-family:Figtree;color:#18241f;display:grid;grid-template-columns:1fr 500px;gap:56px;padding:60px 64px}
.texto{display:flex;flex-direction:column}
.logo{height:56px;width:auto;align-self:flex-start;margin-bottom:auto}
.etiqueta{font-size:17px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#765a2c;margin:0 0 16px}
h1{font-family:Playfair;font-weight:600;font-size:${t.titulo.length > 44 ? 50 : 58}px;line-height:1.1;letter-spacing:-.01em;margin-bottom:30px}
.filete{height:6px;margin-bottom:26px;background:linear-gradient(#1f4a3d,#1f4a3d) top/100% 1px no-repeat,linear-gradient(#1f4a3d,#1f4a3d) bottom/100% 3px no-repeat}
.pie{display:flex;flex-direction:column;align-items:flex-start;gap:14px}
.boton{background:#1f4a3d;color:#fff;font-weight:650;font-size:21px;padding:12px 22px;border-radius:3px;white-space:nowrap}
.zona{font-size:19px;font-weight:600;color:#4c5750}
.visual{position:relative;overflow:hidden;border:10px solid #fffdf8;border-radius:2px;box-shadow:0 0 0 1px #d8cfbf,0 22px 48px rgba(24,36,31,.16);background:#ede7db}
.visual img{display:block;width:100%;height:100%;object-fit:cover}
.mosaico,.partida{display:grid;grid-template-columns:1fr 1fr;gap:4px;height:100%;background:#fffdf8}
.mosaico{grid-template-rows:1fr 1fr}
.et{position:absolute;top:14px;font-weight:700;font-size:14px;letter-spacing:.18em;text-transform:uppercase;padding:5px 11px;border-radius:2px}
.et--antes{left:14px;background:rgba(24,36,31,.85);color:#fff}.et--despues{right:14px;background:#fffdf8;color:#18241f}
.ia{position:absolute;left:12px;bottom:12px;background:rgba(24,36,31,.8);color:#fff;font-size:14px;font-weight:600;padding:4px 10px;border-radius:2px}
</style></head><body>
<div class="texto">
  <img class="logo" src="${datos('img/logo-cleangreen.svg', 'image/svg+xml')}" alt="">
  <p class="etiqueta">${t.etiqueta}</p>
  <h1>${t.titulo}</h1>
  <div class="filete"></div>
  <div class="pie"><span class="boton">Presupuesto sin compromiso</span><span class="zona">Amposta · Alcanar · La Ràpita y alrededores</span></div>
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
