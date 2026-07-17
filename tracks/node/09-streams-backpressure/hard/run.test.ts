import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Zbuduj pipeline transformacji", () => {
  it("spełnia kontrakt zadania", async () => {
    await expect(solve(["a\n", "\nb"])).resolves.toBe("A\nB");
  });
});
