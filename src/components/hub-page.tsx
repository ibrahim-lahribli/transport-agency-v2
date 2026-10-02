import { getTranslations } from "next-intl/server";

import { getServicesByCategory, hubToCategory, type HubKey } from "@/catalogue";
import { ServiceCard } from "./service-card";

export async function HubPage({ hub, locale }: { hub: HubKey; locale: string }) {
  const t = await getTranslations({ locale, namespace: "hubs" });
  const category = hubToCategory(hub);
  const services = category ? getServicesByCategory(category, locale) : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <p className="text-sm font-bold uppercase tracking-wide text-accent-strong">
        {t(`${hub}.badge`)}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {t(`${hub}.title`)}
      </h1>
      <p className="mt-4 max-w-3xl text-base text-ink-muted leading-relaxed">{t(`${hub}.intro`)}</p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} locale={locale} />
        ))}
      </div>
    </div>
  );
}
