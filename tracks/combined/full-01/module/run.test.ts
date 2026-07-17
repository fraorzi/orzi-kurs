import { describe, expect, it } from "vitest";
import { publishOffer, type Dependencies, type Result } from "./src";

function fixture(events: string[], existing: Result | null = null): Dependencies {
  return { currentUser: async () => ({ id: "u1", role: "seller" }), findResult: async () => existing, reserve: async (q) => { events.push("reserve:" + q); }, release: async (q) => { events.push("release:" + q); }, createDraft: async () => { events.push("draft"); return "doc1"; }, publish: async () => { events.push("publish"); }, saveResult: async () => { events.push("save"); }, revalidate: (tag) => { events.push(tag); }, log: () => { events.push("log"); } };
}

describe("vertical capstone", () => {
  it("realizuje pełną kolejność sukcesu", async () => { const events: string[] = []; await expect(publishOffer(fixture(events), { idempotencyKey: "k1", title: " Oferta ", quantity: 2 })).resolves.toEqual({ documentId: "doc1", status: "published" }); expect(events).toEqual(["reserve:2", "draft", "publish", "save", "offers", "offer:doc1", "log"]); });
  it("zwraca istniejący wynik bez efektów", async () => { const events: string[] = []; const result = { documentId: "old", status: "published" as const }; await expect(publishOffer(fixture(events, result), { idempotencyKey: "k1", title: "Oferta", quantity: 2 })).resolves.toBe(result); expect(events).toEqual([]); });
  it("kompensuje inventory po awarii CMS", async () => { const events: string[] = []; const deps = fixture(events); deps.publish = async () => { events.push("publish"); throw new Error("cms"); }; await expect(publishOffer(deps, { idempotencyKey: "k1", title: "Oferta", quantity: 2 })).rejects.toThrow("cms"); expect(events).toEqual(["reserve:2", "draft", "publish", "release:2"]); });
});

