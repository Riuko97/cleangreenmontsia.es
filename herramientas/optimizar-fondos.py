"""Prepara los fondos de las cabeceras y de la portada en AVIF y WebP.

Uso (necesita Python 3 y una versión de Pillow con AVIF: pip install -U pillow):

    python3 herramientas/optimizar-fondos.py CARPETA_CON_LOS_FONDOS

Cada fondo es una imagen apaisada 3:1 (por ejemplo 1920 x 640) con un lado
vacío, para el texto, y el motivo en el otro: a la derecha, salvo los de
MOTIVO_A_LA_IZQUIERDA. Nombres de archivo: los de FONDOS, en JPG, PNG o WebP
(limpieza.jpg, jardineria.jpg, etc.). Los que falten se dejan como están.
Cada nombre corresponde a una clase de estilos.css: .cabecera--limpieza,
.cabecera--portada, .fondo--cuidado-residencias…

Se guardan en src/publico/img/fondos/, sin datos EXIF:
- <nombre>-1440.avif/.webp, hasta 1440 px de ancho de pantalla, y
  <nombre>-1920.avif/.webp, para pantallas más anchas (los de SOLO_1920 usan
  siempre la de 1920 px y no tienen la de 1440);
- <nombre>-movil-640.avif/.webp, hasta 700 px: un recorte 3:2 de la mitad
  donde está el motivo, para el fondo aclarado del móvil.
Son las versiones que usan estilos.css y la precarga de plantilla.js.
"""
import io
import sys
from pathlib import Path

from PIL import Image, ImageOps

FONDOS = ['limpieza', 'jardineria', 'desbroce', 'segunda-residencia', 'mantenimiento', 'servicios', 'contacto', 'zonas',
          'portada', 'cuidado-residencias']
MOTIVO_A_LA_IZQUIERDA = {'cuidado-residencias'}
# Cubre una sección mucho más alta que una cabecera y se amplía más
SOLO_1920 = {'cuidado-residencias'}
ANCHOS = [1440, 1920]
ANCHO_MOVIL = 640
DESTINO = Path(__file__).resolve().parent.parent / 'src/publico/img/fondos'
CALIDAD = {'AVIF': {'quality': 52, 'speed': 4}, 'WEBP': {'quality': 70, 'method': 6}}


def buscar(origen: Path, nombre: str) -> Path | None:
    for ext in ('jpg', 'jpeg', 'png', 'webp'):
        if (origen / f'{nombre}.{ext}').exists():
            return origen / f'{nombre}.{ext}'
    return None


def guardar(imagen: Image.Image, nombre: str) -> None:
    for formato, opciones in CALIDAD.items():
        datos = io.BytesIO()
        imagen.save(datos, formato, **opciones)
        salida = DESTINO / f'{nombre}.{formato.lower()}'
        salida.write_bytes(datos.getvalue())
        print(f'{salida.name:34} {datos.tell() // 1024:4} KB')


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    origen = Path(sys.argv[1])
    DESTINO.mkdir(parents=True, exist_ok=True)
    for nombre in FONDOS:
        archivo = buscar(origen, nombre)
        if archivo is None:
            print(f'{nombre}: no está en {origen}, se deja el actual')
            continue
        fondo = ImageOps.exif_transpose(Image.open(archivo)).convert('RGB')
        fondo = ImageOps.fit(fondo, (1920, 640), Image.LANCZOS)  # recorta a 3:1 si hace falta
        for ancho in ANCHOS:
            if nombre in SOLO_1920 and ancho != 1920:
                continue
            copia = fondo if ancho == 1920 else fondo.resize((ancho, ancho // 3), Image.LANCZOS)
            guardar(copia, f'{nombre}-{ancho}')
        # Móvil: la mitad donde está el motivo (960 x 640, proporción 3:2)
        mitad = fondo.crop((0, 0, 960, 640) if nombre in MOTIVO_A_LA_IZQUIERDA else (960, 0, 1920, 640))
        guardar(mitad.resize((ANCHO_MOVIL, ANCHO_MOVIL * 2 // 3), Image.LANCZOS), f'{nombre}-movil-{ANCHO_MOVIL}')


if __name__ == '__main__':
    main()
