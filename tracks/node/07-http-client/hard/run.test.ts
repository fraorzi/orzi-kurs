import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

function sequence(responses: readonly Response[]): ReturnType<typeof vi.fn> {
  let call = 0;
  return vi.fn(async () => responses[Math.min(call++, responses.length - 1)]);
}

const status = (code: number, headers?: Record<string, string>) =>
  new Response(null, { status: code, headers });

describe("retry bezpiecznych żądań", () => {
  it("sukces za pierwszym razem nie ponawia", async () => {
    const fetcher = sequence([status(200)]);
    const response = await solve("https://api.test", 3, fetcher as unknown as typeof fetch, vi.fn());
    expect(response.status).toBe(200);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("ponawia 503 aż do sukcesu", async () => {
    const fetcher = sequence([status(503), status(503), status(200)]);
    const response = await solve("https://api.test", 5, fetcher as unknown as typeof fetch, vi.fn());
    expect(response.status).toBe(200);
    expect(fetcher).toHaveBeenCalledTimes(3);
  });

  it("nie ponawia statusów innych niż 429/503", async () => {
    for (const code of [404, 500]) {
      const fetcher = sequence([status(code), status(200)]);
      const response = await solve("https://api.test", 3, fetcher as unknown as typeof fetch, vi.fn());
      expect(response.status).toBe(code);
      expect(fetcher).toHaveBeenCalledTimes(1);
    }
  });

  it("po wyczerpaniu prób zwraca ostatnią odpowiedź przejściową", async () => {
    const fetcher = sequence([status(429), status(429)]);
    const response = await solve("https://api.test", 2, fetcher as unknown as typeof fetch, vi.fn());
    expect(response.status).toBe(429);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("respektuje Retry-After w sekundach, a brak nagłówka to sleep(0)", async () => {
    const sleep = vi.fn(async () => undefined);
    const fetcher = sequence([
      status(429, { "retry-after": "2" }),
      status(503),
      status(200),
    ]);
    await solve("https://api.test", 3, fetcher as unknown as typeof fetch, sleep);
    expect(sleep).toHaveBeenNthCalledWith(1, 2000);
    expect(sleep).toHaveBeenNthCalledWith(2, 0);
  });
});
