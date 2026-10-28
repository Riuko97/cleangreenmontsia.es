"""Prepara las fotos de la web en AVIF y WebP, en tres anchos.

Uso (necesita Python 3 y una versión de Pillow con AVIF: pip install -U pillow):

    python3 herramientas/optimizar-fotos.py CARPETA_CON_LAS_FOTOS

La carpeta tiene una foto horizontal por cada nombre de FOTOS que quieras
cambiar, en JPG, PNG o WebP: hogar.jpg, jardin.jpg, etc. Las que falten se dejan
como están. Si una foto no es 4:3, se recorta por el centro. El resultado se
guarda en src/publico/img/fotos/ como <nombre>-<ancho>.avif y .webp, sin datos
EXIF (ni GPS ni modelo de móvil).
"""
import io
import sys
from pathlib import Path

from PIL import Image, ImageOps

FOTOS = ['hogar', 'jardin', 'parcela-antes', 'parcela-despues', 'residencia', 'mantenimiento']
ANCHOS = [640, 960, 1280]
DESTINO = Path(__file__).resolve().parent.parent / 'src/publico/img/fotos'
CALIDAD = {'AVIF': {'quality': 55, 'speed': 4}, 'WEBP': {'quality': 65, 'method': 6}}


def buscar(origen: Path, nombre: str) -> Path | None:
    for ext in ('jpg', 'jpeg', 'png', 'webp'):
        if (origen / f'{nombre}.{ext}').exists():
            return origen / f'{nombre}.{ext}'
    return None


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    origen = Path(sys.argv[1])
    DESTINO.mkdir(parents=True, exist_ok=True)
    for nombre in FOTOS:
        archivo = buscar(origen, nombre)
        if archivo is None:
            print(f'{nombre}: no está en {origen}, se deja la actual')
            continue
        foto = ImageOps.exif_transpose(Image.open(archivo)).convert('RGB')
        foto = ImageOps.fit(foto, (1280, 960), Image.LANCZOS)  # recorta a 4:3 si hace falta
        for ancho in ANCHOS:
            copia = foto if ancho == 1280 else foto.resize((ancho, ancho * 3 // 4), Image.LANCZOS)
            for formato, opciones in CALIDAD.items():
                datos = io.BytesIO()
                copia.save(datos, formato, **opciones)
                salida = DESTINO / f'{nombre}-{ancho}.{formato.lower()}'
                salida.write_bytes(datos.getvalue())
                print(f'{salida.name:32} {datos.tell() // 1024:4} KB')


if __name__ == '__main__':
    main()
