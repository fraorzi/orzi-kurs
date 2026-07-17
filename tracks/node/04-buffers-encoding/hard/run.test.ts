import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Koduj ramkę binarną", () => {
  it("spełnia kontrakt zadania", async () => {
    const frame = solve(7, "żółw");
    expect(frame.readUInt32BE(0)).toBe(frame.length - 4);
    expect(frame.readUInt8(4)).toBe(7);
    expect(frame.subarray(5).toString()).toBe("żółw");
  });
});
