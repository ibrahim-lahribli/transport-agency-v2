/**
 * Local mirrors of the shapes the data-integrity suite reads. Deliberately
 * structural and zod-free so the Playwright bundle never needs `src/` — a
 * valid catalogue always satisfies these, and a malformed one fails the tests
 * (that is the point of the suite).
 */

export type Locale = "en" | "fr";
export type ServiceCategory = "excursion" | "activity" | "transfer";

/** The subset of `src/schemas/service.ts` the e2e assertions read. */
export interface CatalogueService {
  id: string;
  slug: string;
  title: string;
  category?: ServiceCategory;
  status?: string;
  order?: number;
  price?: {
    currency?: string;
    unit?: string;
    options?: {
      label?: string;
      amount?: number;
      unit?: string;
      isBase?: boolean;
    }[];
    nightSurcharge?: number;
  };
  routes?: {
    from?: string;
    to?: string;
    distanceKm?: number;
    minutes?: string | number;
    prices?: { sedan?: number; van?: number; minibus?: number };
  }[];
  durationHours?: number;
  /** Only present when the raw content module populates it (currently none do). */
  images?: string[];
}
