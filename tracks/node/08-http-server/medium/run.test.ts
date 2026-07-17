import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Czytaj body z limitem", () => {
  it("spełnia kontrakt zadania", async () => {
    async function* body(...parts: string[]) {
      for (const part of parts) yield Buffer.from(part);
    }
    await expect(solve(body('{"id":', "1}"), 20)).resolves.toEqual({ id: 1 });
    await expect(solve(body("12345"), 4)).rejects.toThrow(/413/);
    await expect(solve(body("{"), 10)).rejects.toThrow(/400/);
  });
});
