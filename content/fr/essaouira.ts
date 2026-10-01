import type { Service } from "@/schemas/service";

export const essaouira: Service = {
  id: "essaouira",
  category: "excursion",
  status: "draft",
  order: 10,
  slug: "excursion-essaouira-depuis-agadir",
  title: "Excursion à Essaouira (Mogador) depuis Agadir",
  summary:
    "Partez vers le nord le long de la côte pour une journée complète lors de cette excursion à Essaouira depuis Agadir. Premier arrêt à Tamri, avec vue sur l'Atlantique, puis vous observez les chèvres dans les arganiers, un spectacle selon la saison et jamais garanti. La visite d'une coopérative d'huile d'argan explique la fabrication de l'huile. À Essaouira, ancien port atlantique aussi appelé Mogador, vous parcourez la médina fortifiée, les remparts, la skala et le port de pêche en activité, avec ses vieux canons et ses souks. Du temps libre pour le déjeuner et les galeries précède le retour. C'est une longue journée, avec environ cinq à six heures de route au total. (Draft for native review.)",
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
    "Hotel pickup in Agadir, suggested departure about 07:30.",
    "Tamri: panoramic stop over the Atlantic coastline and river mouth.",
    "Goats in argan trees may be visible, depending on the season; never guaranteed.",
    "Argan oil cooperative: traditional production and local products.",
    "Essaouira: fortified medina, city walls, fishing harbour, skala and historic cannons.",
    "Free time for lunch, galleries, shops or a walk by the ocean.",
    "Departure from Essaouira about 16:00; return to Agadir about 19:00 to 19:30.",
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
    "Light jacket for the wind",
    "Comfortable shoes",
    "Hat and sunscreen",
    "Cash for lunch, purchases and any monument entry",
  ],
  suitableFor: ["Couples", "Families", "Friends", "Small groups"],
  restrictions: [
    "Long day: about 5 to 6 hours in the vehicle in total.",
    "Goats in argan trees are a spontaneous seasonal sight and are never guaranteed.",
    "Essaouira is often windy; the sea wall and harbour edges need care in strong wind.",
  ],
  seasonalNotes: [
    "Goats in argan trees are seen most reliably in the drier months, generally late morning to mid-afternoon.",
    "Essaouira is windy year-round and especially in summer; a light jacket helps.",
    "In winter the return drive finishes after dark.",
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
        minutes: "60 to 75",
        notes: "N1 north along the coast.",
      },
      {
        from: "Tamri",
        to: "Argan cooperative area (Ida Ou Gourd / Tamri)",
        km: 20,
        minutes: "20 to 30",
        notes: "Short stop on the same road.",
      },
      {
        from: "Argan cooperative",
        to: "Essaouira",
        km: 85,
        minutes: "75 to 95",
        notes: "N1 north; goats in argan trees may be seen in season.",
      },
      {
        from: "Essaouira",
        to: "Central Agadir (return, N1 south)",
        km: 175,
        minutes: "150 to 180",
        notes: "Same road back, arriving after dark in winter.",
      },
    ],
    roundTripKm: 350,
    drivingHoursTotal: "5 h to 6 h",
  },
  faq: [
    {
      q: "How long is the drive?",
      a: "About three hours each way on the coast road, so around five to six hours on the road in total. We build in stops.",
    },
    {
      q: "Will we see goats in the argan trees?",
      a: "Sometimes. It depends on the season and local conditions, and it is never guaranteed. The drier months are usually better.",
    },
    {
      q: "Is lunch included?",
      a: "No. Lunch is during your free time in Essaouira, so you can choose where and what to eat.",
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
