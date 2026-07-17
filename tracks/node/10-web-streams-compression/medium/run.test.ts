import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Połącz streamy Node i Web", () => {
  it("spełnia kontrakt zadania", async () => {
    const { Readable } = await import("node:stream");
    await expect(solve(Readable.from(["ab", "cd"]))).resolves.toBe("ABCD");
  });
});
