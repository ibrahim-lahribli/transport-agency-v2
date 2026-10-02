import type { Service } from "@/schemas/service";

type Vehicle = "sedan" | "van" | "minibus";

/** Raw selection as it arrives from the form, before validation. */
export interface SelectionInput {
  optionLabel?: string;
  vehicle?: string;
  routeIndex?: number;
}

/** A selection that has been validated against its service. */
export interface ResolvedSelection {
  optionLabel?: string;
  vehicle?: string;
  /** A transfer route, rendered as "from → to". */
  routeLabel?: string;
}

export type SelectionField = "optionLabel" | "vehicle" | "routeIndex";

export type SelectionResult =
  | { ok: true; selection: ResolvedSelection }
  | { ok: false; field: SelectionField };

/**
 * Validate a visitor's price option / route / vehicle against the chosen
 * service. The form only offers valid choices, but the request can be forged,
 * so the server never trusts it: an unknown label, an out-of-range route or a
 * vehicle the service does not run is rejected rather than quoted.
 */
export function resolveSelection(service: Service, input: SelectionInput): SelectionResult {
  const selection: ResolvedSelection = {};

  if (input.optionLabel) {
    const known = service.price.options?.some((o) => o.label === input.optionLabel);
    if (!known) return { ok: false, field: "optionLabel" };
    selection.optionLabel = input.optionLabel;
  }

  if (input.routeIndex !== undefined) {
    const route = (service.routes ?? [])[input.routeIndex];
    if (!route) return { ok: false, field: "routeIndex" };
    selection.routeLabel = `${route.from} → ${route.to}`;
  }

  if (input.vehicle) {
    const allowed: Vehicle[] = service.vehicles ?? [];
    if (!service.routes?.length || !allowed.includes(input.vehicle as Vehicle)) {
      return { ok: false, field: "vehicle" };
    }
    selection.vehicle = input.vehicle;
  }

  return { ok: true, selection };
}
