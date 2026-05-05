"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuCard } from "@/components/menu/MenuCard";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { menuByCategory, menuCategories, type MenuCategory } from "@/data/menu";

export function MenuPreview() {
  const [active, setActive] = useState<MenuCategory>("Starters");
  const items = menuByCategory(active).slice(0, 6);

  return (
    <section className="bg-gradient-to-b from-[#0b0b0b] to-charcoal py-20 sm:py-24">
      <div className="section-shell">
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Menu preview</p>
            <h2 className="section-title mt-4 font-serif text-ivory">Explore our menu</h2>
            <p className="mt-4 max-w-2xl text-mutedText">
              Carefully crafted starters, mains, desserts, drinks, and brunch plates.
            </p>
          </div>
          <Link href="/menu" className={buttonStyles({ variant: "outline" })}>
            View Full Menu
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap gap-3" role="tablist" aria-label="Menu categories">
          {menuCategories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active === category}
              onClick={() => setActive(category)}
              className={`rounded-lg border px-4 py-3 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                active === category
                  ? "border-gold bg-gold text-charcoal"
                  : "border-gold/25 bg-surface text-ivory hover:border-gold"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
