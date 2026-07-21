import { describe, expect, it } from "vitest";
import { withStrapiHttp } from "@harness/strapi-test";
import { solve } from "./starter";

function seededStore(): Map<string, Record<string, unknown>> {
  return new Map([
    ["doc-1", { documentId: "doc-1", title: "Pierwszy artykuł" }],
    ["doc-2", { documentId: "doc-2", title: "Drugi artykuł" }],
  ]);
}

describe("Zwróć kontrakt REST zgodny ze Strapi", () => {
  it("zwraca 200, Content-Type application/json i dane dokumentu, gdy istnieje", async () => {
    await withStrapiHttp(solve(seededStore()), async ({ request }) => {
      const response = await request("/api/articles/doc-1");
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("application/json");
      expect(await response.json()).toEqual({ data: { documentId: "doc-1", title: "Pierwszy artykuł" } });
    });
  });

  it("zwraca 404 z kopertą błędu Strapi, gdy dokument nie istnieje", async () => {
    await withStrapiHttp(solve(seededStore()), async ({ request }) => {
      const response = await request("/api/articles/nieznany");
      expect(response.status).toBe(404);
      expect(await response.json()).toEqual({
        error: { status: 404, name: "NotFoundError", message: "Nie znaleziono dokumentu" },
      });
    });
  });

  it("nie ujawnia całego magazynu — tylko żądany dokument", async () => {
    await withStrapiHttp(solve(seededStore()), async ({ request }) => {
      const response = await request("/api/articles/doc-1");
      const body = (await response.json()) as { data: Record<string, unknown> };
      expect(body.data).not.toHaveProperty("doc-2");
      expect(Object.keys(body)).toEqual(["data"]);
    });
  });

  it("różne documentId w tym samym magazynie są izolowane od siebie", async () => {
    await withStrapiHttp(solve(seededStore()), async ({ request }) => {
      const first = await request("/api/articles/doc-1");
      const second = await request("/api/articles/doc-2");
      expect(await first.json()).toEqual({ data: { documentId: "doc-1", title: "Pierwszy artykuł" } });
      expect(await second.json()).toEqual({ data: { documentId: "doc-2", title: "Drugi artykuł" } });
    });
  });
});
