import type { Service } from "@/schemas/service";
import { boatCruise } from "./boat-cruise.ts";
import { timlalinDunes } from "./timlalin-dunes.ts";
import { quadBuggyForest } from "./quad-buggy-forest.ts";
import { horseRidingSouss } from "./horse-riding-souss.ts";
import { crocoparc } from "./crocoparc.ts";
import { moroccanEvening } from "./moroccan-evening.ts";
import { paradiseValley } from "./paradise-valley.ts";
import { agadirCityTour } from "./agadir-city-tour.ts";
import { massaTiznit } from "./massa-tiznit.ts";
import { essaouira } from "./essaouira.ts";
import { taroudantTiout } from "./taroudant-tiout.ts";
import { marrakech } from "./marrakech.ts";
import { airportAgadir } from "./airport-agadir.ts";
import { airportTaghazout } from "./airport-taghazout.ts";
import { privateTransfersTouristTransport } from "./private-transfers-tourist-transport.ts";

export const services: Service[] = [
  boatCruise,
  timlalinDunes,
  quadBuggyForest,
  horseRidingSouss,
  crocoparc,
  moroccanEvening,
  paradiseValley,
  agadirCityTour,
  massaTiznit,
  essaouira,
  taroudantTiout,
  marrakech,
  airportAgadir,
  airportTaghazout,
  privateTransfersTouristTransport,
];

export const servicesById: Record<string, Service> = {
  "boat-cruise": boatCruise,
  "timlalin-dunes": timlalinDunes,
  "quad-buggy-forest": quadBuggyForest,
  "horse-riding-souss": horseRidingSouss,
  crocoparc: crocoparc,
  "moroccan-evening": moroccanEvening,
  "paradise-valley": paradiseValley,
  "agadir-city-tour": agadirCityTour,
  "massa-tiznit": massaTiznit,
  essaouira: essaouira,
  "taroudant-tiout": taroudantTiout,
  marrakech: marrakech,
  "airport-agadir": airportAgadir,
  "airport-taghazout": airportTaghazout,
  "private-transfers-tourist-transport": privateTransfersTouristTransport,
};

export {
  boatCruise,
  timlalinDunes,
  quadBuggyForest,
  horseRidingSouss,
  crocoparc,
  moroccanEvening,
  paradiseValley,
  agadirCityTour,
  massaTiznit,
  essaouira,
  taroudantTiout,
  marrakech,
  airportAgadir,
  airportTaghazout,
  privateTransfersTouristTransport,
};
