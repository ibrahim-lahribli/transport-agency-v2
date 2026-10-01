import { EUR_TO_MAD_RATE } from "../../config/business.ts";
import { servicesById as enServices } from "../../content/en/index.ts";
import { servicesById as frServices } from "../../content/fr/index.ts";
import type {
  Party,
  QuoteBreakdownItem,
  QuoteOptions,
  QuoteResult,
  VehicleClass,
} from "./types.ts";

/**
 * Standard private rate tables from services-report.md Section 4.2
 */
const PRIVATE_RATES: Record<string, Record<VehicleClass, number>> = {
  "agadir-halfday": { sedan: 45, van: 60, minibus: 90 },
  "region-near": { sedan: 90, van: 120, minibus: 170 },
  essaouira: { sedan: 150, van: 190, minibus: 270 },
  marrakech: { sedan: 200, van: 250, minibus: 350 },
  privateDayRates: { sedan: 90, van: 120, minibus: 170 },
};

/**
 * Determine required vehicle class for a given passenger count and surfboards requirement
 */
function resolveVehicleClass(
  passengerCount: number,
  preferredClass?: VehicleClass,
  surfboardCount: number = 0,
): VehicleClass {
  let requiredClass: VehicleClass;
  if (passengerCount <= 3) {
    requiredClass = "sedan";
  } else if (passengerCount <= 7) {
    requiredClass = "van";
  } else {
    requiredClass = "minibus";
  }

  // Surfboards require at least van
  if (surfboardCount > 0 && requiredClass === "sedan") {
    requiredClass = "van";
  }

  // If user requested a larger vehicle class, honor it
  if (preferredClass) {
    const ranks: Record<VehicleClass, number> = { sedan: 1, van: 2, minibus: 3 };
    if (ranks[preferredClass] >= ranks[requiredClass]) {
      return preferredClass;
    }
  }

  return requiredClass;
}

/**
 * Pure function quote(serviceId, party, options, date)
 */
export function quote(
  serviceId: string,
  party: Party,
  options?: QuoteOptions,
  date?: Date | string,
): QuoteResult {
  const locale = options?.locale === "fr" ? "fr" : "en";
  const services = locale === "fr" ? frServices : enServices;
  const service = services[serviceId];

  const exchangeRate = EUR_TO_MAD_RATE;

  // Initial error response helper
  const fail = (error: string): QuoteResult => ({
    valid: false,
    serviceId,
    currency: "EUR",
    totalEur: 0,
    indicativeMad: 0,
    exchangeRate,
    breakdown: [],
    error,
  });

  if (!service) {
    return fail(`Service '${serviceId}' not found`);
  }

  const adults = Number(party.adults) || 0;
  const children = Number(party.children) || 0;
  const infants = Number(party.infants) || 0;
  const totalPassengers = adults + children + infants;
  const payingPassengers = adults + children;

  // Validation: at least one person
  if (totalPassengers <= 0) {
    return fail("Party must contain at least one person");
  }

  // Validation: Child-only party (unaccompanied minors)
  if (adults === 0 && (children > 0 || infants > 0)) {
    return fail("Children must be accompanied by at least one adult");
  }

  const breakdown: QuoteBreakdownItem[] = [];
  const notes: string[] = [];
  const warnings: string[] = [];

  // Check date & day of week in Africa/Casablanca timezone
  let dayOfWeek = "";
  if (date) {
    const d = typeof date === "string" ? new Date(date) : date;
    if (!isNaN(d.getTime())) {
      dayOfWeek = d.toLocaleDateString("en-US", {
        timeZone: "Africa/Casablanca",
        weekday: "long",
      });
    }
  }

  // Monday City Tour Edge Case
  if (serviceId === "agadir-city-tour" && dayOfWeek === "Monday") {
    notes.push(
      "Souk El Had is closed on Mondays; visit to Port of Agadir fishing harbour or Vallée des Oiseaux included instead.",
    );
  }

  const isPrivate = Boolean(options?.private);

  // Minimum group size check for shared bookings
  if (!isPrivate && service.capacity?.min) {
    if (payingPassengers < service.capacity.min) {
      return fail(
        `Minimum group size of ${service.capacity.min} not met (party size: ${payingPassengers})`,
      );
    }
  }

  // Determine vehicle class
  const vehicleClass = resolveVehicleClass(
    totalPassengers,
    options?.vehicleClass,
    options?.surfboards || 0,
  );

  let appliedPrivateRate: string | undefined;

  // 1. Quoting Private Rate Upgrade (for excursions or private day rates)
  if (isPrivate && service.privateRate && PRIVATE_RATES[service.privateRate]) {
    appliedPrivateRate = service.privateRate;
    const rateTable = PRIVATE_RATES[service.privateRate];
    const basePrice = rateTable[vehicleClass];

    breakdown.push({
      label: `Private tour (${service.title}) - ${vehicleClass}`,
      unitPrice: basePrice,
      quantity: 1,
      totalPrice: basePrice,
      unit: "vehicle",
    });

    // Optional licensed guide
    if (options?.licensedGuide) {
      const guidePrice = serviceId === "marrakech" ? 35 : 25;
      breakdown.push({
        label: `Licensed guide (${serviceId === "marrakech" ? "Marrakech medina" : "Agadir"})`,
        unitPrice: guidePrice,
        quantity: 1,
        totalPrice: guidePrice,
      });
    }
  } else if (serviceId === "boat-cruise" && isPrivate) {
    // Private boat charter
    const privateBoatPrice = 360;
    breakdown.push({
      label: "Private boat charter (up to 8 guests)",
      unitPrice: privateBoatPrice,
      quantity: 1,
      totalPrice: privateBoatPrice,
      unit: "vehicle",
    });
  } else if (service.category === "transfer") {
    // 2. Transfer Services
    if (
      serviceId === "private-transfers-tourist-transport" &&
      options?.dayHireOvertimeHours !== undefined &&
      !options?.from &&
      !options?.to
    ) {
      // Day hire transfer
      const dayHireRate = PRIVATE_RATES["privateDayRates"][vehicleClass];
      breakdown.push({
        label: `Private day hire (up to 10 h) - ${vehicleClass}`,
        unitPrice: dayHireRate,
        quantity: 1,
        totalPrice: dayHireRate,
        unit: "vehicle",
      });

      if (options.dayHireOvertimeHours > 0) {
        const hourlyRate = vehicleClass === "minibus" ? 15 : vehicleClass === "van" ? 10 : 8;
        const overtimeTotal = options.dayHireOvertimeHours * hourlyRate;
        breakdown.push({
          label: `Day hire overtime (${vehicleClass})`,
          unitPrice: hourlyRate,
          quantity: options.dayHireOvertimeHours,
          totalPrice: overtimeTotal,
          unit: "vehicle",
        });
      }
    } else {
      // Route transfer
      const routes = service.routes || [];
      let selectedRoute = routes[0];
      if (options?.routeIndex !== undefined && routes[options.routeIndex]) {
        selectedRoute = routes[options.routeIndex];
      } else if (options?.to) {
        const matched = routes.find((r) => r.to.toLowerCase().includes(options.to!.toLowerCase()));
        if (matched) selectedRoute = matched;
      }

      const routePrice = selectedRoute.prices[vehicleClass];
      breakdown.push({
        label: `Transfer: ${selectedRoute.from} → ${selectedRoute.to} (${vehicleClass})`,
        unitPrice: routePrice,
        quantity: 1,
        totalPrice: routePrice,
        unit: "vehicle",
      });

      // Transfer extras: Additional stops
      if (options?.additionalStops && options.additionalStops > 0) {
        breakdown.push({
          label: "Additional stop",
          unitPrice: 5,
          quantity: options.additionalStops,
          totalPrice: options.additionalStops * 5,
          unit: "vehicle",
        });
      }

      // Transfer extras: Waiting beyond 60 min
      if (options?.extraWaiting30MinCount && options.extraWaiting30MinCount > 0) {
        breakdown.push({
          label: "Waiting beyond 60 minutes (per 30 min)",
          unitPrice: 5,
          quantity: options.extraWaiting30MinCount,
          totalPrice: options.extraWaiting30MinCount * 5,
          unit: "per 30 min",
        });
      }

      // Transfer extras: Child seats (Free)
      if (options?.childSeats && options.childSeats > 0) {
        breakdown.push({
          label: "Child seat (advance request)",
          unitPrice: 0,
          quantity: options.childSeats,
          totalPrice: 0,
        });
      }

      // Transfer extras: Surfboards
      if (options?.surfboards && options.surfboards > 0) {
        const extraBoards = Math.max(0, options.surfboards - 4);
        const surfboardCharge = extraBoards * 5;
        breakdown.push({
          label:
            options.surfboards <= 4
              ? `Surfboards (${options.surfboards} boards, up to 4 free in van/minibus)`
              : `Surfboards (${options.surfboards} boards: 4 free + ${extraBoards} extra)`,
          unitPrice: 5,
          quantity: extraBoards,
          totalPrice: surfboardCharge,
          unit: "vehicle",
        });
      }
    }
  } else if (serviceId === "crocoparc") {
    // 3. Crocoparc Private Transport
    const carPrice = 25;
    const vanPrice = 35;
    const isVan = vehicleClass !== "sedan";
    const basePrice = isVan ? vanPrice : carPrice;

    breakdown.push({
      label: isVan
        ? "Private van transport (4 to 7 guests, 2.5h waiting)"
        : "Private car transport (up to 3 guests, 2.5h waiting)",
      unitPrice: basePrice,
      quantity: 1,
      totalPrice: basePrice,
      unit: "vehicle",
    });

    if (options?.extraWaiting30MinCount && options.extraWaiting30MinCount > 0) {
      breakdown.push({
        label: "Extra waiting time (per 30 min)",
        unitPrice: 5,
        quantity: options.extraWaiting30MinCount,
        totalPrice: options.extraWaiting30MinCount * 5,
        unit: "per 30 min",
      });
    }

    notes.push("Entrance tickets to Crocoparc are not included and are paid directly at the park.");
  } else if (serviceId === "quad-buggy-forest") {
    // 4. Quad & Buggy Forest
    const quadCount = options?.quadCount ?? (options?.buggyCount ? 0 : payingPassengers);
    const quadDoubleCount = options?.quadDoubleCount ?? 0;
    const buggyCount = options?.buggyCount ?? 0;

    if (quadCount > 0) {
      breakdown.push({
        label: "Quad, single rider",
        unitPrice: 35,
        quantity: quadCount,
        totalPrice: quadCount * 35,
        unit: "person",
      });
    }
    if (quadDoubleCount > 0) {
      breakdown.push({
        label: "Quad, two riders on one quad",
        unitPrice: 50,
        quantity: quadDoubleCount,
        totalPrice: quadDoubleCount * 50,
        unit: "quad",
      });
    }
    if (buggyCount > 0) {
      breakdown.push({
        label: "Buggy, 2 seats",
        unitPrice: 80,
        quantity: buggyCount,
        totalPrice: buggyCount * 80,
        unit: "buggy",
      });
    }
  } else if (serviceId === "timlalin-dunes") {
    // 5. Timlalin Dunes (specific activities or combo)
    const label = options?.optionLabel?.toLowerCase() || "";
    if (label.includes("sunset camel")) {
      breakdown.push({
        label: "Sunset camel ride",
        unitPrice: 20,
        quantity: payingPassengers,
        totalPrice: payingPassengers * 20,
        unit: "person",
      });
    } else if (label.includes("quad 2") || label.includes("two riders")) {
      const quads = options?.quadDoubleCount || Math.ceil(payingPassengers / 2);
      breakdown.push({
        label: "Quad, 1 hour, two riders on one quad",
        unitPrice: 50,
        quantity: quads,
        totalPrice: quads * 50,
        unit: "quad",
      });
    } else if (label.includes("quad")) {
      const quads = options?.quadCount || payingPassengers;
      breakdown.push({
        label: "Quad, 1 hour, single rider",
        unitPrice: 35,
        quantity: quads,
        totalPrice: quads * 35,
        unit: "person",
      });
    } else if (label.includes("sandboard")) {
      breakdown.push({
        label: "Sandboarding add-on",
        unitPrice: 10,
        quantity: payingPassengers,
        totalPrice: payingPassengers * 10,
        unit: "person",
      });
    } else if (label.includes("combo")) {
      breakdown.push({
        label: "Dunes combo: quad 1 hour + camel ride + sandboarding",
        unitPrice: 55,
        quantity: payingPassengers,
        totalPrice: payingPassengers * 55,
        unit: "person",
      });
    } else {
      // Default: camel ride
      breakdown.push({
        label: "Camel ride (about 45 minutes)",
        unitPrice: 15,
        quantity: payingPassengers,
        totalPrice: payingPassengers * 15,
        unit: "person",
      });
    }
  } else if (serviceId === "horse-riding-souss") {
    // 6. Horse Riding
    const hours = options?.ridingHours === 2 ? 2 : 1;
    const pricePerRider = hours === 2 ? 40 : 25;
    breakdown.push({
      label: `${hours}-hour guided horse ride`,
      unitPrice: pricePerRider,
      quantity: payingPassengers,
      totalPrice: payingPassengers * pricePerRider,
      unit: "person",
    });
  } else {
    // 7. Standard Per-Person Shared Tours (Boat Cruise, Moroccan Evening, Excursions)
    const optionsList = service.price?.options || [];
    const adultOpt = optionsList.find(
      (o) => o.label.toLowerCase().includes("adult") || o.label.toLowerCase().includes("adulte"),
    );
    const childOpt = optionsList.find(
      (o) =>
        o.label.toLowerCase().includes("child 4 to 11") ||
        o.label.toLowerCase().includes("enfant 4"),
    );
    const infantOpt = optionsList.find(
      (o) =>
        o.label.toLowerCase().includes("under 4") || o.label.toLowerCase().includes("moins de 4"),
    );

    const adultPrice = adultOpt ? adultOpt.amount : 0;
    const childPrice = childOpt ? childOpt.amount : adultPrice * 0.5;

    if (adults > 0) {
      breakdown.push({
        label: adultOpt?.label || "Adult",
        unitPrice: adultPrice,
        quantity: adults,
        totalPrice: adults * adultPrice,
        unit: "person",
      });
    }

    if (children > 0) {
      breakdown.push({
        label: childOpt?.label || "Child (4 to 11)",
        unitPrice: childPrice,
        quantity: children,
        totalPrice: children * childPrice,
        unit: "person",
      });
    }

    if (infants > 0) {
      breakdown.push({
        label: infantOpt?.label || "Child under 4",
        unitPrice: 0,
        quantity: infants,
        totalPrice: 0,
        unit: "person",
      });
    }

    // Optional licensed guide for City Tour or Marrakech
    if (options?.licensedGuide) {
      const guidePrice = serviceId === "marrakech" ? 35 : 25;
      breakdown.push({
        label: `Licensed guide (${serviceId === "marrakech" ? "Marrakech medina" : "Agadir"})`,
        unitPrice: guidePrice,
        quantity: 1,
        totalPrice: guidePrice,
      });
    }
  }

  // Zone 2 Pickup Supplement
  let pickupZoneSupplement = 0;
  if (options?.pickupZone === "zone-2" && !isPrivate && service.category !== "transfer") {
    // Section 3.3: Included for Paradise Valley, Timlalin and Essaouira. On other tours add 5 EUR per person.
    const isEnRouteNorth =
      serviceId === "paradise-valley" ||
      serviceId === "timlalin-dunes" ||
      serviceId === "essaouira";

    if (isEnRouteNorth) {
      notes.push(
        "Zone 2 pickup (Taghazout / Tamraght / Aourir) is included at no extra charge (collected en route).",
      );
    } else {
      pickupZoneSupplement = payingPassengers * 5;
      breakdown.push({
        label: "Zone 2 pickup supplement (Taghazout / Tamraght / Aourir)",
        unitPrice: 5,
        quantity: payingPassengers,
        totalPrice: pickupZoneSupplement,
        unit: "person",
      });
    }
  }

  const totalEur = breakdown.reduce((sum, item) => sum + item.totalPrice, 0);
  const indicativeMad = Math.round(totalEur * exchangeRate);

  return {
    valid: true,
    serviceId,
    currency: "EUR",
    totalEur,
    indicativeMad,
    exchangeRate,
    breakdown,
    vehicleClass,
    appliedPrivateRate,
    pickupZoneSupplement: pickupZoneSupplement > 0 ? pickupZoneSupplement : undefined,
    notes: notes.length > 0 ? notes : undefined,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}
