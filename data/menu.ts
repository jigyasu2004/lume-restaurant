export type MenuCategory = "Starters" | "Mains" | "Desserts" | "Drinks" | "Brunch";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  image: string;
  tags: string[];
  isPopular: boolean;
  isChefPick: boolean;
};

export const menuCategories: MenuCategory[] = [
  "Starters",
  "Mains",
  "Desserts",
  "Drinks",
  "Brunch"
];

export const menuItems: MenuItem[] = [
  {
    id: "burrata-heirloom-tomato",
    name: "Burrata & Heirloom Tomato",
    category: "Starters",
    description: "Creamy burrata, basil oil, aged balsamic, toasted sourdough.",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1598309141235-06d295271f81?auto=format&fit=crop&w=900&q=80",
    tags: ["Vegetarian", "Chef's Pick"],
    isPopular: false,
    isChefPick: true
  },
  {
    id: "seared-tuna-tataki",
    name: "Seared Tuna Tataki",
    category: "Starters",
    description: "Sesame crust, citrus soy, pickled cucumber.",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1541963020-4f9732b3ee29?auto=format&fit=crop&w=900&q=80",
    tags: ["New", "Light"],
    isPopular: false,
    isChefPick: false
  },
  {
    id: "wild-mushroom-risotto",
    name: "Wild Mushroom Risotto",
    category: "Mains",
    description: "Parmesan, truffle oil, herb gremolata.",
    price: 24,
    image:
      "https://images.unsplash.com/photo-1718939043990-83078968ae7e?auto=format&fit=crop&w=900&q=80",
    tags: ["Vegetarian", "Chef's Pick"],
    isPopular: false,
    isChefPick: true
  },
  {
    id: "charred-citrus-salmon",
    name: "Charred Citrus Salmon",
    category: "Mains",
    description: "Fennel salad, lemon butter, seasonal greens.",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1771995356656-3a5e975318e9?auto=format&fit=crop&w=900&q=80",
    tags: ["Gluten-Free", "Popular"],
    isPopular: true,
    isChefPick: false
  },
  {
    id: "heritage-roast-chicken",
    name: "Heritage Roast Chicken",
    category: "Mains",
    description: "Herb jus, charred vegetables, roasted garlic mash.",
    price: 27,
    image:
      "https://images.unsplash.com/photo-1763186711083-406cf3ea5665?auto=format&fit=crop&w=900&q=80",
    tags: ["Popular"],
    isPopular: true,
    isChefPick: false
  },
  {
    id: "dark-chocolate-fondant",
    name: "Dark Chocolate Fondant",
    category: "Desserts",
    description: "Hazelnut cream, vanilla gelato.",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1762631176828-0df84208e91b?auto=format&fit=crop&w=900&q=80",
    tags: ["Signature"],
    isPopular: false,
    isChefPick: false
  },
  {
    id: "citrus-pavlova",
    name: "Citrus Pavlova",
    category: "Desserts",
    description: "Meringue, citrus curd, berries, whipped cream.",
    price: 11,
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80",
    tags: ["Light"],
    isPopular: false,
    isChefPick: false
  },
  {
    id: "signature-citrus-spritz",
    name: "Signature Citrus Spritz",
    category: "Drinks",
    description: "Botanical aperitif, orange, sparkling wine.",
    price: 11,
    image:
      "https://images.unsplash.com/photo-1767745455688-49391131f751?auto=format&fit=crop&w=900&q=80",
    tags: ["Signature"],
    isPopular: false,
    isChefPick: false
  },
  {
    id: "golden-espresso-martini",
    name: "Golden Espresso Martini",
    category: "Drinks",
    description: "Espresso, vanilla, coffee liqueur, velvet foam.",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1591603319407-756301df8815?auto=format&fit=crop&w=900&q=80",
    tags: ["Popular"],
    isPopular: true,
    isChefPick: false
  },
  {
    id: "weekend-brunch-plate",
    name: "Weekend Brunch Plate",
    category: "Brunch",
    description: "Soft eggs, grilled sourdough, greens, roasted tomato.",
    price: 19,
    image:
      "https://images.unsplash.com/photo-1561865259-174cbd7e0fd3?auto=format&fit=crop&w=900&q=80",
    tags: ["Brunch"],
    isPopular: false,
    isChefPick: false
  }
];

export const featuredDishes = menuItems.filter(
  (item) =>
    item.id === "wild-mushroom-risotto" ||
    item.id === "charred-citrus-salmon" ||
    item.id === "burrata-heirloom-tomato" ||
    item.id === "dark-chocolate-fondant"
);

export const menuByCategory = (category: MenuCategory | "All") =>
  category === "All" ? menuItems : menuItems.filter((item) => item.category === category);
