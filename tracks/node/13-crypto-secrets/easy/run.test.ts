import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("token z CSPRNG", () => {
  it("zwraca base64url o długości wynikającej z liczby bajtów", () => {
    const token = solve(16);
    expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(Buffer.from(token, "base64url").byteLength).toBe(16);
  });

  it("nie zawiera znaków zwykłego base64 (+, /, =)", () => {
    for (let i = 0; i < 20; i++) {
      expect(solve(32)).not.toMatch(/[+/=]/);
    }
  });

  it("kolejne tokeny są różne", () => {
    const tokens = new Set(Array.from({ length: 50 }, () => solve(16)));
    expect(tokens.size).toBe(50);
  });

  it("odrzuca entropię poniżej 16 bajtów i wartości niecałkowite", () => {
    expect(() => solve(15)).toThrow();
    expect(() => solve(0)).toThrow();
    expect(() => solve(16.5)).toThrow();
  });
});
