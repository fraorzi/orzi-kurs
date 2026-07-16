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
  await params;
  void readProduct;
  return { title: "Sklep" };
}
