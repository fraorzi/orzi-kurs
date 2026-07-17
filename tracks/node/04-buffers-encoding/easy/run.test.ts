import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Policz bajty UTF-8", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(solve("żółw", 8).byteLength).toBe(7);
    expect(() => solve("🙂🙂", 7)).toThrow(/bajtów/);
  });
});
