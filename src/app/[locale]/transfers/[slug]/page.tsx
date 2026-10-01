import { permanentRedirect } from "next/navigation";

export default async function TransferServiceRedirect({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  permanentRedirect(`/${locale}/${slug}`);
}
