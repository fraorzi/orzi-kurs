import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("stałoczasowe porównanie podpisów", () => {
  it("akceptuje identyczne podpisy, także przy różnej wielkości liter", () => {
    expect(solve("deadbeef", "deadbeef")).toBe(true);
    expect(solve("DEADBEEF", "deadbeef")).toBe(true);
  });

  it("odrzuca podpisy różne o jeden bajt", () => {
    expect(solve("deadbeef", "deadbeee")).toBe(false);
  });

  it("różna długość to false bez wyjątku", () => {
    expect(() => solve("dead", "deadbeef")).not.toThrow();
    expect(solve("dead", "deadbeef")).toBe(false);
  });

  it("śmieciowe wejście to false bez wyjątku", () => {
    expect(solve("nie-hex", "nie-hex")).toBe(false);
    expect(solve("abc", "abc")).toBe(false);
    expect(solve("", "")).toBe(false);
  });

  it("porównanie wykonuje crypto.timingSafeEqual, nie ===", () => {
    const source = readFileSync(new URL("./starter.ts", import.meta.url), "utf8");
    expect(source).toContain("timingSafeEqual");
  });
});
