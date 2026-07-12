import { describe, it, expect } from "vitest";
import { spy, once } from "./starter.js";

describe("spy", () => {
  it("zapisuje argumenty każdego wywołania jako tablicę tablic w .calls", () => {
    const spied = spy(() => {});
    spied("a");
    spied("b", "c");
    expect(spied.calls, ".calls ma zawierać po jednej tablicy argumentów na każde wywołanie").toEqual([
      ["a"],
      ["b", "c"],
    ]);
  });

  it("zwraca wyniki fn bez zmian", () => {
    const spied = spy((a, b) => a + b);
    expect(spied(1, 2), "wrapper ma zwracać dokładnie to, co zwróciło fn").toBe(3);
    expect(spied(4, 5)).toBe(9);
  });

  it(".calls istnieje i jest puste przed pierwszym wywołaniem", () => {
    const spied = spy(() => {});
    expect(spied.calls, ".calls ma być pustą tablicą od razu po utworzeniu wrappera").toEqual([]);
  });

  it("forwarduje this — szpiegowana metoda obiektu dalej działa", () => {
    const user = {
      factor: 3,
      scale: spy(function (x) {
        return x * this.factor;
      }),
    };
    expect(
      user.scale(5),
      "wywołanie user.scale(5) ma widzieć this === user — wrapper musi przekazać kontekst przez fn.apply(this, args)",
    ).toBe(15);
    expect(user.scale.calls).toEqual([[5]]);
  });

  it("każdy szpieg śledzi tylko własną funkcję", () => {
    const a = spy(() => {});
    const b = spy(() => {});
    a(1);
    a(2);
    b(3);
    expect(a.calls, "tablica .calls nie może być współdzielona między szpiegami").toHaveLength(2);
    expect(b.calls).toHaveLength(1);
  });
});

describe("once", () => {
  it("fn wykonuje się dokładnie raz", () => {
    let runs = 0;
    const init = once(() => ++runs);
    init();
    init();
    init();
    expect(runs, "fn zostało wywołane więcej niż raz — wrapper ma zapamiętać, że pierwsze wywołanie już było").toBe(1);
  });

  it("kolejne wywołania zwracają zapamiętany wynik pierwszego", () => {
    let n = 0;
    const next = once(() => ++n);
    expect(next()).toBe(1);
    expect(next(), "drugie wywołanie ma zwrócić wynik pierwszego z pamięci, nie liczyć nowego").toBe(1);
  });

  it("liczą się argumenty pierwszego wywołania, kolejne są ignorowane", () => {
    const joinOnce = once((a, b) => `${a}-${b}`);
    expect(joinOnce("x", "y"), "wrapper ma przekazać argumenty pierwszego wywołania do fn").toBe("x-y");
    expect(joinOnce("p", "q"), "argumenty kolejnych wywołań są ignorowane — wynik pochodzi z pierwszego").toBe("x-y");
  });

  it("forwarduje this przy pierwszym wywołaniu", () => {
    const counter = {
      value: 41,
      read: once(function () {
        return this.value + 1;
      }),
    };
    expect(counter.read(), "metoda opakowana w once ma widzieć this === counter").toBe(42);
  });
});
