import { z } from "zod";

import type { Service } from "@/schemas/service";
import type { QuoteService } from "@/pricing/types";

/** A service as shipped to the booking form for live quoting and selection. */
export interface BookingServiceOption extends QuoteService {
  title: string;
  /** Vehicle classes a transfer supports; drives the form's vehicle selector. */
  vehicles?: Service["vehicles"];
}

/** The selected price option / route / vehicle, as carried on an inquiry. */
export const VehicleSchema = z.enum(["sedan", "van", "minibus"]);
export type InquiryVehicle = z.infer<typeof VehicleSchema>;

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
  /** Variant price option label (activities), as offered by the form. */
  optionLabel: z.string().optional(),
  /** Chosen vehicle class for a transfer. */
  vehicle: VehicleSchema.optional(),
  /** Index into a transfer service's `routes`. */
  routeIndex: z.coerce.number().int().min(0).optional(),
});

export type Inquiry = z.infer<typeof InquirySchema>;

/** Honeypot field name; bots fill it, humans never see it. */
export const HONEYPOT_FIELD = "company";

export type InquiryState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string>;
      /**
       * Increments on every failed submit. React resets a form after its action
       * runs, so the form uses this as a remount key to re-apply the visitor's
       * controlled values instead of losing them or drifting out of sync with
       * the live quote.
       */
      attempt: number;
    };
