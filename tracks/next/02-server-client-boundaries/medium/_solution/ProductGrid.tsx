import { SortControls } from "./SortControls";
import type { Product } from "./types";

export function ProductGrid({ products }: { readonly products: readonly Product[] }) {
  return <SortControls products={products} />;
}
