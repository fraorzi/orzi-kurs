import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Zweryfikuj kardynalność relacji", () => {
  it("spełnia kontrakt Strapi 5", async () => {
    expect(solve({ relation: "manyToMany", bidirectional: true, inversedBy: "articles" })).toBe(true);
    expect(solve({ relation: "manyToMany", bidirectional: true })).toBe(false);
  });
});

