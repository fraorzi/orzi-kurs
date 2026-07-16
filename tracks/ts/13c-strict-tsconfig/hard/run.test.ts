import { describe, expect, it, vi } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { runJob } from "./src/worker";

describe("runJob", () => {
  it("zachowuje generyczny typ sukcesu", async () => {
    const result = await runJob(
      { id: "j1", state: "queued" },
      async () => ({ processed: 3 }),
    );
    type _result = Expect<
      Equal<
        typeof result,
        | { ok: true; value: { processed: number } }
        | { ok: false; message: string }
      >
    >;
    expect(result).toEqual({ ok: true, value: { processed: 3 } });
  });

  it("normalizuje Error i dowolną rzuconą wartość", async () => {
    await expect(
      runJob({ id: "j2", state: "running" }, async () => {
        throw new Error("network");
      }),
    ).resolves.toEqual({ ok: false, message: "network" });

    await expect(
      runJob({ id: "j3", state: "running" }, async () => {
        throw "boom";
      }),
    ).resolves.toEqual({ ok: false, message: "unknown error" });
  });

  it("nie uruchamia anulowanego zadania", async () => {
    const execute = vi.fn(async () => true);
    await expect(
      runJob({ id: "j4", state: "cancelled" }, execute),
    ).resolves.toEqual({ ok: false, message: "job cancelled" });
    expect(execute).not.toHaveBeenCalled();
  });
});
