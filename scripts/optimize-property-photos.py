"""Regenera las fotos WebP desde los JPEG originales sin alterar su contenido."""

from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "source-photos" / "casa-vip"
OUTPUT = ROOT / "public" / "images" / "casa-palac-frente-a-playa"

NAMES = [
    "piscina-terraza-noche-01",
    "piscina-terraza-noche-02",
    "terraza-noche-01",
    "piscina-noche-principal",
    "piscina-terraza-noche-03",
    "piscina-exterior-noche",
    "pasillo-interior",
    "cocina-mesada",
    "comedor-cocina",
    "cocina-principal",
    "bano-tina",
    "sala-comedor",
    "terraza-vista",
    "sala-principal",
    "terraza-dia",
    "habitacion-01",
    "bano-01",
    "habitacion-02",
    "cocina-02",
    "exterior-escaleras",
    "exterior-deck",
    "exterior-estacionamiento",
    "habitacion-03",
    "habitacion-literas",
    "corredor-hamacas",
]


def main() -> None:
    sources = sorted(SOURCE.glob("*.jpeg"))
    if len(sources) != len(NAMES):
        raise SystemExit(f"Se esperaban {len(NAMES)} JPEG y se encontraron {len(sources)}")

    OUTPUT.mkdir(parents=True, exist_ok=True)
    for source, name in zip(sources, NAMES, strict=True):
        with Image.open(source) as image:
            normalized = ImageOps.exif_transpose(image).convert("RGB")
            normalized.save(
                OUTPUT / f"{name}.webp",
                "WEBP",
                quality=90,
                method=6,
                exact=True,
            )
        print(f"{source.name} -> {name}.webp")


if __name__ == "__main__":
    main()
