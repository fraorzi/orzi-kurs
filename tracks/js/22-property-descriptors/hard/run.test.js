import { describe, it, expect } from "vitest";
import { observable } from "./starter.js";

describe("observable", () => {
  it("odczyt zwraca wartości początkowe", () => {
    const state = observable({ count: 0, name: "x" }, () => {});
    expect(state.count).toBe(0);
    expect(state.name).toBe("x");
  });

  it("zapis innej wartości aktualizuje stan i woła onChange(key, new, old)", () => {
    const changes = [];
    const state = observable({ count: 0 }, (key, val, old) => {
      changes.push([key, val, old]);
    });
    state.count = 1;
    expect(state.count, "setter ma zapisać nową wartość do wewnętrznego stanu").toBe(1);
    expect(
      changes,
      "onChange ma dostać (klucz, nowa, stara) dokładnie raz przy realnej zmianie",
    ).toEqual([["count", 1, 0]]);
  });

  it("zapis tej samej wartości NIE woła onChange", () => {
    let calls = 0;
    const state = observable({ count: 5 }, () => {
      calls += 1;
    });
    state.count = 5;
    expect(calls, "porównaj nową wartość ze starą (===) i pomiń powiadomienie, gdy równe").toBe(0);
  });

  it("klucze są enumerowalne i pokazują aktualne wartości", () => {
    const state = observable({ a: 1, b: 2 }, () => {});
    state.a = 10;
    expect(Object.keys(state), "akcesory mają mieć enumerable: true").toEqual(["a", "b"]);
    expect(state.a).toBe(10);
  });

  it("nie mutuje oryginalnego obiektu", () => {
    const target = { count: 0 };
    const state = observable(target, () => {});
    state.count = 99;
    expect(
      target.count,
      "stan trzymaj w kopii (np. { ...target }) — oryginał nie może się zmieniać",
    ).toBe(0);
  });
});
