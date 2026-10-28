// CONTROLADOR · Auditoría SEO técnica de dist/ (npm run check).
// Revisa en cada página: título, descripción, canonical, un único h1, imágenes con
// alt, idioma, Open Graph, datos estructurados válidos y enlaces internos.
// Además comprueba el sitemap y que ninguna página quede huérfana.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sitio } from '../modelo/negocio.js';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../dist');
if (!fs.existsSync(DIST)) { console.error('No existe dist/. Ejecuta antes: npm run build'); process.exit(1); }

const listar = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? listar(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const html = listar(DIST).filter(a => a.endsWith('.html'));
const rel = a => path.relative(DIST, a);
const rutaDe = a => rel(a) === 'index.html' ? '' : rel(a).replace(/index\.html$/, '');
const uno = (h, re) => (h.match(re) || [])[1];

const errores = [], avisos = [], enlazadas = new Set(), filas = [];
const ids = Object.fromEntries(html.map(a => [rutaDe(a), new Set([...fs.readFileSync(a, 'utf8').matchAll(/\sid="([^"]+)"/g)].map(m => m[1]))]));

for (const a of html) {
  const h = fs.readFileSync(a, 'utf8');
  const p = rutaDe(a) || '/';
  const titulo = uno(h, /<title>([^<]*)<\/title>/) || '';
  const desc = uno(h, /<meta name="description" content="([^"]*)"/) || '';
  const indexable = !/<meta name="robots" content="noindex/.test(h);
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  const tit = titulo.replace(/&amp;/g, '&').length, des = desc.replace(/&amp;/g, '&').length;

  if (!titulo) errores.push(`${p}: sin <title>`);
  else if (tit > 60) avisos.push(`${p}: título de ${tit} caracteres (recomendado ≤ 60)`);
  if (!desc) errores.push(`${p}: sin meta description`);
  else if (des < 70 || des > 160) avisos.push(`${p}: descripción de ${des} caracteres (recomendado 70-160)`);
  if (h1 !== 1) errores.push(`${p}: ${h1} elementos h1 (debe haber uno)`);
  if (!/<html lang="es-ES"/.test(h)) errores.push(`${p}: falta lang="es-ES"`);
  if (indexable) {
    const can = uno(h, /<link rel="canonical" href="([^"]+)"/);
    if (!can) errores.push(`${p}: sin canonical`);
    else if (!can.startsWith(sitio.url)) errores.push(`${p}: canonical fuera del sitio (${can})`);
    for (const og of ['og:title', 'og:description', 'og:image', 'og:url']) if (!h.includes(`property="${og}"`)) errores.push(`${p}: falta ${og}`);
    const imgOg = uno(h, /property="og:image" content="([^"]+)"/);
    if (imgOg && !fs.existsSync(path.join(DIST, imgOg.replace(sitio.url, '')))) errores.push(`${p}: no existe la imagen Open Graph ${imgOg}`);
  }
  for (const img of h.match(/<img\b[^>]*>/g) || []) if (!/\salt="/.test(img)) errores.push(`${p}: imagen sin alt: ${img.slice(0, 80)}`);
  for (const ld of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(ld[1]); } catch (e) { errores.push(`${p}: JSON-LD no válido (${e.message})`); }
  }
  // Enlaces internos
  for (const m of h.matchAll(/\shref="([^"]+)"/g)) {
    let u = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(u) || u.startsWith('#')) continue;
    if (!u.startsWith(sitio.base)) { errores.push(`${p}: enlace interno sin la base ${sitio.base}: ${u}`); continue; }
    u = u.slice(sitio.base.length).split('?')[0];
    const [ruta, ancla] = u.split('#');
    const destino = ruta === '' || ruta.endsWith('/') ? path.join(DIST, ruta, 'index.html') : path.join(DIST, ruta);
    if (!fs.existsSync(destino)) { errores.push(`${p}: enlace roto ${m[1]}`); continue; }
    if (destino.endsWith('.html')) {
      const r = rutaDe(destino);
      if (r !== rutaDe(a)) enlazadas.add(r);
      if (ancla && !ids[r]?.has(ancla)) errores.push(`${p}: ancla inexistente ${m[1]}`);
    }
  }
  filas.push({ pagina: p, indexable: indexable ? 'sí' : 'no', titulo: tit, descripcion: des, h1 });
}

// Sitemap y páginas huérfanas
const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const enSitemap = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(sitio.url, '')));
for (const a of html) {
  const r = rutaDe(a), h = fs.readFileSync(a, 'utf8');
  const indexable = !/<meta name="robots" content="noindex/.test(h);
  if (r.endsWith('404.html')) continue;
  if (indexable && !enSitemap.has(r)) errores.push(`/${r}: indexable pero no está en el sitemap`);
  if (!indexable && enSitemap.has(r)) errores.push(`/${r}: noindex pero está en el sitemap`);
  if (r !== '' && !enlazadas.has(r)) avisos.push(`/${r}: ninguna otra página enlaza aquí (página huérfana)`);
}
if (!fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8').includes('Sitemap:')) errores.push('robots.txt sin línea Sitemap');

console.table(filas);
console.log(`Páginas: ${html.length} · en el sitemap: ${enSitemap.size}`);
if (avisos.length) console.log('\nAvisos:\n- ' + avisos.join('\n- '));
if (errores.length) { console.log('\nErrores:\n- ' + errores.join('\n- ')); process.exit(1); }
console.log('\nAuditoría SEO superada: sin errores.');
