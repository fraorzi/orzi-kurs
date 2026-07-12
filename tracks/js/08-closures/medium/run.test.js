import { describe, it, expect } from "vitest";
import { once, memoize } from "./starter.js";

describe("once", () => {
  it("opakowana funkcja wykonuje się dokładnie raz", () => {
    let runs = 0;
    const init = once(() => ++runs);
    init();
    init();
    init();
    expect(runs, "fn zostało wywołane więcej niż raz — wrapper ma pamiętać w domknięciu, że pierwsze wywołanie już było").toBe(1);
  });

  it("kolejne wywołania zwracają wynik pierwszego wywołania", () => {
    let n = 0;
    const next = once(() => ++n);
    expect(next()).toBe(1);
    expect(next(), "drugie wywołanie ma zwrócić zapamiętany wynik pierwszego, nie liczyć nowego").toBe(1);
  });

  it("argumenty pierwszego wywołania są przekazywane do fn", () => {
    const addOnce = once((a, b) => a + b);
    expect(addOnce(2, 3), "wrapper ma przekazać argumenty do fn").toBe(5);
    expect(addOnce(100, 100), "argumenty kolejnych wywołań są ignorowane — liczy się tylko pierwsze").toBe(5);
  });
});

describe("memoize", () => {
  it("wynik dla tego samego argumentu liczony jest tylko raz", () => {
    let calls = 0;
    const square = memoize((x) => {
      calls++;
      return x * x;
    });
    expect(square(4)).toBe(16);
    expect(square(4)).toBe(16);
    expect(square(4)).toBe(16);
    expect(calls, "fn wywołane wielokrotnie dla tego samego argumentu — wynik ma pochodzić z cache w domknięciu").toBe(1);
  });

  it("różne argumenty mają osobne wpisy w cache", () => {
    let calls = 0;
    const square = memoize((x) => {
      calls++;
      return x * x;
    });
    expect(square(2)).toBe(4);
    expect(square(3)).toBe(9);
    expect(square(2)).toBe(4);
    expect(calls, "dwa różne argumenty = dokładnie dwa wywołania fn").toBe(2);
  });

  it("każde opakowanie ma własny, niezależny cache", () => {
    let callsA = 0;
    let callsB = 0;
    const a = memoize((x) => {
      callsA++;
      return x;
    });
    const b = memoize((x) => {
      callsB++;
      return x;
    });
    a(1);
    b(1);
    expect(callsA, "cache nie może być współdzielony między opakowaniami").toBe(1);
    expect(callsB, "cache nie może być współdzielony między opakowaniami").toBe(1);
  });
});
