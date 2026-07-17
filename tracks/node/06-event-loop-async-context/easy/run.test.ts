import { setImmediate as tick } from "node:timers/promises";
import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("uczciwe oddawanie sterowania", () => {
  it("mapuje wszystkie elementy z zachowaniem kolejności", async () => {
    await expect(
      solve([1, 2, 3, 4, 5], 2, (x: number) => x * 10),
    ).resolves.toEqual([10, 20, 30, 40, 50]);
  });

  it("oddaje sterowanie między partiami — praca z zewnątrz się przeplata", async () => {
    const order: string[] = [];
    const outsider = (async () => {
      await tick();
      order.push("outsider");
    })();
    await solve(["a", "b", "c", "d"], 2, (item: string) => {
      order.push(item);
      return item;
    });
    await outsider;
    expect(order.indexOf("outsider")).toBeGreaterThan(order.indexOf("b"));
    expect(order.indexOf("outsider")).toBeLessThan(order.indexOf("c"));
  });

  it("działa dla partii większej niż lista i dla pustej listy", async () => {
    await expect(solve([1], 10, (x: number) => x)).resolves.toEqual([1]);
    await expect(solve([], 3, (x: number) => x)).resolves.toEqual([]);
  });

  it("odrzuca batchSize mniejszy niż 1", async () => {
    await expect(solve([1], 0, (x: number) => x)).rejects.toThrow();
  });
});
