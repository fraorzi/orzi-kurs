import { describe, it, expect } from "vitest";
import { sumTo, last } from "./starter.js";

describe("sumTo", () => {
  it("sumuje od 1 do n włącznie", () => {
    expect(
      sumTo(5),
      "warunek pętli pomija n — zakres ma być domknięty (i <= n), więc 1+2+3+4+5 = 15",
    ).toBe(15);
    expect(sumTo(3)).toBe(6);
  });

  it("dla n = 1 zwraca 1, a nie 0", () => {
    expect(sumTo(1), "przy i < n pętla dla n=1 nie wykona się ani razu — potrzeba i <= n").toBe(1);
  });

  it("dla n = 0 zwraca 0", () => {
    expect(sumTo(0)).toBe(0);
  });
});

describe("last", () => {
  it("zwraca ostatni element", () => {
    expect(
      last([1, 2, 3]),
      "arr[arr.length] to indeks ZA końcem (undefined) — ostatni to arr[arr.length - 1]",
    ).toBe(3);
    expect(last(["a"])).toBe("a");
  });
});
