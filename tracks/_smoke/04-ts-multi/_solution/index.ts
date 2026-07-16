import { lineTotal } from "./cart";
import type { CartLine, CartSummary } from "./types";

export function summarize(lines: CartLine[]): CartSummary {
  return lines.reduce<CartSummary>(
    (acc, line) => ({
      total: acc.total + lineTotal(line),
      items: acc.items + line.qty,
    }),
    { total: 0, items: 0 },
  );
}

export { lineTotal };
export type { CartLine, CartSummary };
