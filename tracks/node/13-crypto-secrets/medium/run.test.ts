import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Porównaj podpisy stałoczasowo", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(solve("aabb", "aabb")).toBe(true);
    expect(solve("aabb", "aabc")).toBe(false);
    expect(solve("aa", "aaaa")).toBe(false);
    expect(solve("wat", "wat")).toBe(false);
  });
});
