import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { FeaturedDishes } from "@/components/sections/FeaturedDishes";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Hero } from "@/components/sections/Hero";
import { LocationContact } from "@/components/sections/LocationContact";
import { MenuPreview } from "@/components/sections/MenuPreview";
import { Newsletter } from "@/components/sections/Newsletter";
import { OrderingPreview } from "@/components/sections/OrderingPreview";
import { PrivateEvents } from "@/components/sections/PrivateEvents";
import { ReservationSection } from "@/components/sections/ReservationSection";
import { Reviews } from "@/components/sections/Reviews";
import { restaurantJsonLd } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "LUMÉ Dining | Modern Global Restaurant",
  description:
    "Experience chef-crafted dishes, elegant interiors, online reservations, private dining, and modern global cuisine at LUMÉ Dining.",
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd(siteUrl)) }}
      />
      <Hero />
      <FeaturedDishes />
      <About />
      <MenuPreview />
      <ReservationSection />
      <OrderingPreview />
      <PrivateEvents />
      <GalleryPreview />
      <Reviews />
      <LocationContact />
      <Newsletter />
    </>
  );
}
