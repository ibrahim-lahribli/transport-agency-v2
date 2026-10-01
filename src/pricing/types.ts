export interface Party {
  adults: number;
  children?: number; // 4 to 11 years old
  infants?: number; // under 4 years old (free)
}

export type VehicleClass = "sedan" | "van" | "minibus";

export type PickupZone = "zone-1" | "zone-2" | "zone-3";

export interface QuoteOptions {
  locale?: "en" | "fr";
  private?: boolean;
  vehicleClass?: VehicleClass;
  optionLabel?: string;
  quadCount?: number;
  quadDoubleCount?: number;
  buggyCount?: number;
  ridingHours?: 1 | 2;
  pickupZone?: PickupZone;
  routeIndex?: number;
  from?: string;
  to?: string;
  additionalStops?: number;
  extraWaiting30MinCount?: number;
  surfboards?: number;
  childSeats?: number;
  dayHireOvertimeHours?: number;
  licensedGuide?: boolean;
}

export interface QuoteBreakdownItem {
  label: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  unit?: string;
}

export interface QuoteResult {
  valid: boolean;
  serviceId: string;
  currency: "EUR";
  totalEur: number;
  indicativeMad: number;
  exchangeRate: number;
  breakdown: QuoteBreakdownItem[];
  vehicleClass?: VehicleClass;
  appliedPrivateRate?: string;
  pickupZoneSupplement?: number;
  notes?: string[];
  warnings?: string[];
  error?: string;
}
