import type { Service } from "@/schemas/service";

export const massaTiznit: Service = {
  id: "massa-tiznit",
  category: "excursion",
  status: "published",
  order: 9,
  slug: "excursion-massa-tiznit-dunes-depuis-agadir",
  title: "Massa et Tiznit : côte, nature et dunes en une journée",
  summary:
    "Parcourez le sud du Maroc en une journée lors de cette excursion à Tiznit depuis Agadir. Vous partez vers le sud jusqu'à un atelier de poterie, puis vous suivez la côte atlantique jusqu'au village de pêcheurs de Tifnit. Dans le parc national de Souss-Massa, vous traversez zones humides et maquis, où la faune et les oiseaux dépendent de la saison. Vient ensuite le barrage Youssef Ben Tachfine, sur l'oued Massa, avec un point de vue sur l'eau et les paysages. À Tiznit, vous parcourez la vieille médina et ses souks d'argent avant un déjeuner traditionnel. Au retour, arrêt sur de petites dunes côtières. Ce sont des dunes côtières, pas le grand désert. Prise en charge et déjeuner inclus. (Draft for native review.)",
  seo: {
    title: "Excursion Tiznit depuis Agadir : Massa et dunes",
    description:
      "Excursion à Tiznit depuis Agadir : poterie, côte atlantique, parc de Souss-Massa, médina et souks d'argent, déjeuner et petites dunes côtières.",
  },
  primaryKeyword: "excursion tiznit depuis agadir",
  durationHours: 8.5,
  pickupWindow: "08h00 à 09h00",
  returnApprox: "17h00 à 17h45",
  days: "Tous les jours de l'année ; observation des oiseaux optimale de novembre à mars",
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
        label: "Adulte (déjeuner inclus)",
        amount: 38,
        unit: "person",
      },
      {
        label: "Enfant 4 à 11 ans (déjeuner inclus)",
        amount: 19,
        unit: "person",
      },
      {
        label: "Enfant de moins de 4 ans",
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
    "Hotel pickup in Agadir.",
    "Pottery workshop: local artisans, traditional techniques, wheel demonstration.",
    "Atlantic coast at Tifnit: wild beach and fishermen's areas.",
    "Souss-Massa National Park and Oued Massa; birds and wildlife depend on the season.",
    "Youssef Ben Tachfine Dam: viewpoint over the reservoir and surrounding land.",
    "Tiznit: old medina, souks and silver craftsmanship, then a traditional lunch.",
    "Small coastal dunes on the return, for a short walk and photos.",
    "Return to Agadir, arriving about 17:00 to 17:45 depending on traffic.",
  ],
  includedExtra: [
    "Prise en charge et retour hôtel à Agadir",
    "Déjeuner marocain traditionnel à Tiznit",
    "Bouteille d'eau par personne",
    "Commentaires du chauffeur-accompagnateur en français ou anglais",
  ],
  notIncluded: [
    "Boissons au déjeuner",
    "Achats personnels et bijoux en argent à Tiznit",
    "Pourboires",
  ],
  bring: [
    "Comfortable shoes",
    "Hat, sunglasses and sunscreen",
    "Water",
    "Cash for silver, pottery and other purchases",
  ],
  suitableFor: ["Couples", "Families", "Friends", "Small groups"],
  restrictions: [
    "Long day: about 3.5 to 4.5 hours in the vehicle in total.",
    "Birdlife and wildlife are seasonal and are never guaranteed.",
    "These are small coastal dunes, not deep desert dunes.",
  ],
  seasonalNotes:
    "Birdwatching is best from about November to March, and during spring and autumn migration. The dam reservoir level varies with rainfall and has been low in recent dry years. Summer inland is very hot; the early start helps.",
  highlights: [
    "Journée complète depuis Agadir, prise en charge à l'hôtel",
    "Atelier de poterie avec des artisans locaux",
    "Côte atlantique et village de pêcheurs de Tifnit",
    "Paysages du Souss-Massa ; oiseaux selon la saison",
    "Médina, souks et artisanat d'argent de Tiznit",
    "Déjeuner traditionnel et petites dunes côtières",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Tifnit and pottery stop",
        km: 28,
        minutes: "35 to 45",
        notes: "N1 south, then the coast road.",
      },
      {
        from: "Tifnit",
        to: "Souss-Massa National Park / Oued Massa",
        km: 22,
        minutes: "25 to 35",
        notes: "Coastal and wetland landscapes.",
      },
      {
        from: "Oued Massa",
        to: "Youssef Ben Tachfine Dam",
        km: 18,
        minutes: "20 to 30",
        notes: "Dam on the Oued Massa, north of Tiznit.",
      },
      {
        from: "Youssef Ben Tachfine Dam",
        to: "Tiznit medina",
        km: 28,
        minutes: "30 to 40",
        notes: "Continue south to the walled town.",
      },
      {
        from: "Tiznit",
        to: "Central Agadir",
        km: 95,
        minutes: "90 to 105",
        notes: "Return north on the N1, with the dunes stop en route.",
      },
    ],
    roundTripKm: 190,
    drivingHoursTotal: "3 h 20 to 4 h 30",
  },
  faq: [
    {
      q: "Are these deep desert dunes?",
      a: "No. These are small coastal dunes near the Atlantic, good for a short walk and photos. They are not deep desert dunes.",
    },
    {
      q: "Will we see flamingos or other birds?",
      a: "Birdlife depends on the season and on water levels. The cooler months from about November to March are usually better.",
    },
    {
      q: "Is lunch included?",
      a: "Yes, a traditional Moroccan or Berber lunch is included. Drinks with lunch are usually extra.",
    },
  ],
  confirmFlags: [
    "price and whether lunch is included",
    "drinks policy",
    "park entrance fees",
    "pickup and return times",
    "which pottery workshop and dune stop",
  ],
} satisfies Service;

export default massaTiznit;
