import type { Service } from "@/schemas/service";

export const boatCruise: Service = {
  id: "boat-cruise",
  category: "activity",
  status: "draft",
  order: 1,
  slug: "agadir-boat-cruise-fishing-bbq-lunch",
  title: "Agadir Boat Cruise with Fishing & Fish BBQ Lunch",
  summary:
    "Spend a half day at sea on this Agadir boat trip from the marina. After a short transfer from your hotel you board and head out along the Atlantic coast, with the city and its hills seen from the water. The crew stops for fishing, and equipment is available on board. Weather and sea conditions permitting, there is also a swim stop. Lunch is a Moroccan fish barbecue with a traditional salad, cooked and served on board. The boat then returns to Agadir Marina, where your transfer is waiting. Departures depend on weather and boat availability, so we check the day when you request.",
  seo: {
    title: "Agadir Boat Trip: Fishing & Fish BBQ",
    description:
      "Agadir boat trip from the marina: coastline views, a fishing stop, a swim stop when conditions allow and a Moroccan fish barbecue lunch.",
  },
  primaryKeyword: "agadir boat trip",
  durationHours: 6,
  activityHours: 4.25,
  departures: ["09:15"],
  days: "Daily, subject to weather and boat availability",
  capacity: {
    min: 2,
    sharedMax: 20,
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
        amount: 35,
        unit: "person",
      },
      {
        label: "Child 4 to 11",
        amount: 18,
        unit: "person",
      },
      {
        label: "Child under 4",
        amount: 0,
        unit: "person",
      },
    ],
    privateOnRequest: "From 360 EUR per boat for up to 8 guests; larger boats quoted by group size",
  },
  cancellationPolicy: "adventure",
  languages: ["en", "fr", "ar"],
  host: "boat-crew",
  itinerary: [
    "Hotel pickup and transfer to Agadir Marina.",
    "Board and cruise along the Atlantic coast, with views of Agadir from the sea.",
    "Fishing stop, with equipment available on board.",
    "Swimming stop, if weather and sea conditions allow.",
    "Moroccan fish barbecue with a traditional salad.",
    "Return to the marina and transfer back to your hotel.",
  ],
  includedExtra: [
    "Fishing equipment",
    "Fish barbecue lunch with traditional salad",
    "Marina transfers",
    "Life jackets on board",
  ],
  notIncluded: ["Drinks (water and one soft drink included; others extra)", "Tips"],
  bring: [
    "Swimwear and towel",
    "Sunscreen, hat and sunglasses",
    "A light jacket for the water",
    "Motion-sickness tablets if you are prone to seasickness",
  ],
  suitableFor: ["Couples", "Families", "Friends", "Groups"],
  restrictions: [
    "Departures depend on weather, sea conditions and boat availability.",
    "The swim stop happens only when conditions allow.",
    "Guests who cannot swim should stay on board or use a float; confirm with the crew.",
  ],
  seasonalNotes: "Winter swells can cancel trips, mornings calmer; summer calmer seas, strong sun.",
  pickupWindow: "08:00 to 08:45",
  returnApprox: "14:00 to 14:45",
  highlights: [
    "Half-day cruise from Agadir Marina",
    "Coastline views of Agadir from the sea",
    "Fishing stop with equipment on board",
    "Swim stop when conditions allow",
    "Moroccan fish barbecue with salad",
    "Hotel pickup and return transfer included",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Agadir Marina",
        km: 4,
        minutes: "10 to 15",
        notes: "Short transfer from your hotel to the marina.",
      },
      {
        from: "Agadir Marina",
        to: "Bay of Agadir (sea leg)",
        km: 0,
        minutes: "up to 120",
        notes: "Coastal cruise with a fishing stop and, conditions permitting, a swim stop.",
      },
      {
        from: "Agadir Marina",
        to: "Central Agadir (return)",
        km: 4,
        minutes: "10 to 15",
        notes: "Transfer back to your hotel.",
      },
    ],
    roundTripKm: 8,
    drivingHoursTotal: "0 h 20 to 0 h 30",
  },
  faq: [
    {
      q: "What happens if the sea is too rough?",
      a: "Departures depend on the weather and sea state. If the trip cannot run safely we offer another date, an alternative, or a refund of anything paid.",
    },
    {
      q: "Do I need to know how to swim?",
      a: "No, but the swim stop is only for confident swimmers. Life jackets are available on board, and you can stay on the boat.",
    },
    {
      q: "Can we take the boat privately?",
      a: "Yes, a private cruise can be arranged for groups, subject to boat capacity and availability. Ask us to check.",
    },
  ],
  confirmFlags: [
    "price and private cruise quote",
    "drinks included",
    "exact pickup time",
    "boat capacity",
    "life-jacket and safety equipment",
    "operator licence and insurance",
  ],
} satisfies Service;

export default boatCruise;
