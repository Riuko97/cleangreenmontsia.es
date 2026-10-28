# CleanGreen · Limpieza, jardinería y mantenimiento en el Montsià

Web de **CleanGreen (Clean & Green Servicios)**: limpieza de casas y pisos, jardinería, desbroce y limpieza de parcelas, cuidado de segundas residencias y mantenimiento periódico en Amposta, Alcanar (Les Cases d'Alcanar y Alcanar Platja), Sant Carles de la Ràpita y alrededores.

Es una web estática que se genera con Node.js siguiendo el patrón **modelo-vista-controlador (MVC)**. No tiene dependencias de ejecución, no usa cookies ni analítica, y no carga nada de otros servidores: tipografías, fotos e iconos están en la propia web.

## Ver la web en tu ordenador

Solo hace falta [Node.js](https://nodejs.org/) 20 o posterior. **No hay que ejecutar `npm install`.**

```bash
npm run dev
```

Abre <http://localhost:5173/>. Mientras está en marcha, la web se reconstruye sola cada vez que cambias algo en `src/`.

| Comando | Qué hace |
|---|---|
| `npm run build` | Genera la web en `dist/` |
| `npm run check` | Auditoría SEO de `dist/`: títulos, descripciones, canonical, un solo h1, alt de las imágenes, Open Graph, datos estructurados, enlaces rotos, sitemap y páginas huérfanas |
| `npm run dev` | Construye y abre el servidor local, que vigila los cambios |
| `npm start` | Solo el servidor local (sirve lo que haya en `dist/`) |

## Cómo está organizado (MVC)

```
src/
├── modelo/          MODELO: los datos, sin nada de HTML
│   ├── negocio.js     nombre, teléfono, WhatsApp, dominio (la única fuente de verdad)
│   ├── servicios.js   las cinco áreas: servicios, fotos, preguntas, frecuencias y calendario
│   ├── zonas.js       Amposta, Alcanar, La Ràpita y los pueblos de alrededor
│   ├── guias.js       las dos guías, con sus fuentes oficiales
│   ├── preguntas.js   preguntas frecuentes generales
│   ├── legal.js       aviso legal, privacidad y cookies
│   └── mapa.json      geometría del Montsià (OpenStreetMap)
├── vistas/          VISTAS: reciben datos y devuelven HTML; no deciden nada
│   ├── plantilla.js   <head>, cabecera con menú, pie y barra de contacto del móvil
│   ├── componentes.js botones, fotos, tarjetas, comparador, asistente, mapa…
│   └── paginas/       portada, servicios y cada área, zonas, guías, contacto, legales y 404
├── controlador/     CONTROLADOR: decide qué página se genera con qué datos
│   ├── rutas.js       tabla de rutas: modelo → vista, metadatos y datos estructurados
│   ├── seo.js         schema.org, sitemap, robots.txt, llms.txt, manifiesto y CSP
│   ├── construir.js   genera dist/ con URL limpias y huellas de caché
│   ├── comprobar.js   auditoría SEO (npm run check)
│   └── servidor.js    servidor local que se comporta como GitHub Pages
└── publico/         archivos que se copian tal cual
    ├── css/estilos.css  todo el diseño
    ├── js/              JavaScript del navegador (módulos ES)
    │   ├── app.js         arranca los módulos
    │   ├── modulos/       menú, cabecera, comparador, aparición suave y año
    │   └── presupuesto/   el asistente de presupuesto, también en MVC:
    │                      modelo.js (datos y mensaje), vista.js (formulario)
    │                      y controlador.js (los conecta y abre WhatsApp)
    ├── fonts/           Playfair Display y Figtree (licencia OFL)
    └── img/             logo, iconos, areas/ (iconos de las áreas), fotos/,
                         fondos/ (cabeceras) y og/ (imágenes para compartir)
herramientas/        scripts para regenerar las fotos, los fondos y las imágenes para compartir
docs/                diseño, SEO, dominio e imágenes
```

Ejemplo: para cambiar el teléfono, se cambia en `src/modelo/negocio.js` y aparece bien en todas las páginas, en los enlaces de WhatsApp y en los datos estructurados.

## Publicar en GitHub Pages

La web se publica sola con GitHub Actions (`.github/workflows/publicar.yml`) cada vez que se sube algo a la rama `main`.

1. Une esta rama a `main` (por ejemplo, con una pull request).
2. Solo la primera vez: en GitHub, **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Mira el progreso en la pestaña **Actions**. Si `npm run check` encuentra un error, no se publica.
4. Mientras no haya dominio propio, la web queda en `https://riuko97.github.io/cleangreenmontsia.es/`.

### Cuando compres el dominio

1. **Settings → Secrets and variables → Actions → Variables → New repository variable**: nombre `DOMINIO`, valor `cleangreenmontsia.es` (sin `https://` ni barra final).
2. **Settings → Pages → Custom domain**: escribe el mismo dominio y configura el DNS como explica [docs/dominio.md](docs/dominio.md).
3. Vuelve a ejecutar el flujo desde **Actions → Publicar la web → Run workflow**. Todas las URL, el sitemap y los datos estructurados pasarán a usar el dominio.

## Pendiente por tu parte

1. **Poner el teléfono real.** La web usa de momento un número **ficticio**, el **600 12 34 56**, para llamadas y WhatsApp. Antes de darla a conocer, cámbialo por el del negocio en `src/modelo/negocio.js` (`telefono`, `telefonoVisible` y `whatsapp`); se actualiza solo en todas las páginas.
2. **Rellenar los datos legales.** En el aviso legal y en la política de privacidad hay huecos marcados en amarillo: nombre y apellidos o razón social, NIF, dirección completa y correo de contacto. La ley (LSSI-CE) obliga a publicarlos. Están en `src/modelo/legal.js`.
3. **Comprar el dominio** `cleangreenmontsia.es`. Mira [docs/dominio.md](docs/dominio.md).
4. **Revisar los textos.** No se ha inventado ningún dato del negocio: ni opiniones, ni años de experiencia, ni precios, ni plazos. Aun así, comprueba que los servicios y las frases describen cómo trabajas de verdad.
5. **Fotos reales.** Las fotos actuales son imágenes ilustrativas generadas con IA y llevan un aviso que lo dice (las imágenes de fondo también son de IA, pero son decorativas y basta con la mención del aviso legal). Cuando tengas fotos tuyas, cámbialas siguiendo [docs/imagenes.md](docs/imagenes.md).

## Regenerar fotos, fondos e imágenes para compartir

- **Fotos** (`src/publico/img/fotos/`): `python3 herramientas/optimizar-fotos.py CARPETA` (necesita Pillow: `pip install pillow`). Crea las versiones AVIF y WebP a 640, 960 y 1280 px.
- **Fondos** de las cabeceras y de la portada (`src/publico/img/fondos/`): `python3 herramientas/optimizar-fondos.py CARPETA`. Crea las versiones AVIF y WebP a 1440 y 1920 px y el recorte para el móvil. Qué fondo va en cada página y cómo añadir uno nuevo: [docs/imagenes.md](docs/imagenes.md).
- **Imágenes para compartir** (`src/publico/img/og/`, 1200 × 630): necesitan Playwright solo para esto.
  ```bash
  npm install --no-save playwright && npx playwright install chromium
  node herramientas/imagenes-og.mjs
  ```

## Documentación

- [docs/diseno.md](docs/diseno.md): dirección de diseño, tipografía, paleta y principios de la Gestalt aplicados.
- [docs/prompt-iconos.md](docs/prompt-iconos.md): prompt para encargar a ChatGPT un juego de iconos nuevo.
- [docs/seo.md](docs/seo.md): todo el SEO técnico implementado.
- [docs/dominio.md](docs/dominio.md): qué dominio comprar, dónde y cómo conectarlo.
- [docs/imagenes.md](docs/imagenes.md): fotos, fondos de las cabeceras, iconos de las áreas, imágenes para compartir y cómo cambiarlos.

## Créditos

- Tipografías: [Playfair Display](https://github.com/clauseggers/Playfair) y [Figtree](https://github.com/erikdkennedy/figtree), licencia SIL Open Font License. Recortadas a los caracteres del castellano y el catalán.
- Mapa: datos de © colaboradores de [OpenStreetMap](https://www.openstreetmap.org/copyright), licencia ODbL.
- Icono de WhatsApp: [Simple Icons](https://simpleicons.org/), CC0.
- Logo e iconos de la interfaz: dibujados en SVG para esta web a partir del logo de CleanGreen.
- Iconos de las cinco áreas: aportados por el propietario.
- Fotos e imágenes de fondo: imágenes ilustrativas generadas con IA, aportadas por el propietario.
