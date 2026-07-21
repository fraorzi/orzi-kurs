import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("enkoder ramki binarnej", () => {
  it("buduje nagłówek: długość BE obejmuje bajt typu i payload", () => {
    const frame = solve(7, "abc");
    expect(frame.byteLength).toBe(4 + 1 + 3);
    expect(frame.readUInt32BE(0)).toBe(4);
    expect(frame.readUInt8(4)).toBe(7);
  });

  it("koduje payload jako UTF-8 od offsetu 5", () => {
    const frame = solve(1, "żółć");
    const payload = Buffer.from("żółć", "utf8");
    expect(frame.subarray(5).equals(payload)).toBe(true);
    expect(frame.readUInt32BE(0)).toBe(1 + payload.byteLength);
  });

  it("pusty payload daje ramkę 5 bajtów o długości 1", () => {
    const frame = solve(3, "");
    expect(frame.byteLength).toBe(5);
    expect(frame.readUInt32BE(0)).toBe(1);
  });

  it("długość jest zapisana big-endian, nie little-endian", () => {
    const frame = solve(0, "x".repeat(258));
    expect(frame.readUInt32BE(0)).toBe(259);
    expect(frame.readUInt32LE(0)).not.toBe(259);
  });
});
