import { describe, expect, it } from "vitest";
import { solve } from "./starter";

function hangingFetcher(): typeof fetch {
  return (async (_url: unknown, init?: RequestInit) =>
    new Promise<Response>((_, reject) => {
      init?.signal?.addEventListener("abort", () =>
        reject(init.signal?.reason ?? new Error("aborted")),
      );
    })) as typeof fetch;
}

describe("timeout i anulowanie żądania", () => {
  it("przekazuje AbortSignal do fetchera", async () => {
    let captured: RequestInit | undefined;
    const fetcher = (async (_url: unknown, init?: RequestInit) => {
      captured = init;
      return new Response("ok");
    }) as typeof fetch;
    await solve("https://api.test", 1000, fetcher);
    expect(captured?.signal).toBeInstanceOf(AbortSignal);
  });

  it("po przekroczeniu budżetu żądanie jest przerywane", async () => {
    await expect(
      solve("https://api.test", 5, hangingFetcher()),
    ).rejects.toThrow();
  });

  it("anulowanie rodzica przerywa żądanie przed timeoutem", async () => {
    const controller = new AbortController();
    const pending = solve(
      "https://api.test",
      60_000,
      hangingFetcher(),
      controller.signal,
    );
    controller.abort(new Error("użytkownik anulował"));
    await expect(pending).rejects.toThrow("użytkownik anulował");
  });

  it("bez rodzica zwraca odpowiedź przed upływem budżetu", async () => {
    const fetcher = (async () => new Response("ok")) as typeof fetch;
    const response = await solve("https://api.test", 1000, fetcher);
    await expect(response.text()).resolves.toBe("ok");
  });
});
