import { describe, expect, it } from "vitest";
import { withStrapiHttp } from "@harness/strapi-test";
import { solve, type MediaDeps } from "./starter";

function fixture(events: string[], overrides: Partial<MediaDeps> = {}): MediaDeps {
  return {
    authorize: async () => true,
    upload: async () => { events.push("upload"); return "m1"; },
    link: async () => { events.push("link"); },
    remove: async (id) => { events.push(`remove:${id}`); },
    ...overrides,
  };
}

describe("autoryzowane powiązanie media", () => {
  it("sprząta osierocony plik, gdy link się nie powiedzie, i propaguje błąd", async () => {
    const events: string[] = [];
    const deps = fixture(events, { link: async () => { throw new Error("link"); } });
    await expect(solve(deps)).rejects.toThrow("link");
    expect(events).toEqual(["upload", "remove:m1"]);
  });

  it("odrzuca bez autoryzacji, nie wywołując uploadu", async () => {
    const events: string[] = [];
    const deps = fixture(events, { authorize: async () => false });
    await expect(solve(deps)).rejects.toThrow("Forbidden");
    expect(events).toEqual([]);
  });

  it("happy path zwraca id i nigdy nie sprząta pliku", async () => {
    const events: string[] = [];
    const result = await solve(fixture(events));
    expect(result).toBe("m1");
    expect(events).toEqual(["upload", "link"]);
  });

  it("błąd samego uploadu propaguje się bez wywołania link ani remove", async () => {
    const events: string[] = [];
    const deps = fixture(events, {
      upload: async () => { throw new Error("storage unavailable"); },
    });
    await expect(solve(deps)).rejects.toThrow("storage unavailable");
    expect(events).toEqual([]);
  });

  it("działa za rzeczywistym endpointem HTTP uploadu, z 403 dla braku uprawnień", async () => {
    await withStrapiHttp(
      async (request) => {
        const role = request.headers.get("x-role");
        const events: string[] = [];
        try {
          const id = await solve(fixture(events, { authorize: async () => role === "editor" }));
          return Response.json({ id }, { status: 201 });
        } catch (error) {
          return Response.json({ error: (error as Error).message }, { status: 403 });
        }
      },
      async ({ request }) => {
        const forbidden = await request("/api/upload", { method: "POST", headers: { "x-role": "public" } });
        expect(forbidden.status).toBe(403);

        const created = await request("/api/upload", { method: "POST", headers: { "x-role": "editor" } });
        expect(created.status).toBe(201);
        expect(await created.json()).toEqual({ id: "m1" });
      },
    );
  });
});
