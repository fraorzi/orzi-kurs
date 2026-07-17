import { describe, expect, it, vi } from "vitest";
import { createApp, type Route } from "./src/index";

function fixtures() {
  const created: unknown[] = [];
  const handler = vi.fn(async (context: { requestId: string; body?: unknown }) => {
    created.push(context.body);
    return { status: 201, body: { id: `item-${created.length}` } };
  });
  const routes: Route[] = [
    {
      method: "GET",
      path: "/health",
      handler: async (context) => ({
        status: 200,
        body: { ok: true, requestId: context.requestId },
      }),
    },
    { method: "POST", path: "/items", handler },
    {
      method: "GET",
      path: "/boom",
      handler: async () => {
        throw new Error("ECONNREFUSED db:5432 haslo=tajne");
      },
    },
    {
      method: "GET",
      path: "/invalid",
      handler: async () => {
        throw Object.assign(new Error("pole name jest wymagane"), {
          name: "ValidationError",
        });
      },
    },
  ];
  const app = createApp({
    routes,
    maxBodyBytes: 64,
    generateId: () => "gen-1",
  });
  return { app, handler };
}

const post = (body: string, headers: Record<string, string> = {}) =>
  new Request("http://svc.test/items", { method: "POST", body, headers });

describe("rdzeń usługi HTTP", () => {
  it("obsługuje trasę i propaguje request id z nagłówka", async () => {
    const { app } = fixtures();
    const response = await app(
      new Request("http://svc.test/health", {
        headers: { "x-request-id": "req-77" },
      }),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("x-request-id")).toBe("req-77");
    await expect(response.json()).resolves.toEqual({
      ok: true,
      requestId: "req-77",
    });
  });

  it("generuje request id, gdy klient go nie przysłał", async () => {
    const { app } = fixtures();
    const response = await app(new Request("http://svc.test/health"));
    expect(response.headers.get("x-request-id")).toBe("gen-1");
  });

  it("zwraca 404 dla nieznanej ścieżki i 405 z Allow dla złej metody", async () => {
    const { app } = fixtures();
    expect((await app(new Request("http://svc.test/missing"))).status).toBe(404);
    const mismatch = await app(
      new Request("http://svc.test/items", { method: "DELETE" }),
    );
    expect(mismatch.status).toBe(405);
    expect(mismatch.headers.get("allow")).toBe("POST");
  });

  it("egzekwuje limit body w bajtach i poprawność JSON", async () => {
    const { app, handler } = fixtures();
    const tooBig = await app(post(JSON.stringify({ pad: "x".repeat(100) })));
    expect(tooBig.status).toBe(413);
    const broken = await app(post("{zepsute"));
    expect(broken.status).toBe(400);
    expect(handler).not.toHaveBeenCalled();
  });

  it("idempotency-key: powtórka nie wywołuje handlera i jest oznaczona", async () => {
    const { app, handler } = fixtures();
    const first = await app(
      post(JSON.stringify({ name: "a" }), { "idempotency-key": "k-1" }),
    );
    const replay = await app(
      post(JSON.stringify({ name: "a" }), { "idempotency-key": "k-1" }),
    );
    expect(handler).toHaveBeenCalledTimes(1);
    expect(replay.headers.get("idempotent-replay")).toBe("true");
    await expect(replay.json()).resolves.toEqual(await first.clone().json());
    expect(replay.status).toBe(201);
  });

  it("różne klucze idempotencji wykonują osobne operacje", async () => {
    const { app, handler } = fixtures();
    await app(post("{}", { "idempotency-key": "k-1" }));
    await app(post("{}", { "idempotency-key": "k-2" }));
    await app(post("{}"));
    expect(handler).toHaveBeenCalledTimes(3);
  });

  it("ValidationError wraca jako 400 z komunikatem i requestId", async () => {
    const { app } = fixtures();
    const response = await app(
      new Request("http://svc.test/invalid", {
        headers: { "x-request-id": "req-40" },
      }),
    );
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "pole name jest wymagane",
      requestId: "req-40",
    });
  });

  it("nieznany wyjątek daje 500 bez wycieku szczegółów", async () => {
    const { app } = fixtures();
    const response = await app(new Request("http://svc.test/boom"));
    expect(response.status).toBe(500);
    const payload = await response.text();
    expect(payload).toContain("Internal Server Error");
    expect(payload).not.toContain("ECONNREFUSED");
    expect(payload).not.toContain("tajne");
    expect(response.headers.get("x-request-id")).toBe("gen-1");
  });
});
