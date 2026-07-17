import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Wyprowadź klucz przez scrypt", () => {
  it("spełnia kontrakt zadania", async () => {
    const record = await solve("correct horse");
    expect(record.encoded).toMatch(/^[0-9a-f]{32}:[0-9a-f]{64}$/);
    await expect(record.verify("correct horse")).resolves.toBe(true);
    await expect(record.verify("wrong")).resolves.toBe(false);
  });
});
