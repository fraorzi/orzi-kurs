import { SortControls } from "./SortControls";
import type { Product } from "./types";

export function ProductGrid({
  products,
}: {
  products: readonly Product[];
}) {
  return <SortControls products={products} />;
}
