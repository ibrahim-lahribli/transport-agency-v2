import type { Service } from "@/schemas/service";

export const horseRidingSouss: Service = {
  id: "horse-riding-souss",
  category: "activity",
  status: "published",
  order: 4,
  slug: "horse-riding-souss-river-agadir",
  title: "Horse Riding along the Souss River",
  summary:
    "Enjoy a calm ride on this horse riding agadir activity, in the green country along the Oued Souss. A short transfer takes you from your hotel to the centre, where you meet your horse and your host and go through a short safety briefing. The ride follows the river area and the eucalyptus belt on flat ground, so it suits both beginners and more confident riders. Helmets are usually provided. Both morning and cooler late-afternoon rides can be arranged. Tell us your riding experience when you request, so the host can pick a suitable horse and pace.",
  seo: {
    title: "Horse Riding Agadir: Souss River Ride, All Levels",
    description:
      "Horse riding agadir: a calm ride along the Oued Souss and eucalyptus trails, suitable for beginners and experienced riders, with hotel pickup.",
  },
  primaryKeyword: "horse riding agadir",
  durationHours: 2.5,
  days: "Morning or late afternoon, arranged on request",
  capacity: {
    min: 1,
    sharedMax: 8,
    privateAvailable: true,
  },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      {
        label: "1-hour guided ride",
        amount: 25,
        unit: "person",
      },
      {
        label: "Optional 2-hour ride",
        amount: 40,
        unit: "person",
      },
    ],
  },
  cancellationPolicy: "adventure",
  languages: ["en", "fr", "ar"],
  host: "operator-team",
  itinerary: [
    "Hotel pickup in Agadir.",
    "Transfer to the riding centre near the Oued Souss, south of the city.",
    "Meet your horse and your host; short safety briefing and mounting.",
    "Ride along the Souss river area and the eucalyptus trails.",
    "Return to the centre and transfer back to your hotel.",
    "A late-afternoon ride is also possible; the timing is arranged when you request.",
  ],
  includedExtra: ["1-hour guided ride", "Riding helmet", "Hotel pickup and return"],
  notIncluded: ["Photos and video", "Tips"],
  bring: ["Long trousers", "Closed shoes", "Sunscreen and hat", "Water"],
  suitableFor: ["Beginners", "Experienced riders", "Couples", "Friends"],
  restrictions: [
    "Riding is not recommended in pregnancy or with back problems.",
    "Minimum age and weight limits are set by the operator and confirmed when you request.",
    "A helmet is normally provided; tell us in advance if you need a particular size.",
  ],
  pickupWindow: "09:00 to 09:30 (morning) / 15:30 to 16:00 (late afternoon)",
  returnApprox: "11:15 to 11:45 (morning) / 18:00 to 18:30 (late afternoon)",
  highlights: [
    "Ride along the Oued Souss near Agadir",
    "Flat terrain, suitable for beginners",
    "Horse and pace matched to your experience",
    "Morning or cooler late-afternoon rides",
    "Hotel pickup and drop-off included",
    "Host with you throughout the ride",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Riding centre near the mouth of the Oued Souss",
        km: 9,
        minutes: "20 to 25",
        notes: "Short transfer south of the city.",
      },
      {
        from: "Riding centre",
        to: "Souss river and eucalyptus trails (on horseback)",
        km: 6,
        minutes: "60 to 120",
        notes: "Flat ground along the river and through the trees.",
      },
      {
        from: "Riding centre",
        to: "Central Agadir (return)",
        km: 9,
        minutes: "20 to 25",
        notes: "Return transfer.",
      },
    ],
    roundTripKm: 24,
    drivingHoursTotal: "0 h 40 to 0 h 50",
  },
  faq: [
    {
      q: "Is it suitable for beginners?",
      a: "Yes. The route is on flat ground and suits beginners, as well as more confident riders, subject to the operator's safety requirements.",
    },
    {
      q: "What do you need from us to arrange it?",
      a: "Your hotel name, the full names of everyone riding, your preferred date and time, and your riding experience.",
    },
    {
      q: "Is a helmet provided?",
      a: "A helmet is normally offered. Tell us your head size in advance and we will confirm it with the operator.",
    },
  ],
  confirmFlags: [
    "price",
    "weight and age limits",
    "helmet provision",
    "cash payment at pickup",
    "operator licence and insurance",
  ],
} satisfies Service;

export default horseRidingSouss;
