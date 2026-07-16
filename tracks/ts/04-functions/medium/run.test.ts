import { describe, it, expect } from "vitest";
import { range, parseSetting, assertNever, describeSetting } from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("parseSetting(string) ma typ boolean, parseSetting(number) ma typ string", () => {
    const flag = parseSetting("on");
    const label = parseSetting(1);
    const asBoolean: boolean = flag;
    const asString: string = label;
    expect(asBoolean).toBe(true);
    expect(asString).toBe("1");
  });

  it("parseSetting nie przyjmuje boolean", () => {
    const illegal = (): void => {
      // @ts-expect-error przeciążenia obsługują tylko string i number
      parseSetting(true);
    };
    expect(illegal).toBeTypeOf("function");
    expect(parseSetting("off")).toBe(false);
  });

  it("range nie przyjmuje czterech argumentów ani zera argumentów", () => {
    const illegal = (): void => {
      // @ts-expect-error brak przeciążenia bez argumentów
      range();
      // @ts-expect-error brak przeciążenia z czterema argumentami
      range(1, 2, 3, 4);
    };
    expect(illegal).toBeTypeOf("function");
    expect(range(3)).toEqual([0, 1, 2]);
  });

  it("assertNever przyjmuje wyłącznie never", () => {
    const illegal = (): void => {
      // @ts-expect-error string nie jest never
      assertNever("cokolwiek");
    };
    expect(illegal).toBeTypeOf("function");
  });
});

describe("range", () => {
  it("z jednym argumentem liczy od zera", () => {
    expect(range(3)).toEqual([0, 1, 2]);
  });

  it("z dwoma argumentami liczy od start do stop (bez stop)", () => {
    expect(range(1, 4)).toEqual([1, 2, 3]);
  });

  it("z trzema argumentami używa kroku", () => {
    expect(range(0, 10, 5)).toEqual([0, 5]);
  });

  it("obsługuje krok ujemny", () => {
    expect(
      range(5, 0, -2),
      "przy ujemnym kroku warunek pętli to i > stop, nie i < stop",
    ).toEqual([5, 3, 1]);
  });

  it("pusty przedział daje pustą tablicę", () => {
    expect(range(3, 3)).toEqual([]);
    expect(range(0)).toEqual([]);
  });

  it("krok zerowy rzuca RangeError", () => {
    expect(() => range(0, 10, 0)).toThrow(RangeError);
  });
});

describe("parseSetting", () => {
  it("\"on\" to true, wszystko inne to false", () => {
    expect(parseSetting("on")).toBe(true);
    expect(parseSetting("off")).toBe(false);
    expect(parseSetting("cokolwiek")).toBe(false);
  });

  it("liczbę zamienia na tekst", () => {
    expect(parseSetting(1)).toBe("1");
    expect(parseSetting(42)).toBe("42");
  });
});

describe("assertNever", () => {
  it("rzuca Error z opisem nieobsłużonego wariantu", () => {
    const value = "x" as never;
    expect(() => assertNever(value)).toThrow(
      "nieobsłużony wariant: \"x\"",
    );
  });
});

describe("describeSetting", () => {
  it("opisuje przełącznik tekstowy", () => {
    expect(describeSetting("on")).toBe("przełącznik: true");
    expect(describeSetting("off")).toBe("przełącznik: false");
  });

  it("opisuje wartość liczbową", () => {
    expect(describeSetting(2)).toBe("wartość: 2");
  });
});
