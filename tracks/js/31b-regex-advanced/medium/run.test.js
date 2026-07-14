import { describe, it, expect } from "vitest";
import { highlight, reformatDate } from "./starter.js";

describe("highlight", () => {
  it("traktuje metaznaki w query dosłownie (kropka to kropka)", () => {
    expect(
      highlight("cost 3.5 and 3x5", "3.5"),
      "bez escapowania '3.5' dopasowałoby też '3x5' (. = dowolny znak)",
    ).toBe("cost [[3.5]] and 3x5");
  });

  it("działa dla query z nawiasami", () => {
    expect(highlight("call f(x) now", "f(x)")).toBe("call [[f(x)]] now");
  });

  it("otacza wszystkie wystąpienia, ignorując wielkość liter, zachowując pisownię", () => {
    expect(highlight("Cat cat CAT", "cat")).toBe("[[Cat]] [[cat]] [[CAT]]");
  });

  it("pusty query nie zmienia tekstu", () => {
    expect(highlight("abc", ""), "RegExp('') dopasowałby wszędzie — pusty query obsłuż osobno").toBe(
      "abc",
    );
  });
});

describe("reformatDate", () => {
  it("zamienia RRRR-MM-DD na DD/MM/RRRR", () => {
    expect(reformatDate("2024-07-14")).toBe("14/07/2024");
  });

  it("działa na dacie w środku tekstu", () => {
    expect(reformatDate("spotkanie 2024-01-05 rano")).toBe("spotkanie 05/01/2024 rano");
  });
});
