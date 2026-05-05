import Link from "next/link";
import { EventInquiryForm } from "@/components/forms/EventInquiryForm";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { eventOptions } from "@/data/events";

export function PrivateEvents() {
  return (
    <section className="bg-charcoal py-20 sm:py-24">
      <div className="section-shell">
        <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Private dining</p>
            <h2 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl">
              Private dining & events
            </h2>
            <p className="mt-4 max-w-2xl text-mutedText">
              Host intimate dinners, corporate gatherings, celebrations, and chef&apos;s table
              experiences.
            </p>
          </div>
          <Link href="/private-events" className={buttonStyles({ variant: "outline" })}>
            Plan an Event
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {eventOptions.map((event) => {
            const Icon = event.icon;
            return (
              <article
                key={event.id}
                className="rounded-lg border border-gold/25 bg-surface p-6 transition hover:border-gold/70"
              >
                <Icon className="mb-5 size-9 text-gold" />
                <h3 className="text-2xl text-ivory">{event.title}</h3>
                <p className="mt-3 text-sm leading-6 text-mutedText">{event.description}</p>
                <p className="mt-5 text-sm text-gold">{event.capacity}</p>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <EventInquiryForm />
        </div>
      </div>
    </section>
  );
}
