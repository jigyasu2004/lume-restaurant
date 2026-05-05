"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { MenuCard } from "@/components/menu/MenuCard";
import { Input } from "@/components/ui/Input";
import { menuCategories, menuItems, type MenuCategory } from "@/data/menu";

type CategoryFilter = "All" | MenuCategory;

const allTags = Array.from(new Set(menuItems.flatMap((item) => item.tags))).sort();

export function MenuPageClient() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [tag, setTag] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const tagMatch = tag === "All" || item.tags.includes(tag);
      const queryMatch =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase());

      return categoryMatch && tagMatch && queryMatch;
    });
  }, [category, query, tag]);

  return (
    <div className="section-shell py-32 sm:py-36">
      <div className="mb-10 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Full menu</p>
        <h1 className="mt-4 font-serif text-5xl text-ivory sm:text-6xl">Menu</h1>
        <p className="mt-5 text-mutedText">
          Filter chef-crafted dishes by category, dietary tag, popularity, and mood.
        </p>
      </div>

      <div className="mb-8 grid gap-4 rounded-lg border border-gold/25 bg-surface p-4 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gold" />
          <label className="sr-only" htmlFor="menu-search">
            Search menu
          </label>
          <Input
            id="menu-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search dishes or ingredients"
            className="pl-11"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["All", ...menuCategories] as CategoryFilter[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-lg border px-4 py-3 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                category === item
                  ? "border-gold bg-gold text-charcoal"
                  : "border-gold/25 bg-[#151515] text-ivory hover:border-gold"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-2">
        {["All", ...allTags].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTag(item)}
            className={`rounded-md border px-3 py-2 text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
              tag === item
                ? "border-gold bg-gold text-charcoal"
                : "border-gold/20 bg-surface text-mutedText hover:text-gold"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="mb-5 text-sm text-mutedText">
        Showing {filtered.length} {filtered.length === 1 ? "item" : "items"}
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
