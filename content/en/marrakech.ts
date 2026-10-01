import type { Service } from "@/schemas/service";

export const marrakech: Service = {
  id: "marrakech",
  category: "excursion",
  status: "draft",
  order: 12,
  slug: "marrakech-day-trip-from-agadir",
  title: "Marrakech Day Trip from Agadir",
  summary:
    "Make a long but rewarding day of it on this Marrakech day trip from Agadir. An early start takes you up the toll motorway across the Argana hills and into the Red City around mid-morning. You see the Koutoubia Mosque from the outside, then visit the Majorelle Garden, known for its intense colour and plant collection. After free time for lunch you walk to Jemaa el-Fnaa and into the medina, with its crafts, spices, textiles and leather goods. Because the return drive is long, the day ends around 19:00 to 19:30. Entrance fees, including the Majorelle Garden, and lunch are not included.",
  seo: {
    title: "Marrakech Day Trip from Agadir: Medina Tour",
    description:
      "Marrakech day trip from agadir: Koutoubia from outside, Majorelle Garden, Jemaa el-Fnaa and the souks, with free time for lunch.",
  },
  primaryKeyword: "marrakech day trip from agadir",
  durationHours: 12,
  pickupWindow: "07:00 to 08:00",
  returnApprox: "19:00 to 19:30",
  days: "Daily, year-round; book at least 48 hours in advance",
  capacity: {
    min: 4,
    sharedMax: 16,
    privateAvailable: true,
  },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "market-benchmark",
    confirmed: false,
    options: [
      {
        label: "Adult",
        amount: 45,
        unit: "person",
      },
      {
        label: "Child 4 to 11",
        amount: 25,
        unit: "person",
      },
      {
        label: "Child under 4",
        amount: 0,
        unit: "person",
      },
    ],
  },
  privateRate: "marrakech",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: [
    "Hotel pickup in Agadir, suggested departure about 07:30.",
    "Comfortable motorway drive to Marrakech, with a short rest stop (about 3 to 3.5 hours).",
    "Koutoubia Mosque, seen from the outside, with its history and architecture explained.",
    "Majorelle Garden, with its colour and botanical surroundings (timed entry).",
    "Free time for lunch.",
    "Jemaa el-Fnaa square and then the medina and souks: crafts, spices, textiles and leather.",
    "Departure from Marrakech about 16:00; return to Agadir about 19:00 to 19:30.",
  ],
  includedExtra: [
    "Transport by air-conditioned vehicle via the A7 motorway",
    "Motorway tolls and parking fees",
    "Driver-host commentary in English or French",
    "Bottled water for each passenger",
  ],
  notIncluded: [
    "Lunch in Marrakech (free time to choose a restaurant)",
    "Monument and garden entrance fees (Majorelle Garden, Bahia Palace)",
    "Optional licensed city guide in Marrakech (35 EUR per group)",
    "Tips",
  ],
  bring: [
    "Comfortable walking shoes",
    "Light clothing that covers shoulders and knees for the medina",
    "Hat and sunscreen",
    "Cash for lunch, entrance fees and shopping",
    "Light jacket for the return drive",
  ],
  suitableFor: ["Couples", "Families", "Friends", "Small groups"],
  restrictions: [
    "Very long day: about 5.5 to 7 hours in the vehicle in total.",
    "Majorelle Garden uses timed advance tickets and may not be available at short notice.",
    "Not recommended for very young children; children under 6 may find the day tiring.",
    "Entrance fees, including the Majorelle Garden, are not included.",
  ],
  seasonalNotes: [
    "Marrakech is inland and much hotter than Agadir in summer; the early start and shade at midday help.",
    "Winter motorway sections can be cold and foggy early in the day.",
    "The return is after dark for much of the year.",
  ],
  highlights: [
    "Full-day trip from Agadir to Marrakech",
    "Koutoubia Mosque, seen from the outside",
    "Majorelle Garden with its intense colour",
    "Jemaa el-Fnaa square and the medina",
    "Free time for lunch and shopping",
    "Hotel pickup and a comfortable motorway drive",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Marrakech",
        km: 250,
        minutes: "165 to 210",
        notes: "A7 toll motorway north, with one short rest stop.",
      },
      {
        from: "Marrakech arrival point",
        to: "City stops (Koutoubia, Majorelle, Jemaa el-Fnaa)",
        km: 15,
        minutes: "20 to 40",
        notes: "Local driving and parking between stops.",
      },
      {
        from: "Marrakech",
        to: "Central Agadir (return, A7)",
        km: 250,
        minutes: "165 to 210",
        notes: "Same motorway back, arriving after dark in winter.",
      },
    ],
    roundTripKm: 515,
    drivingHoursTotal: "5 h 30 to 7 h 20",
  },
  faq: [
    {
      q: "Is Marrakech doable in a day from Agadir?",
      a: "Yes, but it is a long day with about six hours of driving. You get several hours in the city, and we start early.",
    },
    {
      q: "Is the Majorelle Garden included?",
      a: "The visit is included in the itinerary but the entrance fee is not. It uses timed tickets, so we check availability when you request.",
    },
    {
      q: "Can we go inside the Koutoubia Mosque?",
      a: "No. Non-Muslims cannot enter mosques in Morocco. You see the Koutoubia from the outside and learn about its history.",
    },
  ],
  confirmFlags: [
    "price",
    "minimum group of 4",
    "entrance fee wording",
    "licensed guide availability and price",
    "exact return time",
  ],
} satisfies Service;

export default marrakech;
