"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import {
  eventInquirySchema,
  type EventInquiryFormInput,
  type EventInquiryFormValues
} from "@/lib/validations";

export function EventInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<EventInquiryFormInput, unknown, EventInquiryFormValues>({
    resolver: zodResolver(eventInquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      eventType: "Corporate Dinner",
      guestCount: 12,
      preferredDate: "",
      budgetRange: "$2,500-$5,000",
      message: ""
    }
  });

  const onSubmit = (values: EventInquiryFormValues) => {
    console.info("Private event inquiry", values);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-gold bg-surface p-8 text-center">
        <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-gold text-charcoal">
          <Check className="size-7" />
        </div>
        <h2 className="font-serif text-3xl text-ivory">Inquiry received</h2>
        <p className="mt-3 text-mutedText">
          Thank you. Our private dining team will review your event details.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Send Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-gold/25 bg-surface p-5 shadow-2xl sm:p-8"
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="event-fullName" className="mb-2 block text-sm text-ivory">
            Full name
          </label>
          <Input
            id="event-fullName"
            placeholder="Jordan Lee"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
        </div>
        <div>
          <label htmlFor="event-email" className="mb-2 block text-sm text-ivory">
            Email
          </label>
          <Input
            id="event-email"
            type="email"
            placeholder="events@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <div>
          <label htmlFor="event-phone" className="mb-2 block text-sm text-ivory">
            Phone
          </label>
          <Input
            id="event-phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>
        <div>
          <label htmlFor="event-type" className="mb-2 block text-sm text-ivory">
            Event type
          </label>
          <Select id="event-type" error={errors.eventType?.message} {...register("eventType")}>
            {["Corporate Dinner", "Celebration", "Chef's Table", "Wedding Reception", "Other"].map(
              (type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              )
            )}
          </Select>
        </div>
        <div>
          <label htmlFor="event-guestCount" className="mb-2 block text-sm text-ivory">
            Guest count
          </label>
          <Input
            id="event-guestCount"
            type="number"
            min={1}
            error={errors.guestCount?.message}
            {...register("guestCount")}
          />
        </div>
        <div>
          <label htmlFor="event-preferredDate" className="mb-2 block text-sm text-ivory">
            Preferred date
          </label>
          <Input
            id="event-preferredDate"
            type="date"
            error={errors.preferredDate?.message}
            {...register("preferredDate")}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="event-budgetRange" className="mb-2 block text-sm text-ivory">
            Budget range
          </label>
          <Select
            id="event-budgetRange"
            error={errors.budgetRange?.message}
            {...register("budgetRange")}
          >
            {["Under $2,500", "$2,500-$5,000", "$5,000-$10,000", "$10,000+"].map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </Select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="event-message" className="mb-2 block text-sm text-ivory">
            Message
          </label>
          <Textarea
            id="event-message"
            placeholder="Tell us about the occasion, timing, dining style, and any hospitality needs."
            error={errors.message?.message}
            {...register("message")}
          />
        </div>
      </div>
      <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
        Submit Inquiry
      </Button>
    </form>
  );
}
