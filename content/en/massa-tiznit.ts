import type { Service } from "@/schemas/service";

export const massaTiznit: Service = {
  id: "massa-tiznit",
  category: "excursion",
  status: "draft",
  order: 9,
  slug: "massa-tiznit-coastal-dunes-day-trip-from-agadir",
  title: "Massa & Tiznit: Coast, Nature & Dunes Day Trip",
  summary:
    "Cross southern Morocco in one day on this Tiznit day trip from Agadir. You head south to a pottery workshop, then follow the Atlantic coast to the fishing village of Tifnit. In the Souss-Massa National Park you travel through wetland and scrub where birds and wildlife depend on the season. Next is the Youssef Ben Tachfine Dam on the Oued Massa, with a viewpoint over the water and surrounding land. In Tiznit you walk the old medina and its silver souks before a traditional lunch. On the way back you stop at small coastal dunes for a short walk. These are coastal dunes, not deep desert dunes. Hotel pickup and lunch are included.",
  seo: {
    title: "Tiznit Day Trip from Agadir: Massa & Dunes",
    description:
      "Tiznit day trip from agadir: pottery artisans, Atlantic coast, Souss-Massa, medina and silver souks, traditional lunch and small coastal dunes.",
  },
  primaryKeyword: "tiznit day trip from agadir",
  durationHours: 8.5,
  pickupWindow: "08:00 to 09:00",
  returnApprox: "17:00 to 17:45",
  days: "Daily, year-round; birdwatching best from November to March",
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
        label: "Adult (lunch included)",
        amount: 38,
        unit: "person",
      },
      {
        label: "Child 4 to 11 (lunch included)",
        amount: 19,
        unit: "person",
      },
      {
        label: "Child under 4",
        amount: 0,
        unit: "person",
      },
    ],
  },
  privateRate: "region-near",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: [
    "Hotel pickup in Agadir.",
    "Pottery workshop: local artisans, traditional techniques, wheel demonstration.",
    "Atlantic coast at Tifnit: wild beach and fishermen's areas.",
    "Souss-Massa National Park and Oued Massa; birds and wildlife depend on the season.",
    "Youssef Ben Tachfine Dam: viewpoint over the reservoir and surrounding land.",
    "Tiznit: old medina, souks and silver craftsmanship, then a traditional lunch.",
    "Small coastal dunes on the return, for a short walk and photos.",
    "Return to Agadir, arriving about 17:00 to 17:45 depending on traffic.",
  ],
  includedExtra: [
    "Hotel pickup and drop-off in Agadir",
    "Traditional Moroccan lunch in Tiznit",
    "Bottled water for each passenger",
    "Driver-host commentary in English or French",
  ],
  notIncluded: [
    "Drinks with lunch",
    "Silver jewellery and personal purchases in Tiznit",
    "Park entrance fees if introduced",
    "Tips",
  ],
  bring: [
    "Comfortable shoes",
    "Hat, sunglasses and sunscreen",
    "Water",
    "Cash for silver, pottery and other purchases",
  ],
  suitableFor: ["Couples", "Families", "Friends", "Small groups"],
  restrictions: [
    "Long day: about 3.5 to 4.5 hours in the vehicle in total.",
    "Birdlife and wildlife are seasonal and are never guaranteed.",
    "These are small coastal dunes, not deep desert dunes.",
  ],
  seasonalNotes:
    "Birdwatching is best from about November to March, and during spring and autumn migration. The dam reservoir level varies with rainfall and has been low in recent dry years. Summer inland is very hot; the early start helps.",
  highlights: [
    "Full-day trip from Agadir with hotel pickup",
    "Pottery workshop with local artisans",
    "Atlantic coast and Tifnit fishing village",
    "Souss-Massa landscapes; birdlife depends on the season",
    "Tiznit medina, souks and silver craft",
    "Traditional lunch and small coastal dunes",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Tifnit and pottery stop",
        km: 28,
        minutes: "35 to 45",
        notes: "N1 south, then the coast road.",
      },
      {
        from: "Tifnit",
        to: "Souss-Massa National Park / Oued Massa",
        km: 22,
        minutes: "25 to 35",
        notes: "Coastal and wetland landscapes.",
      },
      {
        from: "Oued Massa",
        to: "Youssef Ben Tachfine Dam",
        km: 18,
        minutes: "20 to 30",
        notes: "Dam on the Oued Massa, north of Tiznit.",
      },
      {
        from: "Youssef Ben Tachfine Dam",
        to: "Tiznit medina",
        km: 28,
        minutes: "30 to 40",
        notes: "Continue south to the walled town.",
      },
      {
        from: "Tiznit",
        to: "Central Agadir",
        km: 95,
        minutes: "90 to 105",
        notes: "Return north on the N1, with the dunes stop en route.",
      },
    ],
    roundTripKm: 190,
    drivingHoursTotal: "3 h 20 to 4 h 30",
  },
  faq: [
    {
      q: "Are these deep desert dunes?",
      a: "No. These are small coastal dunes near the Atlantic, good for a short walk and photos. They are not deep desert dunes.",
    },
    {
      q: "Will we see flamingos or other birds?",
      a: "Birdlife depends on the season and on water levels. The cooler months from about November to March are usually better.",
    },
    {
      q: "Is lunch included?",
      a: "Yes, a traditional Moroccan or Berber lunch is included. Drinks with lunch are usually extra.",
    },
  ],
  confirmFlags: [
    "price and whether lunch is included",
    "drinks policy",
    "park entrance fees",
    "pickup and return times",
    "which pottery workshop and dune stop",
  ],
} satisfies Service;

export default massaTiznit;
