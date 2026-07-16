import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  label,
  finalPrice,
  type Product,
  type DiscountedProduct,
} from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("Product ma id, name, price i opcjonalne tags", () => {
    type _t = Expect<
      Equal<
        Product,
        { id: number; name: string; price: number; tags?: string[] }
      >
    >;
    const p: Product = { id: 1, name: "Kubek", price: 29.9 };
    expect(p.tags).toBeUndefined();
  });

  it("DiscountedProduct rozszerza Product o discount", () => {
    const d: DiscountedProduct = {
      id: 1,
      name: "Kubek",
      price: 100,
      discount: 0.25,
    };
    const asProduct: Product = d;
    expect(asProduct.name).toBe("Kubek");
    expect(d.discount).toBe(0.25);
  });

  it("nadmiarowe pole w literale jest błędem (excess property check)", () => {
    // @ts-expect-error 'color' nie istnieje w typie Product
    const p: Product = { id: 1, name: "Kubek", price: 1, color: "red" };
    expect(p.id).toBe(1);
  });

  it("brak wymaganego pola jest błędem", () => {
    // @ts-expect-error brakuje price
    const p: Product = { id: 1, name: "Kubek" };
    expect(p.name).toBe("Kubek");
  });
});

describe("label", () => {
  it("skleja nazwę i cenę z dwoma miejscami po przecinku", () => {
    expect(label({ id: 1, name: "Kubek", price: 29.9 })).toBe(
      "Kubek — 29.90 zł",
    );
  });

  it("dopisuje tagi w nawiasie kwadratowym", () => {
    expect(
      label({ id: 1, name: "Kubek", price: 29.9, tags: ["kuchnia", "x"] }),
    ).toBe("Kubek — 29.90 zł [kuchnia, x]");
  });

  it("pusta tablica tagów nie dodaje nawiasu", () => {
    expect(
      label({ id: 1, name: "Kubek", price: 29.9, tags: [] }),
      "pole opcjonalne bywa obecne, ale puste — sprawdzaj długość, nie samą obecność",
    ).toBe("Kubek — 29.90 zł");
  });
});

describe("finalPrice", () => {
  it("odejmuje rabat od ceny", () => {
    expect(
      finalPrice({ id: 1, name: "Kubek", price: 100, discount: 0.25 }),
    ).toBe(75);
  });

  it("zaokrągla wynik do dwóch miejsc po przecinku", () => {
    expect(
      finalPrice({ id: 2, name: "Mysz", price: 79.99, discount: 0.1 }),
      "79.99 * 0.9 = 71.991 — po zaokrągleniu 71.99",
    ).toBe(71.99);
  });

  it("zerowy rabat zostawia cenę bez zmian", () => {
    expect(finalPrice({ id: 3, name: "Kabel", price: 12.5, discount: 0 })).toBe(
      12.5,
    );
  });
});
