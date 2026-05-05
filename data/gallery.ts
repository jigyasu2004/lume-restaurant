export type GalleryCategory = "Food" | "Interior" | "Drinks" | "Events";

export type GalleryImage = {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  alt: string;
};

export const galleryCategories: GalleryCategory[] = ["Food", "Interior", "Drinks", "Events"];

export const galleryImages: GalleryImage[] = [
  {
    id: "plated-risotto",
    title: "Truffle risotto service",
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1718939043990-83078968ae7e?auto=format&fit=crop&w=1000&q=80",
    alt: "A refined mushroom risotto plate with herbs"
  },
  {
    id: "salmon-fennel",
    title: "Charred citrus salmon",
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1771995356656-3a5e975318e9?auto=format&fit=crop&w=1000&q=80",
    alt: "Charred salmon with greens on a dark plate"
  },
  {
    id: "dining-room",
    title: "Golden dining room",
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1776993298429-9e68237f433a?auto=format&fit=crop&w=1000&q=80",
    alt: "Elegant dark restaurant dining room with warm lighting"
  },
  {
    id: "banquette",
    title: "Intimate banquette",
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1776993298456-98c71c0e177e?auto=format&fit=crop&w=1000&q=80",
    alt: "Luxury dining interior with warm pendant lighting"
  },
  {
    id: "citrus-spritz",
    title: "Signature spritz",
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1767745455688-49391131f751?auto=format&fit=crop&w=1000&q=80",
    alt: "Sparkling citrus cocktail in a stemmed glass"
  },
  {
    id: "espresso-martini",
    title: "Golden espresso martini",
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1591603319407-756301df8815?auto=format&fit=crop&w=1000&q=80",
    alt: "Espresso martini with a velvety foam top"
  },
  {
    id: "private-table",
    title: "Private dining table",
    category: "Events",
    image:
      "https://images.unsplash.com/photo-1768697358705-c1b60333da35?auto=format&fit=crop&w=1000&q=80",
    alt: "Private dining table arranged for a celebration"
  },
  {
    id: "dessert-service",
    title: "Dessert course",
    category: "Events",
    image:
      "https://images.unsplash.com/photo-1762631176828-0df84208e91b?auto=format&fit=crop&w=1000&q=80",
    alt: "Chocolate dessert served with cream"
  }
];
