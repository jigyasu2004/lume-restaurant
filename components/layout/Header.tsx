"use client";

import { Calendar, Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { buttonStyles, Button } from "@/components/ui/Button";
import { restaurant } from "@/data/restaurant";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Reservations", href: "/reservations" },
  { label: "Private Events", href: "/private-events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" }
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { openCart, count } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/20 bg-charcoal/90 backdrop-blur-xl">
      <div className="section-shell flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-serif text-3xl text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          aria-label="LUMÉ Dining home"
        >
          {restaurant.wordmark}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm text-ivory transition hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
                pathname === link.href && "text-gold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex min-h-12 items-center gap-2 rounded-lg px-4 text-sm text-ivory transition hover:bg-surface hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            <ShoppingBag className="size-4" />
            Order Online
            {count > 0 ? (
              <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-gold text-xs text-charcoal">
                {count}
              </span>
            ) : null}
          </button>
          <Link href="/reservations" className={buttonStyles({ variant: "primary", size: "md" })}>
            <Calendar className="size-4" />
            Reserve a Table
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={openCart}
            className="relative grid size-11 place-items-center rounded-lg text-ivory hover:bg-surface hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            aria-label="Open cart"
          >
            <ShoppingBag className="size-5" />
            {count > 0 ? (
              <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-gold text-[10px] text-charcoal">
                {count}
              </span>
            ) : null}
          </button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-gold/20 bg-charcoal lg:hidden">
          <nav className="section-shell flex flex-col gap-2 py-5" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-lg text-ivory transition hover:bg-surface hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/order"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center gap-2 rounded-lg border border-gold/25 px-3 py-3 text-ivory"
            >
              <ShoppingBag className="size-5" />
              Order Online
            </Link>
            <Link
              href="/reservations"
              onClick={() => setOpen(false)}
              className={buttonStyles({ variant: "primary", className: "mt-2 w-full" })}
            >
              Reserve a Table
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
