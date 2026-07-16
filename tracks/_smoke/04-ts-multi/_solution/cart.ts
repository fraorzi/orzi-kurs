import type { CartLine } from "./types";

export function lineTotal(line: CartLine): number {
  return line.price * line.qty;
}
