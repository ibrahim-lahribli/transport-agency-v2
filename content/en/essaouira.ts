import type { Service } from "@/schemas/service";

export const essaouira: Service = {
  id: "essaouira",
  category: "excursion",
  status: "draft",
  order: 10,
  slug: "essaouira-day-trip-from-agadir",
  title: "Essaouira (Mogador) Day Trip from Agadir",
  summary:
    "Travel north along the coast for a full day on this Essaouira day trip from Agadir. You stop first at Tamri for views over the Atlantic, then watch for goats in the argan trees, a sight that depends on the season and is never guaranteed. A visit to an argan oil cooperative explains how the oil is made. In Essaouira, a historic Atlantic port also known as Mogador, you walk the fortified medina, the ramparts, the skala and the working fishing harbour, with its old cannons and souks. Free time for lunch and galleries follows before the drive back. It is a long day, with about five to six hours on the road in total.",
  seo: {
    title: "Essaouira Day Trip from Agadir: Mogador Tour",
    description:
      "Essaouira day trip from agadir: Tamri viewpoint, argan cooperative, fortified medina, ramparts, harbour and free time. About 3 hours each way.",
  },
  primaryKeyword: "essaouira day trip from agadir",
  durationHours: 12,
  pickupWindow: "07:00 to 08:00",
  returnApprox: "19:00 to 19:30",
  days: "Daily, year-round; departure from Essaouira around 16:00",
  capacity: {
    min: 2,
    sharedMax: 16,
    privateAvailable: true,
  },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      {
        label: "Adult",
        amount: 35,
        unit: "person",
      },
      {
        label: "Child 4 to 11",
        amount: 18,
        unit: "person",
      },
      {
        label: "Child under 4",
        amount: 0,
        unit: "person",
      },
    ],
  },
  privateRate: "essaouira",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: [
    "Hotel pickup in Agadir, suggested departure about 07:30.",
    "Tamri: panoramic stop over the Atlantic coastline and river mouth.",
    "Goats in argan trees may be visible, depending on the season; never guaranteed.",
    "Argan oil cooperative: traditional production and local products.",
    "Essaouira: fortified medina, city walls, fishing harbour, skala and historic cannons.",
    "Free time for lunch, galleries, shops or a walk by the ocean.",
    "Departure from Essaouira about 16:00; return to Agadir about 19:00 to 19:30.",
  ],
  includedExtra: [
    "Transport by air-conditioned vehicle",
    "Driver-host commentary in English or French",
    "Bottled water for each passenger",
    "Rest stops on the coast road",
  ],
  notIncluded: [
    "Lunch in Essaouira (free time to choose a seafood cafe)",
    "Monument entrance fees (Skala ramparts)",
    "Personal purchases (argan oil, thuya woodwork)",
    "Tips",
  ],
  bring: [
    "Light jacket for the wind",
    "Comfortable shoes",
    "Hat and sunscreen",
    "Cash for lunch, purchases and any monument entry",
  ],
  suitableFor: ["Couples", "Families", "Friends", "Small groups"],
  restrictions: [
    "Long day: about 5 to 6 hours in the vehicle in total.",
    "Goats in argan trees are a spontaneous seasonal sight and are never guaranteed.",
    "Essaouira is often windy; the sea wall and harbour edges need care in strong wind.",
  ],
  seasonalNotes: [
    "Goats in argan trees are seen most reliably in the drier months, generally late morning to mid-afternoon.",
    "Essaouira is windy year-round and especially in summer; a light jacket helps.",
    "In winter the return drive finishes after dark.",
  ],
  highlights: [
    "Full day on the Atlantic coast from Agadir",
    "Tamri panoramic stop over the coastline",
    "Goats in argan trees, depending on the season",
    "Argan oil cooperative visit",
    "Fortified medina, ramparts, skala and harbour",
    "Free time for lunch, galleries and shops",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Tamri viewpoint",
        km: 70,
        minutes: "60 to 75",
        notes: "N1 north along the coast.",
      },
      {
        from: "Tamri",
        to: "Argan cooperative area (Ida Ou Gourd / Tamri)",
        km: 20,
        minutes: "20 to 30",
        notes: "Short stop on the same road.",
      },
      {
        from: "Argan cooperative",
        to: "Essaouira",
        km: 85,
        minutes: "75 to 95",
        notes: "N1 north; goats in argan trees may be seen in season.",
      },
      {
        from: "Essaouira",
        to: "Central Agadir (return, N1 south)",
        km: 175,
        minutes: "150 to 180",
        notes: "Same road back, arriving after dark in winter.",
      },
    ],
    roundTripKm: 350,
    drivingHoursTotal: "5 h to 6 h",
  },
  faq: [
    {
      q: "How long is the drive?",
      a: "About three hours each way on the coast road, so around five to six hours on the road in total. We build in stops.",
    },
    {
      q: "Will we see goats in the argan trees?",
      a: "Sometimes. It depends on the season and local conditions, and it is never guaranteed. The drier months are usually better.",
    },
    {
      q: "Is lunch included?",
      a: "No. Lunch is during your free time in Essaouira, so you can choose where and what to eat.",
    },
  ],
  confirmFlags: [
    "price",
    "lunch policy",
    "departure time from Essaouira",
    "monument entrance fees",
    "capacity",
  ],
} satisfies Service;

export default essaouira;
