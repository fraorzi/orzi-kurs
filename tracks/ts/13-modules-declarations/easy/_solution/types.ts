export const CURRENCIES = ["PLN", "EUR", "USD"] as const;
export type Currency = (typeof CURRENCIES)[number];

export type Money = {
  amount: number;
  currency: Currency;
};

export const DEFAULT_CURRENCY: Currency = "PLN";
