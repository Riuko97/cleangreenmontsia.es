// CONTROLADOR · Construcción de la web estática en dist/.
// Uso: npm run build   (variables opcionales: SITIO_URL y BASE_PATH)
//
// 1. Copia los recursos de src/publico/ a dist/.
// 2. Calcula huellas para que el navegador no use versiones viejas del CSS y del JS.
// 3. Recorre la tabla de rutas: modelo → vista → HTML en dist/<ruta>/index.html.
// 4. Genera sitemap.xml, robots.txt, llms.txt y site.webmanifest.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { sitio } from '../modelo/negocio.js';
import { url } from '../vistas/utilidades.js';
import { documento, SCRIPT_JS } from '../vistas/plantilla.js';
import { rutas } from './rutas.js';
import * as seo from './seo.js';

export const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const PUBLICO = path.join(RAIZ, 'src/publico');
export const DIST = path.join(RAIZ, 'dist');

const huella = (...archivos) => {
  const h = crypto.createHash('sha256');
  for (const a of archivos) h.update(fs.readFileSync(a));
  return h.digest('hex').slice(0, 10);
};
const listar = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? listar(path.join(dir, e.name)) : [path.join(dir, e.name)]);

// Minificación prudente: quita comentarios y sangrías, sin tocar el contenido.
const minificar = html => html.replace(/<!--(?!\[)[\s\S]*?-->/g, '').replace(/\n[ \t]+/g, '\n').replace(/\n{2,}/g, '\n');

export function construir({ silencio = false } = {}) {
  const t0 = Date.now();
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.cpSync(PUBLICO, DIST, { recursive: true });

  const archivosJs = listar(path.join(PUBLICO, 'js')).filter(a => a.endsWith('.js')).sort();
  const recursos = {
    css: `${url('css/estilos.css')}?v=${huella(path.join(PUBLICO, 'css/estilos.css'))}`,
    js: `${url('js/app.js')}?v=${huella(...archivosJs)}`,
    csp: seo.csp(crypto.createHash('sha256').update(SCRIPT_JS).digest('base64')),
  };

  const paginas = rutas();
  for (const p of paginas) {
    const html = minificar(documento({ meta: { ...p.meta, ruta: p.ruta }, cuerpo: p.cuerpo(), recursos }));
    const destino = p.archivo ? path.join(DIST, p.archivo) : path.join(DIST, p.ruta, 'index.html');
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, html);
  }

  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), seo.sitemap(paginas));
  fs.writeFileSync(path.join(DIST, 'robots.txt'), seo.robots());
  fs.writeFileSync(path.join(DIST, 'llms.txt'), seo.llms(paginas));
  fs.writeFileSync(path.join(DIST, 'site.webmanifest'), seo.manifiesto());
  fs.writeFileSync(path.join(DIST, '.nojekyll'), '');

  if (!silencio) {
    const total = listar(DIST).reduce((s, a) => s + fs.statSync(a).size, 0);
    console.log(`Web construida en dist/ · ${paginas.length} páginas · ${(total / 1024).toFixed(0)} KB · ${Date.now() - t0} ms`);
    console.log(`URL: ${sitio.url} · base: ${sitio.base}`);
  }
  return paginas;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) construir();
