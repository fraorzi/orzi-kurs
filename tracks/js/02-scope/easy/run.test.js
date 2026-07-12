import { describe, it, expect } from "vitest";
import { makeIndexFns, labelTemperature } from "./starter.js";

describe("makeIndexFns", () => {
  it("funkcja o indeksie i zwraca i, nie wartość końcową pętli", () => {
    const fns = makeIndexFns(3);
    expect(
      fns[0](),
      "wszystkie funkcje domykają JEDNĄ wspólną zmienną pętli — var ma zakres funkcyjny; let w nagłówku for tworzy zmienną per iterację",
    ).toBe(0);
    expect(fns[1]()).toBe(1);
    expect(fns[2]()).toBe(2);
  });

  it("zwraca dokładnie n funkcji", () => {
    expect(makeIndexFns(5)).toHaveLength(5);
    expect(makeIndexFns(0)).toHaveLength(0);
  });
});

describe("labelTemperature", () => {
  it("dla t > 30 zwraca 'upał'", () => {
    expect(
      labelTemperature(40),
      "deklaracja let w bloku if tworzy NOWĄ zmienną (shadowing) — zewnętrzny label nigdy nie jest nadpisywany; przypisz zamiast deklarować",
    ).toBe("upał");
  });

  it("dla t <= 30 zwraca 'w normie'", () => {
    expect(labelTemperature(20)).toBe("w normie");
    expect(labelTemperature(30)).toBe("w normie");
  });
});
