import { SortControls } from "./SortControls";
import type { Product } from "./types";

export function ProductGrid({ products }: { readonly products: readonly Product[] }) {
  const compareProducts = (left: Product, right: Product) =>
    left.name.localeCompare(right.name);

  return <SortControls products={products} compare={compareProducts} />;
}
