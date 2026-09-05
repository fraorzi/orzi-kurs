import {
  featuredProducts,
  readProduct,
} from "./product-data";

const SUPPORTED_LOCALES = ["pl", "en"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export async function generateStaticParams() {
  return featuredProducts.map(({ locale, slug }) => ({
    lang: locale,
    slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await readProduct(locale as Locale, slug);
  if (!product) return <p>Brak produktu</p>;
  return (
    <article lang={locale}>
      <h1>{product.name}</h1>
    </article>
  );
}
