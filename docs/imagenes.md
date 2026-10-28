# Imágenes de la web

## Lo que ya está hecho

Todas las imágenes actuales están dibujadas en vectorial (SVG). Se ven nítidas en cualquier pantalla y pesan muy poco.

- **Logo:** `img/logo-cleangreen.svg` (texto oscuro), `img/logo-cleangreen-blanco.svg` (para fondos oscuros), `img/logo-cleangreen-completo.svg` (con «Desbroce y limpieza de parcelas») e `img/icono-cleangreen.svg` (solo el icono). Es una versión vectorial del logo de CleanGreen, con la misma casa, hoja y destello.
- **Ilustración del antes y el después:** `img/ilustraciones/parcela-despues.svg` y `parcela-antes.svg`, con la Serra del Montsià al fondo.
- **Iconos de servicios:** `img/iconos.svg`.
- **Imagen para compartir en redes y WhatsApp:** `img/og-cleangreen.jpg` (1200 × 630).
- **Favicon e iconos de la app:** `favicon.ico`, `img/apple-touch-icon.png` e `img/icono-*.png`.

## Fotos del equipo: mejor reales

No conviene poner en la web personas generadas con IA presentadas como tu equipo. El cliente cree que verá a esas personas en su parcela. Además, el reglamento europeo de IA obliga a avisar cuando una imagen realista está generada o manipulada con IA.

Lo que mejor funciona y más confianza da:

- Una foto real tuya o del equipo trabajando, aunque sea con el móvil. Que se vea la ropa de trabajo y la maquinaria.
- Fotos reales de antes y después de cada trabajo, hechas desde el mismo sitio y con el mismo encuadre.

## Cuando tengas fotos reales de antes y después

El comparador de la portada funciona igual con fotos:

1. Haz las dos fotos desde el mismo punto, en horizontal y con proporción 4:3.
2. Guárdalas como `img/fotos/antes-1.jpg` y `img/fotos/despues-1.jpg`, a unos 1280 × 960 px y por debajo de 250 KB cada una.
3. En `index.html`, dentro de `<div class="comparador" data-comparador>`, cambia el `src` de las dos imágenes:
   - la primera, la de clase normal, por la foto de **después**;
   - la segunda, `class="comparador__antes"`, por la foto de **antes**.
4. Cambia el texto `alt` para describir el trabajo real, por ejemplo: «Parcela en Alcanar antes y después del desbroce».
5. Cambia el pie «Ilustración: arrastra para ver el antes y el después» por «Trabajo real en Alcanar: arrastra para comparar».

## Si quieres imágenes de ChatGPT

Úsalas solo como **imágenes ilustrativas**, nunca como «nuestro trabajo» ni como «nuestro equipo». Pon en el `alt` y en el pie de foto «Imagen ilustrativa».

Indicaciones para pedírselas a ChatGPT:

**Escena de desbroce (para una futura sección de servicios)**
> Fotografía realista, horizontal 4:3. Un operario de espaldas desbrozando hierba alta y seca con una desbrozadora de hilo en una parcela del sur de Cataluña, con olivos y algarrobos y la Serra del Montsià al fondo. Lleva casco con pantalla, protectores auditivos, guantes y pantalón de protección. Luz de primera hora de la mañana, colores naturales. No se le ve la cara. Sin texto, sin logotipos, sin marcas.

**Parcela limpia**
> Fotografía realista, horizontal 4:3. Parcela recién desbrozada y limpia en el Montsià (Tarragona), con una casa de campo blanca de tejado de teja, un algarrobo grande y un muro de piedra seca. Suelo segado de forma uniforme, sin restos. Cielo despejado, luz cálida de tarde. Sin personas, sin texto.

**Retirada de restos**
> Fotografía realista, horizontal 4:3. Remolque cargado con ramas y restos de poda junto a una parcela rural mediterránea, con la parcela ya limpia detrás. Sin personas reconocibles, sin matrículas legibles, sin texto ni logotipos.

Al descargar cada imagen:
- conviértela a JPG o WebP de menos de 250 KB, a unos 1280 px de ancho;
- guárdala en `img/fotos/` con un nombre descriptivo, por ejemplo `desbroce-ilustrativa.jpg`.
