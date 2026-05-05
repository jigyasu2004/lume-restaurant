"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { newsletterSchema } from "@/lib/validations";

type NewsletterValues = {
  email: string;
};

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" }
  });

  return (
    <section className="bg-charcoal py-20 sm:py-24">
      <div className="section-shell max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Newsletter</p>
        <h2 className="section-title mt-4 font-serif text-ivory">Join the LUMÉ list</h2>
        <p className="mx-auto mt-4 max-w-2xl text-mutedText">
          Receive seasonal menu updates, private event invitations, and exclusive dining offers.
        </p>
        {submitted ? (
          <div className="mx-auto mt-8 max-w-md rounded-lg border border-gold bg-surface p-6">
            <Check className="mx-auto mb-3 size-8 text-gold" />
            <p className="text-ivory">Thank you for subscribing.</p>
          </div>
        ) : (
          <form
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
            onSubmit={handleSubmit(() => setSubmitted(true))}
            noValidate
          >
            <div className="flex-1 text-left">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Your email address"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
            <Button type="submit" className="sm:self-start">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
