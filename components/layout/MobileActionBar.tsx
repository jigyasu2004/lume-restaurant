"use client";

import { Calendar, MapPin, Phone, Utensils } from "lucide-react";
import Link from "next/link";
import { restaurant } from "@/data/restaurant";

export function MobileActionBar() {
  const actions = [
    { label: "Call", href: restaurant.phoneHref, icon: Phone },
    { label: "Directions", href: restaurant.directionsUrl, icon: MapPin },
    { label: "Menu", href: "/menu", icon: Utensils },
    { label: "Reserve", href: "/reservations", icon: Calendar, strong: true }
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-charcoal/95 px-2 py-2 backdrop-blur-xl md:hidden"
      aria-label="Mobile quick actions"
    >
      <div className="grid grid-cols-4 gap-1">
        {actions.map((action) => {
          const Icon = action.icon;
          const external = action.href.startsWith("http");
          const className = `flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
            action.strong ? "text-gold" : "text-ivory hover:bg-surface hover:text-gold"
          }`;

          if (external) {
            return (
              <a key={action.label} href={action.href} target="_blank" rel="noreferrer" className={className}>
                <Icon className="size-5" />
                {action.label}
              </a>
            );
          }

          return (
            <Link key={action.label} href={action.href} className={className}>
              <Icon className="size-5" />
              {action.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
