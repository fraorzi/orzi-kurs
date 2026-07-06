import { describe, it, expect } from "vitest";
import { serialize } from "./starter.js";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

describe("serialize", () => {
  it("wywołania wykonują się jedno naraz, nigdy równolegle", async () => {
    let active = 0;
    let maxActive = 0;
    const job = serialize(async () => {
      active++;
      maxActive = Math.max(maxActive, active);
      await wait(15);
      active--;
    });
    await Promise.all([job(), job(), job()]);
    expect(
      maxActive,
      "dwa wywołania fn biegły jednocześnie — kolejne ma startować dopiero po zakończeniu poprzedniego",
    ).toBe(1);
  });

  it("zachowuje kolejność FIFO niezależnie od czasów trwania", async () => {
    const started = [];
    const job = serialize(async (name, ms) => {
      started.push(name);
      await wait(ms);
      return name;
    });
    const results = await Promise.all([job("a", 30), job("b", 5), job("c", 1)]);
    expect(started, "wywołania mają STARTOWAĆ w kolejności zgłoszeń, nie według czasu trwania").toEqual(["a", "b", "c"]);
    expect(results).toEqual(["a", "b", "c"]);
  });

  it("każdy wywołujący dostaje wynik swojego wywołania", async () => {
    const job = serialize(async (x) => x * 2);
    const [r1, r2] = await Promise.all([job(3), job(5)]);
    expect(r1).toBe(6);
    expect(r2).toBe(10);
  });

  it("odrzucenie trafia do właściwego wywołującego", async () => {
    const job = serialize(async (shouldFail) => {
      if (shouldFail) throw new Error("boom");
      return "ok";
    });
    const p1 = job(false);
    const p2 = job(true);
    await expect(p1).resolves.toBe("ok");
    await expect(p2, "błąd z drugiego wywołania ma odrzucić promise drugiego wywołującego").rejects.toThrow("boom");
  });

  it("błąd nie zrywa kolejki — kolejne wywołania wykonują się normalnie", async () => {
    const job = serialize(async (shouldFail) => {
      if (shouldFail) throw new Error("boom");
      return "ok";
    });
    const failing = job(true);
    const after = job(false);
    await expect(failing).rejects.toThrow("boom");
    await expect(
      after,
      "po odrzuceniu jednego wywołania kolejka musi działać dalej — złap błąd w łańcuchu kolejki, nie propaguj go do następnych",
    ).resolves.toBe("ok");
  });

  it("argumenty są przekazywane do fn", async () => {
    const job = serialize(async (a, b) => a + b);
    await expect(job(2, 3)).resolves.toBe(5);
  });
});
