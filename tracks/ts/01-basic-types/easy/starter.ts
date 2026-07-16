// TODO: typ ma być literalny "PLN", nie string.
export const CURRENCY: string = "PLN";

export function formatPrice(amount: number, currency: string): string {
  // TODO: "12.50 PLN"
  return "";
}

// TODO: readonly tuple ["admin", "editor", "viewer"] (as const).
export const ROLES = ["admin", "editor", "viewer"];

// TODO: unia ról wyprowadzona z ROLES, nie przepisana ręcznie.
export type Role = string;
