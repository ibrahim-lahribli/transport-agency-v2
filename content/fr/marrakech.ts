import type { Service } from "@/schemas/service";

export const marrakech: Service = {
  id: "marrakech",
  category: "excursion",
  status: "published",
  order: 12,
  slug: "excursion-marrakech-depuis-agadir",
  title: "Excursion d'une journée à Marrakech depuis Agadir",
  summary:
    "Offrez-vous une longue mais belle journée lors de cette excursion à Marrakech depuis Agadir. Un départ matinal vous emmène par l'autoroute à péage, à travers les collines d'Argana, jusqu'à la ville rouge en milieu de matinée. Vous admirez la mosquée Koutoubia de l'extérieur, puis vous visitez le jardin Majorelle, connu pour sa couleur intense et sa collection végétale. Après du temps libre pour le déjeuner, vous rejoignez la place Jemaa el-Fna puis la médina, avec son artisanat, ses épices, ses textiles et ses articles en cuir. Le retour étant long, la journée se termine vers 19h00 à 19h30. Les entrées, dont le jardin Majorelle, et le déjeuner ne sont pas inclus.",
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
    "Prise en charge à l'hôtel à Agadir, départ conseillé vers 07h30.",
    "Trajet confortable par l'autoroute jusqu'à Marrakech, avec une courte pause (environ 3h à 3h30).",
    "Mosquée Koutoubia, vue de l'extérieur, avec l'explication de son histoire et de son architecture.",
    "Jardin Majorelle, avec ses couleurs et son cadre botanique (entrée à horaire fixe).",
    "Temps libre pour le déjeuner.",
    "Place Jemaa el-Fna, puis la médina et les souks : artisanat, épices, textiles et cuir.",
    "Départ de Marrakech vers 16h00 ; retour à Agadir vers 19h00 à 19h30.",
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
    "Chaussures de marche confortables",
    "Vêtements légers couvrant les épaules et les genoux pour la médina",
    "Chapeau et crème solaire",
    "Espèces pour le déjeuner, les entrées et les achats",
    "Veste légère pour le trajet de retour",
  ],
  suitableFor: ["Couples", "Familles", "Amis", "Petits groupes"],
  restrictions: [
    "Journée très longue : environ 5h30 à 7h de véhicule au total.",
    "Le jardin Majorelle fonctionne avec des billets horodatés ; il peut ne pas être disponible à court terme.",
    "Non recommandé pour les très jeunes enfants ; les enfants de moins de 6 ans peuvent trouver la journée fatigante.",
    "Les entrées, y compris celle du jardin Majorelle, ne sont pas incluses.",
  ],
  seasonalNotes: [
    "Marrakech est à l'intérieur des terres et bien plus chaude qu'Agadir en été ; le départ matinal et l'ombre à midi aident.",
    "En hiver, les portions d'autoroute peuvent être froides et brumeuses tôt le matin.",
    "Le retour se fait de nuit une bonne partie de l'année.",
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
        minutes: "165 à 210",
        notes: "Autoroute à péage A7 vers le nord, avec une courte pause.",
      },
      {
        from: "Marrakech arrival point",
        to: "City stops (Koutoubia, Majorelle, Jemaa el-Fnaa)",
        km: 15,
        minutes: "20 à 40",
        notes: "Trajets locaux et stationnement entre les étapes.",
      },
      {
        from: "Marrakech",
        to: "Central Agadir (return, A7)",
        km: 250,
        minutes: "165 à 210",
        notes: "Même autoroute au retour, arrivée après la nuit tombée en hiver.",
      },
    ],
    roundTripKm: 515,
    drivingHoursTotal: "5 h 30 à 7 h 20",
  },
  faq: [
    {
      q: "Marrakech est-elle faisable en une journée depuis Agadir ?",
      a: "Oui, mais c'est une longue journée avec environ six heures de route. Vous passez plusieurs heures dans la ville, et nous partons tôt.",
    },
    {
      q: "Le jardin Majorelle est-il inclus ?",
      a: "La visite figure à l'itinéraire mais l'entrée n'est pas incluse. Le jardin fonctionne avec des billets horodatés ; nous vérifions la disponibilité lors de votre demande.",
    },
    {
      q: "Pouvons-nous entrer dans la mosquée Koutoubia ?",
      a: "Non. Les non-musulmans ne peuvent pas entrer dans les mosquées au Maroc. Vous voyez la Koutoubia de l'extérieur et découvrez son histoire.",
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
