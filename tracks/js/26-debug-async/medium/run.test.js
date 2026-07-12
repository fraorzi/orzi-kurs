import { describe, it, expect } from "vitest";
import { processAll, mapAsync } from "./starter.js";

describe("processAll", () => {
  it("zwraca wyniki asyncFn dla każdego elementu", async () => {
    await expect(
      processAll([1, 2, 3], async (x) => x * 2),
      "forEach(async ...) nie czeka na callbacki — użyj for..of z await albo Promise.all",
    ).resolves.toEqual([2, 4, 6]);
  });

  it("dla pustej listy zwraca pustą tablicę", async () => {
    await expect(processAll([], async (x) => x)).resolves.toEqual([]);
  });
});

describe("mapAsync", () => {
  it("zwraca tablicę wartości, nie obietnic", async () => {
    const result = await mapAsync([1, 2, 3], async (x) => x * 2);
    expect(
      result,
      "items.map(async) daje tablicę obietnic — zbierz je przez Promise.all",
    ).toEqual([2, 4, 6]);
  });

  it("żaden element wyniku nie jest obietnicą", async () => {
    const result = await mapAsync([1], async (x) => x);
    expect(result[0] instanceof Promise, "elementy mają być rozwiązanymi wartościami").toBe(false);
  });
});
