import { describe, it, expect } from "vitest";
import { createApiClient, requestJson, createQueue, HttpError } from "./src/index.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("requestJson — retry / timeout / błędy HTTP", () => {
  it("zwraca sparsowany JSON przy 200", async () => {
    const fetchImpl = async () => jsonResponse({ ok: true, id: 7 });
    const data = await requestJson(fetchImpl, "/x", { retries: 0, backoffMs: 0 });
    expect(data).toEqual({ ok: true, id: 7 });
  });

  it("NIE ponawia przy 4xx i rzuca HttpError ze statusem", async () => {
    let calls = 0;
    const fetchImpl = async () => {
      calls += 1;
      return jsonResponse({ error: "not found" }, 404);
    };
    await expect(requestJson(fetchImpl, "/x", { retries: 2, backoffMs: 0 })).rejects.toBeInstanceOf(
      HttpError,
    );
    expect(calls, "4xx nie ma być ponawiane").toBe(1);
  });

  it("ponawia przy 5xx i zwraca wynik po sukcesie", async () => {
    let calls = 0;
    const fetchImpl = async () => {
      calls += 1;
      if (calls < 3) return jsonResponse({ error: "boom" }, 500);
      return jsonResponse({ ok: true });
    };
    const data = await requestJson(fetchImpl, "/x", { retries: 2, backoffMs: 0 });
    expect(data).toEqual({ ok: true });
    expect(calls, "dwie próby 5xx + jedna udana").toBe(3);
  });

  it("rzuca po wyczerpaniu prób przy uporczywym 5xx", async () => {
    let calls = 0;
    const fetchImpl = async () => {
      calls += 1;
      return jsonResponse({ error: "boom" }, 503);
    };
    await expect(requestJson(fetchImpl, "/x", { retries: 2, backoffMs: 0 })).rejects.toBeInstanceOf(
      HttpError,
    );
    expect(calls, "retries=2 ⇒ 3 próby razem").toBe(3);
  });

  it("ponawia przy błędzie sieci", async () => {
    let calls = 0;
    const fetchImpl = async () => {
      calls += 1;
      if (calls < 2) throw new TypeError("network down");
      return jsonResponse({ ok: true });
    };
    const data = await requestJson(fetchImpl, "/x", { retries: 2, backoffMs: 0 });
    expect(data).toEqual({ ok: true });
    expect(calls).toBe(2);
  });

  it("przerywa zawieszony request po timeoutMs (AbortController)", async () => {
    const fetchImpl = (url, { signal }) =>
      new Promise((_resolve, reject) => {
        signal.addEventListener("abort", () =>
          reject(new DOMException("Aborted", "AbortError")),
        );
      });
    await expect(
      requestJson(fetchImpl, "/x", { retries: 0, backoffMs: 0, timeoutMs: 10 }),
    ).rejects.toThrow();
  });
});

describe("createQueue — limit współbieżności", () => {
  it("nie uruchamia więcej niż `concurrency` zadań naraz", async () => {
    const queue = createQueue(2);
    let active = 0;
    let maxActive = 0;
    const task = () => async () => {
      active += 1;
      maxActive = Math.max(maxActive, active);
      await sleep(10);
      active -= 1;
      return "done";
    };
    const results = await Promise.all(
      [task(), task(), task(), task(), task()].map((t) => queue.add(t)),
    );
    expect(maxActive, "najwyżej 2 zadania równocześnie").toBe(2);
    expect(results).toEqual(["done", "done", "done", "done", "done"]);
  });

  it("propaguje odrzucenie zadania do wyniku add", async () => {
    const queue = createQueue(1);
    await expect(queue.add(async () => Promise.reject(new Error("nope")))).rejects.toThrow("nope");
  });
});

describe("createApiClient — kolejka + retry razem", () => {
  it("przepuszcza żądania przez kolejkę z limitem współbieżności", async () => {
    let active = 0;
    let maxActive = 0;
    const fetchImpl = async () => {
      active += 1;
      maxActive = Math.max(maxActive, active);
      await sleep(10);
      active -= 1;
      return jsonResponse({ ok: true });
    };
    const client = createApiClient({ fetchImpl, concurrency: 2, retries: 0, backoffMs: 0 });
    const urls = ["/a", "/b", "/c", "/d"];
    const results = await Promise.all(urls.map((u) => client.get(u)));
    expect(maxActive, "klient respektuje concurrency").toBe(2);
    expect(results).toEqual([{ ok: true }, { ok: true }, { ok: true }, { ok: true }]);
  });

  it("stosuje retry z konfiguracji klienta", async () => {
    let calls = 0;
    const fetchImpl = async () => {
      calls += 1;
      if (calls < 2) return jsonResponse({ e: 1 }, 500);
      return jsonResponse({ ok: true });
    };
    const client = createApiClient({ fetchImpl, concurrency: 1, retries: 1, backoffMs: 0 });
    const data = await client.get("/x");
    expect(data).toEqual({ ok: true });
    expect(calls).toBe(2);
  });
});
