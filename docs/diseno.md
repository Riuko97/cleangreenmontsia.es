# Diseño de la web

## Dirección: «Cartografía del Montsià»

Una web formal, con aspecto de documento bien compuesto y no de plantilla. Se ha huido de los recursos que delatan una web genérica: barras de color en el lateral de las tarjetas, iconos dentro de cuadrados de color, píldoras, destellos ✦ y una paleta distinta para cada sección.

En su lugar:

- **Una paleta corta** sacada del logo y del territorio.
- **Filetes finos** de 1 px para separar, y un **filete doble** (fino arriba y grueso abajo) bajo cada cabecera, como el membrete de un documento.
- **Una sola paleta para las cinco áreas**: cada una se reconoce por su foto y su nombre, no por un color propio.
- **Fotografías enmarcadas como láminas**: paspartú marfil, esquinas rectas y un marco de filete desplazado en la foto destacada.
- **Curvas de nivel** muy tenues de fondo: el relieve del Montsià como textura.

## Referencias estudiadas

| Referencia | Qué se ha tomado | Qué se ha evitado |
|---|---|---|
| Guía de estilo web de la Universidad de Córdoba (material del curso) | Paleta corta derivada del logo: tres colores base y el resto solo de apoyo. Iconos monocromos. Menús y secciones delimitados por filetes. Retícula común | Degradados y la cantidad de colores complementarios |
| Guía d'estils web (material del curso) | *Design tokens* en CSS (`--verde`, `--ocre`, `--e-1`… `--e-8`, `--radio`) y jerarquía tokens → componentes → páginas | — |
| [Aitor Soluciones](https://aitorsoluciones.com/) (competencia, Les Cases d'Alcanar) | Contacto por WhatsApp, proceso en pasos, zonas por pueblo, preguntas frecuentes | Paleta azul marino y naranja, titulares condensados, formulario largo |
| [Davey](https://www.davey.com/) | Contenido de autoridad: guía con normativa y fuentes | Menús complejos |

## Tipografía formal

- **Títulos: Playfair Display** con peso 600. Es una serifa clásica que da un tono formal y de confianza. Los títulos van siempre en redonda (sin cursivas) y en un solo color.
- **Texto: Figtree** (pesos 300 a 900). Sans serif clara y muy legible en el móvil. El texto base mide 17 o 18 px.
- **Etiquetas de sección** en versalitas espaciadas y en ocre, sin icono.
- **Cifras alineadas** (`font-variant-numeric: lining-nums`) en toda la web: Playfair Display trae por defecto cifras elzevirianas, que bajan de la línea y desentonan en fechas y pasos.
- Solo se numera lo que tiene orden de verdad: los cuatro pasos de «Cómo trabajamos» y los pasos para pedir presupuesto.
- Las dos fuentes están en la propia web (`src/publico/fonts/`), recortadas a los caracteres del castellano y el catalán, y se cargan con `font-display: swap`.

## Color

Tres colores base y neutros de papel y piedra. Están definidos como *tokens* al principio de `estilos.css`.

| Token | Color | Uso |
|---|---|---|
| `--verde` | `#1f4a3d` | Verde Montsià: botones, enlaces activos, filete doble y municipios del mapa |
| `--tinta` | `#18241f` | Texto principal y títulos |
| `--ocre` | `#9a7b47` | Bronce de olivo y piedra seca: filetes de detalle e iconos |
| `--ocre-texto` | `#765a2c` | Ocre para texto pequeño (contraste AA sobre marfil) |
| `--papel` | `#f6f3ec` | Marfil: fondo general |
| `--papel-2` | `#ede7db` | Piedra: fondo de secciones alternas |
| `--blanco` | `#fffdf8` | Superficie de tarjetas y paspartú de las fotos |
| `--linea` | `#d8cfbf` | Filete de 1 px |
| `--suave` | `#4c5750` | Texto secundario |
| `--bosque` | `#142b24` | Bandas oscuras y pie |
| `--riesgo` | `#9e2f24` | Solo para el aviso de la época de peligro de incendio |

El verde de WhatsApp (`#25d366`) solo aparece en el glifo de WhatsApp de los botones, para reconocerlo. El botón en sí es verde Montsià, como el resto de botones principales.

### Las cinco áreas comparten paleta

Antes cada área tenía su color. Ahora las cinco comparten la misma paleta y la misma forma, y cada una se reconoce por su **foto y su nombre**. Es más sobrio y no depende del color, así que también funciona para quien no distingue bien los colores.

### Índice de servicios

En la página de servicios, las cinco áreas se abren desde un panel de cinco botones iguales, separados por filetes de 1 px y con una flecha hacia abajo que indica que llevan a su apartado de la misma página. Son cinco columnas en el escritorio, dos en la tableta y una en el móvil.

## Principios de la Gestalt aplicados

| Principio | Qué dice | Dónde se ve en la web |
|---|---|---|
| **Proximidad** | Lo que está cerca se percibe como un grupo | Una escala de espacios (`--e-1` a `--e-8`): dentro de un componente, como mucho 16 px; entre componentes, de 24 a 48 px; entre secciones, de 64 a 120 px. En cada tarjeta de servicio, el icono, el título y el texto van juntos, y la lista de lo que incluye queda separada por un filete. |
| **Semejanza** | Lo que se parece se percibe como relacionado | Lo que tiene la misma función tiene el mismo aspecto: todos los botones principales son verde Montsià, todas las etiquetas de sección van en versalitas ocre y los cinco accesos del índice de servicios son iguales. Las cinco áreas comparten forma y se reconocen por su foto y su nombre. |
| **Región común** | Lo que comparte un fondo o un borde forma un grupo | Las tarjetas, los paneles laterales de las guías y la «hoja de encargo» del presupuesto encierran lo que va junto en una superficie marfil con un filete de 1 px. |
| **Continuidad** | El ojo sigue líneas y alineaciones | Los cuatro pasos de «Cómo trabajamos» están unidos por un filete ocre. Todo se alinea a la misma rejilla y al mismo margen izquierdo; con cuatro servicios, la rejilla pasa a dos columnas para que no quede una tarjeta suelta. |
| **Cierre** | Completamos mentalmente las formas abiertas | El comparador antes/después muestra media foto de cada momento y se completa al deslizar. El marco de filete desplazado detrás de la foto de segundas residencias se lee como un rectángulo completo aunque la foto lo tape. |
| **Figura-fondo** | Distinguimos lo que destaca de lo que está detrás | Bandas verde bosque que separan bloques; fotos con paspartú que se despegan del papel; una sola llamada principal en cada pantalla. |
| **Pregnancia y punto focal** | Preferimos las formas simples; un elemento domina | Formas rectas y simples (rectángulos de esquinas mínimas y filetes) y, en cada sección, un único elemento dominante: el título en Playfair Display. |

## Iconos

Dibujo de línea de 1,4 px sobre una rejilla de 24 px, en un solo color y **sin fondo**: nada de cuadrados de color detrás. Están todos en `src/publico/img/iconos.svg`. Para encargar un juego nuevo y más personal, hay un prompt preparado en [prompt-iconos.md](prompt-iconos.md).

## Imágenes

Las fotos son **imágenes ilustrativas generadas con IA** y lo dicen: cada una lleva la nota «Imagen ilustrativa generada con IA» y su texto alternativo empieza igual. No se usan fotos de personas generadas con IA, para que nadie las confunda con el equipo real. Más detalles en [imagenes.md](imagenes.md).

## Accesibilidad

- Contraste AA en todos los textos (el ocre de los textos pequeños es la variante oscura `--ocre-texto`).
- `:focus-visible` claro en todo lo que se puede usar con el teclado; el comparador se mueve con las flechas.
- Respeta `prefers-reduced-motion`: sin animaciones si la persona lo ha pedido.
- Barra de contacto fija en el móvil, que se oculta al abrir el menú.
- Sin desbordes horizontales a 360 px.
- Funciona sin JavaScript: el menú pasa a una fila de enlaces, todos los apartados del asistente se ven y el botón abre WhatsApp con un enlace normal.
- Verificado con axe-core (0 incidencias en todas las páginas, a 1440 y 390 px) y con html-validate.

## En qué supera a la competencia

- **Aspecto formal y propio:** paleta del territorio, filetes y fotos enmarcadas como láminas, en lugar de los recursos de una plantilla genérica.
- **Más servicios, mejor ordenados:** cinco áreas con su propia página y sus preguntas frecuentes, más páginas por pueblo y guías.
- **Pedir presupuesto es más fácil:** se marcan unas opciones y sale el mensaje de WhatsApp escrito, sin formularios ni datos guardados en ningún servidor.
- **Contenido útil:** la guía de normativa de incendios cita fuentes oficiales y responde a lo que se preguntan los propietarios.
- **Honesta:** sin opiniones inventadas, sin precios inventados y con las imágenes de IA marcadas como tales.
- **Ligera y respetuosa:** sin cookies, sin analítica, sin librerías externas; fotos en AVIF y WebP del tamaño justo para cada pantalla.
