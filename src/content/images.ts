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
  // Sprint-4 review D5: gallery support shots (`<id>-b` / `<id>-c`) must not
  // all collapse into one identical fallback photo — distribute the category
  // artwork across the suffixes deterministically.
  const supportSlot = /^.*-([bc])$/.exec(id)?.[1];
  if (supportSlot === "b" || supportSlot === "c") {
    const artwork = fallbackArtwork(hub, kind === "hero", supportSlot);
    return `/images/${artwork}.jpg`;
  }
  const artwork = fallbackArtwork(hub, kind === "hero");
  return `/images/${artwork}.jpg`;
}

function fallbackArtwork(hub?: string, hero?: boolean, slot?: "b" | "c"): string {
  // Slot rotation for gallery support shots: two distinct supporting images
  // per category, leaving the primary artwork (the no-slot fallback) aside.
  if (slot) {
    switch (hub) {
      case "transfers":
      case "transfer":
        return slot === "b" ? "city" : "coast";
      case "activities":
      case "activity":
        return slot === "b" ? "boats" : "cliffs";
      default:
        return slot === "b" ? "beach" : "boats";
    }
  }
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
