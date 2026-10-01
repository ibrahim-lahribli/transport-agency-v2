import type { Service } from "@/schemas/service";

export const moroccanEvening: Service = {
  id: "moroccan-evening",
  category: "activity",
  status: "draft",
  order: 6,
  slug: "diner-marocain-spectacle-fantasia-agadir",
  title: "Soirée marocaine : dîner, fantasia et spectacle culturel",
  summary:
    "Passez une soirée de gastronomie et de spectacle marocains lors de ce dîner spectacle agadir. Votre chauffeur vient vous chercher en début de soirée et vous emmène au lieu du spectacle, où le dîner est servi pendant que le programme commence. Tout au long de la soirée, vous assistez à de la musique marocaine, à des spectacles folkloriques et à des danses traditionnelles, ainsi qu'à une fantasia, spectacle équestre où des cavaliers en tenue traditionnelle évoluent dans l'arène. Selon le programme du lieu, d'autres animations sont possibles. Les transferts aller-retour depuis l'hôtel sont inclus. Le lieu exact, le menu et le programme sont confirmés lors de votre demande. (Draft for native review.)",
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
    "Evening hotel pickup in Agadir.",
    "Arrival at the venue and a traditional Moroccan welcome.",
    "Traditional Moroccan dinner.",
    "Live Moroccan music and folklore performances.",
    "Traditional dance performances.",
    "Fantasia equestrian performance, subject to the venue's programme.",
    "Return transfer to your hotel.",
  ],
  includedExtra: [
    "Dîner marocain traditionnel complet",
    "Spectacle de folklore et fantasia",
    "Prise en charge et retour à l'hôtel",
    "Eau ou une boisson sans alcool au dîner",
  ],
  notIncluded: ["Autres boissons", "Pourboires"],
  bring: ["A light layer for the evening", "Cash for drinks and tips"],
  suitableFor: ["Couples", "Families", "Friends", "Groups"],
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
        minutes: "20 to 30",
        notes: "Venue to be confirmed; distance varies with the site.",
      },
      {
        from: "Evening venue",
        to: "Central Agadir (return)",
        km: 15,
        minutes: "20 to 30",
        notes: "Return transfer after the show.",
      },
    ],
    roundTripKm: 30,
    drivingHoursTotal: "0 h 40 to 1 h",
  },
  faq: [
    {
      q: "What is fantasia?",
      a: "A traditional Moroccan equestrian display. Riders in traditional dress perform in a line in the arena, and muskets are fired into the air.",
    },
    {
      q: "Are drinks included?",
      a: "Water or a soft drink with dinner is often included, but it varies by venue. We confirm the drinks policy when you request.",
    },
    {
      q: "Which venue is it, and what is the menu?",
      a: "The venue and menu vary, so we confirm both at the time of your request, along with the current programme.",
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
