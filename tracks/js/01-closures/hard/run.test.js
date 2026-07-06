import { describe, it, expect } from "vitest";
import { makeArmy, spy } from "./starter.js";

describe("makeArmy", () => {
  it("tworzy dokładnie 10 shooterów", () => {
    expect(makeArmy()).toHaveLength(10);
  });

  it("każdy shooter zwraca swój numer, a nie końcową wartość licznika", () => {
    const army = makeArmy();
    army.forEach((shooter, i) => {
      expect(
        shooter(),
        `shooter[${i}] zwrócił ${shooter()} — wszystkie funkcje domykają jedną wspólną zmienną i; każda musi dostać własną wartość (let w nagłówku for albo lokalna stała w iteracji)`,
      ).toBe(i);
    });
  });
});

describe("spy", () => {
  it("zapisuje argumenty i wynik każdego wywołania w .calls", () => {
    const add = (a, b) => a + b;
    const spied = spy(add);
    spied(1, 2);
    spied(4, 5);
    expect(spied.calls, "wrapper ma mieć tablicę .calls z wpisem { args, result } dla każdego wywołania").toEqual([
      { args: [1, 2], result: 3 },
      { args: [4, 5], result: 9 },
    ]);
  });

  it("nie zmienia zachowania funkcji — wyniki przechodzą bez zmian", () => {
    const upper = (s) => s.toUpperCase();
    const spied = spy(upper);
    expect(spied("abc"), "wrapper ma zwracać dokładnie to, co zwróciło fn").toBe("ABC");
  });

  it("każdy szpieg śledzi tylko własną funkcję", () => {
    const a = spy(() => "a");
    const b = spy(() => "b");
    a();
    a();
    b();
    expect(a.calls, "tablica .calls nie może być współdzielona między szpiegami").toHaveLength(2);
    expect(b.calls).toHaveLength(1);
  });

  it(".calls istnieje i jest puste przed pierwszym wywołaniem", () => {
    const spied = spy(() => {});
    expect(spied.calls, ".calls ma być pustą tablicą od razu po utworzeniu wrappera").toEqual([]);
  });
});
