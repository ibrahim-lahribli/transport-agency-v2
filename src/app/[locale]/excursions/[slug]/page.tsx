import { permanentRedirect } from "next/navigation";

export default async function CategoryServiceRedirect({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  permanentRedirect(`/${locale}/${slug}`);
}
