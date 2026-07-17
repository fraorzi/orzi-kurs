import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Wylicz stan workflow dokumentu", () => {
  it("spełnia kontrakt Strapi 5", async () => {
    expect(solve("A", null)).toBe("new");
    expect(solve("B", "A")).toBe("modified");
    expect(solve("A", "A")).toBe("published");
  });
});

