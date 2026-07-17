import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    headers: { "content-type": "application/json; charset=utf-8" },
    ...init,
  });
}

describe("walidacja odpowiedzi HTTP", () => {
  it("zwraca sparsowany JSON dla poprawnej odpowiedzi", async () => {
    const fetcher = vi.fn(async () => jsonResponse({ id: 7 }));
    await expect(solve("https://api.test/items", fetcher as typeof fetch))
      .resolves.toEqual({ id: 7 });
    expect(fetcher).toHaveBeenCalledWith("https://api.test/items");
  });

  it("odrzuca status spoza 2xx z numerem statusu w komunikacie", async () => {
    const fetcher = async () => new Response("upadło", { status: 503 });
    await expect(solve("https://api.test", fetcher as typeof fetch))
      .rejects.toThrow(/503/);
  });

  it("odrzuca odpowiedź bez content-type application/json", async () => {
    const fetcher = async () =>
      new Response("<html>", {
        headers: { "content-type": "text/html" },
      });
    await expect(solve("https://api.test", fetcher as typeof fetch))
      .rejects.toThrow();
  });

  it("akceptuje content-type z parametrem charset", async () => {
    const fetcher = async () => jsonResponse([1, 2]);
    await expect(solve("https://api.test", fetcher as typeof fetch))
      .resolves.toEqual([1, 2]);
  });
});
