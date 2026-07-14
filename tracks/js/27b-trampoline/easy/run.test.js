import { describe, it, expect } from "vitest";
import { trampoline, sumTo } from "./starter.js";

describe("trampoline", () => {
  it("rozwija łańcuch thunków aż do wartości nie-funkcyjnej", () => {
    const step = trampoline((n) => (n > 0 ? () => step(n - 1) : "done"));
    expect(step(5)).toBe("done");
  });

  it("gdy fn od razu zwraca wartość, oddaje ją bez pętli", () => {
    const once = trampoline((x) => x * 2);
    expect(once(21)).toBe(42);
  });
});

describe("sumTo", () => {
  it("sumuje 1..n dla małych n", () => {
    expect(sumTo(5)).toBe(15);
  });

  it("dla n <= 0 zwraca 0", () => {
    expect(sumTo(0)).toBe(0);
  });

  it("działa dla dużego n bez przepełnienia stosu", () => {
    expect(
      sumTo(100000),
      "trampolina trzyma na stosie jedną ramkę — zwykła rekurencja rzuciłaby tu RangeError",
    ).toBe(5000050000);
  });
});
