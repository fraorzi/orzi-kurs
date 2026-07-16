import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { identity, firstOrNull, box, unbox, pair, type Box } from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("identity zwraca dokładnie typ argumentu (dla literału — typ literalny)", () => {
    // T bez ograniczenia + argument literalny → T = "abc", nie string.
    const text = identity("abc");
    const user = identity({ id: 1 });
    type _text = Expect<Equal<typeof text, "abc">>;
    type _user = Expect<Equal<typeof user, { id: number }>>;
    expect([text, user]).toEqual(["abc", { id: 1 }]);
  });

  it("identity z jawnym argumentem typu zwraca ten typ", () => {
    const text = identity<string>("abc");
    type _t = Expect<Equal<typeof text, string>>;
    expect(text).toBe("abc");
  });

  it("firstOrNull zwraca T | null, a nie unknown", () => {
    const value = firstOrNull([10, 20]);
    type _t = Expect<Equal<typeof value, number | null>>;
    expect(value).toBe(10);
  });

  it("Box<T> trzyma wartość dokładnie typu T", () => {
    type _t = Expect<Equal<Box<number>, { value: number }>>;
    const boxed = box("x");
    type _boxed = Expect<Equal<typeof boxed, Box<string>>>;
    expect(boxed).toEqual({ value: "x" });
  });

  it("unbox oddaje typ, który był w pudełku", () => {
    const value = unbox(box(true));
    type _t = Expect<Equal<typeof value, boolean>>;
    expect(value).toBe(true);
  });

  it("pair ma dwa niezależne parametry typu i zwraca krotkę", () => {
    const result = pair("a", 1);
    type _t = Expect<Equal<typeof result, [string, number]>>;
    expect(result).toEqual(["a", 1]);
  });
});

describe("identity", () => {
  it("zwraca tę samą referencję, nie kopię", () => {
    const input = { id: 1 };
    expect(
      identity(input),
      "identity nie kopiuje — ma zwrócić dokładnie ten sam obiekt",
    ).toBe(input);
  });

  it("działa dla prymitywów", () => {
    expect(identity(42)).toBe(42);
  });
});

describe("firstOrNull", () => {
  it("zwraca pierwszy element listy", () => {
    expect(firstOrNull([10, 20, 30])).toBe(10);
  });

  it("dla pustej listy zwraca null", () => {
    expect(
      firstOrNull([]),
      "pusta lista nie ma pierwszego elementu — kontrakt mówi null, nie undefined",
    ).toBeNull();
  });

  it("nie myli wartości falsy z brakiem elementu", () => {
    expect(
      firstOrNull([0, 1]),
      "0 jest falsy — sprawdzaj długość listy, nie truthiness elementu",
    ).toBe(0);
  });

  it("nie mutuje wejścia", () => {
    const input = [1, 2, 3];
    firstOrNull(input);
    expect(input, "firstOrNull ma tylko czytać — żadnego shift/pop").toEqual([
      1, 2, 3,
    ]);
  });
});

describe("box / unbox", () => {
  it("box pakuje wartość do pola value", () => {
    expect(box(42)).toEqual({ value: 42 });
  });

  it("unbox wyjmuje wartość z pudełka", () => {
    expect(unbox({ value: "x" })).toBe("x");
  });

  it("unbox(box(v)) zwraca to, co weszło", () => {
    const value = { id: 1 };
    expect(unbox(box(value))).toBe(value);
  });
});

describe("pair", () => {
  it("zwraca dwuelementową krotkę w podanej kolejności", () => {
    expect(pair("a", 1)).toEqual(["a", 1]);
  });

  it("oba elementy mogą być tego samego typu", () => {
    expect(pair(1, 2)).toEqual([1, 2]);
  });
});
