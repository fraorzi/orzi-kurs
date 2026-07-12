import { describe, it, expect } from "vitest";
import { memoizeWeak } from "./starter.js";

describe("memoizeWeak", () => {
  it("zwraca ten sam wynik co oryginalna funkcja", () => {
    const fast = memoizeWeak((obj) => obj.x * 2);
    expect(fast({ x: 10 })).toBe(20);
  });

  it("drugie wywołanie z tym samym obiektem NIE liczy ponownie (cache hit)", () => {
    let calls = 0;
    const fast = memoizeWeak((obj) => {
      calls++;
      return obj.x * 2;
    });
    const a = { x: 10 };
    fast(a);
    fast(a);
    fast(a);
    expect(
      calls,
      "przy tym samym obiekcie wynik ma iść z WeakMap — fn ma zostać wywołane tylko raz",
    ).toBe(1);
  });

  it("różne obiekty liczone są osobno", () => {
    let calls = 0;
    const fast = memoizeWeak((obj) => {
      calls++;
      return obj.x * 2;
    });
    expect(fast({ x: 10 })).toBe(20);
    expect(fast({ x: 3 })).toBe(6);
    expect(calls, "dwa różne obiekty to dwa różne klucze cache — dwa policzenia").toBe(2);
  });

  it("obiekt o zmienionej treści, ale nadal tej samej referencji, trafia w cache", () => {
    let calls = 0;
    const fast = memoizeWeak((obj) => {
      calls++;
      return obj.x * 2;
    });
    const a = { x: 10 };
    expect(fast(a)).toBe(20);
    a.x = 999; // ta sama referencja — cache trzyma stary wynik
    expect(
      fast(a),
      "cache jest kluczowany referencją, nie treścią — wynik pozostaje zapamiętany (20)",
    ).toBe(20);
    expect(calls).toBe(1);
  });

  it("wywołanie z prymitywem rzuca TypeError (klucz WeakMap musi być obiektem)", () => {
    const fast = memoizeWeak((x) => x);
    expect(
      () => fast(5),
      "WeakMap.set odrzuca prymitywy — memoizacja per obiekt działa tylko dla obiektów",
    ).toThrow(TypeError);
  });
});
