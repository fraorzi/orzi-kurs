import { notFound } from "next/navigation";
import { featuredProducts, readProduct } from "./product-data";

const SUPPORTED_LOCALES = ["pl", "en"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.some((locale) => locale === value);
}

export async function generateStaticParams() {
  return featuredProducts.map(({ locale, slug }) => ({ locale, slug }));
}

export default async function Page({
  params,
}: {
  readonly params: Promise<{ readonly locale: string; readonly slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const product = await readProduct(locale, slug);
  if (!product) notFound();
  return <article lang={locale}><h1>{product.name}</h1></article>;
}
