import { describe, expect, it } from "vitest";
import { publishOffer, type Dependencies, type Result } from "./src";

function fixture(
  events: string[],
  overrides: Partial<Dependencies> = {},
): Dependencies {
  return {
    currentUser: async () => ({ id: "u1", role: "seller" }),
    findResult: async () => null,
    reserve: async (q) => {
      events.push("reserve:" + q);
    },
    release: async (q) => {
      events.push("release:" + q);
    },
    createDraft: async () => {
      events.push("draft");
      return "doc1";
    },
    publish: async () => {
      events.push("publish");
    },
    saveResult: async () => {
      events.push("save");
    },
    revalidate: (tag) => {
      events.push(tag);
    },
    log: () => {
      events.push("log");
    },
    ...overrides,
  };
}

const input = { idempotencyKey: "k1", title: " Oferta ", quantity: 2 };

describe("pionowa publikacja oferty (capstone)", () => {
  it("realizuje pełną kolejność sukcesu z trimowanym tytułem", async () => {
    const events: string[] = [];
    await expect(publishOffer(fixture(events), input)).resolves.toEqual({
      documentId: "doc1",
      status: "published",
    });
    expect(events).toEqual([
      "reserve:2",
      "draft",
      "publish",
      "save",
      "offers",
      "offer:doc1",
      "log",
    ]);
  });

  it("zwraca istniejący wynik idempotentnie, bez żadnych efektów", async () => {
    const events: string[] = [];
    const stored: Result = { documentId: "old", status: "published" };
    const result = await publishOffer(
      fixture(events, { findResult: async () => stored }),
      input,
    );
    expect(result).toBe(stored);
    expect(events).toEqual([]);
  });

  it("kompensuje rezerwację inventory po awarii CMS i nie zapisuje wyniku", async () => {
    const events: string[] = [];
    const deps = fixture(events, {
      publish: async () => {
        events.push("publish");
        throw new Error("cms");
      },
    });
    await expect(publishOffer(deps, input)).rejects.toThrow("cms");
    expect(events).toEqual(["reserve:2", "draft", "publish", "release:2"]);
  });

  it("odrzuca nie-sprzedawcę i złe wejście przed jakimkolwiek efektem", async () => {
    const events: string[] = [];
    await expect(
      publishOffer(fixture(events, { currentUser: async () => ({ id: "b", role: "buyer" }) }), input),
    ).rejects.toThrow();
    await expect(
      publishOffer(fixture(events), { ...input, title: "x" }),
    ).rejects.toThrow(/title/i);
    await expect(
      publishOffer(fixture(events), { ...input, quantity: 0 }),
    ).rejects.toThrow(/quantity/i);
    expect(events).toEqual([]);
  });
});
