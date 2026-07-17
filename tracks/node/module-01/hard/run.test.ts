import { describe, expect, it } from "vitest";
import { solve } from "./starter";
describe("produkcyjny analizator NDJSON", () => {
  it("przetwarza strumień, limity i anulowanie", async () => {
    async function* chunks() {
      yield Buffer.from('{"level":"info"}\n{bad');
      yield Buffer.from('}\n{"level":"error"}');
    }
    await expect(
      solve(chunks(), { maxBytes: 200, maxLineBytes: 50, maxInvalid: 1 }),
    ).resolves.toEqual({ total: 2, invalid: 1, levels: { info: 1, error: 1 } });
    async function* huge() {
      yield Buffer.alloc(11);
    }
    await expect(
      solve(huge(), { maxBytes: 10, maxLineBytes: 20, maxInvalid: 0 }),
    ).rejects.toThrow(/Wejście/);
    const controller = new AbortController();
    controller.abort(new Error("stop"));
    await expect(
      solve(chunks(), {
        maxBytes: 200,
        maxLineBytes: 50,
        maxInvalid: 1,
        signal: controller.signal,
      }),
    ).rejects.toThrow(/stop/);
  });
});
