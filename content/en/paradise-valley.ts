import type { Service } from "@/schemas/service";

export const paradiseValley: Service = {
  id: "paradise-valley",
  category: "excursion",
  status: "draft",
  order: 7,
  slug: "paradise-valley-day-trip-from-agadir",
  title: "Paradise Valley Day Trip from Agadir",
  summary:
    "Spend a full day in the foothills north of Agadir on this Paradise Valley agadir trip. You drive along the coast to Aourir, then climb the mountain road toward Imouzzer. Along the way you stop at a local argan oil cooperative, watch a potter work at the wheel, and pause at a viewpoint over the valleys and argan trees. At Paradise Valley you walk about 20 to 35 minutes on a rocky path to the natural pools, with free time to relax. Swimming depends on the season and recent rainfall. A local tajine lunch is optional and paid on site. Pickup and drop-off at your hotel are included.",
  seo: {
    title: "Paradise Valley Agadir Day Trip: Pools & Argan",
    description:
      "Paradise Valley agadir day trip with hotel pickup, argan cooperative, pottery workshop, viewpoint and a rocky walk to the natural pools.",
  },
  primaryKeyword: "paradise valley agadir",
  durationHours: 8,
  pickupWindow: "08:30 to 09:30",
  returnApprox: "16:30 to 17:00",
  days: "Daily, subject to weather and seasonal water levels",
  capacity: {
    min: 2,
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
        amount: 30,
        unit: "person",
      },
      {
        label: "Child 4 to 11",
        amount: 15,
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
    "Hotel pickup in Agadir; Taghazout and Tamraght guests are collected en route.",
    "Argan oil cooperative: production explanation and tasting of argan oil and amlou.",
    "Pottery workshop: wheel demonstration and a photo stop.",
    "Panoramic stop over the valleys and argan trees.",
    "Drive up to the Paradise Valley entrance, then walk 20 to 35 minutes to the pools.",
    "Free time at the pools; optional tajine lunch nearby, paid on site.",
    "Return drive to Agadir, arriving around 16:30 to 17:00.",
  ],
  includedExtra: [
    "Hotel pickup and drop-off in Agadir and Zone 2 en route",
    "Argan oil cooperative visit and tasting",
    "Pottery workshop visit and demonstration",
    "Bottled water for each passenger",
  ],
  notIncluded: [
    "Tajine lunch at a local cafe (paid directly on site)",
    "Personal purchases",
    "Tips",
  ],
  bring: [
    "Shoes or sandals with grip",
    "Swimsuit and towel",
    "Hat and sunscreen",
    "Water",
    "Cash for an optional lunch and for purchases",
  ],
  suitableFor: ["Couples", "Families", "Friends"],
  restrictions: [
    "The path to the pools is uneven and rocky and is not suitable for guests with reduced mobility.",
    "Swimming depends on the season and recent rainfall; the pools can be low or dry in the dry season.",
    "A moderate amount of time is spent in the vehicle on mountain roads.",
  ],
  seasonalNotes: [
    "Water levels in the pools follow recent rainfall and vary through the year.",
    "The route is inland and can be very hot in July and August; mornings are cooler.",
    "The valley walk is sometimes slippery after rain.",
  ],
  highlights: [
    "Full-day trip north of Agadir, with hotel pickup",
    "Argan oil cooperative visit with a tasting",
    "Pottery workshop and wheel demonstration",
    "Viewpoint over the valleys and argan trees",
    "Walk of about 20 to 35 minutes to the pools",
    "Free time at the pools; swimming depends on the season",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir (Boulevard du 20 Août)",
        to: "Aourir, via Anza, Tamraght, N1 north",
        km: 25,
        minutes: "30 to 40",
        notes: "Coast road north toward Taghazout and Essaouira.",
      },
      {
        from: "Aourir",
        to: "Paradise Valley entrance and car park",
        km: 12,
        minutes: "25 to 35",
        notes: "Left at Aourir onto the mountain road toward Imouzzer.",
      },
      {
        from: "Car park",
        to: "First natural pools (on foot)",
        km: 1.5,
        minutes: "20 to 35",
        notes: "Uneven, rocky path; no vehicle beyond the car park.",
      },
      {
        from: "Paradise Valley",
        to: "Central Agadir (return, same road)",
        km: 37,
        minutes: "55 to 75",
        notes: "Stops on the way back as agreed.",
      },
    ],
    roundTripKm: 74,
    drivingHoursTotal: "1 h 55 to 2 h 30",
  },
  faq: [
    {
      q: "Can we swim in the pools?",
      a: "Sometimes, depending on the season and the water level. Bring a swimsuit, and we will tell you the current conditions when you request.",
    },
    {
      q: "How long is the walk to the pools?",
      a: "About 20 to 35 minutes to the first pools, on an uneven and sometimes slippery rock path. Further pools take longer.",
    },
    {
      q: "Is lunch included?",
      a: "No. A traditional tajine is usually available near the valley at your own cost, paid on the spot.",
    },
  ],
  confirmFlags: [
    "price and child price",
    "bottled water included",
    "walk duration",
    "capacity and minimum group",
    "pickup and return times",
  ],
} satisfies Service;

export default paradiseValley;
