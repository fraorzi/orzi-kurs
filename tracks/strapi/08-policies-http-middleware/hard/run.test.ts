import { describe, expect, it } from "vitest";
import { withStrapiHttp } from "@harness/strapi-test";
import { solve, type Middleware } from "./starter";

describe("kompozycja middleware w kolejności onion", () => {
  it("wywołuje before/after w kolejności cebuli wokół handlera", async () => {
    const events: string[] = [];
    const make = (name: string): Middleware => async (next) => {
      events.push(`before-${name}`);
      await next();
      events.push(`after-${name}`);
    };
    await solve([make("a"), make("b")], async () => {
      events.push("handler");
    })();
    expect(events).toEqual(["before-a", "before-b", "handler", "after-b", "after-a"]);
  });

  it("pusta lista middleware wywołuje wyłącznie handler", async () => {
    const events: string[] = [];
    await solve([], async () => {
      events.push("handler");
    })();
    expect(events).toEqual(["handler"]);
  });

  it("middleware, który nie wywołuje next, przerywa dalszy łańcuch", async () => {
    const events: string[] = [];
    const blocker: Middleware = async () => {
      events.push("blocked");
    };
    const rest: Middleware = async (next) => {
      events.push("before-rest");
      await next();
      events.push("after-rest");
    };
    await solve([blocker, rest], async () => {
      events.push("handler");
    })();
    expect(events).toEqual(["blocked"]);
  });

  it("błąd handlera propaguje się na zewnątrz, pomijając wszystkie after", async () => {
    const events: string[] = [];
    const make = (name: string): Middleware => async (next) => {
      events.push(`before-${name}`);
      await next();
      events.push(`after-${name}`);
    };
    await expect(
      solve([make("a"), make("b")], async () => {
        throw new Error("handler failed");
      })(),
    ).rejects.toThrow("handler failed");
    expect(events).toEqual(["before-a", "before-b"]);
  });

  it("kompozycja onion działa na rzeczywistej granicy HTTP, z krótkim spięciem authz", async () => {
    await withStrapiHttp(
      async (request) => {
        const state = { status: 200, headers: {} as Record<string, string>, body: {} as unknown };
        const role = request.headers.get("x-role");

        const authorize: Middleware = async (next) => {
          if (role !== "editor") {
            state.status = 403;
            state.body = { error: "FORBIDDEN" };
            return;
          }
          await next();
        };
        const withMarker: Middleware = async (next) => {
          state.headers["x-served-by"] = "onion";
          await next();
          state.headers["x-after"] = "true";
        };

        await solve([authorize, withMarker], async () => {
          state.body = { ok: true };
        })();

        return new Response(JSON.stringify(state.body), {
          status: state.status,
          headers: state.headers,
        });
      },
      async ({ request }) => {
        const forbidden = await request("/api/articles", { headers: { "x-role": "public" } });
        expect(forbidden.status).toBe(403);
        expect(forbidden.headers.get("x-after")).toBeNull();

        const ok = await request("/api/articles", { headers: { "x-role": "editor" } });
        expect(ok.status).toBe(200);
        expect(ok.headers.get("x-after")).toBe("true");
        expect(await ok.json()).toEqual({ ok: true });
      },
    );
  });
});
