import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  DEFAULT_CURRENCY,
  formatMoney,
  type Currency,
  type Money,
} from "./src/index";

describe("publiczne API", () => {
  it("wystawia wartości i typy przez index", () => {
    type _currency = Expect<Equal<Currency, "PLN" | "EUR" | "USD">>;
    const money: Money = { amount: 12.5, currency: DEFAULT_CURRENCY };
    expect(formatMoney(money)).toBe("12.50 PLN");
  });

  it("nie wystawia helpera minorUnits", async () => {
    const module = await import("./src/index");
    expect(module).not.toHaveProperty("minorUnits");
    expect(module).not.toHaveProperty("CURRENCIES");
  });

  it("re-eksportuje typy jawnie", () => {
    const source = readFileSync(new URL("./src/index.ts", import.meta.url), "utf8");
    expect(source).toMatch(/export\s+type\s*\{/);
  });
});
