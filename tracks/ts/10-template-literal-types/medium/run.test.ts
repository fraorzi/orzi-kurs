import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  makeGetters,
  makeChangeHandlers,
  stripInternal,
  type Getters,
  type ChangeHandlers,
  type WithoutInternal,
} from "./starter";

interface User {
  name: string;
  age: number;
}

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("Getters<T> przepisuje klucze na get<Pole> i zwraca wartość pola", () => {
    type _t = Expect<
      Equal<Getters<User>, { getName: () => string; getAge: () => number }>
    >;
    expect(makeGetters({ name: "Ala", age: 7 }).getName()).toBe("Ala");
  });

  it("ChangeHandlers<T> przepisuje klucze na on<Pole>Change z wartością pola", () => {
    type _t = Expect<
      Equal<
        ChangeHandlers<User>,
        {
          onNameChange: (value: string) => void;
          onAgeChange: (value: number) => void;
        }
      >
    >;
    expect(
      makeChangeHandlers({ name: "Ala", age: 7 }, () => {}).onAgeChange,
    ).toBeTypeOf("function");
  });

  it("handler odrzuca wartość złego typu", () => {
    const handlers = makeChangeHandlers({ name: "Ala", age: 7 }, () => {});
    const illegal = (): void => {
      // @ts-expect-error age jest number — "osiem" musi być błędem typu
      handlers.onAgeChange("osiem");
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("WithoutInternal<T> kasuje pola z prefiksem _", () => {
    type _t = Expect<
      Equal<
        WithoutInternal<{ id: number; _secret: string; name: string }>,
        { id: number; name: string }
      >
    >;
    expect(stripInternal({ id: 1, _secret: "x", name: "Ala" })).toEqual({
      id: 1,
      name: "Ala",
    });
  });

  it("pole wewnętrzne znika też z typu wyniku stripInternal", () => {
    const publicUser = stripInternal({ id: 1, _secret: "x", name: "Ala" });
    const illegal = (): unknown =>
      // @ts-expect-error _secret nie istnieje w typie wyniku
      publicUser._secret;
    expect(illegal).toBeTypeOf("function");
  });
});

describe("makeGetters", () => {
  it("tworzy getter dla każdego pola", () => {
    const getters = makeGetters({ name: "Ala", age: 7 });
    expect([getters.getName(), getters.getAge()]).toEqual(["Ala", 7]);
  });

  it("nazwa gettera to get + pole z wielkiej litery", () => {
    const getters = makeGetters({ firstName: "Ala" });
    expect(
      Object.keys(getters),
      "Capitalize<K> w klauzuli as zmienia tylko pierwszą literę — reszta bez zmian",
    ).toEqual(["getFirstName"]);
  });

  it("getter czyta wartość, a nie kopiuje ją w momencie tworzenia", () => {
    const source = { name: "Ala" };
    const getters = makeGetters(source);
    source.name = "Ola";
    expect(
      getters.getName(),
      "getter ma sięgać po pole przy każdym wywołaniu (domknięcie na source)",
    ).toBe("Ola");
  });
});

describe("makeChangeHandlers", () => {
  it("każdy handler woła onChange z nowym stanem", () => {
    let current: User = { name: "Ala", age: 7 };
    const handlers = makeChangeHandlers(current, (next) => {
      current = next;
    });

    handlers.onAgeChange(8);
    expect(current).toEqual({ name: "Ala", age: 8 });
  });

  it("nie mutuje stanu przekazanego do fabryki", () => {
    const state: User = { name: "Ala", age: 7 };
    const handlers = makeChangeHandlers(state, () => {});

    handlers.onAgeChange(8);
    expect(
      state,
      "handler ma zbudować NOWY obiekt ({ ...state }) — mutacja wejścia to błąd",
    ).toEqual({ name: "Ala", age: 7 });
  });

  it("podmienia tylko swoje pole", () => {
    let current: User = { name: "Ala", age: 7 };
    const handlers = makeChangeHandlers(current, (next) => {
      current = next;
    });

    handlers.onNameChange("Ola");
    expect(current).toEqual({ name: "Ola", age: 7 });
  });

  it("tworzy handler dla każdego pola stanu", () => {
    const handlers = makeChangeHandlers({ name: "Ala", age: 7 }, () => {});
    expect(Object.keys(handlers).sort()).toEqual([
      "onAgeChange",
      "onNameChange",
    ]);
  });
});

describe("stripInternal", () => {
  it("usuwa pola z prefiksem _", () => {
    expect(stripInternal({ id: 1, _secret: "x", name: "Ala" })).toEqual({
      id: 1,
      name: "Ala",
    });
  });

  it("zostawia pola bez prefiksu nietknięte", () => {
    expect(stripInternal({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it("nie mutuje wejścia", () => {
    const source = { id: 1, _secret: "x" };
    stripInternal(source);
    expect(
      source,
      "stripInternal ma budować nowy obiekt — usuwanie kluczy z oryginału to mutacja",
    ).toEqual({ id: 1, _secret: "x" });
  });

  it("podkreślenie w środku nazwy nie kwalifikuje pola jako wewnętrznego", () => {
    expect(
      stripInternal({ user_id: 1, _hidden: 2 }),
      "wzorzec `_${string}` dopasowuje tylko PREFIKS — user_id zostaje",
    ).toEqual({ user_id: 1 });
  });
});
