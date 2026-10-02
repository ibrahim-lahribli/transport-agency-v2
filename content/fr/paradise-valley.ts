import type { Service } from "@/schemas/service";

export const paradiseValley: Service = {
  id: "paradise-valley",
  category: "excursion",
  status: "published",
  order: 7,
  slug: "excursion-vallee-du-paradis-depuis-agadir",
  title: "Excursion d'une journée à Paradise Valley depuis Agadir",
  summary:
    "Passez une journée complète dans les collines au nord d'Agadir. Vous longez la côte jusqu'à Aourir, puis vous montez la route de montagne vers Imouzzer. En chemin, arrêt dans une coopérative d'huile d'argan, démonstration d'un potier au tour, et pause à un belvédère sur les vallées et les arganiers. À la Vallée du Paradis, vous marchez environ 20 à 35 minutes sur un sentier rocheux jusqu'aux bassins naturels, avec du temps libre pour vous détendre. La baignade dépend de la saison et des pluies récentes. Un tajine local est proposé en option, payé sur place. Prise en charge et retour à votre hôtel inclus.",
  seo: {
    title: "Vallée du Paradis Agadir : excursion d'une journée",
    description:
      "Journée à la Vallée du Paradis depuis Agadir : coopérative d'argan, atelier de poterie, belvédère et marche jusqu'aux bassins naturels.",
  },
  primaryKeyword: "vallée du paradis agadir",
  durationHours: 8,
  pickupWindow: "08h30 à 09h30",
  returnApprox: "16h30 à 17h00",
  days: "Tous les jours, selon conditions météo et niveau d'eau saisonnier",
  capacity: {
    min: 2,
    sharedMax: 16,
    privateAvailable: true,
  },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "market-benchmark",
    confirmed: false,
    options: [
      {
        label: "Adulte",
        amount: 30,
        unit: "person",
      },
      {
        label: "Enfant 4 à 11 ans",
        amount: 15,
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
    "Prise en charge à l'hôtel à Agadir ; les clients de Taghazout et Tamraght sont récupérés en route.",
    "Coopérative d'huile d'argan : explication de la production et dégustation d'huile d'argan et d'amlou.",
    "Atelier de poterie : démonstration au tour et arrêt photo.",
    "Arrêt panoramique sur les vallées et les arganiers.",
    "Route jusqu'à l'entrée de la Vallée du Paradis, puis marche de 20 à 35 minutes jusqu'aux bassins.",
    "Temps libre aux bassins ; déjeuner tajine en option à proximité, réglé sur place.",
    "Route retour vers Agadir, arrivée vers 16h30 à 17h00.",
  ],
  includedExtra: [
    "Prise en charge et retour hôtel à Agadir et Zone 2 en route",
    "Visite d'une coopérative d'argan avec dégustation",
    "Visite d'un atelier de poterie avec démonstration",
    "Bouteille d'eau par personne",
  ],
  notIncluded: [
    "Déjeuner tajine dans un café local (réglé sur place)",
    "Achats personnels",
    "Pourboires",
  ],
  bring: [
    "Chaussures ou sandales antidérapantes",
    "Maillot de bain et serviette",
    "Chapeau et crème solaire",
    "Eau",
    "Espèces pour un déjeuner en option et pour les achats",
  ],
  suitableFor: ["Couples", "Familles", "Amis"],
  restrictions: [
    "Le sentier menant aux bassins est irrégulier et rocheux ; il ne convient pas aux personnes à mobilité réduite.",
    "La baignade dépend de la saison et des pluies récentes ; les bassins peuvent être bas, voire à sec, en saison sèche.",
    "Une part notable du temps se passe dans le véhicule sur des routes de montagne.",
  ],
  seasonalNotes: [
    "Le niveau d'eau des bassins dépend des pluies récentes et varie au fil de l'année.",
    "L'itinéraire est à l'intérieur des terres et peut être très chaud en juillet et août ; les matinées sont plus fraîches.",
    "La marche dans la vallée est parfois glissante après la pluie.",
  ],
  highlights: [
    "Journée complète au nord d'Agadir, prise en charge à l'hôtel",
    "Visite d'une coopérative d'huile d'argan avec dégustation",
    "Atelier de poterie et démonstration au tour",
    "Belvédère sur les vallées et les arganiers",
    "Marche d'environ 20 à 35 minutes jusqu'aux bassins",
    "Temps libre aux bassins ; baignade selon la saison",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir (Boulevard du 20 Août)",
        to: "Aourir, via Anza, Tamraght, N1 north",
        km: 25,
        minutes: "30 à 40",
        notes: "Route côtière vers le nord en direction de Taghazout et Essaouira.",
      },
      {
        from: "Aourir",
        to: "Paradise Valley entrance and car park",
        km: 12,
        minutes: "25 à 35",
        notes: "À Aourir, prendre à gauche la route de montagne vers Imouzzer.",
      },
      {
        from: "Car park",
        to: "First natural pools (on foot)",
        km: 1.5,
        minutes: "20 à 35",
        notes: "Sentier irrégulier et rocheux ; aucun véhicule au-delà du parking.",
      },
      {
        from: "Paradise Valley",
        to: "Central Agadir (return, same road)",
        km: 37,
        minutes: "55 à 75",
        notes: "Arrêts sur le chemin du retour selon ce qui a été convenu.",
      },
    ],
    roundTripKm: 74,
    drivingHoursTotal: "1 h 55 à 2 h 30",
  },
  faq: [
    {
      q: "Peut-on se baigner dans les bassins ?",
      a: "Parfois, selon la saison et le niveau d'eau. Prenez un maillot de bain ; nous vous indiquerons les conditions du moment au moment de votre demande.",
    },
    {
      q: "Combien de temps dure la marche jusqu'aux bassins ?",
      a: "Environ 20 à 35 minutes jusqu'aux premiers bassins, sur un sentier rocheux irrégulier et parfois glissant. Les bassins plus éloignés demandent plus de temps.",
    },
    {
      q: "Le déjeuner est-il inclus ?",
      a: "Non. Un tajine traditionnel est généralement proposé près de la vallée, à vos frais, réglé sur place.",
    },
  ],
  confirmFlags: [
    "price and child price",
    "bottled water included",
    "walk duration",
    "capacity and minimum group",
    "pickup and return times",
  ],
} satisfies Service;

export default paradiseValley;
