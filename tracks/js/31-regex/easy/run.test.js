import { describe, it, expect } from "vitest";
import { extractNumbers, isHexColor } from "./starter.js";

describe("extractNumbers", () => {
  it("wyciąga ciągi cyfr jako liczby", () => {
    expect(extractNumbers("abc12def34")).toEqual([12, 34]);
    expect(extractNumbers("cena 100 zł")).toEqual([100]);
  });

  it("zwraca pustą tablicę, gdy nie ma cyfr", () => {
    expect(
      extractNumbers("brak liczb"),
      "match z flagą g zwraca null przy braku dopasowań — zabezpiecz się (?? [])",
    ).toEqual([]);
  });
});

describe("isHexColor", () => {
  it("akceptuje poprawny hex (dowolna wielkość liter)", () => {
    expect(isHexColor("#ff00aa")).toBe(true);
    expect(isHexColor("#FF00AA"), "flaga i ignoruje wielkość liter").toBe(true);
  });

  it("odrzuca brak #, złą długość i znaki spoza zakresu", () => {
    expect(isHexColor("ff00aa"), "brak # — kotwica ^ wymaga # na początku").toBe(false);
    expect(isHexColor("#ff0"), "za krótki — {6} wymaga dokładnie 6 znaków").toBe(false);
    expect(isHexColor("#gg00aa"), "g jest poza [0-9a-f]").toBe(false);
    expect(isHexColor("#ff00aa00"), "za długi — kotwica $ wymaga końca po 6 znakach").toBe(false);
  });
});
