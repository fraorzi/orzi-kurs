import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { CURRENCY, formatPrice, ROLES, type Role } from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("CURRENCY ma typ literalny \"PLN\", nie string", () => {
    type _t = Expect<Equal<typeof CURRENCY, "PLN">>;
    expect(CURRENCY).toBe("PLN");
  });

  it("ROLES jest readonly tuple, nie string[]", () => {
    type _t = Expect<
      Equal<typeof ROLES, readonly ["admin", "editor", "viewer"]>
    >;
    expect(ROLES).toEqual(["admin", "editor", "viewer"]);
  });

  it("Role jest unią ról wyprowadzoną z ROLES", () => {
    type _t = Expect<Equal<Role, "admin" | "editor" | "viewer">>;
    const r: Role = "editor";
    expect(ROLES).toContain(r);
  });

  it("ROLES jest tylko do odczytu (nie da się nadpisać elementu)", () => {
    const illegal = (): void => {
      // @ts-expect-error zapis do readonly tuple musi być błędem typu
      ROLES[0] = "viewer";
    };
    expect(illegal).toBeTypeOf("function");
    expect(ROLES[0]).toBe("admin");
  });
});

describe("formatPrice", () => {
  it("formatuje kwotę z dwoma miejscami po przecinku i walutą", () => {
    expect(
      formatPrice(12.5, "PLN"),
      "oczekiwano dwóch miejsc po przecinku (toFixed(2)) i waluty po spacji",
    ).toBe("12.50 PLN");
  });

  it("zero formatuje jako 0.00", () => {
    expect(formatPrice(0, "EUR")).toBe("0.00 EUR");
  });

  it("zaokrągla trzecie miejsce po przecinku", () => {
    expect(
      formatPrice(3.456, "USD"),
      "toFixed(2) zaokrągla — 3.456 to 3.46, nie 3.45",
    ).toBe("3.46 USD");
  });
});
