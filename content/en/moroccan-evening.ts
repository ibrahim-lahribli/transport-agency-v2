import type { Service } from "@/schemas/service";

export const moroccanEvening: Service = {
  id: "moroccan-evening",
  category: "activity",
  status: "published",
  order: 6,
  slug: "moroccan-dinner-fantasia-show-agadir",
  title: "Moroccan Evening: Dinner, Fantasia & Cultural Show",
  summary:
    "Spend an evening of Moroccan food and performance on this Moroccan dinner show agadir night out. Your driver collects you from your hotel in the early evening and takes you to the venue, where dinner is served as the programme gets going. Across the evening you watch live Moroccan music, folklore and traditional dance, and a fantasia equestrian display in which riders in traditional dress perform in the arena. Depending on the venue's programme there may also be other entertainment. Hotel transfers are included in both directions. The exact venue, menu and programme are confirmed when you request.",
  seo: {
    title: "Moroccan Dinner Show Agadir: Fantasia & Folklore",
    description:
      "Moroccan dinner show agadir: a traditional dinner with live music, folklore, dance and a fantasia horse display, with hotel transfers both ways.",
  },
  primaryKeyword: "moroccan dinner show agadir",
  durationHours: 4,
  days: "Evening, specified days (programme may vary during Ramadan)",
  capacity: {
    min: 2,
    sharedMax: 30,
    privateAvailable: true,
  },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      {
        label: "Adult (dinner, show and transfers)",
        amount: 40,
        unit: "person",
      },
      {
        label: "Child 4 to 11",
        amount: 20,
        unit: "person",
      },
      {
        label: "Child under 4",
        amount: 0,
        unit: "person",
      },
    ],
  },
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "venue-team",
  itinerary: [
    "Evening hotel pickup in Agadir.",
    "Arrival at the venue and a traditional Moroccan welcome.",
    "Traditional Moroccan dinner.",
    "Live Moroccan music and folklore performances.",
    "Traditional dance performances.",
    "Fantasia equestrian performance, subject to the venue's programme.",
    "Return transfer to your hotel.",
  ],
  includedExtra: [
    "Traditional Moroccan multi-course dinner",
    "Folklore and fantasia cavalry show",
    "Hotel pickup and return",
    "Water or one soft drink with dinner",
  ],
  notIncluded: ["Other drinks", "Tips"],
  bring: ["A light layer for the evening", "Cash for drinks and tips"],
  suitableFor: ["Couples", "Families", "Friends", "Groups"],
  pickupWindow: "19:00 to 19:30",
  returnApprox: "23:00 to 23:30",
  highlights: [
    "Traditional Moroccan dinner and live music",
    "Folklore and traditional dance performances",
    "Fantasia equestrian display",
    "Other entertainment depending on the venue",
    "Hotel transfers both ways",
    "Venue, menu and programme confirmed on request",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Evening venue in the Agadir area",
        km: 15,
        minutes: "20 to 30",
        notes: "Venue to be confirmed; distance varies with the site.",
      },
      {
        from: "Evening venue",
        to: "Central Agadir (return)",
        km: 15,
        minutes: "20 to 30",
        notes: "Return transfer after the show.",
      },
    ],
    roundTripKm: 30,
    drivingHoursTotal: "0 h 40 to 1 h",
  },
  faq: [
    {
      q: "What is fantasia?",
      a: "A traditional Moroccan equestrian display. Riders in traditional dress perform in a line in the arena, and muskets are fired into the air.",
    },
    {
      q: "Are drinks included?",
      a: "Water or a soft drink with dinner is often included, but it varies by venue. We confirm the drinks policy when you request.",
    },
    {
      q: "Which venue is it, and what is the menu?",
      a: "The venue and menu vary, so we confirm both at the time of your request, along with the current programme.",
    },
  ],
  confirmFlags: [
    "venue and programme",
    "menu",
    "drinks policy",
    "price",
    "pickup and return times",
    "Ramadan and season availability",
  ],
} satisfies Service;

export default moroccanEvening;
