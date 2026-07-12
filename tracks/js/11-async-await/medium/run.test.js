import { describe, it, expect } from "vitest";
import { runSequential, runParallel } from "./starter.js";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function instrumented(count, ms) {
  let active = 0;
  let maxActive = 0;
  const tasks = Array.from({ length: count }, (_, i) => async () => {
    active++;
    maxActive = Math.max(maxActive, active);
    await wait(ms);
    active--;
    return i * 10;
  });
  return { tasks, getMaxActive: () => maxActive };
}

describe("runSequential", () => {
  it("zwraca wyniki w kolejności wejścia", async () => {
    const { tasks } = instrumented(3, 5);
    await expect(runSequential(tasks)).resolves.toEqual([0, 10, 20]);
  });

  it("w locie jest zawsze najwyżej jedno zadanie", async () => {
    const { tasks, getMaxActive } = instrumented(4, 15);
    await runSequential(tasks);
    expect(
      getMaxActive(),
      "zadania nachodzą na siebie — kolejne ma startować dopiero po await poprzedniego",
    ).toBe(1);
  });

  it("łączny czas to suma czasów zadań", async () => {
    const { tasks } = instrumented(3, 40);
    const start = performance.now();
    await runSequential(tasks);
    expect(performance.now() - start, "3 zadania po 40ms sekwencyjnie to co najmniej ~120ms").toBeGreaterThanOrEqual(110);
  });
});

describe("runParallel", () => {
  it("zwraca wyniki w kolejności wejścia", async () => {
    const tasks = [
      async () => {
        await wait(30);
        return "wolny";
      },
      async () => "szybki",
    ];
    await expect(
      runParallel(tasks),
      "kolejność wyników ma odpowiadać wejściu, nie kolejności kończenia",
    ).resolves.toEqual(["wolny", "szybki"]);
  });

  it("wszystkie zadania biegną jednocześnie", async () => {
    const { tasks, getMaxActive } = instrumented(3, 30);
    await runParallel(tasks);
    expect(
      getMaxActive(),
      "zadania wykonały się po kolei — wszystkie mają wystartować PRZED czekaniem (Promise.all), nie await w pętli",
    ).toBe(3);
  });

  it("łączny czas to czas najwolniejszego zadania, nie suma", async () => {
    const { tasks } = instrumented(3, 40);
    const start = performance.now();
    await runParallel(tasks);
    expect(performance.now() - start, "równolegle 3×40ms ma trwać ~40ms, nie ~120ms").toBeLessThan(100);
  });

  it("błąd któregokolwiek zadania odrzuca całość", async () => {
    const tasks = [
      async () => "ok",
      async () => {
        throw new Error("boom");
      },
    ];
    await expect(runParallel(tasks)).rejects.toThrow("boom");
  });
});
