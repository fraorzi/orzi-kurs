import { describe, expect, it } from "vitest";
import { withStrapiHttp } from "@harness/strapi-test";
import { solve, type Access } from "./starter";

describe("RBAC połączony z własnością dokumentu", () => {
  it("pozwala editorowi zaktualizować własny dokument", () => {
    expect(
      solve({ role: "editor", userId: "u1", action: "update", ownerId: "u1", status: "draft" }),
    ).toBe(true);
  });

  it("odmawia editorowi aktualizacji cudzego dokumentu", () => {
    expect(
      solve({ role: "editor", userId: "u2", action: "update", ownerId: "u1", status: "draft" }),
    ).toBe(false);
  });

  it("odmawia public odczytu draftu", () => {
    expect(solve({ role: "public", action: "find", ownerId: "u1", status: "draft" })).toBe(false);
  });

  it("pozwala public odczytać opublikowany dokument", () => {
    expect(
      solve({ role: "public", action: "find", ownerId: "u1", status: "published" }),
    ).toBe(true);
  });

  it("pozwala adminowi na każdą akcję niezależnie od właściciela i statusu", () => {
    expect(
      solve({ role: "admin", userId: "u9", action: "update", ownerId: "u1", status: "draft" }),
    ).toBe(true);
    expect(solve({ role: "admin", action: "find", ownerId: "u1", status: "draft" })).toBe(true);
  });

  it("egzekwuje ownership na update przez prawdziwą granicę HTTP", async () => {
    const document = { ownerId: "u1", status: "draft" as const };

    await withStrapiHttp(
      async (request) => {
        const role = (request.headers.get("x-role") ?? "public") as Access["role"];
        const userId = request.headers.get("x-user-id") ?? undefined;
        const allowed = solve({ role, userId, action: "update", ...document });
        return new Response(null, { status: allowed ? 200 : 403 });
      },
      async ({ request }) => {
        const publicAttempt = await request("/api/articles/doc-1", { method: "PUT" });
        expect(publicAttempt.status).toBe(403);

        const wrongOwner = await request("/api/articles/doc-1", {
          method: "PUT",
          headers: { "x-role": "editor", "x-user-id": "u2" },
        });
        expect(wrongOwner.status).toBe(403);

        const owner = await request("/api/articles/doc-1", {
          method: "PUT",
          headers: { "x-role": "editor", "x-user-id": "u1" },
        });
        expect(owner.status).toBe(200);
      },
    );
  });
});
