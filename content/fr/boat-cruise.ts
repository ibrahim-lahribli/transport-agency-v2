import type { Service } from "@/schemas/service";

export const boatCruise: Service = {
  id: "boat-cruise",
  category: "activity",
  status: "published",
  order: 1,
  slug: "sortie-bateau-agadir-peche-barbecue",
  title: "Sortie en bateau à Agadir : pêche et barbecue de poisson",
  summary:
    "Passez une demi-journée en mer lors de cette sortie en bateau agadir au départ de la marina. Après un court transfert depuis votre hôtel, vous embarquez et longez la côte atlantique, avec la ville et ses collines vues depuis l'eau. L'équipage fait une halte pêche, avec le matériel à bord. Si la météo et l'état de la mer le permettent, une pause baignade est aussi prévue. Le déjeuner est un barbecue de poisson marocain accompagné d'une salade traditionnelle, préparé et servi à bord. Le bateau revient ensuite à la marina d'Agadir, où votre transfert vous attend. Les départs dépendent de la météo et de la disponibilité du bateau.",
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
    "Prise en charge à l'hôtel et transfert vers la marina d'Agadir.",
    "Embarquement et navigation le long de la côte atlantique, avec vue sur Agadir depuis la mer.",
    "Halte pêche, avec matériel disponible à bord.",
    "Pause baignade, si la météo et l'état de la mer le permettent.",
    "Barbecue de poisson marocain avec une salade traditionnelle.",
    "Retour à la marina et transfert vers votre hôtel.",
  ],
  includedExtra: [
    "Matériel de pêche",
    "Déjeuner barbecue de poisson avec salade traditionnelle",
    "Transferts marina inclus",
    "Gilets de sauvetage à bord",
  ],
  notIncluded: ["Boissons supplémentaires", "Pourboires"],
  bring: [
    "Maillot de bain et serviette",
    "Crème solaire, chapeau et lunettes de soleil",
    "Une veste légère pour la sortie en mer",
    "Comprimés contre le mal de mer si vous y êtes sujet",
  ],
  suitableFor: ["Couples", "Familles", "Amis", "Groupes"],
  restrictions: [
    "Les départs dépendent de la météo, de l'état de la mer et de la disponibilité du bateau.",
    "La pause baignade n'a lieu que si les conditions le permettent.",
    "Les personnes qui ne savent pas nager doivent rester à bord ou utiliser une bouée ; à confirmer avec l'équipage.",
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
        minutes: "10 à 15",
        notes: "Court transfert depuis votre hôtel jusqu'à la marina.",
      },
      {
        from: "Agadir Marina",
        to: "Bay of Agadir (sea leg)",
        km: 0,
        minutes: "jusqu'à 120",
        notes: "Navigation côtière avec une halte pêche et, si les conditions le permettent, une pause baignade.",
      },
      {
        from: "Agadir Marina",
        to: "Central Agadir (return)",
        km: 4,
        minutes: "10 à 15",
        notes: "Transfert de retour vers votre hôtel.",
      },
    ],
    roundTripKm: 8,
    drivingHoursTotal: "0 h 20 à 0 h 30",
  },
  faq: [
    {
      q: "Que se passe-t-il si la mer est trop agitée ?",
      a: "Les départs dépendent de la météo et de l'état de la mer. Si la sortie ne peut pas se faire en sécurité, nous proposons une autre date, une alternative, ou le remboursement de tout montant versé.",
    },
    {
      q: "Faut-il savoir nager ?",
      a: "Non, mais la pause baignade est réservée aux nageurs à l'aise. Des gilets de sauvetage sont disponibles à bord et vous pouvez rester sur le bateau.",
    },
    {
      q: "Peut-on privatiser le bateau ?",
      a: "Oui, une sortie privée peut être organisée pour les groupes, selon la capacité et la disponibilité du bateau. Demandez-nous de vérifier.",
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
