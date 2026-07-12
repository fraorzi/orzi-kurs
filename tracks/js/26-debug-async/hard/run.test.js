import { describe, it, expect } from "vitest";
import { fetchAll } from "./starter.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("fetchAll", () => {
  it("zwraca wyniki w kolejności ids", async () => {
    const result = await fetchAll([1, 2, 3, 4], async (id) => id * 2);
    expect(result, "Promise.all zachowuje kolejność wejścia niezależnie od czasu zakończenia").toEqual([
      2, 4, 6, 8,
    ]);
  });

  it("pobiera równolegle — wiele operacji aktywnych naraz (maxActive > 1)", async () => {
    let active = 0;
    let maxActive = 0;
    const fetchOne = async (id) => {
      active += 1;
      maxActive = Math.max(maxActive, active);
      await sleep(15);
      active -= 1;
      return id * 2;
    };

    await fetchAll([1, 2, 3, 4], fetchOne);
    expect(
      maxActive,
      "sekwencyjny await w pętli daje maxActive = 1; niezależne pobrania puść równolegle przez Promise.all(ids.map(fetchOne))",
    ).toBeGreaterThan(1);
  });

  it("dla pustej listy zwraca pustą tablicę", async () => {
    await expect(fetchAll([], async (id) => id)).resolves.toEqual([]);
  });
});
