import { describe, it, expect } from "vitest";
import { truncate, camelize, maskCard } from "./starter.js";

describe("truncate", () => {
  it("ucina i kończy wielokropkiem, zachowując maxlength znaków łącznie", () => {
    expect(
      truncate("Co ja chciałem powiedzieć w tym temacie", 10),
      "wynik ma mieć DOKŁADNIE maxlength znaków — utnij do maxlength-1 i doklej '…'",
    ).toBe("Co ja chc…");
    expect(truncate("Co ja chciałem powiedzieć w tym temacie", 10)).toHaveLength(10);
  });

  it("krótsze stringi zwraca bez zmian", () => {
    expect(truncate("Cześć", 10)).toBe("Cześć");
    expect(truncate("1234567890", 10), "string o długości równej maxlength NIE jest ucinany").toBe("1234567890");
  });
});

describe("camelize", () => {
  it("zamienia myślniki na camelCase", () => {
    expect(camelize("background-color")).toBe("backgroundColor");
    expect(camelize("list-style-image")).toBe("listStyleImage");
  });

  it("wiodący myślnik daje wielką literę na początku", () => {
    expect(
      camelize("-webkit-transition"),
      "split po '-' daje pusty string na początku — pierwszy element zostaje bez zmian, kolejne dostają wielką literę",
    ).toBe("WebkitTransition");
  });

  it("string bez myślników zostaje bez zmian", () => {
    expect(camelize("color")).toBe("color");
  });
});

describe("maskCard", () => {
  it("maskuje wszystko poza ostatnimi 4 znakami", () => {
    expect(maskCard("1234567899874106")).toBe("************4106");
  });

  it("zachowuje długość wejścia", () => {
    expect(maskCard("1234567899874106")).toHaveLength(16);
  });

  it("krótkie numery (do 4 znaków) zostają odsłonięte", () => {
    expect(maskCard("4106"), "gdy numer ma ≤ 4 znaki, nie ma czego maskować").toBe("4106");
  });
});
