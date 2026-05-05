import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { LocationContact } from "@/components/sections/LocationContact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact LUMÉ Dining for reservations, directions, opening hours, private dining, and guest inquiries.",
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <>
      <section className="section-shell pt-32 sm:pt-36">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Contact</p>
          <h1 className="mt-4 font-serif text-5xl text-ivory sm:text-6xl">Contact LUMÉ</h1>
          <p className="mt-5 leading-8 text-mutedText">
            Find our address, hours, call and directions actions, map, and guest inquiry form.
          </p>
        </div>
      </section>
      <LocationContact />
      <section className="section-shell pb-24">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-start">
          <div className="rounded-lg border border-gold/20 bg-surface p-6">
            <h2 className="font-serif text-3xl text-ivory">Send a message</h2>
            <p className="mt-4 text-sm leading-7 text-mutedText">
              For general questions, private dining notes, accessibility needs, or press inquiries,
              use this form and the team will follow up.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
