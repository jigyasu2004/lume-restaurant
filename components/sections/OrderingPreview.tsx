"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { Button, buttonStyles } from "@/components/ui/Button";
import { featuredDishes } from "@/data/menu";
import { formatCurrency } from "@/lib/utils";

export function OrderingPreview() {
  const {
    items,
    orderType,
    setOrderType,
    addItem,
    increaseItem,
    decreaseItem,
    subtotal,
    tax,
    total,
    checkout,
    openCart
  } = useCart();

  return (
    <section className="bg-[#0b0b0b] py-20 sm:py-24">
      <div className="section-shell">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Order online</p>
          <h2 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl">Enjoy LUMÉ at home</h2>
          <p className="mt-4 text-mutedText">
            Build a pickup or delivery order with quantity controls and a polished mock checkout.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="mb-6 grid grid-cols-2 gap-3">
              {(["pickup", "delivery"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`rounded-lg border px-5 py-3 text-sm font-medium capitalize transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                    orderType === type
                      ? "border-gold bg-gold text-charcoal"
                      : "border-gold/25 bg-surface text-ivory hover:border-gold"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {featuredDishes.map((item) => (
                <article key={item.id} className="rounded-lg border border-gold/25 bg-surface p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-gold">{item.category}</p>
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl text-ivory">{item.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-mutedText">{item.description}</p>
                    </div>
                    <span className="text-gold">{formatCurrency(item.price)}</span>
                  </div>
                  <Button className="mt-5 w-full" onClick={() => addItem(item)}>
                    Add
                  </Button>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-gold/25 bg-surface p-5 lg:sticky lg:top-28">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-gold">{orderType}</p>
                <h3 className="font-serif text-2xl text-ivory">Cart summary</h3>
              </div>
              <ShoppingBag className="size-6 text-gold" />
            </div>
            {items.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gold/25 p-8 text-center text-sm text-mutedText">
                Your cart is empty.
              </div>
            ) : (
              <div className="space-y-4">
                {items.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm text-ivory">{item.name}</p>
                      <p className="text-xs text-gold">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="flex items-center rounded-lg border border-gold/20">
                      <button
                        type="button"
                        className="grid size-8 place-items-center text-ivory hover:bg-gold hover:text-charcoal"
                        onClick={() => decreaseItem(item.id)}
                        aria-label={`Decrease ${item.name}`}
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        className="grid size-8 place-items-center text-ivory hover:bg-gold hover:text-charcoal"
                        onClick={() => increaseItem(item.id)}
                        aria-label={`Increase ${item.name}`}
                      >
                        <Plus className="size-3.5" />
                      </button>
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
              Checkout
            </Button>
            <button
              type="button"
              onClick={openCart}
              className="mt-4 w-full text-center text-sm text-gold transition hover:text-ivory"
            >
              Open full cart
            </button>
            <Link href="/order" className={buttonStyles({ variant: "outline", className: "mt-4 w-full" })}>
              Full Ordering Page
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
