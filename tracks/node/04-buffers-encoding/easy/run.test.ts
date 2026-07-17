import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("limit bajtów UTF-8", () => {
  it("koduje tekst ASCII i zwraca dokładne bajty", () => {
    const bytes = solve("abc", 10);
    expect(Buffer.from(bytes).toString("utf8")).toBe("abc");
    expect(bytes.byteLength).toBe(3);
  });

  it("rozmiar równy limitowi przechodzi", () => {
    expect(solve("abc", 3).byteLength).toBe(3);
  });

  it("odrzuca tekst wielobajtowy, którego liczba znaków mieści się w limicie", () => {
    expect("żżż".length).toBe(3);
    expect(() => solve("żżż", 3)).toThrow();
  });

  it("liczy bajty także dla emoji (4 bajty na znak)", () => {
    expect(solve("🚀", 4).byteLength).toBe(4);
    expect(() => solve("🚀", 3)).toThrow();
  });
});
