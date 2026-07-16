import { lineTotal } from "./cart";
import type { CartLine, CartSummary } from "./types";

export function summarize(lines: CartLine[]): CartSummary {
  // TODO: zsumuj `lineTotal(line)` oraz `line.qty` i zwróć { total, items }.
  throw new Error("not implemented");
}

export { lineTotal };
export type { CartLine, CartSummary };
