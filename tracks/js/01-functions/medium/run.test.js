import { describe, it, expect } from "vitest";
import { sumAll, applyEach, compose2 } from "./starter.js";

describe("sumAll", () => {
  it("sumuje dowolną liczbę argumentów", () => {
    expect(sumAll(1, 2, 3)).toBe(6);
    expect(sumAll(5)).toBe(5);
    expect(sumAll(1, 2, 3, 4, 5, 6)).toBe(21);
  });

  it("bez argumentów zwraca 0", () => {
    expect(sumAll(), "brak argumentów = pusta tablica rest = suma 0, nie undefined").toBe(0);
  });
});

describe("applyEach", () => {
  it("zwraca tablicę wyników wywołania każdej funkcji na x", () => {
    const inc = (n) => n + 1;
    const double = (n) => n * 2;
    const square = (n) => n * n;
    expect(applyEach([inc, double, square], 3)).toEqual([4, 6, 9]);
  });

  it("zachowuje kolejność funkcji i nie modyfikuje tablicy wejściowej", () => {
    const fns = [(n) => n, (n) => -n];
    expect(applyEach(fns, 7)).toEqual([7, -7]);
    expect(fns, "tablica funkcji ma zostać nietknięta — zbuduj nową tablicę wyników").toHaveLength(2);
  });

  it("dla pustej tablicy zwraca pustą tablicę", () => {
    expect(applyEach([], 1)).toEqual([]);
  });
});

describe("compose2", () => {
  it("compose2(f, g)(x) wywołuje NAJPIERW g, potem f", () => {
    const inc = (n) => n + 1;
    const double = (n) => n * 2;
    expect(
      compose2(inc, double)(5),
      "kolejność to f(g(x)): najpierw double(5) = 10, potem inc(10) = 11 — nie odwrotnie",
    ).toBe(11);
    expect(compose2(double, inc)(5), "odwrotna kolejność argumentów: inc(5) = 6, potem double(6) = 12").toBe(12);
  });

  it("zwraca funkcję wielokrotnego użytku", () => {
    const upper = (s) => s.toUpperCase();
    const exclaim = (s) => `${s}!`;
    const shout = compose2(exclaim, upper);
    expect(shout("hej")).toBe("HEJ!");
    expect(shout("no"), "zwrócona funkcja ma działać przy każdym kolejnym wywołaniu").toBe("NO!");
  });
});
