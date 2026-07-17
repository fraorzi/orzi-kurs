import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

describe("idempotentny shutdown", () => {
  it("uruchamia wszystkie cleanupy dokładnie raz", async () => {
    const a = vi.fn(async () => undefined);
    const b = vi.fn(async () => undefined);
    const shutdown = solve([a, b]);
    await shutdown();
    await shutdown();
    expect(a).toHaveBeenCalledTimes(1);
    expect(b).toHaveBeenCalledTimes(1);
  });

  it("równoległe wywołania dzielą jeden przebieg", async () => {
    const cleanup = vi.fn(async () => undefined);
    const shutdown = solve([cleanup]);
    await Promise.all([shutdown(), shutdown(), shutdown()]);
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it("każde wywołanie zwraca ten sam promise", () => {
    const shutdown = solve([async () => undefined]);
    expect(shutdown()).toBe(shutdown());
  });

  it("awaria jednego cleanupu nie pomija pozostałych, ale odrzuca wynik", async () => {
    const before = vi.fn(async () => undefined);
    const failing = vi.fn(async () => {
      throw new Error("nie zamknęło się");
    });
    const after = vi.fn(async () => undefined);
    const shutdown = solve([before, failing, after]);
    await expect(shutdown()).rejects.toThrow("nie zamknęło się");
    expect(before).toHaveBeenCalledTimes(1);
    expect(after).toHaveBeenCalledTimes(1);
  });
});
