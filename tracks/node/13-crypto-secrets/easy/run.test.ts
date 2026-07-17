import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Generuj token o zadanej entropii", () => {
  it("spełnia kontrakt zadania", async () => {
    const token = solve(24);
    expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(Buffer.from(token, "base64url")).toHaveLength(24);
    expect(solve(24)).not.toBe(token);
    expect(() => solve(8)).toThrow(/16/);
  });
});
