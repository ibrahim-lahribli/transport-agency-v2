import type { Service } from "@/schemas/service";

export const timlalinDunes: Service = {
  id: "timlalin-dunes",
  category: "activity",
  status: "published",
  order: 2,
  slug: "timlalin-dunes-quad-camel-sandboarding",
  title: "Timlalin Dunes: Quad, Camel Ride & Sandboarding",
  summary:
    "Ride the coastal dunes on this timlalin dunes agadir activity. The dunes lie north of Agadir, past Tamri on the coast road, so plan on about an hour to an hour and a quarter each way. Once there you can ride a camel across the sand, drive a quad for about an hour after a safety briefing, and try sandboarding on the slopes that face the Atlantic. You choose which of these you want; they can also be combined. A sunset option runs in season, with a late-afternoon start and a return shortly after the sun goes down. Hotel pickup and drop-off are included.",
  seo: {
    title: "Timlalin Dunes Agadir: Camel, Quad & Sandboarding",
    description:
      "Timlalin dunes agadir activity: camel ride, about an hour on a quad and sandboarding on coastal dunes north of Agadir, with a seasonal sunset option.",
  },
  primaryKeyword: "timlalin dunes agadir",
  durationHours: 5.5,
  departures: ["08:30", "13:30", "15:45"],
  days: "Daily; morning, afternoon or sunset",
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
        label: "Camel ride (about 45 minutes)",
        amount: 15,
        unit: "person",
        isBase: true,
      },
      {
        label: "Sunset camel ride",
        amount: 20,
        unit: "person",
      },
      {
        label: "Quad, 1 hour, single rider",
        amount: 35,
        unit: "person",
      },
      {
        label: "Quad, 1 hour, two riders on one quad",
        amount: 50,
        unit: "quad",
      },
      {
        label: "Sandboarding add-on",
        amount: 10,
        unit: "person",
      },
      {
        label: "Dunes combo: quad 1 hour + camel ride + sandboarding",
        amount: 55,
        unit: "person",
      },
    ],
  },
  cancellationPolicy: "adventure",
  languages: ["en", "fr", "ar"],
  host: "operator-team",
  itinerary: [
    "Hotel pickup in Agadir and drive north toward Tamri (about 1 hour to 1 hour 15).",
    "Camel ride through the dunes, with views toward the Atlantic.",
    "Quad ride of about one hour over the sand, after a safety briefing.",
    "Sandboarding on the dune slopes.",
    "Photos and a short break in the dunes.",
    "Return drive to Agadir, arriving about 13:45 to 14:45.",
    "Sunset option: a late-afternoon start, returning shortly after sunset (seasonal).",
  ],
  includedExtra: [
    "Quad safety briefing and equipment",
    "Sandboard and helmet",
    "Hotel pickup in Zone 1 (and Zone 2 en route)",
  ],
  notIncluded: ["Activities not selected", "Tips"],
  bring: [
    "Closed shoes",
    "Sunglasses",
    "Scarf or buff for the sand",
    "Sunscreen",
    "A light layer for the sunset option",
  ],
  suitableFor: ["Adventure lovers", "Couples", "Families", "Groups", "Photography"],
  restrictions: [
    "These are small coastal dunes, not deep desert dunes.",
    "The site is roughly 70 km north of Agadir, so about 1 hour to 1 hour 15 each way.",
    "Quad driving is typically limited to older guests; younger guests usually ride as passengers. Confirm ages when you request.",
    "Quad and camel riding are not recommended in pregnancy or with back or heart problems.",
  ],
  seasonalNotes: [
    "Sand is very hot at midday in summer; mornings and late afternoons are more comfortable.",
    "Sunset departures are seasonal; sunset is about 18:45 in winter and about 20:15 in summer.",
    "Sand is firmer after rain.",
  ],
  pickupWindow: "08:30 to 09:30 (morning) / 13:30 to 14:30 (afternoon)",
  returnApprox: "13:45 to 14:45 (morning) / 18:30 to 19:30 (afternoon)",
  highlights: [
    "Camel ride through Atlantic coastal dunes",
    "Quad ride of about one hour, with briefing",
    "Sandboarding on the dune slopes",
    "Combine the activities if you wish",
    "Sunset option in season",
    "Hotel pickup and drop-off included",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Timlaline dunes near Tamri (N1 north)",
        km: 68,
        minutes: "60 to 80",
        notes: "Coast road north past Anza, Tamraght and Tamri.",
      },
      {
        from: "Dune area",
        to: "Camel, quad and sandboarding points",
        km: 5,
        minutes: "10 to 20",
        notes: "Short moves between the activity spots.",
      },
      {
        from: "Timlaline",
        to: "Central Agadir (return, N1 south)",
        km: 68,
        minutes: "60 to 80",
        notes: "Same road back.",
      },
    ],
    roundTripKm: 141,
    drivingHoursTotal: "2 h 10 to 2 h 45",
  },
  faq: [
    {
      q: "How far is Timlalin from Agadir?",
      a: "About 70 km north, past Tamri, which is roughly 1 hour to 1 hour 15 each way. It is a half-day trip door to door.",
    },
    {
      q: "Can I combine the camel ride, quad and sandboarding?",
      a: "Yes. You can choose one activity or combine them. We confirm the combination and timing when you request.",
    },
    {
      q: "Is there an age limit for the quad?",
      a: "Usually you must be old enough to drive safely; younger guests often ride as passengers. We confirm the exact ages when you request.",
    },
  ],
  confirmFlags: [
    "all option prices",
    "drive time from Agadir",
    "minimum ages",
    "sunset schedule",
    "operator licence and insurance",
    "board and helmet provision",
  ],
} satisfies Service;

export default timlalinDunes;
