import { describe, it, expect } from "vitest";
import { sumMixed } from "./starter.js";

describe("sumMixed", () => {
  it("sumuje bigint, number i string do jednego BigInt", () => {
    expect(
      sumMixed([10n, 5, "3"]),
      "każdy element trzeba skonwertować na BigInt przed dodaniem (nie wolno mieszać typów)",
    ).toBe(18n);
  });

  it("dla pustej tablicy zwraca 0n", () => {
    expect(sumMixed([])).toBe(0n);
  });

  it("zachowuje dokładność powyżej MAX_SAFE_INTEGER", () => {
    expect(
      sumMixed(["9007199254740993", 1n]),
      "9007199254740993 + 1 w number dałoby 9007199254740992 (błąd precyzji) — BigInt liczy dokładnie",
    ).toBe(9007199254740994n);
  });

  it("zwraca wartość typu bigint", () => {
    expect(typeof sumMixed([1, 2, 3])).toBe("bigint");
  });

  it("rzuca TypeError dla niecałkowitego number", () => {
    expect(() => sumMixed([1.5]), "BigInt przyjmuje tylko całkowite → 1.5 ma rzucić TypeError").toThrow(
      TypeError,
    );
  });
});
