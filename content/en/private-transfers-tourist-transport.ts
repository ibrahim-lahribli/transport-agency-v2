import type { Service } from "@/schemas/service";

export const privateTransfersTouristTransport: Service = {
  id: "private-transfers-tourist-transport",
  category: "transfer",
  status: "draft",
  order: 15,
  slug: "private-transfers-tourist-transport-from-agadir",
  title: "Private Transfers & Tourist Transport from Agadir",
  summary:
    "Private drivers between Agadir and Essaouira, Marrakech, Imsouane and other cities, plus a private vehicle with driver for a day of your own excursions.",
  seo: {
    title: "Private Transfer Agadir: Essaouira, Marrakech, Day Hire",
    description:
      "Private drivers from Agadir to Essaouira, Marrakech, Imsouane and beyond, plus private vehicle hire with driver for day excursions.",
  },
  primaryKeyword: "private transfer agadir",
  availability: "By prior arrangement",
  direction: "One way; return trips are quoted on request",
  price: {
    currency: "EUR",
    unit: "vehicle",
    confirmed: false,
    nightSurcharge: 0,
  },
  cancellationPolicy: "transfer",
  languages: ["en", "fr", "ar"],
  host: "driver",
  dayHire: {
    usesSiteRates: "privateDayRates",
    note: "Private vehicle with driver for your own itinerary. Up to 10 hours, up to 250 km, fuel, tolls and parking included.",
  },
  routes: [
    {
      from: "Agadir Al Massira Airport (AGA) or Agadir hotel",
      to: "Essaouira",
      distanceKm: 175,
      minutes: "about 150",
      prices: {
        sedan: 95,
        van: 125,
        minibus: 180,
      },
      basis: "market-benchmark",
    },
    {
      from: "Agadir Al Massira Airport (AGA) or Agadir hotel",
      to: "Marrakech",
      distanceKm: 250,
      minutes: "about 210",
      prices: {
        sedan: 125,
        van: 160,
        minibus: 230,
      },
      basis: "market-benchmark",
    },
  ],
  extras: [
    {
      label: "Additional stop",
      amount: 5,
      unit: "vehicle",
    },
    {
      label: "Overtime beyond 10 hours, per hour",
      amount: 8,
      unit: "vehicle",
      note: "8 EUR/h sedan, 10 EUR/h van, 15 EUR/h minibus",
    },
  ],
  vehicles: ["sedan", "van", "minibus"],
  includedExtra: [
    "Fuel, tolls and parking",
    "Professional driver",
    "Flight tracking for airport pickups",
  ],
  notIncluded: [
    "Entrance fees",
    "Meals",
    "Overnight stays for the driver (long trips quoted separately)",
  ],
  faq: [
    {
      q: "Can I use a private driver for my own itinerary?",
      a: "Yes. Choose a day rate for a private vehicle and driver, and we plan the route around what you want to see.",
    },
    {
      q: "How do I get a quote for another city?",
      a: "Message us on WhatsApp with the route, date and number of passengers.",
    },
  ],
  confirmFlags: [
    "all route and day-hire prices",
    "overtime price",
    "tourist transport authorisation for each vehicle",
    "who owns and drives the vehicles",
  ],
} satisfies Service;

export default privateTransfersTouristTransport;
