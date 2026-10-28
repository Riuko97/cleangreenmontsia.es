// CONTROLADOR · Servidor local que se comporta como GitHub Pages:
// URL limpias (/servicios/ → /servicios/index.html), redirección a la barra final
// y página 404 propia. Con --vigilar reconstruye la web al cambiar src/.
// Uso: npm run dev   ·   npm start
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const DIST = path.join(RAIZ, 'dist');
const PUERTO = Number(process.env.PORT || 5173);
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json', '.json': 'application/json',
};

function enviar(res, archivo, estado = 200) {
  res.writeHead(estado, { 'Content-Type': TIPOS[path.extname(archivo)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(archivo).pipe(res);
}

http.createServer((req, res) => {
  const ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const archivo = path.join(DIST, path.normalize(ruta).replace(/^(\.\.[/\\])+/, ''));
  if (!archivo.startsWith(DIST)) { res.writeHead(403).end(); return; }
  try {
    const info = fs.statSync(archivo);
    if (info.isDirectory()) {
      if (!ruta.endsWith('/')) { res.writeHead(301, { Location: ruta + '/' }).end(); return; }
      const indice = path.join(archivo, 'index.html');
      if (fs.existsSync(indice)) return enviar(res, indice);
    } else return enviar(res, archivo);
  } catch { /* no existe: 404 */ }
  enviar(res, path.join(DIST, '404.html'), 404);
}).listen(PUERTO, () => console.log(`Web en http://localhost:${PUERTO}/ (sirviendo dist/)`));

if (process.argv.includes('--vigilar')) {
  let pendiente = null;
  fs.watch(path.join(RAIZ, 'src'), { recursive: true }, () => {
    clearTimeout(pendiente);
    pendiente = setTimeout(() => {
      const p = spawn(process.execPath, [path.join(RAIZ, 'src/controlador/construir.js')], { stdio: 'inherit' });
      p.on('exit', c => c === 0 && console.log('Cambios aplicados. Recarga el navegador.'));
    }, 200);
  });
  console.log('Vigilando src/: la web se reconstruye al guardar.');
}
