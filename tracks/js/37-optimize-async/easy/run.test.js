import { describe, it, expect } from "vitest";
import { loadAll } from "./starter.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("loadAll — poprawność", () => {
  it("zwraca wyniki w kolejności ids", async () => {
    const result = await loadAll([1, 2, 3], async (id) => id * 10);
    expect(result, "kolejność wyników ma odpowiadać kolejności ids").toEqual([10, 20, 30]);
  });

  it("dla pustej listy zwraca pustą tablicę", async () => {
    await expect(loadAll([], async (id) => id)).resolves.toEqual([]);
  });
});

describe("loadAll — współbieżność", () => {
  it("uruchamia operacje równolegle (maxActive > 1)", async () => {
    let active = 0;
    let maxActive = 0;
    const loadOne = async (id) => {
      active += 1;
      maxActive = Math.max(maxActive, active);
      await sleep(15);
      active -= 1;
      return id;
    };

    await loadAll([1, 2, 3, 4], loadOne);
    expect(
      maxActive,
      "sekwencyjny await daje maxActive = 1; niezależne operacje puść równolegle przez Promise.all(ids.map(loadOne))",
    ).toBeGreaterThan(1);
  });
});
