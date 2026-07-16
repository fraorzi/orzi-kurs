import { describe, expect, it } from "vitest";
import { mapConcurrent } from "./starter";

describe("mapConcurrent", () => {
  it("ogranicza współbieżność i zachowuje kolejność", async () => {
    let active = 0;
    let maxActive = 0;
    const result = await mapConcurrent([30, 5, 15, 1], 2, async (delay, index) => {
      active += 1;
      maxActive = Math.max(maxActive, active);
      await new Promise((resolve) => setTimeout(resolve, delay));
      active -= 1;
      return `${index}:${delay}`;
    });
    expect(result).toEqual(["0:30", "1:5", "2:15", "3:1"]);
    expect(maxActive).toBe(2);
  });

  it("przekazuje indeks i sygnał", async () => {
    const controller = new AbortController();
    const seen: Array<[string, number, AbortSignal | undefined]> = [];
    await mapConcurrent(
      ["a", "b"],
      1,
      async (item, index, signal) => {
        seen.push([item, index, signal]);
        return item;
      },
      controller.signal,
    );
    expect(seen).toEqual([
      ["a", 0, controller.signal],
      ["b", 1, controller.signal],
    ]);
  });

  it("po anulowaniu nie uruchamia kolejnych elementów", async () => {
    const controller = new AbortController();
    const started: number[] = [];
    const promise = mapConcurrent(
      [0, 1, 2, 3],
      1,
      async (item) => {
        started.push(item);
        if (item === 0) controller.abort();
        return item;
      },
      controller.signal,
    );
    await expect(promise).rejects.toMatchObject({ name: "AbortError" });
    expect(started).toEqual([0]);
  });

  it.each([0, -1, 1.5])("odrzuca limit=%s", async (limit) => {
    await expect(
      mapConcurrent([], limit, async (item) => item),
    ).rejects.toBeInstanceOf(RangeError);
  });
});
