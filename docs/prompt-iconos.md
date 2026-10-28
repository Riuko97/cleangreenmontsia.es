# Prompt para encargar los iconos a ChatGPT

Los iconos de la web están en un solo archivo, `src/publico/img/iconos.svg`. Para cambiarlos por un juego nuevo, copia el prompt de abajo en ChatGPT. Cuando te devuelva el archivo SVG, pásamelo: lo reviso, lo pruebo en la web y sustituyo el actual.

---

**Prompt (cópialo entero):**

> Diseña un juego de 32 iconos en SVG para la web de CleanGreen, una empresa de limpieza de casas, jardinería, desbroce de parcelas y cuidado de segundas residencias en el Montsià (Tarragona). La web tiene un estilo formal, de cartografía y grabado técnico: papel marfil, verde oscuro y ocre, filetes finos y tipografía con serifa.
>
> **Estilo de los iconos**
> - Dibujo de línea, como un grabado técnico o un plano: sobrio, elegante y nada infantil. Nada de estilo «cartoon», degradados, sombras, 3D ni emojis.
> - Todos con el mismo peso visual y la misma lógica de dibujo, para que se vean como una familia.
> - Inspiración mediterránea y rural cuando tenga sentido: olivo, algarrobo, muro de piedra seca y tejas.
>
> **Requisitos técnicos (obligatorios)**
> - Un único archivo SVG que funcione como sprite: `<svg xmlns="http://www.w3.org/2000/svg">` con un `<symbol>` por icono.
> - Cada símbolo con `viewBox="0 0 24 24"` y dibujado dentro de un margen de seguridad de 2 px (de 2 a 22).
> - Solo trazo: `fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"`. Si hace falta un punto pequeño, un `circle` relleno con `fill="currentColor"` de radio 1 como máximo.
> - Sin colores fijos, sin `style`, sin `class`, sin texto, sin `transform`, sin `<image>` y sin elementos ocultos. Solo `path`, `circle`, `line`, `polyline` y `rect`.
> - Coordenadas con un decimal como máximo.
> - Usa exactamente estos `id` (la web ya los usa):
>
> | id | Qué debe representar |
> |---|---|
> | i-casa | Casa mediterránea de una planta con tejado a dos aguas |
> | i-hoja | Hoja de olivo (jardinería) |
> | i-arbol | Olivo o algarrobo con el tronco retorcido |
> | i-cesped | Hierba cortada con un borde recto |
> | i-poda | Tijeras de podar |
> | i-rastrillo | Rastrillo de jardín |
> | i-ramas | Ramas y restos de poda |
> | i-zarza | Zarza con algunas moras |
> | i-invasora | Caña o planta invasiva con una pequeña cruz |
> | i-desbroce | Desbrozadora de hilo cortando hierba |
> | i-solar | Solar con una valla y una señal |
> | i-retirada | Remolque o camioneta cargada de restos |
> | i-cubo | Cubo de limpieza con una bayeta |
> | i-cristal | Ventana con un reflejo, para limpieza de cristales |
> | i-llave | Llave antigua (segundas residencias) |
> | i-candado | Candado (cierre de temporada) |
> | i-maleta | Maleta (casa lista para tu llegada) |
> | i-ojo | Ojo (revisiones periódicas) |
> | i-calendario | Calendario con una marca |
> | i-presupuesto | Hoja de presupuesto con el símbolo € |
> | i-fuego | Llama (riesgo de incendio) |
> | i-sinfuego | Llama tachada (prohibido quemar) |
> | i-aviso | Triángulo de aviso con exclamación |
> | i-ubicacion | Marcador de mapa |
> | i-telefono | Auricular de teléfono |
> | i-camara | Cámara de fotos |
> | i-check | Marca de verificación simple |
> | i-flecha | Flecha hacia la derecha |
> | i-flechas | Dos flechas, izquierda y derecha (comparador antes/después) |
> | i-abajo | Chevrón hacia abajo |
> | i-menu | Tres líneas horizontales (menú) |
> | i-cerrar | Aspa (cerrar) |
>
> Devuélveme el archivo SVG completo, listo para guardar como `iconos.svg`. Después enséñame una lámina con todos los iconos a 24 y a 48 px, para revisarlos.

---

**Notas**

- El icono de WhatsApp no se cambia: es el logotipo oficial de la marca (`i-whatsapp`, de Simple Icons). Lo conservaré yo al juntar los archivos.
- Si algún icono no encaja (un trazo más grueso, algo que se sale del margen…), pídele a ChatGPT que corrija solo ese, con el mismo prompt.
- Antes de publicarlos, la web se comprueba con `npm run build`, `npm run check` y capturas a 1440 y 390 px.
