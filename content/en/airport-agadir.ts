import type { Service } from "@/schemas/service";

export const airportAgadir: Service = {
  id: "airport-agadir",
  category: "transfer",
  status: "published",
  order: 13,
  slug: "agadir-airport-transfer-to-agadir-hotels",
  title: "Agadir Airport Transfer to Agadir Hotels",
  summary:
    "Private transfer between Agadir Al Massira Airport (AGA) and your hotel in Agadir or Anza. Fixed price, flight tracking and a driver waiting for you in the arrivals hall.",
  seo: {
    title: "Agadir Airport Transfer to Agadir Hotels",
    description:
      "Private transfer between Agadir Al Massira Airport (AGA) and Agadir hotels. Fixed price, flight tracking, meet and greet at arrivals.",
  },
  primaryKeyword: "agadir airport transfer",
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
      to: "Agadir city centre, beachfront, Founty, Sonaba, Talborjt, Marina",
      distanceKm: 25,
      minutes: 30,
      prices: {
        sedan: 20,
        van: 30,
        minibus: 50,
      },
      basis: "catalogue",
    },
    {
      from: "Agadir Al Massira Airport (AGA)",
      to: "Anza",
      distanceKm: 32,
      minutes: "35 to 40",
      prices: {
        sedan: 25,
        van: 35,
        minibus: 55,
      },
      basis: "estimate",
    },
    {
      from: "Agadir hotel",
      to: "Another Agadir hotel or the marina",
      minutes: "10 to 20",
      prices: {
        sedan: 12,
        van: 18,
        minibus: 30,
      },
      basis: "estimate",
    },
  ],
  extras: [
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
    "Luggage assistance",
    "Fuel, tolls and parking",
  ],
  notIncluded: ["Additional stops (small supplement)", "Waiting beyond 60 minutes"],
  faq: [
    {
      q: "Where will I meet my driver?",
      a: "In the arrivals hall, holding a sign with your name. You also get the driver's name, car and phone number on WhatsApp before you land.",
    },
    {
      q: "What if my flight is delayed?",
      a: "We track your flight and adjust automatically. Waiting is free for the first 60 minutes after landing.",
    },
    {
      q: "Is the price per person?",
      a: "No, it is per vehicle: a private car for up to 3 passengers, a van for 4 to 7, a minibus for 8 to 15.",
    },
  ],
  confirmFlags: [
    "all route prices and the vehicle price ladder",
    "no night surcharge",
    "child seat availability and price",
    "waiting policy",
    "driver and vehicle authorisation",
    "airport meeting rules",
  ],
} satisfies Service;

export default airportAgadir;
