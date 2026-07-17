import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Sprawdź status i typ odpowiedzi", () => {
  it("spełnia kontrakt zadania", async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        new Response('{"id":1}', {
          headers: { "content-type": "application/json" },
        }),
      );
    await expect(
      solve<{
        id: number;
      }>("https://x.test", fetcher),
    ).resolves.toEqual({ id: 1 });
    await expect(
      solve("https://x.test", async () => new Response("no", { status: 503 })),
    ).rejects.toThrow(/503/);
  });
});
