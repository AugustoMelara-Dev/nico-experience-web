"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Property } from "@/content/properties";

export function GalleryLightbox({ images }: { images: Property["gallery"] }) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIndex(null);
      if (event.key === "ArrowRight") setIndex((value) => value === null ? null : (value + 1) % images.length);
      if (event.key === "ArrowLeft") setIndex((value) => value === null ? null : (value - 1 + images.length) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
  }, [index, images.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {images.slice(0, 8).map((image, imageIndex) => (
          <button key={image.src} type="button" onClick={() => setIndex(imageIndex)} aria-label={`Ampliar: ${image.alt}`} className={`group relative overflow-hidden rounded-xl ${imageIndex === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-square"}`}>
            <Image src={image.src} alt={image.alt} fill sizes={imageIndex === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-white/90 text-forest opacity-0 transition-opacity group-hover:opacity-100"><Expand className="size-4" /></span>
          </button>
        ))}
      </div>
      {index !== null && (
        <div role="dialog" aria-modal="true" aria-label="Galería ampliada" className="fixed inset-0 z-[80] grid place-items-center bg-black/92 p-4">
          <button type="button" onClick={() => setIndex(null)} aria-label="Cerrar galería" className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white text-forest"><X /></button>
          <button type="button" onClick={() => setIndex((index - 1 + images.length) % images.length)} aria-label="Imagen anterior" className="absolute left-3 z-10 grid size-11 place-items-center rounded-full bg-white text-forest sm:left-6"><ChevronLeft /></button>
          <figure className="w-full max-w-6xl"><div className="relative mx-auto aspect-[4/3] max-h-[78vh]"><Image src={images[index].src} alt={images[index].alt} fill sizes="95vw" className="object-contain" priority /></div><figcaption className="mt-4 text-center text-sm text-white/80">{images[index].title ?? images[index].alt}</figcaption></figure>
          <button type="button" onClick={() => setIndex((index + 1) % images.length)} aria-label="Imagen siguiente" className="absolute right-3 z-10 grid size-11 place-items-center rounded-full bg-white text-forest sm:right-6"><ChevronRight /></button>
        </div>
      )}
    </>
  );
}
