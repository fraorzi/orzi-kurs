import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Zachowaj tożsamość dokumentu w repozytorium", () => {
  it("spełnia kontrakt Strapi 5", async () => {
    const entries = [{ id: 7, documentId: "doc", locale: "pl", status: "draft" as const, title: "D" }, { id: 8, documentId: "doc", locale: "pl", status: "published" as const, title: "P" }];
    expect(solve(entries, "doc", "pl", "published")?.id).toBe(8);
  });
});

