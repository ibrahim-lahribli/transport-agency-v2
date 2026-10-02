/**
 * Place landing pages: hand-curated, localized hubs that target long-tail
 * "things to do in X" intent and cross-link to the services that serve them.
 * Every referenced service id must exist in the catalogue (validated by tests).
 */
export interface Place {
  id: string;
  slug: { en: string; fr: string };
  name: { en: string; fr: string };
  intro: { en: string; fr: string };
  seo: {
    en: { title: string; description: string };
    fr: { title: string; description: string };
  };
  /** Related service ids, in display order. */
  serviceIds: string[];
}

export const places: Place[] = [
  {
    id: "taghazout",
    slug: { en: "taghazout", fr: "taghazout" },
    name: { en: "Taghazout", fr: "Taghazout" },
    intro: {
      en: "A surf village north of Agadir, backed by argan hills and easily reached by private transfer or as a pickup en route on north-bound excursions.",
      fr: "Un village de surf au nord d'Agadir, adossé aux collines d'arganiers, facilement accessible en transfert privé ou en prise en charge sur la route vers le nord.",
    },
    seo: {
      en: {
        title: "Taghazout: Transfers, Surf and Day Trips",
        description:
          "Private airport transfers to Taghazout and Taghazout Bay, plus excursions that collect surfers en route to Paradise Valley and the dunes.",
      },
      fr: {
        title: "Taghazout : transferts, surf et excursions",
        description:
          "Transferts privés depuis l'aéroport d'Agadir vers Taghazout et Taghazout Bay, et excursions qui prennent les surfeurs en route vers la Vallée du Paradis.",
      },
    },
    serviceIds: ["airport-taghazout", "paradise-valley", "timlalin-dunes", "boat-cruise"],
  },
  {
    id: "tiznit",
    slug: { en: "tiznit", fr: "tiznit" },
    name: { en: "Tiznit", fr: "Tiznit" },
    intro: {
      en: "A walled town south of Agadir known for its silver souks and medina, best visited on the full-day coastal and dunes trip.",
      fr: "Une ville fortifiée au sud d'Agadir, réputée pour ses souks d'argent et sa médina, à découvrir lors de l'excursion côtière d'une journée.",
    },
    seo: {
      en: {
        title: "Tiznit Day Trip from Agadir | Silver Souks",
        description:
          "Visit Tiznit and the Souss-Massa coast on a full-day guide: pottery, coastal dunes and the medina's silver souks, with hotel pickup.",
      },
      fr: {
        title: "Excursion Tiznit depuis Agadir | Souks d'argent",
        description:
          "Découvrez Tiznit et la côte du Souss-Massa en une journée : poterie, dunes côtières et souks d'argent de la médina, prise en charge incluse.",
      },
    },
    serviceIds: ["massa-tiznit", "private-transfers-tourist-transport"],
  },
  {
    id: "taroudant",
    slug: { en: "taroudant", fr: "taroudant" },
    name: { en: "Taroudant", fr: "Taroudant" },
    intro: {
      en: "The 'little Marrakech' of the Souss valley, with red ramparts and a Tiout oasis nearby, a comfortable full-day trip from Agadir.",
      fr: "La « petite Marrakech » de la vallée du Souss, avec ses remparts rouges et l'oasis de Tiout à proximité, une excursion confortable depuis Agadir.",
    },
    seo: {
      en: {
        title: "Taroudant Day Trip from Agadir | Tiout Oasis",
        description:
          "Day trip from Agadir to Taroudant and the Tiout oasis: ramparts, souks, a palm-grove lunch and the donkey ride, with hotel pickup.",
      },
      fr: {
        title: "Excursion Taroudant depuis Agadir | Oasis de Tiout",
        description:
          "Excursion d'une journée d'Agadir à Taroudant et l'oasis de Tiout : remparts, souks, déjeuner dans la palmeraie et balade à dos d'âne.",
      },
    },
    serviceIds: ["taroudant-tiout", "private-transfers-tourist-transport"],
  },
  {
    id: "essaouira",
    slug: { en: "essaouira", fr: "essaouira" },
    name: { en: "Essaouira", fr: "Essaouira" },
    intro: {
      en: "A historic Atlantic port also called Mogador, with a fortified medina and a working harbour about three hours up the coast.",
      fr: "Un port atlantique historique aussi appelé Mogador, avec une médina fortifiée et un port de pêche à environ trois heures de route.",
    },
    seo: {
      en: {
        title: "Essaouira Day Trip from Agadir | Mogador",
        description:
          "Essaouira day trip from Agadir: Tamri viewpoints, argan cooperative, fortified medina, ramparts and harbour, with free time for lunch.",
      },
      fr: {
        title: "Excursion Essaouira depuis Agadir | Mogador",
        description:
          "Excursion à Essaouira depuis Agadir : belvédères de Tamri, coopérative d'argan, médina fortifiée, remparts et port, temps libre pour déjeuner.",
      },
    },
    serviceIds: ["essaouira", "private-transfers-tourist-transport"],
  },
  {
    id: "agadir",
    slug: { en: "agadir", fr: "agadir" },
    name: { en: "Agadir", fr: "Agadir" },
    intro: {
      en: "Our home base: the marina, the Oufella Kasbah, Souk El Had and the airport. Everything starts and finishes here.",
      fr: "Notre base : la marina, la Kasbah d'Oufella, le Souk El Had et l'aéroport. Tout commence et se termine ici.",
    },
    seo: {
      en: {
        title: "Things to Do in Agadir: Tours and Transfers",
        description:
          "Agadir city tours, boat cruises, quad and camel rides, plus private airport transfers, all with a licensed local agency and hotel pickup.",
      },
      fr: {
        title: "Que faire à Agadir : visites et transferts",
        description:
          "Visites d'Agadir, sorties en bateau, quad et dromadaire, et transferts privés depuis l'aéroport, avec une agence locale agréée.",
      },
    },
    serviceIds: ["agadir-city-tour", "airport-agadir", "boat-cruise", "crocoparc", "moroccan-evening"],
  },
];

export const placesById: Record<string, Place> = Object.fromEntries(
  places.map((place) => [place.id, place]),
);

export function getPlaceBySlug(slug: string): Place | undefined {
  return places.find((place) => place.slug.en === slug || place.slug.fr === slug);
}
