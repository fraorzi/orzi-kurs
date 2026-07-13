import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { createWeakCache } from "./starter.js";

const src = readFileSync(new URL("./starter.js", import.meta.url), "utf8");

describe("createWeakCache", () => {
  it("pierwsze get() liczy wartość", () => {
    let calls = 0;
    const cache = createWeakCache(() => {
      calls++;
      return { data: 42 };
    });
    expect(cache.get()).toEqual({ data: 42 });
    expect(calls, "pierwsze get ma wywołać compute").toBe(1);
  });

  it("kolejne get() zwracają wynik z cache bez ponownego liczenia", () => {
    let calls = 0;
    const cache = createWeakCache(() => {
      calls++;
      return { data: calls };
    });
    const a = cache.get(); // trzymamy mocno → deref na pewno zwróci a
    const b = cache.get();
    const c = cache.get();
    expect(b, "przy osiągalnym wyniku get ma zwracać tę samą referencję").toBe(a);
    expect(c).toBe(a);
    expect(
      calls,
      "wynik jest wciąż trzymany (a), więc deref() go zwraca — compute ma być wołane tylko raz",
    ).toBe(1);
  });

  it("trzyma wynik słabo (WeakRef + deref), nie w zwykłym polu", () => {
    expect(
      /WeakRef/.test(src) && /\.deref\s*\(/.test(src),
      "cache ma używać WeakRef i deref, żeby wynik mógł zostać zebrany pod presją pamięci",
    ).toBe(true);
  });
});
