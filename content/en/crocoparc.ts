import type { Service } from "@/schemas/service";

export const crocoparc: Service = {
  id: "crocoparc",
  category: "activity",
  status: "published",
  order: 5,
  slug: "crocoparc-agadir-private-transport",
  title: "Crocoparc Agadir with Private Transport",
  summary:
    "Visit Crocoparc Agadir with private transport and no timetable of your own to keep. Your driver collects you at your hotel and takes you the short distance east to Drarga, where the park sits on the Agadir to Marrakech road. Inside you walk at your own pace past the Nile crocodiles and giant tortoises, along the botanical gardens and the outdoor spaces that suit families with children. Your driver waits during the visit, and then takes you back to your hotel. Entrance tickets are not included and are paid directly at the park, separately from the transport.",
  seo: {
    title: "Crocoparc Agadir with Private Transport",
    description:
      "Crocoparc agadir visit with private hotel transport: crocodiles, tortoises and botanical gardens, with waiting time and return transfer included.",
  },
  primaryKeyword: "crocoparc agadir",
  durationHours: 3.5,
  days: "Daily, flexible morning or afternoon departures",
  capacity: {
    min: 1,
    sharedMax: 7,
    privateAvailable: true,
  },
  price: {
    currency: "EUR",
    unit: "vehicle",
    basis: "estimate",
    confirmed: false,
    options: [
      {
        label: "Private car, up to 3 guests, round trip with about 2.5 hours waiting",
        amount: 25,
        unit: "vehicle",
        isBase: true,
      },
      {
        label: "Private van, 4 to 7 guests, round trip with about 2.5 hours waiting",
        amount: 35,
        unit: "vehicle",
      },
      {
        label: "Extra waiting time",
        amount: 5,
        unit: "per 30 min",
      },
    ],
    separateCost:
      "Entrance tickets are not included and are paid at the park. Show them clearly separate from transport.",
  },
  cancellationPolicy: "transfer",
  languages: ["en", "fr", "ar"],
  host: "driver",
  itinerary: [
    "Hotel pickup in Agadir.",
    "Private transport to Crocoparc in Drarga, east of the city.",
    "Visit at your own pace: Nile crocodiles, giant tortoises and other reptiles.",
    "Walk the botanical gardens and family-friendly outdoor spaces.",
    "Your driver waits for you during the visit.",
    "Return transfer to your hotel.",
  ],
  includedExtra: [
    "Hotel pickup in Agadir",
    "Private return transport",
    "About 2.5 hours waiting at Crocoparc",
  ],
  notIncluded: [
    "Crocoparc entrance tickets (paid directly at the park)",
    "Food and drinks inside the park",
    "Tips",
  ],
  bring: ["Hat and sunscreen", "Comfortable shoes", "Cash or card for entrance tickets", "Water"],
  suitableFor: ["Families", "Children", "Nature lovers"],
  pickupWindow: "09:45 to 10:30",
  returnApprox: "13:00 to 14:00",
  highlights: [
    "Private transport to Crocoparc, east of Agadir",
    "Nile crocodiles and giant tortoises",
    "Other reptiles and botanical gardens",
    "Family-friendly outdoor spaces",
    "Your driver waits during the visit",
    "Entrance fee not included; paid at the park",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Crocoparc, Drarga (RN8)",
        km: 14,
        minutes: "15 to 20",
        notes: "East of the city on the Agadir to Marrakech road.",
      },
      {
        from: "Crocoparc",
        to: "Central Agadir (return)",
        km: 14,
        minutes: "15 to 25",
        notes: "Return transfer after your visit.",
      },
    ],
    roundTripKm: 28,
    drivingHoursTotal: "0 h 30 to 0 h 45",
  },
  faq: [
    {
      q: "Are entrance tickets included?",
      a: "No. Transport and tickets are separate. You pay the park directly for entry, and your driver waits while you visit.",
    },
    {
      q: "How long can we stay?",
      a: "The included waiting time is about 2.5 hours. Longer visits may be possible on request, sometimes with a small supplement.",
    },
    {
      q: "Is it suitable for young children?",
      a: "Yes. The paths are easy, and the park is designed for families. A pushchair is manageable on most of the route.",
    },
  ],
  confirmFlags: [
    "transport prices",
    "waiting time included",
    "current park ticket prices and opening hours",
    "whether entrance is sold as a package",
  ],
} satisfies Service;

export default crocoparc;
