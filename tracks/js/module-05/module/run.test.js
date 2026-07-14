import { describe, it, expect } from "vitest";
import { createScheduler, createPool, withRetry, createBatcher } from "./src/index.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("createPool — limit współbieżności", () => {
  it("nie przekracza `concurrency` i zwraca wyniki w kolejności", async () => {
    const pool = createPool(2);
    const make = (v) => async () => {
      await sleep(10);
      return v;
    };
    const results = await pool.runAll([make("a"), make("b"), make("c"), make("d"), make("e")]);
    expect(results).toEqual(["a", "b", "c", "d", "e"]);
    expect(pool.maxActive, "najwyżej 2 równocześnie").toBe(2);
  });

  it("propaguje odrzucenie zadania", async () => {
    const pool = createPool(1);
    await expect(pool.run(async () => Promise.reject(new Error("nope")))).rejects.toThrow("nope");
  });
});

describe("withRetry — ponawianie z backoffem", () => {
  it("zwraca wynik po serii błędów", async () => {
    let calls = 0;
    const task = async () => {
      calls += 1;
      if (calls < 3) throw new Error("flaky");
      return "ok";
    };
    const result = await withRetry(task, { retries: 3, backoffMs: 0 });
    expect(result).toBe("ok");
    expect(calls).toBe(3);
  });

  it("rzuca ostatni błąd po wyczerpaniu prób", async () => {
    let calls = 0;
    const task = async () => {
      calls += 1;
      throw new Error(`err ${calls}`);
    };
    await expect(withRetry(task, { retries: 2, backoffMs: 0 })).rejects.toThrow("err 3");
    expect(calls, "retries=2 ⇒ 3 próby").toBe(3);
  });
});

describe("createBatcher — grupowanie żądań", () => {
  it("grupuje do maxSize i rozdziela wyniki do właściwych load", async () => {
    const batches = [];
    const batchFn = async (keys) => {
      batches.push(keys);
      return keys.map((k) => `v:${k}`);
    };
    const b = createBatcher(batchFn, { maxSize: 2 });
    const p1 = b.load("a");
    const p2 = b.load("b"); // osiąga maxSize → auto-flush [a, b]
    const p3 = b.load("c");
    await b.flush(); // ręczny flush [c]

    expect(await p1).toBe("v:a");
    expect(await p2).toBe("v:b");
    expect(await p3).toBe("v:c");
    expect(batches).toEqual([
      ["a", "b"],
      ["c"],
    ]);
  });

  it("flush pustej kolejki nie woła batchFn", async () => {
    let called = 0;
    const b = createBatcher(async (keys) => {
      called += 1;
      return keys;
    });
    await b.flush();
    expect(called).toBe(0);
  });

  it("odrzucenie batchFn odrzuca wszystkie load z partii", async () => {
    const b = createBatcher(async () => {
      throw new Error("boom");
    });
    const p1 = b.load("a");
    const p2 = b.load("b");
    const done = b.flush();
    await expect(p1).rejects.toThrow("boom");
    await expect(p2).rejects.toThrow("boom");
    await done;
  });
});

describe("createScheduler — pool + retry razem", () => {
  it("respektuje concurrency i zwraca wyniki w kolejności", async () => {
    const scheduler = createScheduler({ concurrency: 2, retries: 0, backoffMs: 0 });
    const make = (v) => async () => {
      await sleep(10);
      return v;
    };
    const results = await scheduler.runAll([make(1), make(2), make(3), make(4)]);
    expect(results).toEqual([1, 2, 3, 4]);
    expect(scheduler.maxActive).toBe(2);
  });

  it("ponawia nieudane zadanie wg konfiguracji", async () => {
    let calls = 0;
    const flaky = async () => {
      calls += 1;
      if (calls < 3) throw new Error("fail");
      return "ok";
    };
    const scheduler = createScheduler({ concurrency: 1, retries: 2, backoffMs: 0 });
    expect(await scheduler.run(flaky)).toBe("ok");
    expect(calls).toBe(3);
  });
});
