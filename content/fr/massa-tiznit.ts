import type { Service } from "@/schemas/service";

export const massaTiznit: Service = {
  id: "massa-tiznit",
  category: "excursion",
  status: "published",
  order: 9,
  slug: "excursion-massa-tiznit-dunes-depuis-agadir",
  title: "Massa et Tiznit : côte, nature et dunes en une journée",
  summary:
    "Parcourez le sud du Maroc en une journée lors de cette excursion à Tiznit depuis Agadir. Vous partez vers le sud jusqu'à un atelier de poterie, puis vous suivez la côte atlantique jusqu'au village de pêcheurs de Tifnit. Dans le parc national de Souss-Massa, vous traversez zones humides et maquis, où la faune et les oiseaux dépendent de la saison. Vient ensuite le barrage Youssef Ben Tachfine, sur l'oued Massa, avec un point de vue sur l'eau et les paysages. À Tiznit, vous parcourez la vieille médina et ses souks d'argent avant un déjeuner traditionnel. Au retour, arrêt sur de petites dunes côtières. Ce sont des dunes côtières, pas le grand désert. Prise en charge et déjeuner inclus.",
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
    "Prise en charge à l'hôtel à Agadir.",
    "Atelier de poterie : artisans locaux, techniques traditionnelles, démonstration au tour.",
    "Côte atlantique à Tifnit : plage sauvage et zones de pêcheurs.",
    "Parc national de Souss-Massa et oued Massa ; les oiseaux et la faune dépendent de la saison.",
    "Barrage Youssef Ben Tachfine : point de vue sur le réservoir et les terres environnantes.",
    "Tiznit : vieille médina, souks et artisanat d'argent, puis un déjeuner traditionnel.",
    "Petites dunes côtières au retour, pour une courte marche et des photos.",
    "Retour à Agadir, arrivée vers 17h00 à 17h45 selon la circulation.",
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
    "Chaussures confortables",
    "Chapeau, lunettes de soleil et crème solaire",
    "Eau",
    "Espèces pour l'argent, la poterie et d'autres achats",
  ],
  suitableFor: ["Couples", "Familles", "Amis", "Petits groupes"],
  restrictions: [
    "Journée longue : environ 3h30 à 4h30 de véhicule au total.",
    "La faune et les oiseaux sont saisonniers et ne sont jamais garantis.",
    "Ce sont de petites dunes côtières, pas de grandes dunes désertiques.",
  ],
  seasonalNotes:
    "L'observation des oiseaux est optimale d'environ novembre à mars, ainsi que pendant les migrations de printemps et d'automne. Le niveau du réservoir du barrage varie avec les pluies et a été bas ces dernières années sèches. L'été à l'intérieur des terres est très chaud ; le départ matinal aide.",
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
        minutes: "35 à 45",
        notes: "N1 vers le sud, puis la route côtière.",
      },
      {
        from: "Tifnit",
        to: "Souss-Massa National Park / Oued Massa",
        km: 22,
        minutes: "25 à 35",
        notes: "Paysages côtiers et zones humides.",
      },
      {
        from: "Oued Massa",
        to: "Youssef Ben Tachfine Dam",
        km: 18,
        minutes: "20 à 30",
        notes: "Barrage sur l'oued Massa, au nord de Tiznit.",
      },
      {
        from: "Youssef Ben Tachfine Dam",
        to: "Tiznit medina",
        km: 28,
        minutes: "30 à 40",
        notes: "Continuer vers le sud jusqu'à la ville fortifiée.",
      },
      {
        from: "Tiznit",
        to: "Central Agadir",
        km: 95,
        minutes: "90 à 105",
        notes: "Retour vers le nord par la N1, avec l'arrêt aux dunes en chemin.",
      },
    ],
    roundTripKm: 190,
    drivingHoursTotal: "3 h 20 à 4 h 30",
  },
  faq: [
    {
      q: "S'agit-il de grandes dunes désertiques ?",
      a: "Non. Ce sont de petites dunes côtières près de l'Atlantique, idéales pour une courte marche et des photos. Ce ne sont pas de grandes dunes désertiques.",
    },
    {
      q: "Verrons-nous des flamants roses ou d'autres oiseaux ?",
      a: "La présence des oiseaux dépend de la saison et du niveau d'eau. Les mois les plus frais, d'environ novembre à mars, sont généralement plus favorables.",
    },
    {
      q: "Le déjeuner est-il inclus ?",
      a: "Oui, un déjeuner marocain ou berbère traditionnel est inclus. Les boissons au déjeuner sont généralement en supplément.",
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
