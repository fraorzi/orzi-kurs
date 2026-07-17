import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { formatMoney, summarizeOrder } from "./src/index.js";

describe("moduł zamówień", () => {
  it("formatuje kwotę przez polski Intl.NumberFormat", () => {
    expect(formatMoney(12.5)).toBe(
      new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(12.5),
    );
  });

  it("obsługuje walutę przekazaną przez konsumenta", () => {
    expect(formatMoney(10, "EUR")).toBe(
      new Intl.NumberFormat("pl-PL", { style: "currency", currency: "EUR" }).format(10),
    );
  });

  it("buduje podsumowanie przez zależność z drugiego modułu", () => {
    const formatted = new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
    }).format(12.5);
    expect(summarizeOrder({ id: "A-17", total: 12.5 }))
      .toBe(`Zamówienie A-17: ${formatted}`);
  });

  it("używa jawnych importów i eksportów ESM", () => {
    const orderSource = readFileSync(new URL("./src/order.js", import.meta.url), "utf8");
    const indexSource = readFileSync(new URL("./src/index.js", import.meta.url), "utf8");
    expect(orderSource, "order.js ma jawnie importować kontrakt money.js")
      .toMatch(/import\s*\{\s*formatMoney\s*\}\s*from\s*["']\.\/money\.js["']/);
    expect(indexSource, "index.js ma definiować publiczną granicę przez re-eksport")
      .toMatch(/export\s*\{\s*formatMoney\s*\}\s*from/);
  });
});
