import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Zbuduj ograniczone query REST", () => {
  it("spełnia kontrakt Strapi 5", async () => {
    const params = new URLSearchParams(solve("pl", 2));
    expect(params.get("status")).toBe("published");
    expect(params.get("fields[1]")).toBe("slug");
    expect(params.get("pagination[pageSize]")).toBe("20");
  });
});

