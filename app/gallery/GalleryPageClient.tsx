"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { galleryCategories, galleryImages, type GalleryCategory, type GalleryImage } from "@/data/gallery";

type GalleryFilter = "All" | GalleryCategory;

export function GalleryPageClient() {
  const [filter, setFilter] = useState<GalleryFilter>("All");
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const images = useMemo(
    () => (filter === "All" ? galleryImages : galleryImages.filter((image) => image.category === filter)),
    [filter]
  );

  return (
    <div className="section-shell py-32 sm:py-36">
      <div className="mb-10 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Gallery</p>
        <h1 className="mt-4 font-serif text-5xl text-ivory sm:text-6xl">Gallery</h1>
        <p className="mt-5 text-mutedText">
          Explore the food, interiors, cocktails, and event moments that define LUMÉ Dining.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {(["All", ...galleryCategories] as GalleryFilter[]).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`rounded-lg border px-4 py-3 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
              filter === category
                ? "border-gold bg-gold text-charcoal"
                : "border-gold/25 bg-surface text-ivory hover:border-gold"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`group relative overflow-hidden rounded-lg border border-gold/20 image-treatment focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
              index % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
            }`}
            aria-label={`Open ${image.title}`}
          >
            <Image
              src={image.image}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent opacity-80" />
            <span className="absolute bottom-3 left-3 text-left text-sm text-ivory">
              {image.title}
            </span>
          </button>
        ))}
      </div>

      <Modal
        open={Boolean(activeImage)}
        onClose={() => setActiveImage(null)}
        title={activeImage?.title || "Gallery image"}
        description={activeImage?.category}
        className="max-w-4xl"
      >
        {activeImage ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg image-treatment">
            <Image
              src={activeImage.image}
              alt={activeImage.alt}
              fill
              sizes="90vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
