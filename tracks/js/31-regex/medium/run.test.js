import { describe, it, expect } from "vitest";
import { capitalizeWords, censor } from "./starter.js";

describe("capitalizeWords", () => {
  it("zamienia pierwszą literę każdego słowa na wielką", () => {
    expect(capitalizeWords("hello world")).toBe("Hello World");
    expect(capitalizeWords("jan kowalski xy")).toBe("Jan Kowalski Xy");
  });

  it("nie zmienia pozostałych liter", () => {
    expect(
      capitalizeWords("aBc dEf"),
      "\\b\\w łapie tylko pierwszy znak słowa — reszta zostaje bez zmian",
    ).toBe("ABc DEf");
  });
});

describe("censor", () => {
  it("zamienia wszystkie wystąpienia słowa na gwiazdki (ignorując wielkość liter)", () => {
    expect(
      censor("Hello hello HELLO world", "hello"),
      "flaga g zamienia wszystkie, i ignoruje wielkość liter; liczba gwiazdek = długość słowa",
    ).toBe("***** ***** ***** world");
  });

  it("działa dla wzorca budowanego z danych", () => {
    expect(censor("abcabc", "bc"), "new RegExp(word, 'gi') tworzy wzorzec z przekazanego słowa").toBe(
      "a**a**",
    );
  });

  it("bez wystąpień zwraca tekst bez zmian", () => {
    expect(censor("nic tu nie ma", "xyz")).toBe("nic tu nie ma");
  });
});
