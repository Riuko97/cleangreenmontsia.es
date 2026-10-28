# Imágenes de la web

## Lo que hay ahora

| Qué | Dónde | Formato |
|---|---|---|
| Logo | `img/logo-cleangreen.svg` (texto oscuro), `img/logo-cleangreen-blanco.svg` (fondos oscuros), `img/logo-cleangreen-completo*.svg` e `img/icono-cleangreen.svg` (solo el icono) | SVG |
| Iconos de servicios | `img/iconos.svg` (un solo archivo con todos) | SVG |
| Fotos de cada área | `img/fotos/<nombre>-<ancho>.avif` y `.webp` | AVIF y WebP, a 640, 960 y 1280 px |
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
- el aviso legal explica que no muestran trabajos reales ni a personas del equipo.

Esto lo pide la transparencia del reglamento europeo de IA para imágenes realistas, y evita que un cliente piense que son trabajos tuyos.

**No se han usado las fotos de personas** con el polo de CleanGreen (limpiando, rastrillando, desbrozando o cargando el remolque). Al ser realistas y llevar tu marca, un cliente podría creer que esa persona es de tu equipo y que es quien irá a su casa.

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
   - en `src/modelo/legal.js`, borra la frase sobre las imágenes generadas con IA.
6. Vuelve a generar las imágenes para compartir:
   ```bash
   npm install --no-save playwright && npx playwright install chromium
   node herramientas/imagenes-og.mjs
   ```
7. Comprueba con `npm run dev` que todo se ve bien y sube los cambios.

Si solo cambias algunas fotos y otras siguen siendo de IA, deja la nota en las de IA: la función `imagen` y la nota están separadas, así que puedes quitar `${notaIa()}` solo donde ya haya una foto real.
