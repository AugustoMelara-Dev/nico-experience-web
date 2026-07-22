"""Genera logotipos web monocromáticos fieles desde el activo de marca."""

from pathlib import Path

from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "source-assets" / "brand" / "nico-experience-logo.jpeg"
OUTPUT = ROOT / "public" / "brand"


def normalized_rgb(source: Path) -> Image.Image:
    with Image.open(source) as image:
        return ImageOps.exif_transpose(image).convert("RGB")


def content_mask(image: Image.Image) -> Image.Image:
    """Convierte el fondo blanco en una máscara limpia y reduce sombras 3D."""

    mask = Image.new("L", image.size)
    pixels: list[int] = []
    for red, green, blue in image.getdata():
        distance = ((255 - red) ** 2 + (255 - green) ** 2 + (255 - blue) ** 2) ** 0.5
        alpha = round(max(0, min(255, (distance - 28) * 255 / 72)))
        pixels.append(alpha)
    mask.putdata(pixels)
    return mask.filter(ImageFilter.GaussianBlur(0.35))


def monochrome_asset(image: Image.Image, max_width: int) -> Image.Image:
    mask = content_mask(image)
    box = mask.getbbox()
    if box is None:
        raise ValueError("No se encontró contenido de marca en la imagen fuente")

    image_mask = mask.crop(box)
    padding = max(8, round(image_mask.height * 0.04))
    padded = Image.new(
        "L",
        (image_mask.width + padding * 2, image_mask.height + padding * 2),
    )
    padded.paste(image_mask, (padding, padding))

    if padded.width > max_width:
        target_height = round(padded.height * max_width / padded.width)
        padded = padded.resize((max_width, target_height), Image.Resampling.LANCZOS)

    output = Image.new("RGBA", padded.size, (0, 0, 0, 0))
    output.putalpha(padded)
    return output


def save_asset(image: Image.Image, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination, "WEBP", lossless=True, method=6)
    print(f"{destination.relative_to(ROOT)}")


def main() -> None:
    source = normalized_rgb(SOURCE)
    width, height = source.size

    lockup = source.crop(
        (
            round(width * 0.055),
            round(height * 0.08),
            round(width * 0.945),
            round(height * 0.91),
        )
    )
    wordmark = source.crop(
        (
            round(width * 0.055),
            round(height * 0.50),
            round(width * 0.945),
            round(height * 0.70),
        )
    )

    save_asset(
        monochrome_asset(lockup, max_width=1400),
        OUTPUT / "nico-experience-lockup-mono.webp",
    )
    save_asset(
        monochrome_asset(wordmark, max_width=1000),
        OUTPUT / "nico-experience-wordmark-mono.webp",
    )


if __name__ == "__main__":
    main()
