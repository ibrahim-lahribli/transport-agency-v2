import type { Service } from "@/schemas/service";

export const taroudantTiout: Service = {
  id: "taroudant-tiout",
  category: "excursion",
  status: "published",
  order: 11,
  slug: "taroudant-tiout-oasis-day-trip-from-agadir",
  title: "Taroudant & Tiout Oasis Day Trip from Agadir",
  summary:
    "Combine a historic walled town with oasis scenery on this Taroudant day trip from Agadir. You drive east through the Souss plain to Taroudant, known locally as the Little Marrakech, and walk its long ramparts and gates, the old medina and the traditional souks. Depending on local conditions you may see goats in argan trees, though this is never guaranteed on this road. You continue to the Tiout oasis for its palm groves, village streets and kasbah area, and a traditional lunch with views over the palms. A walk through the oasis is optional, as is a donkey ride arranged locally. Hotel pickup, drop-off and lunch are included.",
  seo: {
    title: "Taroudant Day Trip from Agadir: Tiout Oasis",
    description:
      "Taroudant day trip from agadir to the walled town and the Tiout oasis: ramparts, medina, souks, palm groves and a traditional lunch.",
  },
  primaryKeyword: "taroudant day trip from agadir",
  durationHours: 9,
  pickupWindow: "08:00 to 09:00",
  returnApprox: "17:00 to 17:45",
  days: "Daily, year-round; comfortable from late autumn to spring",
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
    "Taroudant: historic walls and gates, old medina, souks, carpets and handicrafts.",
    "Optional photo stop for goats in argan trees, if local conditions allow.",
    "Drive south-east to the Tiout oasis.",
    "Tiout: palm groves, village landscapes and the historic kasbah area.",
    "Traditional Moroccan lunch with views over the oasis.",
    "Optional walk through the oasis and optional donkey ride, subject to local availability.",
    "Return to Agadir, arriving about 17:00 to 17:45 depending on traffic.",
  ],
  includedExtra: [
    "Hotel pickup and drop-off in Agadir",
    "Traditional Moroccan lunch at Tiout oasis",
    "Bottled water for each passenger",
    "Driver-host commentary in English or French",
  ],
  notIncluded: [
    "Donkey ride in Tiout palm grove (optional, paid locally)",
    "Drinks with lunch",
    "Personal purchases in Taroudant souks",
    "Tips",
  ],
  bring: [
    "Comfortable shoes",
    "Hat, sunglasses and sunscreen",
    "Water",
    "Cash for purchases and the optional donkey ride",
  ],
  suitableFor: ["Couples", "Families", "Friends", "Small groups"],
  restrictions: [
    "Full day: about 3.5 to 4.5 hours in the vehicle in total.",
    "Goats in argan trees are rare on this road and never guaranteed.",
    "The donkey ride is optional, arranged locally, and subject to availability.",
  ],
  seasonalNotes: [
    "The Souss plain is very hot in summer; the morning start and a shaded lunch help.",
    "Late autumn to spring is the most comfortable time for this route.",
    "Palms are greenest after the winter and spring rains.",
  ],
  highlights: [
    "Full-day trip from Agadir with hotel pickup",
    "Taroudant walls, gates, medina and souks",
    "Goats in argan trees, depending on the season",
    "Tiout oasis: palm groves, village and kasbah area",
    "Traditional lunch with a view over the oasis",
    "Optional walk in the oasis and donkey ride",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Taroudant",
        km: 80,
        minutes: "75 to 95",
        notes: "N10 east through the Souss plain via Aït Melloul and Oulad Teima.",
      },
      {
        from: "Taroudant",
        to: "Tiout oasis",
        km: 30,
        minutes: "30 to 45",
        notes: "South-east on the Tata road.",
      },
      {
        from: "Tiout oasis",
        to: "Central Agadir",
        km: 110,
        minutes: "105 to 130",
        notes: "Return via Taroudant and the N10.",
      },
    ],
    roundTripKm: 220,
    drivingHoursTotal: "3 h 30 to 4 h 30",
  },
  faq: [
    {
      q: "Will we see the goats in the argan trees?",
      a: "Possibly, but it is rare on this inland road and never guaranteed. The coastal Agadir to Essaouira road is the more reliable place.",
    },
    {
      q: "Is the donkey ride included?",
      a: "No. It is optional, arranged locally, subject to availability, and paid on the spot.",
    },
    {
      q: "Why is Taroudant called the Little Marrakech?",
      a: "It is a walled city with a large medina and souks, but calmer and much less crowded than Marrakech.",
    },
  ],
  confirmFlags: [
    "price and lunch inclusion",
    "donkey ride price",
    "pickup and return times",
    "capacity",
  ],
} satisfies Service;

export default taroudantTiout;
