import type { Money } from "./types";

export function minorUnits(money: Money): number {
  return Math.round(money.amount * 100);
}

export function formatMoney(money: Money): string {
  return `${money.amount.toFixed(2)} ${money.currency}`;
}
