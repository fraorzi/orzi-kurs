import { describe, it, expect } from "vitest";
import { expectScaling } from "@harness/bench";
import { myMap, myFilter, myReduce, uniqueFast } from "./starter.js";

describe("myMap", () => {
  it("transformuje każdy element, zwracając nową tablicę", () => {
    const input = [1, 2, 3];
    expect(myMap(input, (x) => x * 2)).toEqual([2, 4, 6]);
    expect(input, "myMap nie może mutować wejścia").toEqual([1, 2, 3]);
  });

  it("callback dostaje (element, index, array)", () => {
    const seen = [];
    myMap(["a", "b"], (el, i, arr) => {
      seen.push([el, i, arr]);
      return el;
    });
    expect(seen, "callback ma być wywołany z trzema argumentami: element, indeks, cała tablica").toEqual([
      ["a", 0, ["a", "b"]],
      ["b", 1, ["a", "b"]],
    ]);
  });
});

describe("myFilter", () => {
  it("zostawia elementy, dla których callback zwraca truthy", () => {
    expect(myFilter([1, 2, 3, 4], (x) => x % 2 === 0)).toEqual([2, 4]);
    expect(myFilter([0, "", "a", null], (x) => x)).toEqual(["a"]);
  });

  it("callback dostaje (element, index, array)", () => {
    const indexes = [];
    myFilter([10, 20], (el, i) => {
      indexes.push(i);
      return true;
    });
    expect(indexes).toEqual([0, 1]);
  });
});

describe("myReduce", () => {
  it("z initialValue zaczyna od niego i od indeksu 0", () => {
    expect(myReduce([1, 2, 3], (acc, x) => acc + x, 10)).toBe(16);
    expect(myReduce([], (acc, x) => acc + x, 5), "dla pustej tablicy z initialValue wynik to initialValue").toBe(5);
  });

  it("bez initialValue pierwszy element staje się akumulatorem", () => {
    const steps = [];
    const result = myReduce([1, 2, 3], (acc, x, i) => {
      steps.push(i);
      return acc + x;
    });
    expect(result).toBe(6);
    expect(steps, "bez initialValue callback startuje od indeksu 1 — pierwszy element to startowy akumulator").toEqual([1, 2]);
  });

  it("pusta tablica bez initialValue rzuca TypeError", () => {
    expect(
      () => myReduce([], (acc, x) => acc + x),
      "specyfikacja: Reduce of empty array with no initial value → TypeError",
    ).toThrow(TypeError);
  });

  it("jawne undefined jako initialValue to NIE brak initialValue", () => {
    expect(
      myReduce([1], (acc) => acc, undefined),
      "rozróżnij brak trzeciego argumentu od jawnie przekazanego undefined (arguments.length / rest)",
    ).toBe(undefined);
  });
});

describe("uniqueFast", () => {
  it("usuwa duplikaty, zachowując kolejność pierwszych wystąpień", () => {
    expect(uniqueFast([1, 1, 2, 3, 2])).toEqual([1, 2, 3]);
    expect(uniqueFast([])).toEqual([]);
  });

  it("działa w czasie liniowym, nie kwadratowym", () => {
    expectScaling({
      fn: (input) => uniqueFast(input),
      makeInput: (n) => Array.from({ length: n }, (_, i) => i % Math.floor(n / 2)),
      sizes: [2000, 20000],
      expect: "linear",
    });
  });
});
