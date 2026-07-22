"""Prepara fondos JPEG compatibles con Satori para tarjetas sociales."""

from pathlib import Path

from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "images" / "social"

SOURCES = {
    "nico-experience.jpg": ROOT
    / "public"
    / "images"
    / "hero"
    / "nico-experience-neutral.webp",
    "casa-palac.jpg": ROOT
    / "public"
    / "images"
    / "casa-palac-frente-a-playa"
    / "piscina-noche-principal.webp",
}


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for filename, source in SOURCES.items():
        with Image.open(source) as image:
            normalized = ImageOps.exif_transpose(image).convert("RGB")
            social = ImageOps.fit(
                normalized,
                (1200, 630),
                method=Image.Resampling.LANCZOS,
                centering=(0.5, 0.5),
            ).filter(ImageFilter.UnsharpMask(radius=0.8, percent=60, threshold=3))
            destination = OUTPUT / filename
            social.save(
                destination,
                "JPEG",
                quality=92,
                optimize=True,
                progressive=True,
            )
            print(destination.relative_to(ROOT))


if __name__ == "__main__":
    main()
