import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { weakBox } from "./starter.js";

const src = readFileSync(new URL("./starter.js", import.meta.url), "utf8");

describe("weakBox", () => {
  it("get() zwraca trzymany obiekt (tę samą referencję)", () => {
    const obj = { x: 1 };
    const box = weakBox(obj);
    expect(
      box.get(),
      "dopóki obiekt jest osiągalny, deref() ma zwrócić dokładnie ten obiekt",
    ).toBe(obj);
  });

  it("kolejne get() zwracają ten sam obiekt", () => {
    const obj = { tag: "a" };
    const box = weakBox(obj);
    expect(box.get()).toBe(box.get());
    expect(box.get()).toBe(obj);
  });

  it("używa WeakRef i deref (a nie zwykłego pola z wartością)", () => {
    expect(
      /WeakRef/.test(src) && /\.deref\s*\(/.test(src),
      "wartość ma być trzymana słabo — utwórz WeakRef i odczytuj przez deref()",
    ).toBe(true);
  });
});
