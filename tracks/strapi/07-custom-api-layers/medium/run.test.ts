import { describe, expect, it } from "vitest";
import { withStrapiHttp } from "@harness/strapi-test";
import { solve, type Deps } from "./starter";

function fixture(events: string[]): Deps {
  return {
    service: async (documentId, userId) => {
      events.push(`service:${documentId}:${userId}`);
      return { title: "A", secret: "x" };
    },
    sanitize: async (value) => {
      events.push("sanitize");
      const { title } = value as { title?: unknown };
      return { title };
    },
  };
}

describe("cienki kontroler z sanitization", () => {
  it("przypisuje do ctx.body wynik sanitize, nie surowy wynik service", async () => {
    const ctx = { params: { documentId: "doc" }, state: { user: { id: "u1" } }, body: undefined as object | undefined };
    await solve(fixture([]), ctx);
    expect(ctx.body).toEqual({ title: "A" });
  });

  it("woła service przed sanitize, w tej kolejności", async () => {
    const events: string[] = [];
    const ctx = { params: { documentId: "doc" }, state: { user: { id: "u1" } }, body: undefined as object | undefined };
    await solve(fixture(events), ctx);
    expect(events).toEqual(["service:doc:u1", "sanitize"]);
  });

  it("przekazuje do service dokładnie documentId i userId z ctx", async () => {
    const captured: unknown[] = [];
    const ctx = { params: { documentId: "doc-42" }, state: { user: { id: "u9" } }, body: undefined as object | undefined };
    await solve(
      {
        service: async (documentId, userId) => {
          captured.push(documentId, userId);
          return { title: "T" };
        },
        sanitize: async (value) => value,
      },
      ctx,
    );
    expect(captured).toEqual(["doc-42", "u9"]);
  });

  it("nigdy nie wycieka pola secret do body przez prawdziwą odpowiedź HTTP", async () => {
    await withStrapiHttp(
      async (request) => {
        const url = new URL(request.url);
        const documentId = url.pathname.split("/").pop()!;
        const ctx = {
          params: { documentId },
          state: { user: { id: "u1" } },
          body: undefined as object | undefined,
        };
        await solve(fixture([]), ctx);
        return Response.json(ctx.body);
      },
      async ({ request }) => {
        const response = await request("/api/articles/doc");
        const text = await response.text();
        expect(text).not.toContain("secret");
        expect(JSON.parse(text)).toEqual({ title: "A" });
      },
    );
  });
});
