import type { Service } from "@/schemas/service";

export const essaouira: Service = {
  id: "essaouira",
  category: "excursion",
  status: "published",
  order: 10,
  slug: "excursion-essaouira-depuis-agadir",
  title: "Excursion à Essaouira (Mogador) depuis Agadir",
  summary:
    "Partez vers le nord le long de la côte pour une journée complète lors de cette excursion à Essaouira depuis Agadir. Premier arrêt à Tamri, avec vue sur l'Atlantique, puis vous observez les chèvres dans les arganiers, un spectacle selon la saison et jamais garanti. La visite d'une coopérative d'huile d'argan explique la fabrication de l'huile. À Essaouira, ancien port atlantique aussi appelé Mogador, vous parcourez la médina fortifiée, les remparts, la skala et le port de pêche en activité, avec ses vieux canons et ses souks. Du temps libre pour le déjeuner et les galeries précède le retour. C'est une longue journée, avec environ cinq à six heures de route au total.",
  seo: {
    title: "Excursion Essaouira depuis Agadir : Mogador",
    description:
      "Excursion à Essaouira depuis Agadir : point de vue de Tamri, coopérative d'argan, médina fortifiée, remparts, port et temps libre pour le déjeuner.",
  },
  primaryKeyword: "excursion essaouira depuis agadir",
  durationHours: 12,
  pickupWindow: "07h00 à 08h00",
  returnApprox: "19h00 à 19h30",
  days: "Tous les jours de l'année ; départ d'Essaouira vers 16h00",
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
  },
  privateRate: "essaouira",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: [
    "Prise en charge à l'hôtel à Agadir, départ conseillé vers 07h30.",
    "Tamri : arrêt panoramique sur le littoral atlantique et l'embouchure de l'oued.",
    "Des chèvres dans les arganiers peuvent être visibles selon la saison ; jamais garanties.",
    "Coopérative d'huile d'argan : production traditionnelle et produits locaux.",
    "Essaouira : médina fortifiée, remparts, port de pêche, skala et canons historiques.",
    "Temps libre pour le déjeuner, les galeries, les boutiques ou une promenade face à l'océan.",
    "Départ d'Essaouira vers 16h00 ; retour à Agadir vers 19h00 à 19h30.",
  ],
  includedExtra: [
    "Transport en véhicule climatisé",
    "Commentaires du chauffeur-accompagnateur en français ou anglais",
    "Bouteille d'eau par personne",
    "Arrêts détente sur la route côtière",
  ],
  notIncluded: [
    "Déjeuner à Essaouira (temps libre)",
    "Droits d'entrée aux monuments (Sqala)",
    "Achats personnels",
    "Pourboires",
  ],
  bring: [
    "Veste légère contre le vent",
    "Chaussures confortables",
    "Chapeau et crème solaire",
    "Espèces pour le déjeuner, les achats et l'entrée des monuments",
  ],
  suitableFor: ["Couples", "Familles", "Amis", "Petits groupes"],
  restrictions: [
    "Journée longue : environ 5 à 6 heures de véhicule au total.",
    "Les chèvres dans les arganiers sont un spectacle saisonnier spontané et ne sont jamais garanties.",
    "Essaouira est souvent venteuse ; les remparts face à la mer et les abords du port demandent de la prudence par vent fort.",
  ],
  seasonalNotes: [
    "Les chèvres dans les arganiers s'observent plus sûrement pendant les mois secs, généralement de la fin de matinée au milieu de l'après-midi.",
    "Essaouira est venteuse toute l'année, surtout en été ; une veste légère est utile.",
    "En hiver, le trajet de retour se termine après la tombée de la nuit.",
  ],
  highlights: [
    "Journée complète sur la côte atlantique depuis Agadir",
    "Arrêt panoramique à Tamri sur le littoral",
    "Chèvres dans les arganiers, selon la saison",
    "Visite d'une coopérative d'huile d'argan",
    "Médina fortifiée, remparts, skala et port",
    "Temps libre pour déjeuner, galeries et boutiques",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Tamri viewpoint",
        km: 70,
        minutes: "60 à 75",
        notes: "N1 vers le nord en suivant la côte.",
      },
      {
        from: "Tamri",
        to: "Argan cooperative area (Ida Ou Gourd / Tamri)",
        km: 20,
        minutes: "20 à 30",
        notes: "Court arrêt sur la même route.",
      },
      {
        from: "Argan cooperative",
        to: "Essaouira",
        km: 85,
        minutes: "75 à 95",
        notes: "N1 vers le nord ; des chèvres dans les arganiers peuvent être visibles en saison.",
      },
      {
        from: "Essaouira",
        to: "Central Agadir (return, N1 south)",
        km: 175,
        minutes: "150 à 180",
        notes: "Même route au retour, arrivée après la nuit tombée en hiver.",
      },
    ],
    roundTripKm: 350,
    drivingHoursTotal: "5 h à 6 h",
  },
  faq: [
    {
      q: "Combien de temps dure le trajet ?",
      a: "Environ trois heures par trajet sur la route côtière, soit cinq à six heures de route au total. Nous prévoyons des arrêts.",
    },
    {
      q: "Verrons-nous des chèvres dans les arganiers ?",
      a: "Parfois. Cela dépend de la saison et des conditions locales, et ce n'est jamais garanti. Les mois secs sont généralement plus favorables.",
    },
    {
      q: "Le déjeuner est-il inclus ?",
      a: "Non. Le déjeuner se prend pendant votre temps libre à Essaouira ; vous choisissez donc où et quoi manger.",
    },
  ],
  confirmFlags: [
    "price",
    "lunch policy",
    "departure time from Essaouira",
    "monument entrance fees",
    "capacity",
  ],
} satisfies Service;

export default essaouira;
