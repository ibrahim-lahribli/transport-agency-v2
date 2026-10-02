import type { Service } from "@/schemas/service";

export type VehicleClass = "sedan" | "van" | "minibus";

/**
 * The minimal slice of a service the quote engine needs. `Service` is
 * structurally assignable to this, and it can also be shipped to the client
 * for live quoting without the full copy payload.
 */
export interface QuoteService {
  id: string;
  category: Service["category"];
  price: Service["price"];
  routes?: Service["routes"];
}

export interface Party {
  adults: number;
  children: number;
}

export interface QuoteSelection {
  /** Exact label of a chosen price option (activities with variants). */
  optionLabel?: string;
  /** Vehicle class for transfers. */
  vehicle?: VehicleClass;
  /** Index into a transfer service's `routes`. */
  routeIndex?: number;
}

export interface QuoteLine {
  label: string;
  quantity: number;
  unitAmount: number;
  total: number;
}

export interface QuoteResult {
  valid: boolean;
  error?: string;
  currency: "EUR";
  totalEur: number;
  indicativeMad: number;
  exchangeRate: number;
  breakdown: QuoteLine[];
  notes: string[];
}
