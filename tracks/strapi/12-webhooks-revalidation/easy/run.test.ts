import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Uwierzytelnij sekret webhooka", () => {
  it("spełnia kontrakt produkcyjny", async () => {
    expect(solve("secret-123", "secret-123")).toBe(true);
    expect(solve("secret-124", "secret-123")).toBe(false);
    expect(solve(undefined, "secret-123")).toBe(false);
    expect(solve("", "")).toBe(false);
  });
});
