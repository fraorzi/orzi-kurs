import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Dekoduj podzielone chunki", () => {
  it("spełnia kontrakt zadania", async () => {
    const bytes = Buffer.from("A🙂B");
    async function* chunks() {
      yield bytes.subarray(0, 3);
      yield bytes.subarray(3);
    }
    await expect(solve(chunks())).resolves.toBe("A🙂B");
  });
});
