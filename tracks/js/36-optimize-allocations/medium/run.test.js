import { describe, it, expect } from "vitest";
import { expectScaling } from "@harness/bench";
import { mergeAll } from "./starter.js";

describe("mergeAll — poprawność", () => {
  it("scala obiekty; późniejsze klucze nadpisują wcześniejsze", () => {
    expect(mergeAll([{ a: 1 }, { b: 2 }, { a: 9 }])).toEqual({ a: 9, b: 2 });
  });

  it("dla pustej listy zwraca pusty obiekt", () => {
    expect(mergeAll([])).toEqual({});
  });

  it("nie mutuje obiektów wejściowych", () => {
    const first = { a: 1 };
    mergeAll([first, { b: 2 }]);
    expect(first, "scalaj do NOWEGO celu, nie do pierwszego obiektu z listy").toEqual({ a: 1 });
  });
});

describe("mergeAll — złożoność", () => {
  it("[quality] działa w czasie liniowym względem liczby kluczy, nie kwadratowym", () => {
    expectScaling({
      fn: (objects) => mergeAll(objects),
      makeInput: (n) => Array.from({ length: n }, (_, i) => ({ [`k${i}`]: i })),
      // mniejsze rozmiary: spread obiektu w reduce jest ekstremalnie wolny (O(n²) kopii kluczy),
      // a to wystarcza, by odróżnić klasy złożoności bez ryzyka timeoutu.
      sizes: [500, 5000],
      expect: "linear",
    });
  });
});
