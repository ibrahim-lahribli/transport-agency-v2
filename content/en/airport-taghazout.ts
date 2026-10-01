import type { Service } from "@/schemas/service";

export const airportTaghazout: Service = {
  id: "airport-taghazout",
  category: "transfer",
  status: "published",
  order: 14,
  slug: "agadir-airport-to-taghazout-private-transfer",
  title: "Agadir Airport to Taghazout Private Transfer",
  summary:
    "Private transfer between Agadir Al Massira Airport and Taghazout, Taghazout Bay, Tamraght or Aourir. Fixed price, flight tracking, and room for surfboards on request.",
  seo: {
    title: "Agadir Airport to Taghazout Transfer: Private Car",
    description:
      "Private transfer from Agadir Airport to Taghazout, Tamraght and Aourir. Flight tracking, fixed price, surfboards on request.",
  },
  primaryKeyword: "agadir airport to taghazout transfer",
  availability: "24/7 by prior arrangement",
  direction: "One way; the same price applies in the opposite direction",
  price: {
    currency: "EUR",
    unit: "vehicle",
    confirmed: false,
    nightSurcharge: 0,
  },
  cancellationPolicy: "transfer",
  languages: ["en", "fr", "ar"],
  host: "driver",
  routes: [
    {
      from: "Agadir Al Massira Airport (AGA)",
      to: "Tamraght and Aourir",
      minutes: "40 to 45",
      prices: {
        sedan: 30,
        van: 40,
        minibus: 65,
      },
      basis: "estimate",
    },
    {
      from: "Agadir Al Massira Airport (AGA)",
      to: "Taghazout village and Taghazout Bay",
      distanceKm: 45,
      minutes: 50,
      prices: {
        sedan: 35,
        van: 45,
        minibus: 70,
      },
      basis: "catalogue",
    },
    {
      from: "Agadir Al Massira Airport (AGA)",
      to: "Imsouane",
      distanceKm: 100,
      minutes: 90,
      prices: {
        sedan: 70,
        van: 90,
        minibus: 130,
      },
      basis: "market-benchmark",
    },
  ],
  extras: [
    {
      label: "Surfboards and bikes",
      amount: 0,
      unit: "vehicle",
      note: "Van or minibus required. Up to 4 boards free, then 5 EUR per extra board.",
    },
    {
      label: "Additional stop on the way",
      amount: 5,
      unit: "vehicle",
    },
    {
      label: "Waiting beyond 60 minutes after landing, per 30 minutes",
      amount: 5,
      unit: "per 30 min",
    },
    {
      label: "Child seat",
      amount: 0,
      unit: "vehicle",
      note: "Free on request 24h prior",
    },
  ],
  vehicles: ["sedan", "van", "minibus"],
  includedExtra: [
    "Flight tracking",
    "Driver waiting in the arrivals hall with a sign showing your name",
    "60 minutes free waiting after landing",
    "Fuel, tolls and parking",
  ],
  notIncluded: ["Additional stops", "Waiting beyond 60 minutes"],
  faq: [
    {
      q: "Can you carry surfboards?",
      a: "Yes, on request. Tell us the number and size of boards so we send a van with space.",
    },
    {
      q: "Which villages does this cover?",
      a: "Taghazout, Taghazout Bay, Tamraght and Aourir. Imsouane and other spots are available on request.",
    },
  ],
  confirmFlags: [
    "all route prices",
    "surfboard rules and supplement",
    "night surcharge",
    "driver authorisation",
    "actual travel times",
  ],
} satisfies Service;

export default airportTaghazout;
