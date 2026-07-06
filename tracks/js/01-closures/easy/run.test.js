import { describe, it, expect } from "vitest";
import { makeCounter, sum } from "./starter.js";

describe("makeCounter", () => {
  it("pierwsze wywołanie licznika zwraca 0, kolejne rosną o 1", () => {
    const counter = makeCounter();
    expect(counter(), "pierwsze wywołanie ma zwrócić 0").toBe(0);
    expect(counter(), "drugie wywołanie ma zwrócić 1").toBe(1);
    expect(counter(), "trzecie wywołanie ma zwrócić 2").toBe(2);
  });

  it("każdy licznik ma własny, niezależny stan", () => {
    const a = makeCounter();
    const b = makeCounter();
    a();
    a();
    expect(
      b(),
      "licznik b współdzieli stan z licznikiem a — każde wywołanie makeCounter musi tworzyć nowe domknięcie z własnym count",
    ).toBe(0);
  });
});

describe("sum", () => {
  it("sum(a)(b) zwraca a + b", () => {
    expect(sum(1)(2)).toBe(3);
    expect(sum(5)(-1)).toBe(4);
  });

  it("funkcja zwrócona przez sum(a) pamięta a i działa wielokrotnie", () => {
    const add10 = sum(10);
    expect(add10(5), "zwrócona funkcja ma pamiętać a=10 z domknięcia").toBe(15);
    expect(add10(1), "to samo domknięcie ma działać przy kolejnych wywołaniach").toBe(11);
  });
});
