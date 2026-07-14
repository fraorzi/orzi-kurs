import { describe, it, expect } from "vitest";
import { tokenize } from "./starter.js";

describe("tokenize — poprawność", () => {
  it("rozbija wyrażenie na liczby i operatory, pomijając spacje", () => {
    expect(tokenize("12 + 3 * (4-5)")).toEqual(["12", "+", "3", "*", "(", "4", "-", "5", ")"]);
  });

  it("radzi sobie z brakiem spacji", () => {
    expect(tokenize("(1+2)*3")).toEqual(["(", "1", "+", "2", ")", "*", "3"]);
  });

  it("dla samych białych znaków zwraca pustą tablicę", () => {
    expect(tokenize("   ")).toEqual([]);
  });

  it("dla pustego wejścia zwraca pustą tablicę", () => {
    expect(tokenize("")).toEqual([]);
  });
});

describe("tokenize — błędy składni", () => {
  it("rzuca SyntaxError na nieoczekiwanym znaku", () => {
    expect(() => tokenize("1 + @")).toThrow(SyntaxError);
  });

  it("podaje właściwą pozycję błędu (zapamiętaną przed exec)", () => {
    expect(
      () => tokenize("1 + @"),
      "sticky zeruje lastIndex przy nieudanym exec — pozycję trzeba wziąć sprzed exec (tu 4)",
    ).toThrow(/pozycji 4/);
  });

  it("wskazuje pozycję błędu na początku dla nietokenowego startu", () => {
    expect(() => tokenize("abc")).toThrow(/pozycji 0/);
  });
});
