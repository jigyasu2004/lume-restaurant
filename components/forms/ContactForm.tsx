"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { contactSchema, type ContactFormValues } from "@/lib/validations";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const onSubmit = (values: ContactFormValues) => {
    console.info("Contact form", values);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-gold bg-surface p-8 text-center">
        <Check className="mx-auto mb-4 size-9 text-gold" />
        <h2 className="font-serif text-3xl text-ivory">Message received</h2>
        <p className="mt-3 text-mutedText">Thank you. The LUMÉ team will reply shortly.</p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-gold/25 bg-surface p-5 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="contact-fullName" className="mb-2 block text-sm text-ivory">
            Full name
          </label>
          <Input
            id="contact-fullName"
            placeholder="Alex Morgan"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm text-ivory">
            Email
          </label>
          <Input
            id="contact-email"
            type="email"
            placeholder="alex@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="contact-phone" className="mb-2 block text-sm text-ivory">
            Phone
          </label>
          <Input
            id="contact-phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="contact-message" className="mb-2 block text-sm text-ivory">
            Message
          </label>
          <Textarea
            id="contact-message"
            placeholder="How can we help?"
            error={errors.message?.message}
            {...register("message")}
          />
        </div>
      </div>
      <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}
