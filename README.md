# CleanGreen · Desbroce y limpieza de parcelas en el Montsià

Web estática de **CleanGreen (Clean & Green Servicios)** para el servicio de desbroce y limpieza de parcelas en Amposta, Alcanar, Sant Carles de la Ràpita y alrededores.

Es HTML, CSS y JavaScript sin frameworks ni dependencias. No usa cookies ni analítica, y las tipografías están alojadas en la propia web.

## Ver la web en local

```bash
python3 -m http.server 5173
```

Después abre <http://localhost:5173/>. En Codespaces, ábrela desde la pestaña **Puertos**.

## Páginas

| Archivo | Contenido |
|---|---|
| `index.html` | Portada: comparador antes/después, servicios, asistente de presupuesto por WhatsApp, temporada de incendios, cómo trabajamos, mapa de zonas, limpieza de casas y preguntas frecuentes |
| `servicios.html` | Los diez servicios en detalle y qué influye en el precio |
| `normativa-limpieza-parcelas.html` | Guía de normativa: época de peligro, quemas, urbanizaciones (Llei 5/2003), con fuentes oficiales |
| `limpieza-parcelas-amposta.html`, `-alcanar.html`, `-la-rapita.html` | Páginas por pueblo para el posicionamiento local |
| `contacto.html` | Asistente de presupuesto y consejos para mandar fotos |
| `aviso-legal.html`, `privacidad.html`, `cookies.html` | Textos legales (con datos pendientes, ver abajo) |
| `404.html` | Página de error de GitHub Pages |

Otros archivos: `css/estilos.css` (todo el diseño), `js/principal.js` (menú, comparador y asistente), `img/` (logos, iconos e ilustraciones en SVG), `fonts/` (Fraunces y Figtree, licencia OFL), `sitemap.xml`, `robots.txt` y `site.webmanifest`.

## Pendiente antes de publicar

1. **Confirmar el teléfono.** La web usa el **681 87 51 73**, que estaba en la web anterior antes de cambiarlo por uno ficticio. Si no es el número del negocio, cámbialo en todos los archivos con:
   ```bash
   sed -i 's/681875173/NUEVONUMERO/g; s/681 87 51 73/NUE VO NU MERO/g' *.html
   ```
2. **Rellenar los datos legales.** En `aviso-legal.html` y `privacidad.html` hay huecos marcados en amarillo: nombre o razón social, NIF, dirección y correo. La ley (LSSI-CE) obliga a publicarlos.
3. **Comprar el dominio.** Mira `docs/dominio.md`. La web está preparada para `https://cleangreenparcelas.es/`. Si compras otro, cambia las URL absolutas con:
   ```bash
   sed -i 's#https://cleangreenparcelas.es/#https://TUDOMINIO/#g' *.html sitemap.xml robots.txt
   ```
4. **Revisar los textos.** No se ha inventado ningún dato: ni opiniones, ni años de experiencia, ni fotos de trabajos. Aun así, repasa que estas frases encajan con cómo trabajas:
   - "Con las fotos nos hacemos una idea. Si hace falta, quedamos para verla en persona."
   - "Podemos llevarnos los restos y residuos de la parcela."
   - "Acordamos un calendario de visitas" (mantenimiento todo el año).
5. **Añadir fotos reales cuando las tengas.** Mira `docs/imagenes.md`.

## Publicar en GitHub Pages

1. Sube los cambios a la rama `main`.
2. En GitHub, ve a **Settings → Pages**. En **Build and deployment**, elige *Deploy from a branch*, la rama `main` y la carpeta `/ (root)`.
3. La web quedará en `https://riuko97.github.io/cleangreenmontsia.es/` hasta que conectes el dominio. Con el dominio propio funcionan también el `robots.txt` y la página 404.

## Créditos

- Tipografías: [Fraunces](https://github.com/undercasetype/Fraunces) y [Figtree](https://github.com/erikdkennedy/figtree), licencia SIL Open Font License. Están recortadas a los caracteres del castellano y el catalán.
- Mapa: datos de © colaboradores de [OpenStreetMap](https://www.openstreetmap.org/copyright), licencia ODbL.
- Icono de WhatsApp: [Simple Icons](https://simpleicons.org/), CC0.
- Logo, ilustraciones e iconos de servicios: dibujados para esta web en SVG a partir del logo de CleanGreen.
