import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Ponawiaj tylko bezpieczne operacje", () => {
  it("spełnia kontrakt zadania", async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        new Response(null, { status: 503, headers: { "retry-after": "2" } }),
      )
      .mockResolvedValueOnce(new Response("ok"));
    const sleep = vi.fn(async () => undefined);
    expect((await solve("https://x.test", 3, fetcher, sleep)).status).toBe(200);
    expect(sleep).toHaveBeenCalledWith(2000);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
