import type { Service } from "@/schemas/service";

export const agadirCityTour: Service = {
  id: "agadir-city-tour",
  category: "excursion",
  status: "published",
  order: 8,
  slug: "visite-d-agadir-marina-kasbah-souk",
  title: "Découvrez Agadir : visite de la ville",
  summary:
    "Découvrez la ville lors de cette visite d'Agadir d'une demi-journée. Vous commencez par la marina et une promenade au bord de l'eau, puis vous montez à la Kasbah d'Oufella pour une large vue sur Agadir, l'Atlantique et la plaine environnante. Dans le quartier de Talborjt, vous découvrez comment la ville a été détruite lors du séisme de 1960 puis reconstruite. Une halte dans une coopérative d'huile d'argan explique la fabrication de l'huile. Dernière étape : le Souk El Had, l'un des plus grands marchés de la région, avec du temps libre pour les épices, l'artisanat et les souvenirs. Le souk est fermé le lundi. Prise en charge et retour à l'hôtel inclus.",
  seo: {
    title: "Visite d'Agadir : Marina, Kasbah et Souk",
    description:
      "Visite d'Agadir en demi-journée : marina, Kasbah d'Oufella, Talborjt, coopérative d'argan et Souk El Had (fermé le lundi). Transfert inclus.",
  },
  primaryKeyword: "visite d'agadir",
  durationHours: 4,
  pickupWindow: "Matin 08h50 à 09h10 / Après-midi 14h20 à 14h40",
  returnApprox: "Matin 13h30 à 14h15 / Après-midi 18h30 à 19h15",
  days: "Tous les jours (le lundi le Souk El Had est fermé et remplacé par le port de pêche d'Agadir ou la Vallée des Oiseaux)",
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
        amount: 20,
        unit: "person",
      },
      {
        label: "Enfant 4 à 11 ans",
        amount: 10,
        unit: "person",
      },
      {
        label: "Enfant de moins de 4 ans",
        amount: 0,
        unit: "person",
      },
    ],
  },
  privateRate: "agadir-halfday",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: [
    "Prise en charge à l'hôtel à Agadir (départ le matin à 09h00 ou l'après-midi à 14h30).",
    "Marina d'Agadir : promenade au bord de l'eau et arrêt photo.",
    "Kasbah d'Oufella : vues panoramiques sur la ville, l'Atlantique et la région.",
    "Talborjt : un quartier détruit lors du séisme de 1960 et reconstruit dans la ville moderne.",
    "Coopérative d'huile d'argan : la fabrication des produits à base d'argan.",
    "Souk El Had : temps libre pour les épices, l'artisanat, les vêtements et les souvenirs.",
    "Dépose à votre hôtel.",
  ],
  includedExtra: [
    "Prise en charge et retour hôtel à Agadir",
    "Transport en minivan climatisé",
    "Commentaires du chauffeur-accompagnateur en français ou anglais",
  ],
  notIncluded: [
    "Achats personnels au souk ou à la coopérative",
    "Guide officiel en option (25 EUR par groupe)",
    "Pourboires",
  ],
  bring: [
    "Chaussures confortables",
    "Chapeau et crème solaire",
    "Espèces pour les achats au souk et à la coopérative",
  ],
  suitableFor: ["Couples", "Familles", "Amis", "Petits groupes"],
  restrictions: [
    "Le Souk El Had est fermé le lundi ; ce jour-là, une halte alternative est proposée.",
    "Le site de la Kasbah d'Oufella ouvre à 10h00 ; il est donc visité à partir du milieu de matinée.",
    "En hiver, le départ de l'après-midi se termine après le coucher du soleil.",
  ],
  highlights: [
    "Visite d'une demi-journée avec prise en charge à l'hôtel",
    "Promenade au bord de l'eau à la marina d'Agadir",
    "Vues panoramiques depuis la Kasbah d'Oufella",
    "L'histoire de Talborjt et du séisme de 1960",
    "Visite d'une coopérative d'huile d'argan",
    "Temps libre au Souk El Had (fermé le lundi)",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir (Boulevard du 20 Août)",
        to: "Agadir Marina",
        km: 2,
        minutes: "5 à 10",
        notes: "Court trajet jusqu'au bord de l'eau.",
      },
      {
        from: "Agadir Marina",
        to: "Agadir Oufella (Kasbah)",
        km: 6,
        minutes: "12 à 18",
        notes: "Montée par la route de la Kasbah ; le site aménagé ouvre à 10h00.",
      },
      {
        from: "Agadir Oufella",
        to: "Talborjt district",
        km: 3,
        minutes: "8 à 12",
        notes: "Descente vers le centre-ville.",
      },
      {
        from: "Talborjt",
        to: "Argan oil cooperative",
        km: 4,
        minutes: "10 à 15",
        notes: "Emplacement à confirmer avec l'opérateur.",
      },
      {
        from: "Argan cooperative",
        to: "Souk El Had, Rue 2 Mars",
        km: 5,
        minutes: "12 à 20",
        notes: "Fermé le lundi.",
      },
      {
        from: "Souk El Had",
        to: "Hotels in Agadir",
        km: 3,
        minutes: "8 à 15",
        notes: "Dépose par zone.",
      },
    ],
    roundTripKm: 28,
    drivingHoursTotal: "0 h 55 à 1 h 30",
  },
  faq: [
    {
      q: "Le Souk El Had est-il ouvert tous les jours ?",
      a: "Non. Le marché est fermé le lundi pour son nettoyage. Ce jour-là, nous remplaçons cette halte par une autre étape en ville.",
    },
    {
      q: "Un accompagnateur est-il inclus en plus du chauffeur ?",
      a: "Vous voyagez avec un chauffeur qui commente le parcours. Un accompagnateur dédié pour la médina et le souk peut être demandé à l'avance.",
    },
    {
      q: "Combien de temps libre avons-nous au souk ?",
      a: "Environ une heure, suffisamment pour flâner et acheter sans vous presser.",
    },
  ],
  confirmFlags: [
    "price",
    "two departure times",
    "guide wording",
    "which cooperative is visited",
    "Oufella access on the day",
  ],
} satisfies Service;

export default agadirCityTour;
