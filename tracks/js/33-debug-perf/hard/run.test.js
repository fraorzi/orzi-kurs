import { describe, it, expect } from "vitest";
import { expectScaling } from "@harness/bench";
import { processQueue } from "./starter.js";

describe("processQueue — poprawność", () => {
  it("zwraca wyniki fn w kolejności elementów", () => {
    expect(processQueue([1, 2, 3], (x) => x * 2)).toEqual([2, 4, 6]);
  });

  it("nie mutuje wejściowej tablicy", () => {
    const items = [1, 2, 3];
    processQueue(items, (x) => x);
    expect(items, "processQueue ma zostawić items nietknięte").toEqual([1, 2, 3]);
  });

  it("dla pustego wejścia zwraca pustą tablicę", () => {
    expect(processQueue([], (x) => x)).toEqual([]);
  });
});

describe("processQueue — złożoność", () => {
  it("działa w czasie liniowym, nie kwadratowym", () => {
    expectScaling({
      fn: (items) => processQueue(items, (x) => x),
      makeInput: (n) => Array.from({ length: n }, (_, i) => i),
      sizes: [2000, 20000],
      expect: "linear",
    });
  });
});
