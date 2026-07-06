import { describe, it, expect } from "vitest";
import { promisePool } from "./starter.js";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function instrumentedTasks(count, ms) {
  let active = 0;
  let maxActive = 0;
  const tasks = Array.from({ length: count }, (_, i) => async () => {
    active++;
    maxActive = Math.max(maxActive, active);
    await wait(ms);
    active--;
    return i;
  });
  return { tasks, getMaxActive: () => maxActive };
}

describe("promisePool", () => {
  it("zwraca wyniki wszystkich zadań w kolejności wejścia", async () => {
    const tasks = [
      async () => {
        await wait(40);
        return "a";
      },
      async () => {
        await wait(5);
        return "b";
      },
      async () => "c",
    ];
    expect(
      await promisePool(tasks, 2),
      "wynik[i] ma odpowiadać tasks[i], nawet gdy zadania kończą się w innej kolejności",
    ).toEqual(["a", "b", "c"]);
  });

  it("nigdy nie przekracza limitu współbieżności", async () => {
    const { tasks, getMaxActive } = instrumentedTasks(9, 20);
    await promisePool(tasks, 3);
    expect(
      getMaxActive(),
      "w locie było więcej zadań niż limit — kolejne zadanie może startować dopiero, gdy poprzednie się skończy",
    ).toBeLessThanOrEqual(3);
  });

  it("wykorzystuje pełny limit (zadania faktycznie biegną równolegle)", async () => {
    const { tasks, getMaxActive } = instrumentedTasks(9, 20);
    const start = performance.now();
    await promisePool(tasks, 3);
    const elapsed = performance.now() - start;
    expect(getMaxActive(), "pool ma trzymać limit zadań w locie, nie wykonywać ich pojedynczo").toBe(3);
    expect(elapsed, "9 zadań po ~20ms z limitem 3 to ~3 tury — sekwencyjne wykonanie trwałoby ~180ms").toBeLessThan(150);
  });

  it("nie uruchamia z góry więcej niż limit zadań", async () => {
    let started = 0;
    const tasks = Array.from({ length: 6 }, () => async () => {
      started++;
      await wait(30);
    });
    const pool = promisePool(tasks, 2);
    await wait(5);
    expect(started, "zadania spoza limitu nie mogą startować od razu — czekają na wolne miejsce").toBe(2);
    await pool;
    expect(started).toBe(6);
  });

  it("pierwszy błąd odrzuca całość i zatrzymuje kolejkę", async () => {
    let startedAfterError = false;
    const tasks = [
      async () => {
        await wait(10);
        throw new Error("boom");
      },
      async () => {
        await wait(5);
        return "ok";
      },
      async () => {
        startedAfterError = true;
      },
    ];
    await expect(promisePool(tasks, 1)).rejects.toThrow("boom");
    await wait(30);
    expect(startedAfterError, "po błędzie nie wolno startować kolejnych zadań z kolejki").toBe(false);
  });

  it("pusta tablica zadań daje pustą tablicę wyników", async () => {
    await expect(promisePool([], 4)).resolves.toEqual([]);
  });
});
