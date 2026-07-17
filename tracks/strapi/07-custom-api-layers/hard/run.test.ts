import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Utrzymaj niezmiennik w custom service", () => {
  it("spełnia kontrakt warstwy backendowej", async () => {
    const updates: object[] = [];
    const result = await solve({ exists: async () => false, update: async (_id, data) => { updates.push(data); return data; } }, "doc", " Nowy-Slug ");
    expect(result).toEqual({ slug: "nowy-slug", status: "draft" });
    await expect(solve({ exists: async () => true, update: async () => ({}) }, "doc", "used")).rejects.toThrow(/zajęty/);
  });
});

