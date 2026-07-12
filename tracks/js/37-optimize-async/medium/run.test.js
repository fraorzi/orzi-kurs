import { describe, it, expect } from "vitest";
import { pooledMap } from "./starter.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("pooledMap — poprawność", () => {
  it("zwraca wyniki w kolejności items", async () => {
    const result = await pooledMap([1, 2, 3, 4, 5], async (x) => x * 2, 2);
    expect(result, "wyniki mają odpowiadać kolejności items niezależnie od czasu zakończenia").toEqual(
      [2, 4, 6, 8, 10],
    );
  });

  it("dla pustej listy zwraca pustą tablicę", async () => {
    await expect(pooledMap([], async (x) => x, 3)).resolves.toEqual([]);
  });
});

describe("pooledMap — współbieżność", () => {
  it("osiąga limit współbieżności i nigdy go nie przekracza", async () => {
    let active = 0;
    let maxActive = 0;
    const worker = async (x) => {
      active += 1;
      maxActive = Math.max(maxActive, active);
      await sleep(15);
      active -= 1;
      return x;
    };

    const items = Array.from({ length: 9 }, (_, i) => i);
    await pooledMap(items, worker, 3);

    expect(
      maxActive,
      "sekwencyjny starter daje maxActive = 1; pool ma trzymać dokładnie `limit` aktywnych zadań",
    ).toBe(3);
    expect(maxActive, "pool NIE może przekroczyć limitu (nie odpalaj wszystkiego Promise.all naraz)").toBeLessThanOrEqual(
      3,
    );
  });
});
