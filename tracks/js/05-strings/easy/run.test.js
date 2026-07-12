import { describe, it, expect } from "vitest";
import { ucFirst, checkSpam, initials } from "./starter.js";

describe("ucFirst", () => {
  it("podnosi pierwszą literę", () => {
    expect(ucFirst("jan")).toBe("Jan");
    expect(ucFirst("a")).toBe("A");
  });

  it("pusty string zwraca pusty — bez błędu", () => {
    expect(
      ucFirst(""),
      "stringi są niemutowalne, więc budujesz nowy z kawałków — dla '' nie ma pierwszego znaku, obsłuż ten przypadek",
    ).toBe("");
  });

  it("nie zmienia reszty stringa", () => {
    expect(ucFirst("jAN")).toBe("JAN");
  });
});

describe("checkSpam", () => {
  it("wykrywa spam niezależnie od wielkości liter", () => {
    expect(
      checkSpam("buy ViAgRA now"),
      "porównanie musi być case-insensitive — znormalizuj obie strony przez toLowerCase",
    ).toBe(true);
    expect(checkSpam("free xxxxx")).toBe(true);
  });

  it("niewinny tekst przechodzi", () => {
    expect(checkSpam("innocent rabbit")).toBe(false);
    expect(checkSpam("")).toBe(false);
  });
});

describe("initials", () => {
  it("skleja wielkie pierwsze litery słów", () => {
    expect(initials("jan maria kowalski")).toBe("JMK");
  });

  it("jest odporna na nadmiarowe spacje", () => {
    expect(
      initials("  ala   nowak "),
      "split po spacji przy wielokrotnych spacjach daje puste stringi w tablicy — odfiltruj je",
    ).toBe("AN");
  });
});
