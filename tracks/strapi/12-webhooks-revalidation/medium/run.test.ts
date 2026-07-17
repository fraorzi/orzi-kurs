import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Deduplikuj dostarczenie webhooka", () => {
  it("spełnia kontrakt produkcyjny", async () => {
    const seen = new Set<string>(); let calls = 0;
    expect(await solve("e1", seen, async () => { calls += 1; })).toBe(true);
    expect(await solve("e1", seen, async () => { calls += 1; })).toBe(false);
    expect(calls).toBe(1);
  });
});

