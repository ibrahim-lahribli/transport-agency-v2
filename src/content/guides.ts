/**
 * Editorial guides: first-hand, non-commodity content that builds topical
 * authority and internal links. Bilingual, authored as the agency owner.
 */
export interface GuideSection {
  heading: { en: string; fr: string };
  body: { en: string[]; fr: string[] };
}

export interface Guide {
  id: string;
  slug: { en: string; fr: string };
  title: { en: string; fr: string };
  description: { en: string; fr: string };
  /** ISO date, used for `datePublished`/`dateModified`. */
  date: string;
  readingMinutes: number;
  sections: GuideSection[];
  /** Related service ids for internal linking. */
  serviceIds: string[];
}

export const guides: Guide[] = [
  {
    id: "when-to-visit",
    slug: {
      en: "best-time-to-visit-agadir",
      fr: "meilleure-periode-visiter-agadir",
    },
    title: {
      en: "The best time to visit Agadir and the Souss-Massa coast",
      fr: "La meilleure période pour visiter Agadir et la côte du Souss-Massa",
    },
    description: {
      en: "A local, month-by-month guide to the weather, the sea, the dunes and the crowds around Agadir and Taghazout, from an agency that drives these routes all year.",
      fr: "Un guide local, mois par mois, sur la météo, la mer, les dunes et la fréquentation autour d'Agadir et Taghazout, par une agence qui parcourt ces routes toute l'année.",
    },
    date: "2026-10-01",
    readingMinutes: 5,
    serviceIds: ["paradise-valley", "boat-cruise", "timlalin-dunes"],
    sections: [
      {
        heading: { en: "Spring is the sweet spot", fr: "Le printemps, la période idéale" },
        body: {
          en: [
            "From March to May the coast is mild, the argan hills are green and the light is soft. This is our favourite window for day trips to Paradise Valley and Taroudant, before the inland heat builds.",
            "The sea is calmer than in winter, so boat trips go out more reliably, though mornings are always the safest bet on the Atlantic.",
          ],
          fr: [
            "De mars à mai, la côte est douce, les collines d'arganiers sont vertes et la lumière est belle. C'est notre fenêtre préférée pour les journées à la Vallée du Paradis et à Taroudant, avant que la chaleur de l'intérieur ne monte.",
            "La mer est plus calme qu'en hiver, les sorties en bateau sont donc plus fiables, même si les matinées restent le choix le plus sûr sur l'Atlantique.",
          ],
        },
      },
      {
        heading: { en: "Summer: go early, go inland", fr: "L'été : partez tôt, allez vers l'intérieur" },
        body: {
          en: [
            "July and August are hot and busy. Agadir itself stays bearable thanks to the ocean breeze, but the dunes north of Tamri and the Paradise Valley walk are best at first light.",
            "Evening activities, such as the Moroccan dinner show, are the most comfortable choice in the middle of summer.",
          ],
          fr: [
            "Juillet et août sont chauds et fréquentés. Agadir reste supportable grâce à la brise océane, mais les dunes au nord de Tamri et la marche de la Vallée du Paradis sont à faire tôt le matin.",
            "Les activités en soirée, comme le dîner spectacle marocain, sont le choix le plus confortable en plein été.",
          ],
        },
      },
      {
        heading: { en: "Autumn: warm sea, clear light", fr: "L'automne : mer chaude, lumière claire" },
        body: {
          en: [
            "September to November brings some of the warmest water of the year and reliable conditions for surfing around Taghazout and Tamraght.",
            "The inland valleys cool down again, which makes the longer excursions to Tiznit and Essaouira comfortable.",
          ],
          fr: [
            "De septembre à novembre, l'eau est parmi les plus chaudes de l'année et les conditions de surf sont fiables autour de Taghazout et Tamraght.",
            "Les vallées de l'intérieur se rafraîchissent, ce qui rend confortables les longues excursions vers Tiznit et Essaouira.",
          ],
        },
      },
      {
        heading: { en: "Winter: swells and low sunsets", fr: "L'hiver : houle et couchers précoces" },
        body: {
          en: [
            "December and January bring Atlantic swells that can cancel boat trips; we recheck the weather at 07:00 and offer a new date or a refund when we call it off.",
            "Sunset is around 18:20 to 18:45, so afternoon tours finish after dark. We plan the day around that rather than pretending otherwise.",
          ],
          fr: [
            "Décembre et janvier apportent une houle atlantique qui peut annuler les sorties en bateau ; nous revérifions la météo à 07h00 et proposons une nouvelle date ou un remboursement en cas d'annulation.",
            "Le coucher du soleil est vers 18h20 à 18h45, donc les excursions de l'après-midi se terminent après la nuit. Nous planifions la journée en conséquence.",
          ],
        },
      },
    ],
  },
  {
    id: "what-to-pack",
    slug: {
      en: "what-to-pack-agadir-excursion",
      fr: "quoi-emporter-excursion-agadir",
    },
    title: {
      en: "What to pack for an excursion from Agadir",
      fr: "Quoi emporter pour une excursion depuis Agadir",
    },
    description: {
      en: "A short, practical packing list for day trips, dune activities and transfers around Agadir, based on what our guests actually forget.",
      fr: "Une liste pratique et courte pour les excursions, les activités dans les dunes et les transferts autour d'Agadir, d'après ce que nos clients oublient vraiment.",
    },
    date: "2026-10-01",
    readingMinutes: 4,
    serviceIds: ["paradise-valley", "quad-buggy-forest", "airport-agadir"],
    sections: [
      {
        heading: { en: "On every excursion", fr: "À chaque excursion" },
        body: {
          en: [
            "Comfortable shoes with grip, a hat, sunscreen and a refillable water bottle. Inland valleys like Paradise Valley and Taroudant are hotter than the coast.",
            "A little cash in dirhams for lunches, drinks and small purchases at the argan cooperative or pottery workshop.",
          ],
          fr: [
            "Des chaussures confortables avec de l'adhérence, un chapeau, de la crème solaire et une gourde. Les vallées de l'intérieur comme la Vallée du Paradis et Taroudant sont plus chaudes que la côte.",
            "Un peu d'espèces en dirhams pour les déjeuners, les boissons et les petits achats à la coopérative d'argan ou à l'atelier de poterie.",
          ],
        },
      },
      {
        heading: { en: "For the dunes and off-road", fr: "Pour les dunes et le tout-terrain" },
        body: {
          en: [
            "Closed shoes (never sandals), sunglasses and a scarf or buff against the sand. Avoid loose items that can blow away on the dune slopes.",
            "For the sunset option, bring a light layer: the temperature drops quickly once the sun is down.",
          ],
          fr: [
            "Des chaussures fermées (jamais de sandales), des lunettes de soleil et un foulard contre le sable. Évitez les objets qui s'envolent sur les pentes des dunes.",
            "Pour l'option coucher de soleil, prévoyez une couche légère : la température baisse vite une fois le soleil couché.",
          ],
        },
      },
      {
        heading: { en: "For transfers", fr: "Pour les transferts" },
        body: {
          en: [
            "Have your flight number and hotel address to hand. We track your flight, so a delay is not a problem, but tell us about child seats or surfboards in advance.",
            "Surfboards and bikes need a van or minibus; up to four boards travel free, with a small charge for extras.",
          ],
          fr: [
            "Ayez votre numéro de vol et l'adresse de l'hôtel à portée de main. Nous suivons votre vol, un retard n'est donc pas un problème, mais signalez les sièges enfant ou les planches de surf à l'avance.",
            "Les planches de surf et les vélos nécessitent un van ou un minibus ; jusqu'à quatre planches voyagent gratuitement, avec un léger supplément au-delà.",
          ],
        },
      },
    ],
  },
];

export const guidesById: Record<string, Guide> = Object.fromEntries(
  guides.map((guide) => [guide.id, guide]),
);

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug.en === slug || guide.slug.fr === slug);
}
