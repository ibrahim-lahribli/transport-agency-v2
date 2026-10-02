import { z } from "zod";

import type { QuoteService } from "@/pricing/types";

/** A service as shipped to the booking form for live quoting. */
export interface BookingServiceOption extends QuoteService {
  title: string;
}

/** A validated booking inquiry submitted from the booking form. */
export const InquirySchema = z.object({
  serviceId: z.string().min(1, "Please choose a service"),
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a phone or WhatsApp number"),
  date: z.string().optional(),
  adults: z.coerce.number().int().min(1, "At least one adult is required"),
  children: z.coerce.number().int().min(0),
  hotel: z.string().optional(),
  notes: z.string().optional(),
});

export type Inquiry = z.infer<typeof InquirySchema>;

/** Honeypot field name; bots fill it, humans never see it. */
export const HONEYPOT_FIELD = "company";

export type InquiryState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };
