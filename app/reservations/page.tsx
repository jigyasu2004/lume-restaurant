import type { Metadata } from "next";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { restaurant } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Reservations",
  description:
    "Reserve a table at LUMÉ Dining with a validated online reservation request form.",
  alternates: {
    canonical: "/reservations"
  }
};

export default function ReservationsPage() {
  return (
    <div className="section-shell py-32 sm:py-36">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Reservations</p>
          <h1 className="page-title mt-4 font-serif text-ivory">
            Reserve your table
          </h1>
          <p className="mt-5 leading-8 text-mutedText">
            Book your LUMÉ dining experience for lunch, dinner, celebrations, and business meals.
          </p>
          <div className="mt-8 rounded-lg border border-gold/20 bg-surface p-5">
            <h2 className="text-xl text-ivory">Reservation policy</h2>
            <p className="mt-3 text-sm leading-6 text-mutedText">{restaurant.reservationPolicy}</p>
          </div>
        </div>
        <ReservationForm />
      </div>
    </div>
  );
}
