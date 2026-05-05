import type { Metadata } from "next";
import { GalleryPageClient } from "@/app/gallery/GalleryPageClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View the LUMÉ Dining gallery with food, interiors, drinks, private events, category filters, and lightbox previews.",
  alternates: {
    canonical: "/gallery"
  }
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
