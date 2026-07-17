import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Zaplanuj publikację lokalizacji", () => {
  it("spełnia kontrakt Strapi 5", async () => {
    expect(solve(["pl", "en"], ["en", "de", "en"])).toEqual(["en"]);
    expect(solve(["pl"], "*")).toBe("*");
  });
});

