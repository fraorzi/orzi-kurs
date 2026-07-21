import { readFileSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";
import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

describe("deadline zamykania", () => {
  it("szybki cleanup daje clean bez wywołania force", async () => {
    const force = vi.fn();
    await expect(solve(Promise.resolve(), 1000, force)).resolves.toBe("clean");
    expect(force).not.toHaveBeenCalled();
  });

  it("wiszący cleanup po deadlinie daje forced", async () => {
    const force = vi.fn();
    const hanging = new Promise<void>(() => undefined);
    await expect(solve(hanging, 10, force)).resolves.toBe("forced");
    expect(force).toHaveBeenCalledTimes(1);
  });

  it("cleanup wygrywający wyścig anuluje eskalację", async () => {
    const force = vi.fn();
    const quick = delay(1).then(() => undefined);
    await expect(solve(quick, 5000, force)).resolves.toBe("clean");
    await delay(20);
    expect(force).not.toHaveBeenCalled();
  });

  it("timer watchdoga jest unref-owany i sprzątany", () => {
    const source = readFileSync(new URL("./starter.ts", import.meta.url), "utf8");
    expect(source).toContain("unref");
    expect(source).toContain("clearTimeout");
  });
});
