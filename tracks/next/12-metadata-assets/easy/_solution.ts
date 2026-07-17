import type { Metadata } from "next";

export interface ProductMeta {
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
}

export async function buildProductMetadata(
  params: Promise<{ readonly slug: string }>,
  readProduct: (slug: string) => Promise<ProductMeta | null>,
): Promise<Metadata> {
  const { slug } = await params;
  const product = await readProduct(slug);
  if (!product) {
    return {
      title: "Produkt niedostępny",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: product.title,
    description: product.description,
    alternates: { canonical: `/products/${encodeURIComponent(slug)}` },
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}
