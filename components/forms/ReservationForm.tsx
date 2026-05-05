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
  reservationSchema,
  type ReservationFormInput,
  type ReservationFormValues
} from "@/lib/validations";

export function ReservationForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ReservationFormInput, unknown, ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: 2,
      occasion: "General dining",
      specialRequest: ""
    }
  });

  const onSubmit = (values: ReservationFormValues) => {
    console.info("Reservation request", values);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-gold bg-surface p-8 text-center">
        <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-gold text-charcoal">
          <Check className="size-8" />
        </div>
        <h2 className="font-serif text-3xl text-ivory">Thank you.</h2>
        <p className="mt-3 text-mutedText">Your reservation request has been received.</p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Make Another Reservation
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
          <label htmlFor="reservation-fullName" className="mb-2 block text-sm text-ivory">
            Full name
          </label>
          <Input
            id="reservation-fullName"
            placeholder="Alex Morgan"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
        </div>
        <div>
          <label htmlFor="reservation-email" className="mb-2 block text-sm text-ivory">
            Email
          </label>
          <Input
            id="reservation-email"
            type="email"
            placeholder="alex@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <div>
          <label htmlFor="reservation-phone" className="mb-2 block text-sm text-ivory">
            Phone
          </label>
          <Input
            id="reservation-phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>
        <div>
          <label htmlFor="reservation-guests" className="mb-2 block text-sm text-ivory">
            Number of guests
          </label>
          <Select id="reservation-guests" error={errors.guests?.message} {...register("guests")}>
            {Array.from({ length: 20 }, (_, index) => index + 1).map((guestCount) => (
              <option key={guestCount} value={guestCount}>
                {guestCount} {guestCount === 1 ? "guest" : "guests"}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="reservation-date" className="mb-2 block text-sm text-ivory">
            Date
          </label>
          <Input
            id="reservation-date"
            type="date"
            error={errors.date?.message}
            {...register("date")}
          />
        </div>
        <div>
          <label htmlFor="reservation-time" className="mb-2 block text-sm text-ivory">
            Time
          </label>
          <Select id="reservation-time" error={errors.time?.message} {...register("time")}>
            <option value="">Select a time</option>
            {["11:00 AM", "12:00 PM", "1:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"].map(
              (time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              )
            )}
          </Select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="reservation-occasion" className="mb-2 block text-sm text-ivory">
            Occasion
          </label>
          <Select
            id="reservation-occasion"
            error={errors.occasion?.message}
            {...register("occasion")}
          >
            {["General dining", "Birthday", "Anniversary", "Business meal", "Special celebration"].map(
              (occasion) => (
                <option key={occasion} value={occasion}>
                  {occasion}
                </option>
              )
            )}
          </Select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="reservation-specialRequest" className="mb-2 block text-sm text-ivory">
            Special request
          </label>
          <Textarea
            id="reservation-specialRequest"
            placeholder="Dietary restrictions, seating preferences, celebration notes..."
            error={errors.specialRequest?.message}
            {...register("specialRequest")}
          />
        </div>
      </div>
      <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
        Confirm Reservation
      </Button>
    </form>
  );
}
