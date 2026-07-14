import { describe, it, expect } from "vitest";
import { sumAmounts } from "./starter.js";

describe("sumAmounts", () => {
  it("sumuje kwoty i zwraca string", () => {
    expect(sumAmounts(["1050", "200", "-50"])).toBe("1200");
  });

  it("zwraca dokładną sumę powyżej MAX_SAFE_INTEGER", () => {
    expect(
      sumAmounts(["9007199254740993", "1"]),
      "przez number 9007199254740993 + 1 = 9007199254740992 (błąd) — BigInt daje 9007199254740994",
    ).toBe("9007199254740994");
  });

  it("obsługuje kwoty ujemne", () => {
    expect(sumAmounts(["100", "-30", "-70"])).toBe("0");
  });

  it("dla pustej tablicy zwraca '0'", () => {
    expect(sumAmounts([])).toBe("0");
  });

  it("zwraca string, a nie bigint (kwoty przekazuje się jako string)", () => {
    expect(typeof sumAmounts(["5", "5"])).toBe("string");
  });
});
