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
  return lines.map((line) => ({
    ...line,
    product:
      products.find((product) => product.id === line.productId) ?? null,
  }));
}
