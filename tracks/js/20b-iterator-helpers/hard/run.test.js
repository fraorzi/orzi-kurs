import { describe, it, expect } from "vitest";
import { firstTransformed } from "./starter.js";

describe("firstTransformed — poprawność", () => {
  it("zwraca pierwsze k przekształconych elementów przechodzących keep", () => {
    expect(
      firstTransformed([0, 1, 2, 3, 4, 5], (x) => x * 2, (v) => v % 4 === 0, 2),
    ).toEqual([0, 4]);
  });

  it("gdy pasujących jest mniej niż k, zwraca tyle, ile jest", () => {
    expect(firstTransformed([1, 3, 5], (x) => x, (v) => v % 2 === 0, 3)).toEqual([]);
  });
});

describe("firstTransformed — ilość pracy", () => {
  it("woła transform tylko do zebrania k wyników, nie na całym wejściu", () => {
    let calls = 0;
    const transform = (x) => {
      calls += 1;
      return x;
    };
    const items = Array.from({ length: 5000 }, (_, i) => i);

    const out = firstTransformed(items, transform, (v) => v % 2 === 0, 3);
    expect(out, "wynik ma się zgadzać — pierwsze 3 parzyste to 0, 2, 4").toEqual([0, 2, 4]);
    expect(
      calls,
      "leniwy pipeline zatrzymuje się po 3. trafieniu (transform ~5 razy) — wersja z map()+filter() woła transform 5000 razy",
    ).toBeLessThan(50);
  });
});
