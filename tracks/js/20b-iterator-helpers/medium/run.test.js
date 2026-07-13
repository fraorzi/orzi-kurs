import { describe, it, expect } from "vitest";
import { firstMatching } from "./starter.js";

// Generator z licznikiem pobrań — pozwala zmierzyć, ile elementów naprawdę pobrano.
function countingNaturals() {
  const state = { pulled: 0 };
  function* gen() {
    let i = 1;
    while (true) {
      state.pulled += 1;
      yield i++;
    }
  }
  return { iterator: gen(), state };
}

describe("firstMatching", () => {
  it("zwraca pierwsze n elementów spełniających predykat", () => {
    const { iterator } = countingNaturals();
    expect(firstMatching(iterator, (x) => x % 2 === 0, 3)).toEqual([2, 4, 6]);
  });

  it("pobiera ze źródła tylko tyle, ile trzeba do znalezienia n trafień (leniwość)", () => {
    const { iterator, state } = countingNaturals();
    firstMatching(iterator, (x) => x % 2 === 0, 3);
    // Trafienia to 2,4,6 — leżą na pozycjach 2,4,6. Każda poprawna implementacja musi
    // pobrać co najmniej 6; kanoniczny pipeline dokładnie 6, dopuszczamy 7 (pętla
    // sprawdzająca warunek stopu po nadmiarowym pobraniu).
    expect(
      state.pulled,
      "znalezienie 3 parzystych wymaga pobrania 6 elementów ze źródła",
    ).toBeGreaterThanOrEqual(6);
    expect(
      state.pulled,
      "leniwy pipeline (filter→take) zatrzymuje się po 3. trafieniu — ~6 pobrań (materializacja pobierałaby w nieskończoność)",
    ).toBeLessThanOrEqual(7);
  });

  it("gdy trafień jest mniej niż n, zwraca tyle, ile znalazł (źródło skończone)", () => {
    expect(firstMatching([1, 2, 3, 4][Symbol.iterator](), (x) => x % 2 === 0, 5)).toEqual([2, 4]);
  });
});
