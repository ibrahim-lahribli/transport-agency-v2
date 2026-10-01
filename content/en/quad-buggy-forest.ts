import type { Service } from "@/schemas/service";

export const quadBuggyForest: Service = {
  id: "quad-buggy-forest",
  category: "activity",
  status: "draft",
  order: 3,
  slug: "agadir-quad-buggy-adventure-forest",
  title: "Agadir Quad & Buggy Adventure through the Forest",
  summary:
    "Take an off-road ride on this quad buggy agadir activity. After a short transfer from your hotel you reach the base, where the team runs a safety briefing and fits your helmet. You then follow a driver on a route that moves between eucalyptus forest and open dune country, with a stop for a glass of traditional mint tea along the way. You can drive a quad, a four-wheeler with motorbike-style controls, or a two-seat buggy, a small off-road car that is easier to share. Riding lasts about 1.5 to 2 hours, and the whole outing takes around 3 hours door to door. Departures are at 09:00, 14:00 and 16:00.",
  seo: {
    title: "Quad Buggy Agadir: Forest and Dune Off-Road Ride",
    description:
      "Quad buggy agadir adventure: an off-road ride through eucalyptus forest and dunes near Agadir, with a safety briefing and a mint tea break.",
  },
  primaryKeyword: "quad buggy agadir",
  durationHours: 3.5,
  departures: ["09:00", "14:00", "16:00"],
  days: "Daily (last winter departure at 15:00 from November to February)",
  capacity: {
    min: 1,
    sharedMax: 12,
    privateAvailable: true,
  },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      {
        label: "Quad, single rider",
        amount: 35,
        unit: "person",
      },
      {
        label: "Quad, two riders on one quad",
        amount: 50,
        unit: "quad",
      },
      {
        label: "Buggy, 2 seats",
        amount: 80,
        unit: "buggy",
      },
    ],
  },
  cancellationPolicy: "adventure",
  languages: ["en", "fr", "ar"],
  host: "operator-team",
  itinerary: [
    "Hotel pickup by minibus or 4x4.",
    "About 20 to 30 minutes transfer to the off-road base.",
    "Safety briefing and equipment preparation.",
    "Ride a quad or a buggy through eucalyptus forest and dune trails.",
    "Traditional Moroccan mint tea break.",
    "Return transfer to your hotel.",
    "Departures at 09:00, 14:00 and 16:00.",
  ],
  includedExtra: [
    "Safety briefing and test drive",
    "Helmet and protective goggles",
    "Mint tea break at a Berber house",
    "Hotel transfers",
  ],
  notIncluded: ["Photos and video", "Tips"],
  bring: ["Closed shoes", "Long trousers if possible", "Sunglasses", "Scarf or buff for dust"],
  suitableFor: ["Adventure lovers", "Couples", "Friends", "Groups"],
  restrictions: [
    "Not recommended in pregnancy or with back or heart problems.",
    "Minimum ages and driving rules for quad and buggy are set by the operator and confirmed when you request.",
    "Helmets and protective equipment are provided; guests must follow the safety briefing.",
    "The 16:00 departure may finish after dark in winter.",
  ],
  pickupWindow: "08:45 to 09:00 (09:00 departure) / 13:45 to 14:00 (14:00 departure)",
  returnApprox: "11:45 to 12:30 (09:00 departure) / 16:45 to 17:30 (14:00 departure)",
  highlights: [
    "Off-road ride through eucalyptus forest and dunes",
    "Choose a quad or a two-seat buggy",
    "Safety briefing before you set off",
    "About 1.5 to 2 hours of riding",
    "Traditional mint tea break",
    "Departures at 09:00, 14:00 and 16:00",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Off-road base near Agadir",
        km: 22,
        minutes: "20 to 30",
        notes:
          "Exact site to be confirmed; operators describe a base south of the city, around Tifnit.",
      },
      {
        from: "Base",
        to: "Forest and dune trails (on the machines)",
        km: 15,
        minutes: "45 to 60",
        notes: "Riding time within the 1.5 to 2 hours on the route.",
      },
      {
        from: "Base",
        to: "Central Agadir (return)",
        km: 22,
        minutes: "20 to 30",
        notes: "Return transfer.",
      },
    ],
    roundTripKm: 45,
    drivingHoursTotal: "0 h 40 to 1 h",
  },
  faq: [
    {
      q: "What is the difference between the quad and the buggy?",
      a: "A quad is a four-wheeler with motorbike-style controls. A buggy is a small two-seat off-road car, often more comfortable to share.",
    },
    {
      q: "How long does the activity last?",
      a: "About 1.5 to 2 hours of riding, plus transfers and the mint tea break. Around 3 hours door to door.",
    },
    {
      q: "Is there a minimum age?",
      a: "Ages for driving and for riding as a passenger are set by the operator. We confirm them for your group when you request.",
    },
  ],
  confirmFlags: [
    "all prices",
    "departure times by season",
    "minimum ages and licence rules",
    "operator licence and insurance",
    "group size limit",
  ],
} satisfies Service;

export default quadBuggyForest;
