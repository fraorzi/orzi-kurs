import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Dodaj timeout bez wycieku", () => {
  it("spełnia kontrakt zadania", async () => {
    const fetcher = vi.fn<typeof fetch>(async (_url, init) => {
      await new Promise((_resolve, reject) =>
        init?.signal?.addEventListener(
          "abort",
          () => reject(init.signal?.reason),
          { once: true },
        ),
      );
      return new Response();
    });
    await expect(solve("https://x.test", 5, fetcher)).rejects.toBeDefined();
    expect(fetcher.mock.calls[0]?.[1]?.signal).toBeInstanceOf(AbortSignal);
  });
});
