import { z } from "zod";

export const reservationSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required"),
  email: z.email("Enter a valid email"),
  phone: z.string().trim().min(1, "Phone is required"),
  date: z.string().trim().min(1, "Date is required"),
  time: z.string().trim().min(1, "Time is required"),
  guests: z.coerce.number().min(1, "Minimum 1 guest").max(20, "Maximum 20 guests"),
  occasion: z.string().trim().min(1, "Occasion is required"),
  specialRequest: z.string().optional()
});

export type ReservationFormInput = z.input<typeof reservationSchema>;
export type ReservationFormValues = z.output<typeof reservationSchema>;

export const eventInquirySchema = z.object({
  fullName: z.string().trim().min(1, "Name is required"),
  email: z.email("Enter a valid email"),
  phone: z.string().trim().min(1, "Phone is required"),
  eventType: z.string().trim().min(1, "Event type is required"),
  guestCount: z.coerce.number().min(1, "Guest count is required"),
  preferredDate: z.string().trim().min(1, "Preferred date is required"),
  budgetRange: z.string().trim().min(1, "Budget range is required"),
  message: z.string().trim().min(10, "Tell us a little more about your event")
});

export type EventInquiryFormInput = z.input<typeof eventInquirySchema>;
export type EventInquiryFormValues = z.output<typeof eventInquirySchema>;

export const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required"),
  email: z.email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters")
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.email("Enter a valid email")
});

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(1200)
});

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(20)
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
