import Image from "next/image";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { galleryImages } from "@/data/gallery";

export function GalleryPreview() {
  return (
    <section className="bg-gradient-to-b from-charcoal to-[#0b0b0b] py-20 sm:py-24">
      <div className="section-shell">
        <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Gallery</p>
            <h2 className="section-title mt-4 font-serif text-ivory">
              A glimpse into LUMÉ
            </h2>
            <p className="mt-4 max-w-2xl text-mutedText">
              Food, cocktails, interiors, and private dining moments with an editorial finish.
            </p>
          </div>
          <Link href="/gallery" className={buttonStyles({ variant: "outline" })}>
            View Gallery
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {galleryImages.slice(0, 8).map((image, index) => (
            <Link
              key={image.id}
              href="/gallery"
              className={`group relative overflow-hidden rounded-lg border border-gold/20 image-treatment ${
                index === 0 || index === 3 ? "row-span-2 aspect-[3/4]" : "aspect-square"
              }`}
            >
              <Image
                src={image.image}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-80" />
              <span className="absolute bottom-3 left-3 text-sm text-ivory">{image.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
