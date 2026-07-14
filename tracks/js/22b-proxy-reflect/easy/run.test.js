import { describe, it, expect } from "vitest";
import { withDefault } from "./starter.js";

describe("withDefault", () => {
  it("zwraca prawdziwą wartość dla istniejącego klucza", () => {
    expect(withDefault({ ala: 5 }, 0).ala).toBe(5);
  });

  it("zwraca wartość domyślną dla brakującego klucza", () => {
    expect(
      withDefault({ ala: 5 }, 0).ola,
      "klucz 'ola' nie istnieje → pułapka get ma zwrócić defaultValue",
    ).toBe(0);
  });

  it("po zapisie zwraca prawdziwą wartość, nie domyślną", () => {
    const scores = withDefault({ ala: 5 }, 0);
    scores.ola = 3;
    expect(scores.ola, "zapis trafia do targetu, więc klucz już istnieje").toBe(3);
  });

  it("dla istniejącego klucza o wartości undefined zwraca undefined (liczy się obecność)", () => {
    expect(
      withDefault({ x: undefined }, 99).x,
      "Reflect.has widzi klucz mimo wartości undefined — nie podstawiaj domyślnej",
    ).toBe(undefined);
  });
});
