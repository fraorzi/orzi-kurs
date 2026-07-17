export type Product = Readonly<{
  id: string;
  name: string;
  price: number;
}>;

export type OrderLine = Readonly<{
  productId: string;
  quantity: number;
}>;

export type EnrichedLine = Readonly<
  OrderLine & {
    product: Product | null;
  }
>;

export function enrichOrderLines(
  lines: readonly OrderLine[],
  products: readonly Product[],
): EnrichedLine[] {
  const productsById = new Map(
    products.map((product) => [product.id, product]),
  );
  return lines.map((line) => ({
    ...line,
    product: productsById.get(line.productId) ?? null,
  }));
}
