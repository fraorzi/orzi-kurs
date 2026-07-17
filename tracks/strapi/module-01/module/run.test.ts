import { describe, expect, it } from "vitest";
import { withStrapiHttp } from "@harness/strapi-test";
import { publishArticle, type Dependencies } from "./src";

const DOCUMENT_ID = "a1b2c3d4e5f6g7h8i9j0klmn";

function fixture(events: string[], overrides: Partial<Dependencies> = {}): Dependencies {
  return {
    documents: {
      update: async () => { events.push("update"); },
      publish: async () => { events.push("publish"); return { documentId: DOCUMENT_ID, title: "Artykuł", secret: "x" }; },
    },
    media: {
      upload: async () => { events.push("upload"); return "media-1"; },
      remove: async (id) => { events.push("remove:" + id); },
    },
    sanitize: async (value) => { events.push("sanitize"); const { documentId, title } = value as { documentId: string; title: string }; return { documentId, title }; },
    webhook: async () => { events.push("webhook"); },
    ...overrides,
  };
}

describe("backend contentowy Strapi 5", () => {
  it("publikuje i sanitizuje dopiero po authz oraz walidacji", async () => {
    const events: string[] = [];
    const response = await publishArticle(fixture(events), {
      role: "editor",
      documentId: DOCUMENT_ID,
      locale: "pl",
      title: " Artykuł ",
      file: { name: "cover.webp", mime: "image/webp", size: 1024 },
    });
    expect(response).toEqual({ status: 200, body: { documentId: DOCUMENT_ID, title: "Artykuł" } });
    expect(events).toEqual(["upload", "update", "publish", "sanitize", "webhook"]);
    expect(JSON.stringify(response)).not.toContain("secret");
  });

  it("nie wykonuje efektów dla publicznego żądania", async () => {
    const events: string[] = [];
    expect(await publishArticle(fixture(events), {
      role: "public", documentId: DOCUMENT_ID, locale: "pl", title: "Artykuł",
    })).toEqual({ status: 403, body: { error: "FORBIDDEN" } });
    expect(events).toEqual([]);
  });

  it("sprząta media i zwraca bezpieczny błąd po częściowej awarii", async () => {
    const events: string[] = [];
    const dependencies = fixture(events, {
      documents: {
        update: async () => { events.push("update"); throw new Error("db password=secret"); },
        publish: async () => ({}),
      },
    });
    const response = await publishArticle(dependencies, {
      role: "admin",
      documentId: DOCUMENT_ID,
      locale: "pl",
      title: "Artykuł",
      file: { name: "cover.webp", mime: "image/webp", size: 1024 },
    });
    expect(response).toEqual({ status: 500, body: { error: "INTERNAL_ERROR" } });
    expect(events).toEqual(["upload", "update", "remove:media-1"]);
  });

  it("przechodzi przez rzeczywistą granicę HTTP", async () => {
    const events: string[] = [];
    await withStrapiHttp(async (request) => {
      const input = await request.json() as {
        documentId: string;
        locale: string;
        title: unknown;
      };
      const result = await publishArticle(fixture(events), {
        role: request.headers.get("x-role") === "editor" ? "editor" : "public",
        ...input,
      });
      return Response.json(result.body, { status: result.status });
    }, async ({ request }) => {
      const response = await request("/api/articles/publish", {
        method: "PUT",
        headers: { "content-type": "application/json", "x-role": "editor" },
        body: JSON.stringify({
          documentId: DOCUMENT_ID,
          locale: "pl",
          title: "Artykuł HTTP",
        }),
      });
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({
        documentId: DOCUMENT_ID,
        title: "Artykuł",
      });
    });
  });
});
