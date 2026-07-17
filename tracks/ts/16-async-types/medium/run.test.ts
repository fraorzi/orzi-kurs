import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { captureAsync, type AsyncResult } from "./starter";

describe("captureAsync", () => {
  it("zachowuje typ i wartość sukcesu", async () => {
    const result = await captureAsync(async () => ({ id: 7 }));
    type _result = Expect<
      Equal<typeof result, AsyncResult<{ id: number }>>
    >;
    expect(result).toEqual({ ok: true, value: { id: 7 } });
  });

  it("rozpoznaje AbortError", async () => {
    const error = new DOMException("stopped", "AbortError");
    await expect(
      captureAsync(async () => {
        throw error;
      }),
    ).resolves.toEqual({
      ok: false,
      error: { kind: "aborted", message: "stopped" },
    });
  });

  it("normalizuje Error i inne wartości", async () => {
    await expect(
      captureAsync(async () => {
        throw new Error("network");
      }),
    ).resolves.toEqual({
      ok: false,
      error: { kind: "failed", message: "network" },
    });
    await expect(
      captureAsync(async () => {
        throw 503;
      }),
    ).resolves.toEqual({
      ok: false,
      error: { kind: "failed", message: "Unknown error" },
    });
  });
});
