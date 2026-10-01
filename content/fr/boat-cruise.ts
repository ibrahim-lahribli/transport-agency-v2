import type { Service } from "@/schemas/service";

export const boatCruise: Service = {
  id: "boat-cruise",
  category: "activity",
  status: "draft",
  order: 1,
  slug: "sortie-bateau-agadir-peche-barbecue",
  title: "Sortie en bateau à Agadir : pêche et barbecue de poisson",
  summary:
    "Passez une demi-journée en mer lors de cette sortie en bateau agadir au départ de la marina. Après un court transfert depuis votre hôtel, vous embarquez et longez la côte atlantique, avec la ville et ses collines vues depuis l'eau. L'équipage fait une halte pêche, avec le matériel à bord. Si la météo et l'état de la mer le permettent, une pause baignade est aussi prévue. Le déjeuner est un barbecue de poisson marocain accompagné d'une salade traditionnelle, préparé et servi à bord. Le bateau revient ensuite à la marina d'Agadir, où votre transfert vous attend. Les départs dépendent de la météo et de la disponibilité du bateau. (Draft for native review.)",
  seo: {
    title: "Sortie en bateau Agadir : pêche et BBQ",
    description:
      "Sortie en bateau à Agadir depuis la marina : vues sur la côte, arrêt pêche, baignade si la mer le permet et barbecue de poisson marocain.",
  },
  primaryKeyword: "sortie en bateau agadir",
  durationHours: 6,
  activityHours: 4.25,
  departures: ["09:15"],
  days: "Tous les jours, selon météo et disponibilité du bateau",
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
        label: "Adulte",
        amount: 35,
        unit: "person",
      },
      {
        label: "Enfant 4 à 11 ans",
        amount: 18,
        unit: "person",
      },
      {
        label: "Enfant de moins de 4 ans",
        amount: 0,
        unit: "person",
      },
    ],
    privateOnRequest:
      "À partir de 360 EUR par bateau jusqu'à 8 personnes ; devis sur mesure pour les groupes plus importants",
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
    "Matériel de pêche",
    "Déjeuner barbecue de poisson avec salade traditionnelle",
    "Transferts marina inclus",
    "Gilets de sauvetage à bord",
  ],
  notIncluded: ["Boissons supplémentaires", "Pourboires"],
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
  seasonalNotes:
    "La houle hivernale peut annuler les sorties, les matinées sont plus calmes ; été ensoleillé avec mer plus calme.",
  pickupWindow: "08h00 à 08h45",
  returnApprox: "14h00 à 14h45",
  highlights: [
    "Croisière d'une demi-journée depuis la marina d'Agadir",
    "Vues sur la côte d'Agadir depuis la mer",
    "Arrêt pêche avec matériel à bord",
    "Pause baignade lorsque les conditions le permettent",
    "Barbecue de poisson marocain avec salade",
    "Prise en charge et retour à l'hôtel inclus",
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
