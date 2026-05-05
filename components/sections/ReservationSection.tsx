import Link from "next/link";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { restaurant } from "@/data/restaurant";

export function ReservationSection() {
  return (
    <section className="bg-charcoal py-20 sm:py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Reservations</p>
          <h2 className="section-title mt-4 font-serif text-ivory">
            Reserve your table
          </h2>
          <p className="mt-5 leading-8 text-mutedText">
            Select your date, time, party size, and occasion. The host team will review your
            request and follow up if confirmation is needed.
          </p>
          <div className="mt-8 rounded-lg border border-gold/20 bg-surface p-5">
            <h3 className="text-lg text-ivory">Need assistance?</h3>
            <p className="mt-2 text-sm text-mutedText">
              Call <a className="text-gold" href={restaurant.phoneHref}>{restaurant.phone}</a> or use the
              LUMÉ Concierge chat for quick questions.
            </p>
            <Link className="mt-4 inline-flex text-sm text-gold hover:text-ivory" href="/contact">
              Contact the host desk
            </Link>
          </div>
        </div>
        <ReservationForm />
      </div>
    </section>
  );
}
