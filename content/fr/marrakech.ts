import type { Service } from "@/schemas/service";

export const marrakech: Service = {
  id: "marrakech",
  category: "excursion",
  status: "published",
  order: 12,
  slug: "excursion-marrakech-depuis-agadir",
  title: "Excursion d'une journée à Marrakech depuis Agadir",
  summary:
    "Offrez-vous une longue mais belle journée lors de cette excursion à Marrakech depuis Agadir. Un départ matinal vous emmène par l'autoroute à péage, à travers les collines d'Argana, jusqu'à la ville rouge en milieu de matinée. Vous admirez la mosquée Koutoubia de l'extérieur, puis vous visitez le jardin Majorelle, connu pour sa couleur intense et sa collection végétale. Après du temps libre pour le déjeuner, vous rejoignez la place Jemaa el-Fna puis la médina, avec son artisanat, ses épices, ses textiles et ses articles en cuir. Le retour étant long, la journée se termine vers 19h00 à 19h30. Les entrées, dont le jardin Majorelle, et le déjeuner ne sont pas inclus. (Draft for native review.)",
  seo: {
    title: "Excursion Marrakech depuis Agadir : médina",
    description:
      "Excursion à Marrakech depuis Agadir : Koutoubia, jardin Majorelle, place Jemaa el-Fna et souks, avec temps libre pour le déjeuner.",
  },
  primaryKeyword: "excursion marrakech depuis agadir",
  durationHours: 12,
  pickupWindow: "07h00 à 08h00",
  returnApprox: "19h00 à 19h30",
  days: "Tous les jours de l'année ; réservation au moins 48 heures à l'avance",
  capacity: {
    min: 4,
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
        amount: 45,
        unit: "person",
      },
      {
        label: "Enfant 4 à 11 ans",
        amount: 25,
        unit: "person",
      },
      {
        label: "Enfant de moins de 4 ans",
        amount: 0,
        unit: "person",
      },
    ],
  },
  privateRate: "marrakech",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: [
    "Hotel pickup in Agadir, suggested departure about 07:30.",
    "Comfortable motorway drive to Marrakech, with a short rest stop (about 3 to 3.5 hours).",
    "Koutoubia Mosque, seen from the outside, with its history and architecture explained.",
    "Majorelle Garden, with its colour and botanical surroundings (timed entry).",
    "Free time for lunch.",
    "Jemaa el-Fnaa square and then the medina and souks: crafts, spices, textiles and leather.",
    "Departure from Marrakech about 16:00; return to Agadir about 19:00 to 19:30.",
  ],
  includedExtra: [
    "Transport en véhicule climatisé par l'autoroute A7",
    "Péages d'autoroute et frais de stationnement",
    "Commentaires du chauffeur-accompagnateur en français ou anglais",
    "Bouteille d'eau par personne",
  ],
  notIncluded: [
    "Déjeuner à Marrakech (temps libre pour choisir son restaurant)",
    "Entrées aux monuments et jardins (Jardin Majorelle, Palais Bahia)",
    "Guide officiel en option à Marrakech (35 EUR par groupe)",
    "Pourboires",
  ],
  bring: [
    "Comfortable walking shoes",
    "Light clothing that covers shoulders and knees for the medina",
    "Hat and sunscreen",
    "Cash for lunch, entrance fees and shopping",
    "Light jacket for the return drive",
  ],
  suitableFor: ["Couples", "Families", "Friends", "Small groups"],
  restrictions: [
    "Very long day: about 5.5 to 7 hours in the vehicle in total.",
    "Majorelle Garden uses timed advance tickets and may not be available at short notice.",
    "Not recommended for very young children; children under 6 may find the day tiring.",
    "Entrance fees, including the Majorelle Garden, are not included.",
  ],
  seasonalNotes: [
    "Marrakech is inland and much hotter than Agadir in summer; the early start and shade at midday help.",
    "Winter motorway sections can be cold and foggy early in the day.",
    "The return is after dark for much of the year.",
  ],
  highlights: [
    "Journée complète d'Agadir à Marrakech",
    "Mosquée Koutoubia, vue de l'extérieur",
    "Jardin Majorelle et ses couleurs intenses",
    "Place Jemaa el-Fna et médina",
    "Temps libre pour le déjeuner et les achats",
    "Prise en charge à l'hôtel et trajet confortable par autoroute",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Marrakech",
        km: 250,
        minutes: "165 to 210",
        notes: "A7 toll motorway north, with one short rest stop.",
      },
      {
        from: "Marrakech arrival point",
        to: "City stops (Koutoubia, Majorelle, Jemaa el-Fnaa)",
        km: 15,
        minutes: "20 to 40",
        notes: "Local driving and parking between stops.",
      },
      {
        from: "Marrakech",
        to: "Central Agadir (return, A7)",
        km: 250,
        minutes: "165 to 210",
        notes: "Same motorway back, arriving after dark in winter.",
      },
    ],
    roundTripKm: 515,
    drivingHoursTotal: "5 h 30 to 7 h 20",
  },
  faq: [
    {
      q: "Is Marrakech doable in a day from Agadir?",
      a: "Yes, but it is a long day with about six hours of driving. You get several hours in the city, and we start early.",
    },
    {
      q: "Is the Majorelle Garden included?",
      a: "The visit is included in the itinerary but the entrance fee is not. It uses timed tickets, so we check availability when you request.",
    },
    {
      q: "Can we go inside the Koutoubia Mosque?",
      a: "No. Non-Muslims cannot enter mosques in Morocco. You see the Koutoubia from the outside and learn about its history.",
    },
  ],
  confirmFlags: [
    "price",
    "minimum group of 4",
    "entrance fee wording",
    "licensed guide availability and price",
    "exact return time",
  ],
} satisfies Service;

export default marrakech;
