import { describe, it, expect } from "vitest";
import { batchFetch } from "./starter.js";

describe("batchFetch — poprawność", () => {
  it("zwraca wyniki dla wszystkich id, w kolejności", async () => {
    const fetchBatch = async (chunk) => chunk.map((id) => id * 10);
    expect(await batchFetch([1, 2, 3, 4], fetchBatch, 2)).toEqual([10, 20, 30, 40]);
  });

  it("zachowuje kolejność, gdy paczki kończą się w różnym czasie", async () => {
    const fetchBatch = async (chunk) => {
      await new Promise((r) => setTimeout(r, chunk[0] === 1 ? 20 : 1));
      return chunk.map((id) => id);
    };
    expect(
      await batchFetch([1, 2, 3, 4], fetchBatch, 2),
      "flat() po Promise.all zachowuje kolejność paczek niezależnie od czasu odpowiedzi",
    ).toEqual([1, 2, 3, 4]);
  });

  it("dla pustej listy zwraca pustą tablicę", async () => {
    let calls = 0;
    await batchFetch([], async (c) => {
      calls += 1;
      return c;
    }, 3);
    expect(calls).toBe(0);
  });
});

describe("batchFetch — liczba wywołań", () => {
  it("woła fetchBatch ceil(n / size) razy, nie n razy", async () => {
    let calls = 0;
    const fetchBatch = async (chunk) => {
      calls += 1;
      return chunk.map((id) => id * 10);
    };

    const result = await batchFetch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], fetchBatch, 3);
    expect(result).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    expect(
      calls,
      "10 id po 3 na paczkę = 4 wywołania (ceil(10/3)); starter woła fetchBatch 10 razy — grupuj w paczki",
    ).toBe(4);
  });
});
