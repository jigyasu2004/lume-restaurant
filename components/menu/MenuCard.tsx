"use client";

import { Plus, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import type { MenuItem } from "@/data/menu";
import { formatCurrency } from "@/lib/utils";

type MenuCardProps = {
  item: MenuItem;
  compact?: boolean;
};

export function MenuCard({ item, compact = false }: MenuCardProps) {
  const { addItem } = useCart();

  return (
    <article className="group overflow-hidden rounded-lg border border-gold/25 bg-surface transition duration-300 hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
      <div className={compact ? "flex min-h-40 gap-4" : ""}>
        <div
          className={`relative image-treatment overflow-hidden ${
            compact ? "hidden w-40 shrink-0 sm:block" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes={compact ? "160px" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {item.isChefPick ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-charcoal/85 px-2 py-1 text-xs text-gold backdrop-blur">
                <Sparkles className="size-3" />
                Chef
              </span>
            ) : null}
            {item.isPopular ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-charcoal/85 px-2 py-1 text-xs text-gold backdrop-blur">
                <Star className="size-3 fill-current" />
                Popular
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">{item.category}</p>
              <h3 className="mt-2 text-xl text-ivory">{item.name}</h3>
            </div>
            <span className="shrink-0 text-base font-semibold text-gold">
              {formatCurrency(item.price)}
            </span>
          </div>
          <p className="mt-3 flex-1 text-sm leading-6 text-mutedText">{item.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-gold/20 bg-[#202020] px-2.5 py-1 text-xs text-gold"
              >
                {tag}
              </span>
            ))}
          </div>
          <Button className="mt-5 w-full" onClick={() => addItem(item)}>
            <Plus className="size-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
