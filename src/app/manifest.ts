import type { MetadataRoute } from "next";

import { SITE_NAME, SITE_URL } from "../../config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Agadir tours, excursions and transfers`,
    short_name: SITE_NAME,
    description:
      "Book excursions, activities and private transfers in Agadir and the Souss-Massa region with a licensed local agency.",
    start_url: `${SITE_URL}/en`,
    display: "standalone",
    background_color: "#fbf7f2",
    theme_color: "#fbf7f2",
    icons: [{ src: "/icon", sizes: "any", type: "image/png" }],
  };
}
