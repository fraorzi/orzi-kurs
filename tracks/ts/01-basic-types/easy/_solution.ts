export const CURRENCY = "PLN";

export function formatPrice(amount: number, currency: string): string {
  return `${amount.toFixed(2)} ${currency}`;
}

export const ROLES = ["admin", "editor", "viewer"] as const;

export type Role = (typeof ROLES)[number];
