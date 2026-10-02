import { z } from "zod";

/** Cancellation policies — services-report.md §3.6. */
export const CancellationPolicySchema = z.enum(["transfer", "excursion", "adventure"]);
export type CancellationPolicy = z.infer<typeof CancellationPolicySchema>;

/** Who accompanies the guest — services-report.md §3.8. */
export const HostSchema = z.enum([
  "driver-host",
  "operator-team",
  "boat-crew",
  "venue-team",
  "driver",
]);
export type Host = z.infer<typeof HostSchema>;

/** Private rate table keys — services-report.md §4.2. */
export const PrivateRateKeySchema = z.enum([
  "agadir-halfday",
  "region-near",
  "essaouira",
  "marrakech",
  "privateDayRates",
]);
export type PrivateRateKey = z.infer<typeof PrivateRateKeySchema>;

export const PriceUnitSchema = z.enum([
  "person",
  "vehicle",
  "quad",
  "buggy",
  "per 30 min",
  "30 minutes",
]);
export type PriceUnit = z.infer<typeof PriceUnitSchema>;

export const PriceOptionSchema = z.object({
  label: z.string().min(1),
  amount: z.number().min(0),
  unit: PriceUnitSchema.optional(),
  note: z.string().optional(),
  /** Marks the option as the bookable base price for the service's "from" price. */
  isBase: z.boolean().optional(),
});
export type PriceOption = z.infer<typeof PriceOptionSchema>;

/** A price must declare a unit directly or on every option. */
export const PriceSchema = z
  .object({
    currency: z.literal("EUR"),
    unit: PriceUnitSchema.optional(),
    basis: z.enum(["catalogue", "estimate", "market-benchmark"]).optional(),
    confirmed: z.boolean().default(false),
    options: z.array(PriceOptionSchema).optional(),
    nightSurcharge: z.number().optional(),
    privateOnRequest: z.string().optional(),
    separateCost: z.string().optional(),
  })
  .refine(
    (price) => {
      if (price.unit) return true;
      if (price.options && price.options.length > 0) {
        return price.options.every((opt) => !!opt.unit);
      }
      return false;
    },
    { message: "Price must specify a top-level unit or a unit for every price option" },
  );
export type Price = z.infer<typeof PriceSchema>;

export const RouteLegSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  km: z.number().nonnegative().optional(),
  minutes: z.union([z.string(), z.number()]).optional(),
  notes: z.string().optional(),
});
export type RouteLeg = z.infer<typeof RouteLegSchema>;

export const TourRouteSchema = z.object({
  startPoint: z.string().optional(),
  legs: z.array(RouteLegSchema),
  roundTripKm: z.number().nonnegative().optional(),
  drivingHoursTotal: z.string().optional(),
});
export type TourRoute = z.infer<typeof TourRouteSchema>;

export const TransferVehiclePricesSchema = z.object({
  sedan: z.number().nonnegative(),
  van: z.number().nonnegative(),
  minibus: z.number().nonnegative(),
});
export type TransferVehiclePrices = z.infer<typeof TransferVehiclePricesSchema>;

export const TransferRouteItemSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  distanceKm: z.number().nonnegative().optional(),
  minutes: z.union([z.string(), z.number()]),
  prices: TransferVehiclePricesSchema,
  basis: z.string().optional(),
});
export type TransferRouteItem = z.infer<typeof TransferRouteItemSchema>;

/** Tour legs or a list of transfer routes. */
export const RouteSchema = z.union([TourRouteSchema, z.array(TransferRouteItemSchema)]);
export type Route = z.infer<typeof RouteSchema>;

export const CapacitySchema = z.object({
  min: z.number().int().min(1),
  sharedMax: z.number().int().positive().optional(),
  privateAvailable: z.boolean(),
});
export type Capacity = z.infer<typeof CapacitySchema>;

export const TransferExtraSchema = z.object({
  label: z.string().min(1),
  amount: z.number().nullable(),
  unit: PriceUnitSchema.optional(),
  note: z.string().optional(),
});
export type TransferExtra = z.infer<typeof TransferExtraSchema>;

export const FAQItemSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
});
export type FAQItem = z.infer<typeof FAQItemSchema>;

export const SEOSchema = z.object({
  title: z.string().min(1).max(60, "SEO title must be 60 characters or fewer"),
  description: z.string().min(1).max(160, "SEO description must be 160 characters or fewer"),
});
export type SEO = z.infer<typeof SEOSchema>;

export const ServiceSchema = z
  .object({
    id: z.string().min(1),
    category: z.enum(["activity", "excursion", "transfer"]),
    status: z.enum(["draft", "published", "archived"]).default("draft"),
    order: z.number().int().positive(),
    slug: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().min(1),
    seo: SEOSchema,
    primaryKeyword: z.string().min(1),
    durationHours: z.number().positive().optional(),
    activityHours: z.number().positive().optional(),
    departures: z.array(z.string()).optional(),
    schedule: z.string().optional(),
    days: z.string().optional(),
    availability: z.string().optional(),
    direction: z.string().optional(),
    pickupWindow: z.string().optional(),
    returnApprox: z.string().optional(),
    capacity: CapacitySchema.optional(),
    price: PriceSchema,
    cancellationPolicy: CancellationPolicySchema,
    languages: z.array(z.string()).min(1),
    host: HostSchema,
    privateRate: PrivateRateKeySchema.optional(),
    itinerary: z.array(z.string()).optional(),
    includedExtra: z.array(z.string()).optional(),
    notIncluded: z.array(z.string()).optional(),
    bring: z.array(z.string()).optional(),
    suitableFor: z.array(z.string()).optional(),
    restrictions: z.array(z.string()).optional(),
    seasonalNotes: z.union([z.string(), z.array(z.string())]).optional(),
    faq: z.array(FAQItemSchema).optional(),
    confirmFlags: z.array(z.string()).optional(),
    contentNote: z.string().optional(),
    route: RouteSchema.optional(),
    highlights: z.array(z.string()).optional(),
    routes: z.array(TransferRouteItemSchema).optional(),
    extras: z.array(TransferExtraSchema).optional(),
    vehicles: z.array(z.enum(["sedan", "van", "minibus"])).optional(),
    dayHire: z
      .object({
        usesSiteRates: PrivateRateKeySchema,
        note: z.string().optional(),
      })
      .optional(),
  })
  .refine(
    (service) => service.seo.title.toLowerCase().includes(service.primaryKeyword.toLowerCase()),
    { message: "Primary keyword must be present in the SEO title", path: ["seo", "title"] },
  )
  .refine(
    (service) => {
      const seasonal = Array.isArray(service.seasonalNotes)
        ? service.seasonalNotes.join(" ")
        : service.seasonalNotes || "";
      const copyFields = [
        service.title,
        service.summary,
        service.seo.title,
        service.seo.description,
        ...(service.highlights || []),
        ...(service.itinerary || []),
        ...(service.includedExtra || []),
        ...(service.notIncluded || []),
        ...(service.restrictions || []),
        seasonal,
        ...(service.faq || []).map((f) => `${f.q} ${f.a}`),
      ];
      return !copyFields.some((text) => /\bsahara\b/i.test(text));
    },
    { message: 'The word "Sahara" must not appear anywhere in copy' },
  );

export type Service = z.infer<typeof ServiceSchema>;
