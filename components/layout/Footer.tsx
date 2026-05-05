import { Camera, Globe2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { restaurant } from "@/data/restaurant";

const footerLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Reservations", href: "/reservations" },
  { label: "Private Events", href: "/private-events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" }
];

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-[#0a0a0a] pb-20 md:pb-0">
      <div className="section-shell py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-serif text-3xl text-gold">
              {restaurant.wordmark}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-mutedText">
              Global flavors, beautifully served. Chef-crafted dishes, modern hospitality, and
              private dining in an elegant city setting.
            </p>
            <div className="mt-6 flex gap-3" aria-label="Social links">
              {[Camera, MessageCircle, Globe2].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="grid size-10 place-items-center rounded-lg border border-gold/20 text-mutedText transition hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                  aria-label={`Social profile ${index + 1}`}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-base text-ivory">Quick links</h2>
            <ul className="mt-4 space-y-3 text-sm text-mutedText">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition hover:text-gold" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-base text-ivory">Opening hours</h2>
            <ul className="mt-4 space-y-3 text-sm text-mutedText">
              {restaurant.openingHours.map((item) => (
                <li key={item.days}>
                  <span className="block text-ivory">{item.days}</span>
                  {item.hours}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-base text-ivory">Contact</h2>
            <ul className="mt-4 space-y-4 text-sm text-mutedText">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>{restaurant.address.full}</span>
              </li>
              <li>
                <a className="flex items-center gap-3 transition hover:text-gold" href={restaurant.phoneHref}>
                  <Phone className="size-4 shrink-0 text-gold" />
                  {restaurant.phone}
                </a>
              </li>
              <li>
                <a className="flex items-center gap-3 transition hover:text-gold" href={restaurant.emailHref}>
                  <Mail className="size-4 shrink-0 text-gold" />
                  {restaurant.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-gold/15 pt-6 text-sm text-mutedText md:flex-row md:items-center">
          <p>© 2026 {restaurant.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-gold">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-gold">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
