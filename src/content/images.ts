/**
 * Image slot helper for service cards, heroes and galleries.
 *
 * Part of Sprint 2 of the design re-skin
 * (specs/2026-10-11-design-reskin-sprints.md): files live under
 * `public/images/` — the seven generic artwork slots from the v2 design
 * (hero, coast, beach, boats, city, cliffs, road) plus one slot per catalog
 * service under `public/images/services/<id>.jpg`.
 *
 * Unknown ids never point at a missing file: they fall back to a
 * category-appropriate artwork based on the hub context.
 */
export const ARTWORK_IMAGE_NAMES = [
  "hero",
  "coast",
  "beach",
  "boats",
  "city",
  "cliffs",
  "road",
] as const;

/** All 15 published service ids, used as per-service image slots. */
export const SERVICE_IMAGE_IDS = [
  "agadir-city-tour",
  "airport-agadir",
  "airport-taghazout",
  "boat-cruise",
  "crocoparc",
  "essaouira",
  "horse-riding-souss",
  "marrakech",
  "massa-tiznit",
  "moroccan-evening",
  "paradise-valley",
  "private-transfers-tourist-transport",
  "quad-buggy-forest",
  "taroudant-tiout",
  "timlalin-dunes",
] as const;

export type ServiceImageKind = "card" | "hero" | "gallery";

/**
 * Resolve the local image path for a known service id or `artwork:<name>`;
 * unknown ids fall back to a hub-context artwork (or a generic one when no
 * hub is given).
 */
export function getServiceImage(
  id: string,
  kind: ServiceImageKind,
  hub?: string,
): string {
  if (id.startsWith("artwork:")) {
    return `/images/${id.slice("artwork:".length)}.jpg`;
  }
  if (SERVICE_IMAGE_IDS.some((s) => s === id)) {
    return `/images/services/${id}.jpg`;
  }
  const artwork = fallbackArtwork(hub, kind === "hero");
  return `/images/${artwork}.jpg`;
}

function fallbackArtwork(hub?: string, hero?: boolean): string {
  switch (hub) {
    case "transfers":
    case "transfer":
      return "road";
    case "activities":
    case "activity":
      return "beach";
    case "excursions":
    case "excursion":
      return "coast";
    default:
      return hero ? "hero" : "coast";
  }
}
