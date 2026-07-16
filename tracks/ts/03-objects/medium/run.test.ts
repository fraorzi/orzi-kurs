import { describe, it, expect } from "vitest";
import { totalUnits, withUnits, lowStock, type Stock } from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("Stock jest tylko do odczytu — zapis do klucza jest błędem", () => {
    const stock: Stock = { a: 1 };
    const illegal = (): void => {
      // @ts-expect-error Stock ma być Readonly<Record<string, number>>
      stock.a = 2;
    };
    expect(illegal).toBeTypeOf("function");
    expect(stock.a).toBe(1);
  });

  it("wartości są liczbami", () => {
    // @ts-expect-error wartością słownika ma być number
    const stock: Stock = { a: "dużo" };
    expect(stock.a).toBe("dużo");
  });
});

describe("totalUnits", () => {
  it("sumuje sztuki wszystkich pozycji", () => {
    expect(totalUnits({ "mug-01": 12, "kbd-02": 3 })).toBe(15);
  });

  it("pusty magazyn daje 0", () => {
    expect(totalUnits({})).toBe(0);
  });
});

describe("withUnits", () => {
  it("dodaje sztuki istniejącej pozycji", () => {
    expect(withUnits({ a: 2 }, "a", 3)).toEqual({ a: 5 });
  });

  it("nie mutuje oryginału", () => {
    const stock: Stock = { a: 2 };
    withUnits(stock, "a", 3);
    expect(
      stock,
      "Stock jest readonly — aktualizacja ma zwrócić nowy obiekt, nie zmienić wejście",
    ).toEqual({ a: 2 });
  });

  it("wyzerowanie pozycji usuwa klucz zamiast zostawiać 0", () => {
    expect(
      withUnits({ a: 2, b: 1 }, "a", -2),
      "zero sztuk to brak pozycji — klucz z wartością 0 zaśmieca słownik",
    ).toEqual({ b: 1 });
  });

  it("wartość ujemna też usuwa klucz", () => {
    expect(withUnits({ a: 2 }, "a", -5)).toEqual({});
  });

  it("nieznane sku z dodatnią deltą dodaje nową pozycję", () => {
    expect(withUnits({ a: 2 }, "b", 1)).toEqual({ a: 2, b: 1 });
  });

  it("nieznane sku z ujemną deltą nie tworzy pozycji", () => {
    expect(withUnits({}, "b", -1)).toEqual({});
  });
});

describe("lowStock", () => {
  it("zwraca klucze poniżej progu, posortowane alfabetycznie", () => {
    expect(lowStock({ b: 1, a: 5, c: 2 }, 3)).toEqual(["b", "c"]);
  });

  it("próg jest ostry — wartość równa progowi nie jest brakiem", () => {
    expect(
      lowStock({ a: 3 }, 3),
      "warunek to `< threshold`, nie `<=`",
    ).toEqual([]);
  });

  it("pusty magazyn daje pustą listę", () => {
    expect(lowStock({}, 10)).toEqual([]);
  });
});
