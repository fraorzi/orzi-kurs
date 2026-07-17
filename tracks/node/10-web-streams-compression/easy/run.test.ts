import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Zbierz ReadableStream z limitem", () => {
  it("spełnia kontrakt zadania", async () => {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array([1, 2]));
        controller.enqueue(new Uint8Array([3]));
        controller.close();
      },
    });
    expect([...(await solve(stream, 3))]).toEqual([1, 2, 3]);
    const large = new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array(4));
      },
    });
    await expect(solve(large, 3)).rejects.toThrow(/Limit/);
  });
});
