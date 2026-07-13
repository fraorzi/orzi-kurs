import { describe, it, expect } from "vitest";
import { expectScaling } from "@harness/bench";
import { sharedTags } from "./starter.js";

describe("sharedTags — poprawność", () => {
  it("zwraca posortowaną tablicę tagów obecnych w obu zbiorach", () => {
    expect(sharedTags(new Set(["b", "a", "x"]), new Set(["a", "b", "c"]))).toEqual(["a", "b"]);
  });

  it("bez wspólnych tagów zwraca pustą tablicę", () => {
    expect(sharedTags(new Set(["q"]), new Set(["a", "b"]))).toEqual([]);
  });

  it("nie mutuje wejściowych zbiorów", () => {
    const userTags = new Set(["a", "b"]);
    const catalog = new Set(["b", "c"]);
    sharedTags(userTags, catalog);
    expect([...userTags], "userTags nie może zostać zmienione").toEqual(["a", "b"]);
    expect([...catalog], "catalog nie może zostać zmieniony").toEqual(["b", "c"]);
  });
});

describe("sharedTags — złożoność", () => {
  it("czas nie rośnie z rozmiarem katalogu (iteruj po mniejszym zbiorze)", () => {
    expectScaling({
      fn: ({ userTags, catalog }) => sharedTags(userTags, catalog),
      makeInput: (n) => ({
        userTags: new Set(Array.from({ length: 200 }, (_, i) => `tag${i * 7}`)),
        catalog: new Set(Array.from({ length: n }, (_, i) => `tag${i}`)),
      }),
      // Spread 20× — pierwszy pomiar małego rozmiaru łapie zimny JIT i zaniża ratio
      // (SPEC: pułapka expectScaling); przy 10× starter potrafił zejść pod próg.
      sizes: [5000, 100000],
      expect: "constant",
    });
  });
});
