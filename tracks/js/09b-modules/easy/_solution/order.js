import { formatMoney } from "./money.js";

export function summarizeOrder({ id, total, currency = "PLN" }) {
  return `Zamówienie ${id}: ${formatMoney(total, currency)}`;
}
