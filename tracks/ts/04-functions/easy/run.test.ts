import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { greet, sum, mapNumbers, fail, type Mapper } from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("Mapper to (value: number, index: number) => number", () => {
    type _t = Expect<Equal<Mapper, (value: number, index: number) => number>>;
    expect(mapNumbers([1], (v) => v)).toEqual([1]);
  });

  it("fail ma typ zwracany never i zawęża wartość", () => {
    type _t = Expect<Equal<ReturnType<typeof fail>, never>>;
    const maybe: string | null = "abc";
    const value: string = maybe ?? fail("brak");
    expect(value).toBe("abc");
  });

  it("sum przyjmuje dowolnie wiele liczb", () => {
    type _t = Expect<Equal<Parameters<typeof sum>, number[]>>;
    expect(sum(1, 2)).toBe(3);
  });
});

describe("greet", () => {
  it("bez drugiego argumentu wita domyślnie", () => {
    expect(greet("Ala")).toBe("Cześć, Ala!");
  });

  it("z podanym powitaniem używa go zamiast domyślnego", () => {
    expect(greet("Ala", "Siema")).toBe("Siema, Ala!");
  });
});

describe("sum", () => {
  it("bez argumentów zwraca 0", () => {
    expect(sum()).toBe(0);
  });

  it("sumuje wszystkie argumenty", () => {
    expect(sum(1, 2, 3)).toBe(6);
  });

  it("radzi sobie z liczbami ujemnymi", () => {
    expect(sum(5, -2, -3)).toBe(0);
  });
});

describe("mapNumbers", () => {
  it("przekazuje wartość i indeks", () => {
    expect(mapNumbers([10, 20], (value, index) => value + index)).toEqual([
      10, 21,
    ]);
  });

  it("przyjmuje callback o mniejszej liczbie parametrów", () => {
    expect(
      mapNumbers([1, 2], (v) => v * 2),
      "funkcja z mniejszą arnością jest przypisywalna — tak działa forEach/map w JS",
    ).toEqual([2, 4]);
  });

  it("nie mutuje wejścia", () => {
    const input = [1, 2, 3];
    mapNumbers(input, (v) => v * 10);
    expect(input).toEqual([1, 2, 3]);
  });

  it("pusta lista daje pustą listę", () => {
    expect(mapNumbers([], (v) => v)).toEqual([]);
  });
});

describe("fail", () => {
  it("rzuca Error z podanym komunikatem", () => {
    expect(() => fail("boom")).toThrow("boom");
  });
});
