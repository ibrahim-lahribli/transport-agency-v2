import type { Service } from "@/schemas/service";

export const moroccanEvening: Service = {
  id: "moroccan-evening",
  category: "activity",
  status: "published",
  order: 6,
  slug: "diner-marocain-spectacle-fantasia-agadir",
  title: "Soirée marocaine : dîner, fantasia et spectacle culturel",
  summary:
    "Passez une soirée de gastronomie et de spectacle marocains lors de ce dîner spectacle agadir. Votre chauffeur vient vous chercher en début de soirée et vous emmène au lieu du spectacle, où le dîner est servi pendant que le programme commence. Tout au long de la soirée, vous assistez à de la musique marocaine, à des spectacles folkloriques et à des danses traditionnelles, ainsi qu'à une fantasia, spectacle équestre où des cavaliers en tenue traditionnelle évoluent dans l'arène. Selon le programme du lieu, d'autres animations sont possibles. Les transferts aller-retour depuis l'hôtel sont inclus. Le lieu exact, le menu et le programme sont confirmés lors de votre demande.",
  seo: {
    title: "Dîner spectacle Agadir : fantasia et folklore",
    description:
      "Dîner spectacle agadir : dîner traditionnel avec musique live, folklore, danses et fantasia équestre, avec transferts aller-retour depuis l'hôtel.",
  },
  primaryKeyword: "dîner spectacle agadir",
  durationHours: 4,
  days: "En soirée, jours programmés (programme adapté pendant le Ramadan)",
  capacity: {
    min: 2,
    sharedMax: 30,
    privateAvailable: true,
  },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      {
        label: "Adulte (dîner, spectacle et transferts)",
        amount: 40,
        unit: "person",
      },
      {
        label: "Enfant 4 à 11 ans",
        amount: 20,
        unit: "person",
      },
      {
        label: "Enfant de moins de 4 ans",
        amount: 0,
        unit: "person",
      },
    ],
  },
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "venue-team",
  itinerary: [
    "Prise en charge à l'hôtel à Agadir en soirée.",
    "Arrivée au lieu du spectacle et accueil marocain traditionnel.",
    "Dîner marocain traditionnel.",
    "Musique marocaine live et spectacles folkloriques.",
    "Spectacles de danses traditionnelles.",
    "Spectacle équestre de fantasia, selon le programme du lieu.",
    "Transfert de retour vers votre hôtel.",
  ],
  includedExtra: [
    "Dîner marocain traditionnel complet",
    "Spectacle de folklore et fantasia",
    "Prise en charge et retour à l'hôtel",
    "Eau ou une boisson sans alcool au dîner",
  ],
  notIncluded: ["Autres boissons", "Pourboires"],
  bring: ["Une couche légère pour la soirée", "Espèces pour les boissons et pourboires"],
  suitableFor: ["Couples", "Familles", "Amis", "Groupes"],
  pickupWindow: "19h00 à 19h30",
  returnApprox: "23h00 à 23h30",
  highlights: [
    "Dîner marocain traditionnel et musique live",
    "Spectacles folkloriques et danses traditionnelles",
    "Fantasia, spectacle équestre",
    "Autres animations selon le lieu",
    "Transferts aller-retour depuis l'hôtel",
    "Lieu, menu et programme confirmés sur demande",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Evening venue in the Agadir area",
        km: 15,
        minutes: "20 à 30",
        notes: "Lieu à confirmer ; la distance varie selon le site.",
      },
      {
        from: "Evening venue",
        to: "Central Agadir (return)",
        km: 15,
        minutes: "20 à 30",
        notes: "Transfert de retour après le spectacle.",
      },
    ],
    roundTripKm: 30,
    drivingHoursTotal: "0 h 40 à 1 h",
  },
  faq: [
    {
      q: "Qu'est-ce que la fantasia ?",
      a: "Un spectacle équestre marocain traditionnel. Des cavaliers en tenue traditionnelle évoluent en ligne dans l'arène, et des mousquets sont tirés en l'air.",
    },
    {
      q: "Les boissons sont-elles incluses ?",
      a: "De l'eau ou une boisson sans alcool accompagne souvent le dîner, mais cela varie selon le lieu. Nous confirmons la politique de boissons lors de votre demande.",
    },
    {
      q: "Quel est le lieu et quel est le menu ?",
      a: "Le lieu et le menu varient ; nous confirmons les deux au moment de votre demande, ainsi que le programme en cours.",
    },
  ],
  confirmFlags: [
    "venue and programme",
    "menu",
    "drinks policy",
    "price",
    "pickup and return times",
    "Ramadan and season availability",
  ],
} satisfies Service;

export default moroccanEvening;
