import { describe, it, expect } from "vitest";
import { parseDate, extractHashtags } from "./starter.js";

describe("parseDate", () => {
  it("parsuje poprawną datę do liczb przez grupy nazwane", () => {
    expect(
      parseDate("2020-05-17"),
      "match.groups daje stringi — zamień je na liczby (Number)",
    ).toEqual({ year: 2020, month: 5, day: 17 });
  });

  it("zwraca null dla niepasującego formatu", () => {
    expect(parseDate("2020-5-17"), "miesiąc jednocyfrowy nie pasuje do \\d{2}").toBe(null);
    expect(parseDate("hello")).toBe(null);
    expect(parseDate("2020-05-17extra"), "kotwica $ nie pozwala na nadmiarowe znaki").toBe(null);
  });
});

describe("extractHashtags", () => {
  it("wyciąga hashtagi małymi literami, bez duplikatów, w kolejności wystąpień", () => {
    expect(
      extractHashtags("Kocham #JS i #js oraz #Node!"),
      "#JS i #js to ten sam tag po zmniejszeniu liter — zdeduplikuj (np. Set)",
    ).toEqual(["js", "node"]);
  });

  it("zwraca pustą tablicę, gdy nie ma hashtagów", () => {
    expect(extractHashtags("brak tagów")).toEqual([]);
  });

  it("zachowuje kolejność pierwszego wystąpienia", () => {
    expect(extractHashtags("#a #b #a")).toEqual(["a", "b"]);
  });
});
