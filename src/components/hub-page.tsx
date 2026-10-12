import { getTranslations } from "next-intl/server";

import { getServicesByCategory, hubToCategory, type HubKey } from "@/catalogue";
import { PageIntro } from "./ui";
import { ServiceCard } from "./service-card";

export async function HubPage({ hub, locale }: { hub: HubKey; locale: string }) {
  const t = await getTranslations({ locale, namespace: "hubs" });
  const category = hubToCategory(hub);
  const services = category ? getServicesByCategory(category, locale) : [];

  return (
    <>
      <PageIntro eyebrow={t(`${hub}.badge`)} title={t(`${hub}.title`)} body={t(`${hub}.intro`)} />

      <section className="py-10 md:py-14" aria-label={t(`${hub}.title`)}>
        <div className="shell">
          {/* Count line: real number, real unit noun — the design's listing
              tools minus the placeholder disclaimer. No filter chips: they are
              omitted rather than rendered as fake affordances (sprint rules). */}
          <p className="mb-8 text-sm text-ink-muted">
            <strong className="font-semibold text-ink">{services.length}</strong>{" "}
            {t(`${hub}.countNoun`)}
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-y-10 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
