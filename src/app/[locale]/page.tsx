import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { getServicesByCategory } from "@/catalogue";
import { getServiceImage } from "@/content/images";
import { isAppLocale } from "@/i18n/locales";
import { buildPageMetadata } from "@/seo/metadata";
import { getServiceDisplayPrice } from "@/seo/price";
import { Accordion, ArrowLink, ButtonLink, buttonClass, Eyebrow, SectionHeading } from "@/components/ui";
import { MoodCarousel, type MoodItem } from "@/components/mood-carousel";
import { ServiceCard } from "@/components/service-card";
import { getContact } from "../../../config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "home" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale,
    pathname: `/${locale}`,
    enPath: "/en",
    frPath: "/fr",
  });
}

interface FaqItem {
  q: string;
  a: string;
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tProduct = await getTranslations({ locale, namespace: "product" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tHubs = await getTranslations({ locale, namespace: "hubs" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const whatsappHref = `https://wa.me/${getContact().whatsappDigits}`;

  // The three category sections keep their pre-skin data flow; only the markup
  // wears the v2 design now.
  const sections = [
    {
      key: "excursions",
      category: "excursion" as const,
      href: "/excursions" as const,
      title: t("excursionsTitle"),
      subtitle: t("excursionsSubtitle"),
    },
    {
      key: "activities",
      category: "activity" as const,
      href: "/activities" as const,
      title: t("activitiesTitle"),
      subtitle: t("activitiesSubtitle"),
    },
    {
      key: "transfers",
      category: "transfer" as const,
      href: "/transfers" as const,
      title: t("transfersTitle"),
      subtitle: t("transfersSubtitle"),
    },
  ];

  // Trust strip: four short facts. Cancellation wording is hour-count-free
  // here (never a blanket "24h"); the type-correct windows live on service
  // pages and in the FAQ, pinned by messages.test.ts.
  const trustFacts = [
    t("trust1Title"),
    tProduct("noPaymentNow"),
    tCommon("factsCancellation"),
    t("trust3Title"),
  ];

  const moods: MoodItem[] = [
    { title: t("mood1Title"), href: "/excursions", image: getServiceImage("artwork:cliffs", "card") },
    { title: t("mood2Title"), href: "/activities", image: getServiceImage("artwork:coast", "card") },
    { title: t("mood3Title"), href: "/places", image: getServiceImage("artwork:city", "card") },
    { title: t("mood4Title"), href: "/excursions", image: getServiceImage("artwork:road", "card") },
    { title: t("mood5Title"), href: "/activities", image: getServiceImage("artwork:boats", "card") },
  ];

  const steps = [
    { number: "01", title: t("planStep1Title"), body: t("planStep1Body") },
    { number: "02", title: t("planStep2Title"), body: t("planStep2Body") },
    { number: "03", title: t("planStep3Title"), body: t("planStep3Body") },
  ];

  const faqItems = tFaq.raw("items") as FaqItem[];

  return (
    <div>
      {/* Full-bleed hero: artwork + directional overlay + display H1 + buttons. */}
      <section className="relative isolate overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- local artwork slot, no optimizer needed */}
        <img
          src={getServiceImage("artwork:hero", "hero")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30 rtl:bg-gradient-to-l"
        />
        <div className="shell relative flex min-h-[34rem] flex-col justify-center py-20 md:min-h-[42rem] md:py-28">
          <Eyebrow tone="light">{t("kicker")}</Eyebrow>
          <h1 className="max-w-[20ch] text-display text-canvas">{t("title")}</h1>
          <p className="mt-6 max-w-[38rem] text-lg text-canvas/85">{t("subtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/excursions" variant="light">
              {t("browseExcursions")}
            </ButtonLink>
            <a
              href={whatsappHref}
              className={buttonClass("ghost-light")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tProduct("whatsappAsk")}
            </a>
          </div>
        </div>
      </section>

      <div className="border-b border-line bg-surface">
        <ul className="shell flex flex-wrap items-center gap-x-3 gap-y-2 py-4 text-sm font-medium text-ink">
          {trustFacts.map((fact, index) => (
            <li key={fact} className="flex items-center gap-3">
              {index > 0 ? (
                <span aria-hidden="true" className="text-ink-muted">
                  ·
                </span>
              ) : null}
              {fact}
            </li>
          ))}
        </ul>
      </div>

      {/* Choose a mood: photo carousel on mobile, 5-up grid from lg. */}
      <section className="shell py-14 md:py-20">
        <SectionHeading eyebrow={t("moodsEyebrow")} title={t("moodsTitle")} />
        <MoodCarousel
          items={moods}
          exploreLabel={tCommon("view")}
          dotsLabel={t("moodDotsAria")}
        />
      </section>

      {/* The three category sections, fed by the catalogue as before. */}
      <div className="bg-surface-muted">
        {sections.map((section) => {
          const services = getServicesByCategory(section.category, locale);
          return (
            <section key={section.key} className="shell py-14 md:py-16">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-[44rem]">
                  <h2 className="mb-2 text-2xl">{section.title}</h2>
                  <p className="text-lg text-ink-muted">{section.subtitle}</p>
                </div>
                <ArrowLink href={section.href}>{tCommon("viewAll")}</ArrowLink>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-y-10 lg:grid-cols-3">
                {services.slice(0, 3).map((service) => (
                  <ServiceCard key={service.id} service={service} locale={locale} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Transfer feature band: real transfer services, prices from the helper. */}
      <section className="shell grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <div>
          <Eyebrow>{t("privateTransfers")}</Eyebrow>
          <h2 className="mb-4 text-2xl">{tHubs("transfers.title")}</h2>
          <p className="max-w-[34rem] text-lg text-ink-muted">{tHubs("transfers.intro")}</p>
          <div className="mt-6">
            <ButtonLink href="/book">{tProduct("requestBooking")}</ButtonLink>
          </div>
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {getServicesByCategory("transfer", locale).map((service) => {
            const price = getServiceDisplayPrice(service);
            return (
              <li
                key={service.id}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4"
              >
                <span className="font-medium text-ink">{service.title}</span>
                <strong className="text-ink">
                  {tCommon("from")} {price.amount} €{" "}
                  <small className="font-normal text-ink-muted">
                    / {price.unitLabel[locale as "en" | "fr"]}
                  </small>
                </strong>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Plan now. Pay later.: the dark 01/02/03 band. */}
      <section className="bg-ink text-canvas">
        <div className="shell py-14 md:py-20">
          <Eyebrow tone="light">{t("planEyebrow")}</Eyebrow>
          <h2 className="mb-12 max-w-[30ch] text-2xl text-canvas">{t("planTitle")}</h2>
          <ol className="grid gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.number}>
                <span aria-hidden="true" className="block font-serif text-xl text-canvas/60">
                  {step.number}
                </span>
                <h3 className="mt-3 mb-2 text-xl text-canvas">{step.title}</h3>
                <p className="max-w-[28rem] text-canvas/75">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team feature band: portrait placeholder artwork, no invented names. */}
      <section className="shell grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <div className="overflow-hidden rounded-md">
          {/* eslint-disable-next-line @next/next/no-img-element -- local artwork slot, no optimizer needed */}
          <img
            src={getServiceImage("artwork:beach", "card")}
            alt=""
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        <div>
          <Eyebrow>{t("teamEyebrow")}</Eyebrow>
          <h2 className="mb-4 text-2xl">{t("teamTitle")}</h2>
          <p className="max-w-[34rem] text-lg text-ink-muted">{t("teamBody")}</p>
          <div className="mt-4">
            <ArrowLink href="/about">{tNav("about")}</ArrowLink>
          </div>
        </div>
      </section>

      {/* FAQ preview: existing pinned FAQ copy, three questions. */}
      <section className="bg-surface-muted">
        <div className="shell grid gap-10 py-14 md:grid-cols-[1fr_1.2fr] md:py-20">
          <div>
            <Eyebrow>{tProduct("goodToKnow")}</Eyebrow>
            <h2 className="mb-4 text-2xl">{tFaq("title")}</h2>
            <ArrowLink href="/faq">{tCommon("viewAll")}</ArrowLink>
          </div>
          <Accordion
            items={faqItems.slice(0, 3).map((item) => ({ title: item.q, body: item.a }))}
            openFirst
          />
        </div>
      </section>

      {/* Terracotta closing CTA. */}
      <section className="bg-accent text-on-accent">
        <div className="shell flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center md:py-16">
          <div>
            <Eyebrow tone="light">{t("ctaEyebrow")}</Eyebrow>
            <h2 className="max-w-[24ch] text-2xl text-on-accent">{t("ctaTitle")}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/book" variant="light">
              {tNav("bookCta")}
            </ButtonLink>
            <a
              href={whatsappHref}
              className={buttonClass("ghost-light")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tProduct("whatsappAsk")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
