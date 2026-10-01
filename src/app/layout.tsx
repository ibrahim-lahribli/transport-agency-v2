import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Agadir Tours, Excursions & Transfers",
  description:
    "Mobile-first booking for Agadir boat trips, desert excursions and private transfers with a local Souss-Massa travel agency.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // viewport-fit=cover lets the layout reach under notches; the safe-area
  // padding in globals.css keeps content clear of them.
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#17130f" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:inset-bs-4 focus:z-50 focus:rounded-md focus:bg-accent focus:ps-4 focus:pe-4 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
