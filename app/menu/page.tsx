import type { Metadata } from "next";
import { MenuPageClient } from "@/components/menu/MenuPageClient";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore LUMÉ Dining's modern global menu with starters, mains, desserts, drinks, brunch, dietary tags, and online ordering.",
  alternates: {
    canonical: "/menu"
  }
};

export default function MenuPage() {
  return <MenuPageClient />;
}
