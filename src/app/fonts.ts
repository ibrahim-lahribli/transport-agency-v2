import localFont from "next/font/local";

/**
 * Single self-hosted variable font for the whole site.
 *
 * Inter is licensed under the SIL Open Font License 1.1 (see ./fonts/OFL.txt).
 * It is loaded with next/font/local so the .woff2 is served from our own
 * origin, inlined into the CSS with font-display: swap (no flash of invisible
 * text on the throttled mobile 4G profile we test against).
 */
export const inter = localFont({
  src: [
    {
      path: "./fonts/InterVariable.woff2",
      style: "normal",
      weight: "100 900",
    },
  ],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});
