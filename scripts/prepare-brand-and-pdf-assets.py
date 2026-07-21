"""Prepara activos web y PDF sin alterar el contenido de las fuentes."""

from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
BRAND_SOURCE = ROOT / "source-assets" / "brand" / "nico-experience-logo.jpeg"
HERO_SOURCE = ROOT / "source-assets" / "hero" / "nico-experience-neutral.png"
PROPERTY_SOURCE = ROOT / "source-photos" / "casa-vip"

PROPERTY_NAMES = [
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

PDF_SELECTION = {
    "piscina-noche-principal",
    "terraza-dia",
    "sala-comedor",
    "cocina-principal",
    "habitacion-01",
    "bano-tina",
}


def normalized_rgb(source: Path) -> Image.Image:
    with Image.open(source) as image:
        return ImageOps.exif_transpose(image).convert("RGB")


def save_web(
    source: Path,
    destination: Path,
    max_size: tuple[int, int],
    quality: int = 88,
) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    image = normalized_rgb(source)
    image.thumbnail(max_size, Image.Resampling.LANCZOS)
    image.save(destination, "WEBP", quality=quality, method=6)
    print(f"{source.name} -> {destination.relative_to(ROOT)}")


def save_pdf_jpeg(
    source: Path,
    destination: Path,
    max_size: tuple[int, int],
) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    image = normalized_rgb(source)
    image.thumbnail(max_size, Image.Resampling.LANCZOS)
    image.save(
        destination,
        "JPEG",
        quality=86,
        optimize=True,
        progressive=True,
    )
    print(f"{source.name} -> {destination.relative_to(ROOT)}")


def property_sources() -> dict[str, Path]:
    sources = sorted(PROPERTY_SOURCE.glob("*.jpeg"))
    if len(sources) != len(PROPERTY_NAMES):
        raise SystemExit(
            f"Se esperaban {len(PROPERTY_NAMES)} JPEG y se encontraron {len(sources)}"
        )
    return dict(zip(PROPERTY_NAMES, sources, strict=True))


def main() -> None:
    save_web(
        BRAND_SOURCE,
        ROOT / "public" / "brand" / "nico-experience-logo.webp",
        (640, 360),
        quality=90,
    )
    save_pdf_jpeg(
        BRAND_SOURCE,
        ROOT / "public" / "brand" / "nico-experience-logo.jpg",
        (1000, 563),
    )
    save_web(
        HERO_SOURCE,
        ROOT / "public" / "images" / "hero" / "nico-experience-neutral.webp",
        (1800, 1200),
        quality=90,
    )

    sources = property_sources()
    for name in sorted(PDF_SELECTION):
        save_pdf_jpeg(
            sources[name],
            ROOT / "public" / "pdf-assets" / "casa-palac" / f"{name}.jpg",
            (1400, 1050),
        )


if __name__ == "__main__":
    main()
