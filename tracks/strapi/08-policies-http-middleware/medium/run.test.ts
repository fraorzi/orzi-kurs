import { describe, expect, it } from "vitest";
import { withStrapiHttp } from "@harness/strapi-test";
import { solve, type Context } from "./starter";

describe("correlation id middleware", () => {
  it("zachowuje poprawny request id klienta", async () => {
    const ctx: Context = { requestId: "client-abc123", state: {}, headers: {} };
    await solve(ctx, async () => {}, () => "should-not-be-used");
    expect(ctx.state.requestId).toBe("client-abc123");
    expect(ctx.headers["x-request-id"]).toBe("client-abc123");
  });

  it("generuje nowy id, gdy nagłówek klienta jest za krótki albo ma niedozwolone znaki", async () => {
    for (const bad of ["short", "id with spaces and znaki!", undefined]) {
      const ctx: Context = { requestId: bad, state: {}, headers: {} };
      await solve(ctx, async () => {}, () => "generated-123");
      expect(ctx.state.requestId).toBe("generated-123");
      expect(ctx.headers["x-request-id"]).toBe("generated-123");
    }
  });

  it("wywołuje next dokładnie raz i dopiero po ustawieniu stanu", async () => {
    let calls = 0;
    const ctx: Context = { state: {}, headers: {} };
    await solve(ctx, async () => {
      calls += 1;
      expect(ctx.state.requestId).toBeDefined();
    }, () => "generated-456");
    expect(calls).toBe(1);
  });

  it("nagłówek trafia do rzeczywistej odpowiedzi HTTP", async () => {
    await withStrapiHttp(
      async (request) => {
        const ctx: Context = {
          requestId: request.headers.get("x-request-id") ?? undefined,
          state: {},
          headers: {},
        };
        await solve(ctx, async () => {}, () => "server-generated-id");
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: ctx.headers,
        });
      },
      async ({ request }) => {
        const response = await request("/api/articles");
        expect(response.headers.get("x-request-id")).toBe("server-generated-id");

        const withClientId = await request("/api/articles", {
          headers: { "x-request-id": "client-provided-id" },
        });
        expect(withClientId.headers.get("x-request-id")).toBe("client-provided-id");
      },
    );
  });
});
