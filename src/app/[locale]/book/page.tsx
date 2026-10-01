import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LOCALES } from "@/i18n/locales";
import { getServices } from "@/seo/content";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { businessProfile } from "../../../../config/business";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";

  return buildPageMetadata({
    title: isFr
      ? "Réserver une excursion ou un transfert | Agadir Tourisme"
      : "Book a Tour or Private Transfer | Agadir Tourisme",
    description: isFr
      ? "Demande de réservation directe auprès de notre agence locale à Agadir. Confirmation rapide et assistance 7j/7."
      : "Direct booking request with our local Agadir travel agency. Fast confirmation and 7/7 assistance.",
    locale,
    pathname: `/${locale}/book`,
    enPath: "/en/book",
    frPath: "/fr/book",
    noindex: true,
  });
}

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale } = await params;
  const { service: preselectedServiceId } = await searchParams;
  const isFr = locale === "fr";
  const services = getServices(locale);

  const breadcrumbs = [
    {
      name: isFr ? "Accueil" : "Home",
      url: `${SITE_URL}/${locale}`,
    },
    {
      name: isFr ? "Réservation" : "Book",
      url: `${SITE_URL}/${locale}/book`,
    },
  ];

  return (
    <div className="mx-auto max-w-2xl ps-4 pe-4 py-10 sm:py-16">
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* Breadcrumb nav */}
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-muted">
        <ol className="flex items-center gap-2">
          <li>
            <Link href={`/${locale}`} className="hover:text-ink">
              {isFr ? "Accueil" : "Home"}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-ink" aria-current="page">
            {isFr ? "Réservation" : "Booking"}
          </li>
        </ol>
      </nav>

      <header className="mb-8 text-start">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {isFr ? "Réserver votre expérience ou transfert" : "Book Your Tour or Transfer"}
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          {isFr
            ? "Envoyez votre demande sans paiement immédiat. Notre équipe locale vérifie les disponibilités et vous confirme la réservation sous 30 minutes."
            : "Submit your request without advance payment. Our local team verifies availability and confirms your reservation within 30 minutes."}
        </p>
      </header>

      {/* WhatsApp Quick Link */}
      <div className="rounded-lg border border-line bg-surface-muted/60 p-4 mb-8 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-ink">
            {isFr ? "Besoin d'une réponse immédiate ?" : "Need immediate assistance?"}
          </p>
          <p className="text-ink-muted">
            {isFr
              ? "Contactez directement notre régulateur d'astreinte sur WhatsApp."
              : "Message our local operations team directly on WhatsApp."}
          </p>
        </div>
        <a
          href={`https://wa.me/${businessProfile.whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-accent ps-3.5 pe-3.5 py-1.5 font-semibold text-on-accent hover:bg-accent-strong transition-colors shrink-0"
        >
          WhatsApp: {businessProfile.whatsapp}
        </a>
      </div>

      {/* Booking Form */}
      <form className="space-y-5 rounded-xl border border-line bg-surface p-6 shadow-xs text-start">
        <div>
          <label htmlFor="service" className="block text-xs font-semibold text-ink mb-1.5">
            {isFr ? "Sélectionnez votre service" : "Selected Experience or Transfer"}
          </label>
          <select
            id="service"
            name="service"
            defaultValue={preselectedServiceId || ""}
            className="w-full rounded-md border border-line bg-canvas p-2.5 text-sm text-ink focus:border-accent focus:outline-hidden"
          >
            <option value="">
              {isFr ? "-- Choisir une excursion ou un transfert --" : "-- Select a service --"}
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold text-ink mb-1.5">
              {isFr ? "Nom et prénom" : "Full name"}
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              placeholder={isFr ? "Jean Dupont" : "John Doe"}
              className="w-full rounded-md border border-line bg-canvas p-2.5 text-sm text-ink focus:border-accent focus:outline-hidden"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-ink mb-1.5">
              {isFr ? "Adresse email" : "Email address"}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="example@mail.com"
              className="w-full rounded-md border border-line bg-canvas p-2.5 text-sm text-ink focus:border-accent focus:outline-hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-ink mb-1.5">
              {isFr ? "Numéro WhatsApp / Téléphone" : "Phone or WhatsApp"}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="+212 600 000 000"
              className="w-full rounded-md border border-line bg-canvas p-2.5 text-sm text-ink focus:border-accent focus:outline-hidden"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-xs font-semibold text-ink mb-1.5">
              {isFr ? "Date souhaitée" : "Preferred date"}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="w-full rounded-md border border-line bg-canvas p-2.5 text-sm text-ink focus:border-accent focus:outline-hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="adults" className="block text-xs font-semibold text-ink mb-1.5">
              {isFr ? "Adultes (12 ans +)" : "Adults (12+ yrs)"}
            </label>
            <input
              type="number"
              id="adults"
              name="adults"
              min="1"
              defaultValue="2"
              required
              className="w-full rounded-md border border-line bg-canvas p-2.5 text-sm text-ink focus:border-accent focus:outline-hidden"
            />
          </div>

          <div>
            <label htmlFor="children" className="block text-xs font-semibold text-ink mb-1.5">
              {isFr ? "Enfants (moins de 12 ans)" : "Children (<12 yrs)"}
            </label>
            <input
              type="number"
              id="children"
              name="children"
              min="0"
              defaultValue="0"
              className="w-full rounded-md border border-line bg-canvas p-2.5 text-sm text-ink focus:border-accent focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label htmlFor="hotel" className="block text-xs font-semibold text-ink mb-1.5">
            {isFr ? "Hôtel ou lieu de prise en charge à Agadir" : "Hotel or Pickup Address in Agadir"}
          </label>
          <input
            type="text"
            id="hotel"
            name="hotel"
            placeholder={isFr ? "Nom de votre hôtel ou résidence" : "e.g. Hotel Riu Palace Tikida Agadir"}
            className="w-full rounded-md border border-line bg-canvas p-2.5 text-sm text-ink focus:border-accent focus:outline-hidden"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-xs font-semibold text-ink mb-1.5">
            {isFr ? "Remarques ou demandes particulières" : "Notes or Special Requests"}
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder={isFr ? "Siège bébé, surfs, horaires de vol..." : "Baby seat, surfboards, flight number..."}
            className="w-full rounded-md border border-line bg-canvas p-2.5 text-sm text-ink focus:border-accent focus:outline-hidden"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-accent py-3 text-sm font-bold text-on-accent hover:bg-accent-strong transition-colors cursor-pointer"
        >
          {isFr ? "Envoyer ma demande de réservation" : "Submit Booking Inquiry"}
        </button>

        <p className="text-center text-xs text-ink-muted mt-2">
          {isFr
            ? "Paiement le jour de l'excursion en espèces (EUR ou MAD). Annulation gratuite."
            : "Pay on the day of the excursion in cash (EUR or MAD). Free cancellation."}
        </p>
      </form>
    </div>
  );
}
