import { describe, expect, it, vi } from "vitest";
import { runCli } from "./starter";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

describe("CLI pool + retry", () => {
  it("ogranicza szczytową równoległość do limitu", async () => {
    let active = 0;
    let peak = 0;
    await runCli([1, 2, 3, 4], 2, async (value) => {
      active += 1;
      peak = Math.max(peak, active);
      await Promise.resolve();
      active -= 1;
      return value * 2;
    });
    expect(peak).toBeLessThanOrEqual(2);
  });

  it("zachowuje kolejność wyników mimo odwróconej kolejności zakończenia", async () => {
    const first = deferred<number>();
    const second = deferred<number>();
    const resultPromise = runCli([1, 2], 2, (value) =>
      value === 1 ? first.promise : second.promise,
    );
    second.resolve(20);
    first.resolve(10);
    await expect(resultPromise).resolves.toEqual([10, 20]);
  });

  it("ponawia błąd transient i zwraca wynik po udanej próbie", async () => {
    let attempts = 0;
    const worker = async (value: number) => {
      attempts += 1;
      if (attempts < 2) {
        throw Object.assign(new Error("retry"), { transient: true });
      }
      return value * 2;
    };
    await expect(runCli([5], 3, worker)).resolves.toEqual([10]);
    expect(attempts).toBe(2);
  });

  it("przerywa po trzech nieudanych próbach mimo flagi transient", async () => {
    let attempts = 0;
    const worker = async () => {
      attempts += 1;
      throw Object.assign(new Error("timeout"), { transient: true });
    };
    await expect(runCli([1], 1, worker)).rejects.toThrow("timeout");
    expect(attempts).toBe(3);
  });

  it("nie ponawia błędu bez flagi transient", async () => {
    let attempts = 0;
    const worker = async () => {
      attempts += 1;
      throw new Error("bad request");
    };
    await expect(runCli([1], 1, worker)).rejects.toThrow("bad request");
    expect(attempts).toBe(1);
  });

  it("odrzuca nieprawidłowy limit przed wywołaniem workera", async () => {
    const worker = vi.fn(async (value: number) => value);
    await expect(runCli([1, 2], 0, worker)).rejects.toThrow();
    expect(worker).not.toHaveBeenCalled();
  });
});
