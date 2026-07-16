export const featuredProducts = [
  { locale: "pl", slug: "monitor" },
  { locale: "en", slug: "keyboard" },
] as const;

export async function readProduct(locale: "pl" | "en", slug: string) {
  const exists = featuredProducts.some(
    (product) => product.locale === locale && product.slug === slug,
  );
  return exists ? { name: `${locale}:${slug}` } : null;
}
