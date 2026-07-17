import { describe, expect, it } from "vitest";
import { withStrapiHttp } from "./strapi-test";

describe("Strapi HTTP test adapter", () => {
  it("round-trips method, headers, body and status over an ephemeral server", async () => {
    await withStrapiHttp(async (request) => {
      const body = await request.json() as { title: string };
      return Response.json(
        { method: request.method, role: request.headers.get("x-role"), body },
        { status: 201 },
      );
    }, async ({ request }) => {
      const response = await request("/api/articles", {
        method: "POST",
        headers: { "content-type": "application/json", "x-role": "editor" },
        body: JSON.stringify({ title: "Artykuł" }),
      });
      expect(response.status).toBe(201);
      expect(await response.json()).toEqual({
        method: "POST",
        role: "editor",
        body: { title: "Artykuł" },
      });
    });
  });
});
