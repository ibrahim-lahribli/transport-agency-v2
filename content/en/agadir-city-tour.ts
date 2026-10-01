import type { Service } from "@/schemas/service";

export const agadirCityTour: Service = {
  id: "agadir-city-tour",
  category: "excursion",
  status: "draft",
  order: 8,
  slug: "agadir-city-tour-marina-kasbah-souk",
  title: "Discover Agadir: City Tour",
  summary:
    "Get to know the city on this half-day Agadir city tour. You start at the Marina for a walk by the water, then drive up to the Oufella Kasbah for wide views over Agadir, the Atlantic and the surrounding plain. In the Talborjt district you hear how the city was destroyed in the 1960 earthquake and rebuilt. A stop at a local argan oil cooperative explains how the oil is produced. The last stop is Souk El Had, one of the largest markets in the region, with free time to look for spices, crafts and souvenirs. The souk is closed on Mondays. Hotel pickup and drop-off are included.",
  seo: {
    title: "Agadir City Tour: Marina, Kasbah & Souk",
    description:
      "Half-day Agadir city tour with hotel pickup: Marina, Oufella Kasbah views, Talborjt, an argan cooperative and Souk El Had (closed Mondays).",
  },
  primaryKeyword: "agadir city tour",
  durationHours: 4,
  pickupWindow: "Morning 08:50 to 09:10 / Afternoon 14:20 to 14:40",
  returnApprox: "Morning 13:30 to 14:15 / Afternoon 18:30 to 19:15",
  days: "Daily (morning and afternoon; on Mondays Souk El Had is closed and replaced with the Port of Agadir fishing harbour or Vallée des Oiseaux)",
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
        amount: 20,
        unit: "person",
      },
      {
        label: "Child 4 to 11",
        amount: 10,
        unit: "person",
      },
      {
        label: "Child under 4",
        amount: 0,
        unit: "person",
      },
    ],
  },
  privateRate: "agadir-halfday",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: [
    "Hotel pickup in Agadir (morning 09:00 or afternoon 14:30 departure).",
    "Agadir Marina: waterfront walk and photo stop.",
    "Agadir Oufella Kasbah: panoramic views over the city, the Atlantic and the region.",
    "Talborjt: a district destroyed in the 1960 earthquake and rebuilt as part of the modern city.",
    "Argan oil cooperative: how argan products are made.",
    "Souk El Had: free time for spices, crafts, clothing and souvenirs.",
    "Drop-off at your hotel.",
  ],
  includedExtra: [
    "Hotel pickup and drop-off in Agadir",
    "Transport by air-conditioned minivan",
    "Driver-host commentary in English or French",
  ],
  notIncluded: [
    "Personal purchases at the souk or cooperative",
    "Optional licensed city guide (25 EUR per group)",
    "Tips",
  ],
  bring: [
    "Comfortable shoes",
    "Hat and sunscreen",
    "Cash for shopping at the souk and cooperative",
  ],
  suitableFor: ["Couples", "Families", "Friends", "Small groups"],
  restrictions: [
    "Souk El Had is closed on Mondays; on that day an alternative stop is offered.",
    "The Oufella Kasbah site opens at 10:00, so it is visited from mid-morning.",
    "In winter the afternoon departure finishes after sunset.",
  ],
  highlights: [
    "Half-day city tour with hotel pickup",
    "Waterfront walk at Agadir Marina",
    "Panoramic views from the Oufella Kasbah",
    "The story of Talborjt and the 1960 earthquake",
    "Argan oil cooperative visit",
    "Free time at Souk El Had (closed Mondays)",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir (Boulevard du 20 Août)",
        to: "Agadir Marina",
        km: 2,
        minutes: "5 to 10",
        notes: "Short hop to the waterfront.",
      },
      {
        from: "Agadir Marina",
        to: "Agadir Oufella (Kasbah)",
        km: 6,
        minutes: "12 to 18",
        notes: "Uphill on the Kasbah road; the managed site opens at 10:00.",
      },
      {
        from: "Agadir Oufella",
        to: "Talborjt district",
        km: 3,
        minutes: "8 to 12",
        notes: "Down into the city centre.",
      },
      {
        from: "Talborjt",
        to: "Argan oil cooperative",
        km: 4,
        minutes: "10 to 15",
        notes: "Location to be confirmed with the operator.",
      },
      {
        from: "Argan cooperative",
        to: "Souk El Had, Rue 2 Mars",
        km: 5,
        minutes: "12 to 20",
        notes: "Closed on Mondays.",
      },
      {
        from: "Souk El Had",
        to: "Hotels in Agadir",
        km: 3,
        minutes: "8 to 15",
        notes: "Drop-off by zone.",
      },
    ],
    roundTripKm: 28,
    drivingHoursTotal: "0 h 55 to 1 h 30",
  },
  faq: [
    {
      q: "Is Souk El Had open every day?",
      a: "No. The market is closed on Mondays for cleaning. On Mondays we replace that stop with another city stop.",
    },
    {
      q: "Is a separate host included?",
      a: "You travel with a driver who comments on the route. A separate host for the medina and souk can be requested in advance.",
    },
    {
      q: "How much free time do we get at the souk?",
      a: "About one hour, enough to look around and shop without rushing.",
    },
  ],
  confirmFlags: [
    "price",
    "two departure times",
    "guide wording",
    "which cooperative is visited",
    "Oufella access on the day",
  ],
} satisfies Service;

export default agadirCityTour;
