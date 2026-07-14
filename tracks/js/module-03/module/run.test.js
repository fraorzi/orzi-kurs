import { describe, it, expect } from "vitest";
import { createListClient, createCache, debounce } from "./src/index.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("createCache — Map kluczowany (query, page)", () => {
  it("rozróżnia wpisy po query i page", () => {
    const cache = createCache();
    cache.set("a", 1, ["x"]);
    cache.set("a", 2, ["y"]);
    cache.set("b", 1, ["z"]);
    expect(cache.get("a", 1)).toEqual(["x"]);
    expect(cache.get("a", 2)).toEqual(["y"]);
    expect(cache.has("b", 1)).toBe(true);
    expect(cache.has("b", 2)).toBe(false);
    expect(cache.size).toBe(3);
  });
});

describe("debounce", () => {
  it("woła fn raz, z ostatnimi argumentami, po ciszy", async () => {
    const calls = [];
    const d = debounce((x) => calls.push(x), 20);
    d(1);
    d(2);
    d(3);
    expect(calls, "nic przed upływem okna").toEqual([]);
    await sleep(50);
    expect(calls, "jedno wywołanie z ostatnim argumentem").toEqual([3]);
  });
});

describe("createListClient — paginacja i cache", () => {
  it("search zwraca pierwszą stronę, next dokłada kolejne", async () => {
    const fetchImpl = async (url) => {
      const page = Number(new URLSearchParams(url.slice(1)).get("page"));
      return jsonResponse({ items: [`p${page}a`, `p${page}b`], hasMore: page < 2 });
    };
    const client = createListClient({ fetchImpl });
    const first = await client.search("x");
    expect(first).toEqual(["p1a", "p1b"]);
    expect(client.hasMore).toBe(true);
    expect(client.page).toBe(1);

    const withSecond = await client.next();
    expect(withSecond).toEqual(["p1a", "p1b", "p2a", "p2b"]);
    expect(client.hasMore).toBe(false);
    expect(client.page).toBe(2);
  });

  it("next nic nie robi, gdy nie ma kolejnej strony", async () => {
    const fetchImpl = async () => jsonResponse({ items: ["only"], hasMore: false });
    const client = createListClient({ fetchImpl });
    await client.search("x");
    const same = await client.next();
    expect(same).toEqual(["only"]);
  });

  it("cache oszczędza ponowny fetch tej samej strony", async () => {
    let calls = 0;
    const fetchImpl = async (url) => {
      calls += 1;
      const page = Number(new URLSearchParams(url.slice(1)).get("page"));
      return jsonResponse({ items: [`p${page}`], hasMore: page < 2 });
    };
    const client = createListClient({ fetchImpl });
    await client.search("x"); // fetch page 1
    await client.next(); // fetch page 2
    expect(calls).toBe(2);
    expect(client.cacheSize).toBe(2);

    const again = await client.search("x"); // page 1 z cache
    expect(again).toEqual(["p1"]);
    expect(calls, "strona 1 wzięta z cache").toBe(2);
  });

  it("search anuluje poprzednie żądanie przy zmianie zapytania", async () => {
    const signals = [];
    const resolvers = [];
    const fetchImpl = (url, { signal }) => {
      signals.push(signal);
      return new Promise((resolve, reject) => {
        signal.addEventListener("abort", () =>
          reject(new DOMException("Aborted", "AbortError")),
        );
        resolvers.push(() => resolve(jsonResponse({ items: [url], hasMore: false })));
      });
    };
    const client = createListClient({ fetchImpl });
    const p1 = client.search("a"); // wisi
    const p2 = client.search("b"); // anuluje pierwsze
    expect(signals[0].aborted, "pierwsze żądanie przerwane").toBe(true);

    resolvers[1](); // rozstrzygnij drugie
    await expect(p1, "anulowane wyszukiwanie odrzucone").rejects.toThrow();
    const items = await p2;
    expect(items).toEqual(["?q=b&page=1"]);
  });
});
