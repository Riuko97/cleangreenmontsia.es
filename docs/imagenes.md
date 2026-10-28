# Imágenes de la web

## Lo que hay ahora

| Qué | Dónde | Formato |
|---|---|---|
| Logo | `img/logo-cleangreen.svg` (texto oscuro), `img/logo-cleangreen-blanco.svg` (fondos oscuros), `img/logo-cleangreen-completo*.svg` e `img/icono-cleangreen.svg` (solo el icono) | SVG |
| Iconos de las cinco áreas | `img/areas/hogar.svg`, `jardin.svg`, `parcela.svg`, `residencia.svg` y `mantenimiento.svg` | SVG de 64 × 64 |
| Iconos de la interfaz y de cada servicio | `img/iconos.svg` (un solo archivo con todos) | SVG |
| Fotos de cada área | `img/fotos/<nombre>-<ancho>.avif` y `.webp` | AVIF y WebP, a 640, 960 y 1280 px |
| Fondos de las cabeceras | `img/fondos/<nombre>-1440`, `-1920` y `-movil-640`, en `.avif` y `.webp` | AVIF y WebP |
| Imágenes para compartir (Open Graph) | `img/og/inicio.jpg`, `hogar.jpg`, `jardin.jpg`, `parcela.jpg`, `residencia.jpg` y `mantenimiento.jpg` | JPG de 1200 × 630 |
| Favicon e iconos de la app | `favicon.ico`, `img/apple-touch-icon.png`, `img/icono-*.png` | ICO y PNG |

Todas las rutas son dentro de `src/publico/`.

### Las fotos

| Nombre | Qué muestra | Dónde sale |
|---|---|---|
| `hogar` | Entrada de una casa mediterránea recién fregada | Limpieza de casas y pisos |
| `jardin` | Jardín con camino de grava, seto, romero, lavanda y olivo | Jardinería |
| `parcela-antes` y `parcela-despues` | La misma parcela, con hierba alta y desbrozada | Comparador de la portada y de parcelas, tarjeta de parcelas y página 404 |
| `residencia` | Casa blanca al anochecer con las persianas cerradas | Segundas residencias |
| `mantenimiento` | Manos con guantes revisando el riego por goteo | Mantenimiento periódico |

**Son imágenes ilustrativas generadas con IA.** Por eso:

- cada foto lleva encima la nota «Imagen ilustrativa generada con IA», y el pie del comparador también lo dice;
- su texto alternativo empieza por «Imagen ilustrativa generada con IA»;
- el aviso legal explica que no muestran trabajos reales ni a personas del equipo (y que las imágenes de fondo también son de IA).

Esto lo pide la transparencia del reglamento europeo de IA para imágenes realistas, y evita que un cliente piense que son trabajos tuyos.

**No se han usado las fotos de personas** con el polo de CleanGreen (limpiando, rastrillando, desbrozando o cargando el remolque). Al ser realistas y llevar tu marca, un cliente podría creer que esa persona es de tu equipo y que es quien irá a su casa.

### Los fondos

Las páginas interiores abren con una imagen de fondo clara, con la parte izquierda vacía para el texto y el motivo a la derecha. La portada lleva dos.

| Nombre | Qué muestra | Dónde sale |
|---|---|---|
| `limpieza` | Ventana con cortinas de lino, un jarrón con ramas de olivo y un paño verde sobre una cómoda | Limpieza de casas y pisos |
| `jardineria` | Jardín mediterráneo con olivo, romero, lavanda y camino de grava | Jardinería |
| `desbroce` | Camino de tierra entre hierba seca, olivos y un muro de piedra seca | Desbroce y limpieza de parcelas (con el comparador antes/después delante) |
| `segunda-residencia` | Fachada blanca con persianas verdes y un farol encendido al atardecer | Segundas residencias |
| `mantenimiento` | Guantes, tijeras de podar y manguera de riego sobre un muro de piedra | Mantenimiento periódico |
| `servicios` | Llaves, una libreta verde y un lápiz junto a unas ramas de olivo | Servicios, guías y cada guía |
| `contacto` | Un móvil, una libreta y un bolígrafo junto a una planta | Contacto |
| `zonas` | Paisaje de olivos con la sierra y el mar al fondo | Zonas y la página de cada pueblo |
| `portada` | Olivo, fachada con persiana verde y jardinera de piedra | Cabecera de la portada, detrás del comparador antes/después |
| `cuidado-residencias` | Muro con persiana verde, maceta de barro y paisaje al fondo, con el motivo **a la izquierda** | Apartado «Segundas residencias» de la portada, detrás de la foto |

También son **imágenes generadas con IA**. Como son decorativas (van en el CSS, sin texto alternativo, y quedan bajo un velo marfil cuando el texto pasa por encima), no llevan la nota encima: lo explica el aviso legal. No muestran personas.

Cada fondo tiene tres versiones: 1440 px (pantallas de hasta 1440 px), 1920 px (más anchas) y `movil-640`, un recorte de la mitad donde está el motivo para pantallas de hasta 700 px. `cuidado-residencias` cubre un apartado mucho más alto que una cabecera, así que fuera del móvil usa siempre la de 1920 px. Cada página precarga el fondo de su cabecera en la versión que va a usar.

**Para cambiar un fondo:**

1. Prepara la imagen apaisada **3:1** (1920 × 640 px), clara, con el **tercio izquierdo vacío** y el motivo a la derecha (en `cuidado-residencias`, al revés: el motivo a la izquierda, porque el texto va a la derecha).
2. Ponla en una carpeta con el nombre de la tabla (`contacto.jpg`, `zonas.png`…) y ejecuta:
   ```bash
   python3 herramientas/optimizar-fondos.py CARPETA
   ```
   Necesita Pillow con AVIF (`pip install -U pillow`). Los fondos que no estén en la carpeta se dejan como están.

**Para dar a una página un fondo propio** (por ejemplo, `guias`):

1. Añade el nombre a `FONDOS` en `herramientas/optimizar-fondos.py` y genera sus versiones como arriba.
2. En `src/publico/css/estilos.css`, copia las tres reglas de otro fondo (`.cabecera--servicios`: la general, la de `min-width:1441px` y la de `max-width:700px`) y cambia el nombre.
3. En la vista de la página (`src/vistas/paginas/`), pon `fondo: 'guias'` en su `cabeceraPagina`. La precarga se añade sola.

## Cuando tengas fotos reales

Las fotos reales tuyas o de tu equipo trabajando son lo que más confianza da, aunque sean del móvil. Para cambiarlas:

1. Haz las fotos en **horizontal**. Si no son 4:3, el script las recorta por el centro.
2. Para el antes y el después, haz las dos fotos **desde el mismo sitio y con el mismo encuadre**.
3. Ponlas en una carpeta con estos nombres: `hogar.jpg`, `jardin.jpg`, `parcela-antes.jpg`, `parcela-despues.jpg`, `residencia.jpg` y `mantenimiento.jpg`.
4. Genera las versiones para la web (sin datos de ubicación ni del móvil):
   ```bash
   python3 herramientas/optimizar-fotos.py CARPETA
   ```
5. Cambia los textos en el código:
   - el `fotoAlt` de cada área en `src/modelo/servicios.js`, describiendo el trabajo real (por ejemplo: «Parcela en Alcanar antes y después del desbroce»);
   - el `alt` y el pie del comparador en `src/vistas/componentes.js` (función `comparador`), por ejemplo «Trabajo real en Alcanar. Desliza para comparar.»;
   - quita la nota de IA: en `src/vistas/componentes.js`, haz que `notaIa` devuelva una cadena vacía;
   - en `src/modelo/legal.js`, cambia la frase sobre las imágenes generadas con IA: si las imágenes de fondo siguen siendo de IA, deja la parte que habla de ellas.
6. Vuelve a generar las imágenes para compartir:
   ```bash
   npm install --no-save playwright && npx playwright install chromium
   node herramientas/imagenes-og.mjs
   ```
7. Comprueba con `npm run dev` que todo se ve bien y sube los cambios.

Si solo cambias algunas fotos y otras siguen siendo de IA, deja la nota en las de IA: la función `imagen` y la nota están separadas, así que puedes quitar `${notaIa()}` solo donde ya haya una foto real.

## Iconos de las áreas

Los cinco iconos de `img/areas/` (64 × 64 px, verde oscuro con detalles en el verde agua del logo) identifican cada área en las tarjetas de la portada, en el índice y los bloques de la página de servicios y en el submenú. Son decorativos (`alt=""`), porque el nombre del área va siempre al lado.

Para cambiar uno, sustituye el SVG manteniendo el nombre (`hogar`, `jardin`, `parcela`, `residencia` o `mantenimiento`). Comprueba antes que no lleve scripts ni enlaces y que tenga `viewBox`, para que se vea nítido de 30 a 56 px.
