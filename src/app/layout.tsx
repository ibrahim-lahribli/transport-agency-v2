import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agadir Tours, Excursions & Transfers",
  description:
    "Mobile-first booking for Agadir boat trips, desert excursions and private transfers with a local Souss-Massa travel agency.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
