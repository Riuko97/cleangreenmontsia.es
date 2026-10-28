# Diseño de la web

## Referencias estudiadas

| Web | Qué se ha tomado | Qué se ha evitado |
|---|---|---|
| [Aitor Soluciones](https://aitorsoluciones.com/) (competencia, Les Cases d'Alcanar) | Contacto por WhatsApp, proceso en pasos, zonas por pueblo, preguntas frecuentes | Paleta azul marino y naranja, titulares condensados, formulario largo |
| [Native Edge Landscapes](https://nativeedgelandscapes.com/) | Titular con serifa, fila de garantías bajo el botón | Foto de fondo oscura a pantalla completa |
| [Pearl Landscaping](https://www.pearllandscaping.com/) | Contraste entre secciones oscuras y claras | Carrusel de fotos |
| [Davey](https://www.davey.com/) | Contenido de autoridad: guía con normativa y fuentes | Menús complejos |

## Tipografía formal

- **Títulos: Playfair Display** (pesos 600 a 800). Es una serifa de alto contraste, clásica y seria, que da a la web un tono formal y de confianza. Los títulos van siempre en redonda (sin cursivas) y en un solo color: no hay palabras destacadas en otro color dentro de un título.
- **Texto: Figtree** (pesos 300 a 900). Sans serif clara y muy legible en el móvil. El texto base mide 17 o 18 px, pensando en propietarios de cualquier edad.
- Las dos fuentes están en la propia web (`src/publico/fonts/`), recortadas a los caracteres del castellano y el catalán, y se cargan con `font-display: swap`.

## Color

Los colores salen del logo:

| Uso | Color |
|---|---|
| Texto principal (tinta) | `#03241c` |
| Turquesa de la marca | `#00977a` (para texto, `#00735d`; sobre fondo oscuro, `#2fbf98`) |
| Fondo crema / crema 2 / línea | `#fbf7ef` / `#f4ecdc` / `#e2d6bf` |
| Texto secundario | `#4d5a52` |
| Verde bosque (fondos oscuros) | `#0b2a20` |
| Sol (detalles) | `#f0b448` |
| WhatsApp | `#25d366`, **solo** en botones que abren WhatsApp |
| Riesgo de incendio | `#b42318`, distinto del terracota de segundas residencias |

### Sistema de color por áreas

Cada área de servicio tiene su color, que se aplica con una clase (`.area-hogar`, `.area-jardin`…) a tarjetas, iconos, cabeceras de página, bloques, botones y submenú. La clase define tres variables: `--area` (color), `--area-osc` (para texto, contraste AA) y `--area-suave` (fondos).

| Área | `--area` | `--area-osc` | `--area-suave` |
|---|---|---|---|
| Limpieza de casas y pisos | `#2c6e8f` | `#1f5671` | `#e3eef4` |
| Jardinería | `#3f7d4e` | `#2f6340` | `#e6f0e6` |
| Desbroce y limpieza de parcelas | `#b07a2a` | `#8a5a14` | `#f5ead6` |
| Segundas residencias | `#b85c38` | `#9a4527` | `#f7e4da` |
| Mantenimiento periódico | `#00977a` | `#00735d` | `#d9f0e7` |

## Principios de la Gestalt aplicados

| Principio | Qué dice | Dónde se ve en la web |
|---|---|---|
| **Proximidad** | Lo que está cerca se percibe como un grupo | Una escala de espacios (`--e-1` a `--e-8`): dentro de un componente, como mucho 16 px; entre componentes, de 24 a 48 px; entre secciones, de 64 a 120 px. En cada tarjeta de servicio, el icono, el título y el texto van juntos, y la lista de lo que incluye queda separada por una línea fina. |
| **Semejanza** | Lo que se parece se percibe como relacionado | El color de cada área se repite en su tarjeta, su icono, su cabecera de página, su botón y su entrada del submenú: el verde de jardinería en todo lo de jardinería. Lo que tiene la misma función tiene el mismo aspecto: todos los botones de WhatsApp son verdes (y solo ellos) y todos los «ver más» llevan flecha. |
| **Región común** | Lo que comparte un fondo o un borde forma un grupo | Las tarjetas de área, los paneles laterales de las guías y la «hoja de encargo» del asistente de presupuesto encierran en un fondo blanco con borde lo que va junto. |
| **Continuidad** | El ojo sigue líneas y alineaciones | Los cuatro pasos de «Cómo trabajamos» están unidos por una línea discontinua. Todo se alinea a la misma rejilla y al mismo borde izquierdo; con cuatro servicios, la rejilla pasa a dos columnas para que no quede una tarjeta suelta. |
| **Cierre** | Completamos mentalmente las formas abiertas | El logo y los iconos se leen completos aunque tengan trazos abiertos. El comparador antes/después muestra media foto de cada momento y se completa al deslizar. |
| **Figura-fondo** | Distinguimos lo que destaca de lo que está detrás | Bandas de verde bosque que separan bloques; fotos enmarcadas con borde blanco y sombra sobre una mancha del color del área; una sola llamada principal (verde WhatsApp) en cada pantalla. |
| **Pregnancia y punto focal** | Preferimos las formas simples; un elemento domina | Formas simples (rectángulos redondeados, círculos, píldoras) y, en cada sección, un único elemento dominante: el título en Playfair Display. |

## Imágenes

Las fotos son **imágenes ilustrativas generadas con IA** y lo dicen: cada una lleva la nota «Imagen ilustrativa generada con IA» y su texto alternativo empieza igual. No se usan fotos de personas generadas con IA, para que nadie las confunda con el equipo real. Más detalles en [imagenes.md](imagenes.md).

## Accesibilidad

- Contraste AA en todos los textos (el texto de color usa siempre la variante `--area-osc`).
- `:focus-visible` claro en todo lo que se puede usar con el teclado; el comparador se mueve con las flechas.
- Respeta `prefers-reduced-motion`: sin animaciones si la persona lo ha pedido.
- Barra de contacto fija en el móvil, que se oculta al abrir el menú.
- Sin desbordes horizontales a 360 px.
- Funciona sin JavaScript: el menú pasa a una fila de enlaces, todos los apartados del asistente se ven y el botón abre WhatsApp con un enlace normal.
- Verificado con axe-core (0 incidencias en todas las páginas, a 1440 y 390 px) y con html-validate.

## En qué supera a la competencia

- **Más servicios, mejor ordenados:** cinco áreas con su propia página, su color y sus preguntas frecuentes, más páginas por pueblo y guías.
- **Pedir presupuesto es más fácil:** se marcan unas opciones y sale el mensaje de WhatsApp escrito, sin formularios ni datos guardados en ningún servidor.
- **Contenido útil:** la guía de normativa de incendios cita fuentes oficiales y responde a lo que se preguntan los propietarios.
- **Honesta:** sin opiniones inventadas, sin precios inventados y con las imágenes de IA marcadas como tales.
- **Ligera y respetuosa:** sin cookies, sin analítica, sin librerías externas; fotos en AVIF y WebP del tamaño justo para cada pantalla.
