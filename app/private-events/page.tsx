import type { Metadata } from "next";
import { EventInquiryForm } from "@/components/forms/EventInquiryForm";
import { eventOptions } from "@/data/events";

export const metadata: Metadata = {
  title: "Private Events",
  description:
    "Plan private dining, corporate dinners, celebrations, and chef's table events at LUMÉ Dining.",
  alternates: {
    canonical: "/private-events"
  }
};

export default function PrivateEventsPage() {
  return (
    <div className="section-shell py-32 sm:py-36">
      <div className="mb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Private dining</p>
        <h1 className="mt-4 font-serif text-5xl text-ivory sm:text-6xl">
          Private dining & events
        </h1>
        <p className="mt-5 leading-8 text-mutedText">
          Host intimate dinners, corporate gatherings, celebrations, and chef&apos;s table experiences
          with tailored menus and polished hospitality.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {eventOptions.map((event) => {
          const Icon = event.icon;
          return (
            <article key={event.id} className="rounded-lg border border-gold/25 bg-surface p-6">
              <Icon className="mb-5 size-9 text-gold" />
              <h2 className="text-2xl text-ivory">{event.title}</h2>
              <p className="mt-3 text-sm leading-6 text-mutedText">{event.description}</p>
              <p className="mt-5 text-sm text-gold">{event.capacity}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-start">
        <div className="rounded-lg border border-gold/20 bg-surface p-6">
          <h2 className="font-serif text-3xl text-ivory">Plan an Event</h2>
          <p className="mt-4 text-sm leading-7 text-mutedText">
            Share the event type, timing, guest count, and budget range. This demo stores the
            inquiry in local state and shows a success confirmation.
          </p>
        </div>
        <EventInquiryForm />
      </div>
    </div>
  );
}
