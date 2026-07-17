import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Oddziel preview od odczytu publicznego", () => {
  it("spełnia kontrakt Strapi 5", async () => {
    expect(solve(true, "editor")).toBe("draft");
    expect(solve(true)).toBe("published");
  });
});

