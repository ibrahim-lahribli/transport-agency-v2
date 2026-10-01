import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { LOCALES, isRtlLocale } from "@/i18n/locales";
import { inter } from "../fonts";
import "../globals.css";
import { TravelAgencyJsonLd } from "@/components/json-ld";
import { Header, Footer } from "@/components/navigation";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#17130f" },
  ],
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as any)) {
    notFound();
  }

  const dir = isRtlLocale(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={inter.variable}>
      <head>
        <TravelAgencyJsonLd />
      </head>
      <body className="flex flex-col min-h-screen bg-canvas text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:inset-bs-4 focus:z-50 focus:rounded-md focus:bg-accent focus:ps-4 focus:pe-4 focus:py-2 focus:text-on-accent"
        >
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        <Header locale={locale} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
