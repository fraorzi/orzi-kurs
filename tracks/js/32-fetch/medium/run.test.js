import { describe, it, expect, afterEach } from "vitest";
import { fetchWithTimeout, cancellableFetch } from "./starter.js";

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

const jsonResponse = (data, status = 200) => new Response(JSON.stringify(data), { status });

// Atrapa, która nigdy nie odpowiada — odrzuca się dopiero na abort (jak prawdziwy fetch).
const hangingFetch = (url, { signal }) =>
  new Promise((_, reject) => {
    signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
  });

describe("fetchWithTimeout", () => {
  it("zwraca dane, gdy odpowiedź przyjdzie przed upływem czasu", async () => {
    globalThis.fetch = async () => jsonResponse({ id: 1 });
    await expect(fetchWithTimeout("/api/szybkie", 50)).resolves.toEqual({ id: 1 });
  });

  it("rzuca Error('timeout'), gdy żądanie trwa dłużej niż ms", async () => {
    globalThis.fetch = hangingFetch;
    await expect(
      fetchWithTimeout("/api/wolne", 30),
      "po abort() fetch odrzuca błędem o name === 'AbortError' — zamień go na Error('timeout')",
    ).rejects.toThrow("timeout");
  });

  it("przekazuje signal do fetch", async () => {
    let receivedSignal;
    globalThis.fetch = async (url, options) => {
      receivedSignal = options?.signal;
      return jsonResponse({});
    };
    await fetchWithTimeout("/api/x", 50);
    expect(
      receivedSignal instanceof AbortSignal,
      "signal z AbortController musi trafić do fetch, inaczej abort nic nie zrobi",
    ).toBe(true);
  });

  it("błędy HTTP propagują się jako HTTP <status>, nie jako timeout", async () => {
    globalThis.fetch = async () => jsonResponse({}, 500);
    await expect(fetchWithTimeout("/api/x", 50)).rejects.toThrow("HTTP 500");
  });
});

describe("cancellableFetch", () => {
  it("cancel() powoduje odrzucenie z Error('cancelled')", async () => {
    globalThis.fetch = hangingFetch;
    const { promise, cancel } = cancellableFetch("/api/wolne");
    cancel();
    await expect(
      promise,
      "cancel ma wołać controller.abort(), a AbortError zamieniasz na Error('cancelled')",
    ).rejects.toThrow("cancelled");
  });

  it("bez cancel() zwraca normalnie dane", async () => {
    globalThis.fetch = async () => jsonResponse({ ok: true });
    const { promise } = cancellableFetch("/api/x");
    await expect(promise).resolves.toEqual({ ok: true });
  });
});
