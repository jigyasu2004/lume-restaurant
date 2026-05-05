"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { MenuCard } from "@/components/menu/MenuCard";
import { Button } from "@/components/ui/Button";
import { menuCategories, menuItems, type MenuCategory } from "@/data/menu";
import { formatCurrency } from "@/lib/utils";

type CategoryFilter = "All" | MenuCategory;

export function OrderPageClient() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const {
    items,
    orderType,
    setOrderType,
    subtotal,
    tax,
    total,
    increaseItem,
    decreaseItem,
    removeItem,
    clearCart,
    checkout
  } = useCart();

  const filteredItems = useMemo(
    () => (category === "All" ? menuItems : menuItems.filter((item) => item.category === category)),
    [category]
  );

  return (
    <div className="section-shell py-32 sm:py-36">
      <div className="mb-10 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Online ordering</p>
        <h1 className="page-title mt-4 font-serif text-ivory">Order Online</h1>
        <p className="mt-5 text-mutedText">
          Choose pickup or delivery, add dishes, adjust quantities, and complete a polished mock
          checkout flow.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="mb-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
            {(["pickup", "delivery"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setOrderType(type)}
                className={`rounded-lg border px-5 py-4 text-sm font-semibold capitalize transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                  orderType === type
                    ? "border-gold bg-gold text-charcoal"
                    : "border-gold/25 bg-surface text-ivory hover:border-gold"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {(["All", ...menuCategories] as CategoryFilter[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-md border px-3 py-2 text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                  category === item
                    ? "border-gold bg-gold text-charcoal"
                    : "border-gold/20 bg-surface text-mutedText hover:text-gold"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-gold/25 bg-surface p-5 lg:sticky lg:top-28 lg:self-start">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-gold">{orderType}</p>
              <h2 className="font-serif text-3xl text-ivory">Cart</h2>
            </div>
            <ShoppingBag className="size-7 text-gold" />
          </div>

          {items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gold/25 p-10 text-center">
              <ShoppingBag className="mx-auto mb-4 size-10 text-gold/65" />
              <p className="text-ivory">Your cart is empty</p>
              <p className="mt-2 text-sm text-mutedText">Add a dish to start your order.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-lg border border-gold/20 bg-[#151515] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm text-ivory">{item.name}</h3>
                      <p className="mt-1 text-sm text-gold">{formatCurrency(item.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-md p-2 text-mutedText hover:bg-surface hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-gold/20">
                      <button
                        type="button"
                        onClick={() => decreaseItem(item.id)}
                        className="grid size-9 place-items-center text-ivory hover:bg-gold hover:text-charcoal"
                        aria-label={`Decrease ${item.name}`}
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="w-9 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => increaseItem(item.id)}
                        className="grid size-9 place-items-center text-ivory hover:bg-gold hover:text-charcoal"
                        aria-label={`Increase ${item.name}`}
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <span className="text-sm text-ivory">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 space-y-2 border-t border-gold/20 pt-4 text-sm">
            <div className="flex justify-between text-mutedText">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-mutedText">
              <span>Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between pt-2 text-base font-semibold text-ivory">
              <span>Total</span>
              <span className="text-gold">{formatCurrency(total)}</span>
            </div>
          </div>
          <Button className="mt-5 w-full" onClick={checkout} disabled={items.length === 0}>
            Mock Checkout
          </Button>
          <Button
            variant="ghost"
            className="mt-3 w-full"
            onClick={clearCart}
            disabled={items.length === 0}
          >
            Clear Cart
          </Button>
        </aside>
      </div>
    </div>
  );
}
