import { describe, expect, it } from "vitest";
import { withStrapiHttp } from "@harness/strapi-test";
import { solve } from "./starter";

describe("Wyegzekwuj wymagany poziom roli przez HTTP", () => {
  it("brak nagłówka x-role przy wymaganej roli editor daje 401 Unauthorized", async () => {
    await withStrapiHttp(solve("editor"), async ({ request }) => {
      const response = await request("/api/articles/doc-1", { method: "PUT" });
      expect(response.status).toBe(401);
      expect((await response.json()) as unknown).toEqual({
        error: { status: 401, name: "UnauthorizedError", message: "Brak uwierzytelnienia" },
      });
    });
  });

  it("rola editor przy wymaganym admin daje 403 Forbidden, nie 401", async () => {
    await withStrapiHttp(solve("admin"), async ({ request }) => {
      const response = await request("/api/articles/doc-1", {
        method: "DELETE",
        headers: { "x-role": "editor" },
      });
      expect(response.status).toBe(403);
      expect((await response.json()) as unknown).toEqual({
        error: { status: 403, name: "ForbiddenError", message: "Brak uprawnień" },
      });
    });
  });

  it("rola równa wymaganej przechodzi z 200 i danymi", async () => {
    await withStrapiHttp(solve("editor"), async ({ request }) => {
      const response = await request("/api/articles/doc-1", {
        method: "PUT",
        headers: { "x-role": "editor" },
      });
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ data: { ok: true } });
    });
  });

  it("rola wyższa niż wymagana też przechodzi (admin na endpointcie editora)", async () => {
    await withStrapiHttp(solve("editor"), async ({ request }) => {
      const response = await request("/api/articles/doc-1", {
        method: "PUT",
        headers: { "x-role": "admin" },
      });
      expect(response.status).toBe(200);
    });
  });

  it("endpoint dostępny dla anonymous nie wymaga nagłówka x-role", async () => {
    await withStrapiHttp(solve("anonymous"), async ({ request }) => {
      const response = await request("/api/articles");
      expect(response.status).toBe(200);
    });
  });
});
