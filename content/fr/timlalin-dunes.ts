import type { Service } from "@/schemas/service";

export const timlalinDunes: Service = {
  id: "timlalin-dunes",
  category: "activity",
  status: "published",
  order: 2,
  slug: "dunes-timlalin-quad-dromadaire-sandboard",
  title: "Dunes de Timlalin : quad, dromadaire et sandboard",
  summary:
    "Parcourez les dunes côtières lors de cette activité dunes timlalin agadir. Les dunes se trouvent au nord d'Agadir, après Tamri sur la route de la côte : comptez environ une heure à une heure et quart par trajet. Sur place, vous pouvez faire une balade à dos de dromadaire sur le sable, conduire un quad pendant environ une heure après un briefing de sécurité, et essayer le sandboard sur les pentes face à l'Atlantique. Vous choisissez les activités, qui peuvent aussi être combinées. Une option coucher de soleil est proposée en saison, avec un départ en fin d'après-midi et un retour peu après le coucher du soleil. Prise en charge et retour à l'hôtel inclus.",
  seo: {
    title: "Dunes Timlalin Agadir : dromadaire, quad, sandboard",
    description:
      "Dunes timlalin agadir : balade à dromadaire, environ une heure de quad et sandboard sur les dunes côtières au nord d'Agadir, option coucher de soleil.",
  },
  primaryKeyword: "dunes timlalin agadir",
  durationHours: 5.5,
  departures: ["08:30", "13:30", "15:45"],
  days: "Tous les jours ; matin, après-midi ou coucher du soleil",
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
        label: "Balade à dromadaire (environ 45 min)",
        amount: 15,
        unit: "person",
        isBase: true,
      },
      {
        label: "Balade à dromadaire au coucher du soleil",
        amount: 20,
        unit: "person",
      },
      {
        label: "Quad, 1 heure, conducteur seul",
        amount: 35,
        unit: "person",
      },
      {
        label: "Quad, 1 heure, deux sur un quad",
        amount: 50,
        unit: "quad",
      },
      {
        label: "Sandboard en option",
        amount: 10,
        unit: "person",
      },
      {
        label: "Formule combinée : quad 1h + dromadaire + sandboard",
        amount: 55,
        unit: "person",
      },
    ],
  },
  cancellationPolicy: "adventure",
  languages: ["en", "fr", "ar"],
  host: "operator-team",
  itinerary: [
    "Prise en charge à l'hôtel à Agadir et route vers le nord en direction de Tamri (environ 1h à 1h15).",
    "Balade à dos de dromadaire dans les dunes, avec vue vers l'Atlantique.",
    "Sortie en quad d'environ une heure sur le sable, après un briefing de sécurité.",
    "Sandboard sur les pentes des dunes.",
    "Photos et courte pause dans les dunes.",
    "Route retour vers Agadir, arrivée vers 13h45 à 14h45.",
    "Option coucher de soleil : départ en fin d'après-midi et retour peu après le coucher du soleil (selon la saison).",
  ],
  includedExtra: [
    "Briefing de sécurité et équipement quad",
    "Planche de sandboard et casque",
    "Prise en charge à l'hôtel en Zone 1 (et Zone 2 en route)",
  ],
  notIncluded: ["Activités non sélectionnées", "Pourboires"],
  bring: [
    "Chaussures fermées",
    "Lunettes de soleil",
    "Foulard ou buff contre le sable",
    "Crème solaire",
    "Une couche légère pour l'option coucher de soleil",
  ],
  suitableFor: ["Amateurs d'aventure", "Couples", "Familles", "Groupes", "Photographie"],
  restrictions: [
    "Ce sont de petites dunes côtières, pas de grandes dunes désertiques.",
    "Le site se trouve à environ 70 km au nord d'Agadir, soit 1h à 1h15 par trajet.",
    "La conduite du quad est généralement réservée aux clients plus âgés ; les plus jeunes montent en général comme passagers. Confirmez les âges lors de votre demande.",
    "Le quad et la balade à dos de dromadaire ne sont pas recommandés en cas de grossesse ou de problèmes de dos ou cardiaques.",
  ],
  seasonalNotes: [
    "Le sable est très chaud à midi en été ; les matinées et les fins d'après-midi sont plus confortables.",
    "Les départs au coucher du soleil sont saisonniers ; le soleil se couche vers 18h45 en hiver et vers 20h15 en été.",
    "Le sable est plus ferme après la pluie.",
  ],
  pickupWindow: "08h30 à 09h30 (matin) / 13h30 à 14h30 (après-midi)",
  returnApprox: "13h45 à 14h45 (matin) / 18h30 à 19h30 (après-midi)",
  highlights: [
    "Balade à dos de dromadaire dans les dunes côtières",
    "Sortie en quad d'environ une heure, avec briefing",
    "Sandboard sur les pentes des dunes",
    "Combinez les activités si vous le souhaitez",
    "Option coucher de soleil en saison",
    "Prise en charge et retour à l'hôtel inclus",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Timlaline dunes near Tamri (N1 north)",
        km: 68,
        minutes: "60 à 80",
        notes: "Route côtière vers le nord, après Anza, Tamraght et Tamri.",
      },
      {
        from: "Dune area",
        to: "Camel, quad and sandboarding points",
        km: 5,
        minutes: "10 à 20",
        notes: "Courts déplacements entre les points d'activité.",
      },
      {
        from: "Timlaline",
        to: "Central Agadir (return, N1 south)",
        km: 68,
        minutes: "60 à 80",
        notes: "Même route au retour.",
      },
    ],
    roundTripKm: 141,
    drivingHoursTotal: "2 h 10 à 2 h 45",
  },
  faq: [
    {
      q: "À quelle distance se trouve Timlalin d'Agadir ?",
      a: "À environ 70 km au nord, après Tamri, soit 1h à 1h15 par trajet. C'est une sortie d'une demi-journée au total.",
    },
    {
      q: "Puis-je combiner la balade à dos de dromadaire, le quad et le sandboard ?",
      a: "Oui. Vous pouvez choisir une activité ou les combiner. Nous confirmons la combinaison et le timing lors de votre demande.",
    },
    {
      q: "Y a-t-il une limite d'âge pour le quad ?",
      a: "En général, il faut être assez âgé pour conduire en sécurité ; les plus jeunes montent souvent comme passagers. Nous confirmons les âges exacts lors de votre demande.",
    },
  ],
  confirmFlags: [
    "all option prices",
    "drive time from Agadir",
    "minimum ages",
    "sunset schedule",
    "operator licence and insurance",
    "board and helmet provision",
  ],
} satisfies Service;

export default timlalinDunes;
