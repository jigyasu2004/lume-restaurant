import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { restaurant } from "@/data/restaurant";

function MapFrame() {
  const { latitude, longitude, zoom } = restaurant.map;
  const delta = 0.01;
  const bbox = [
    longitude - delta,
    latitude - delta,
    longitude + delta,
    latitude + delta
  ].join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox
  )}&layer=mapnik&marker=${encodeURIComponent(`${latitude},${longitude}`)}`;

  return (
    <div className="relative min-h-96 overflow-hidden rounded-lg border border-gold/25 bg-surface">
      <iframe
        title="LUMÉ Dining location map"
        src={src}
        className="h-full min-h-96 w-full grayscale-[0.2]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        href={restaurant.directionsUrl}
        target="_blank"
        rel="noreferrer"
        className={buttonStyles({
          variant: "primary",
          size: "sm",
          className: "absolute bottom-3 right-3 shadow-2xl sm:bottom-4 sm:right-4"
        })}
      >
        <Navigation className="size-4" />
        Directions
      </a>
      <a
        href={restaurant.mapUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute left-4 top-4 rounded-md border border-gold/25 bg-charcoal/90 px-3 py-2 text-xs text-gold backdrop-blur transition hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      >
        Open map
      </a>
      <span className="sr-only">Map zoom level {zoom}</span>
    </div>
  );
}

export function LocationContact() {
  return (
    <section className="bg-gradient-to-b from-[#0b0b0b] to-charcoal py-20 sm:py-24">
      <div className="section-shell">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Visit us</p>
          <h2 className="section-title mt-4 font-serif text-ivory">Location & contact</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-gold/25 bg-surface p-6 sm:p-8">
            <h3 className="font-serif text-3xl text-ivory">{restaurant.name}</h3>
            <div className="mt-7 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-gold" />
                <div>
                  <p className="text-ivory">{restaurant.address.street}</p>
                  <p className="text-mutedText">{restaurant.address.district}</p>
                </div>
              </div>
              <a className="flex items-center gap-4 text-ivory transition hover:text-gold" href={restaurant.phoneHref}>
                <Phone className="size-5 shrink-0 text-gold" />
                {restaurant.phone}
              </a>
              <a className="flex items-center gap-4 text-ivory transition hover:text-gold" href={restaurant.emailHref}>
                <Mail className="size-5 shrink-0 text-gold" />
                {restaurant.email}
              </a>
              <div className="flex items-start gap-4 border-t border-gold/15 pt-6">
                <Clock className="mt-1 size-5 shrink-0 text-gold" />
                <div className="space-y-2 text-sm text-mutedText">
                  {restaurant.openingHours.map((item) => (
                    <p key={item.days}>
                      <span className="text-ivory">{item.days}:</span> {item.hours}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={restaurant.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonStyles({ variant: "primary" })}
              >
                <Navigation className="size-4" />
                Get Directions
              </a>
              <a href={restaurant.phoneHref} className={buttonStyles({ variant: "outline" })}>
                <Phone className="size-4" />
                Call Now
              </a>
            </div>
          </div>
          <MapFrame />
        </div>
      </div>
    </section>
  );
}
