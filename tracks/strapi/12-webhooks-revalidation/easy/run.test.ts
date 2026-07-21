import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Uwierzytelnij sekret webhooka", () => {
  it("akceptuje identyczne sekrety tej samej długości", () => {
    expect(solve("secret-123", "secret-123")).toBe(true);
  });

  it("odrzuca różne sekrety tej samej długości", () => {
    expect(solve("secret-124", "secret-123")).toBe(false);
  });

  it("odrzuca brak nagłówka (received undefined)", () => {
    expect(solve(undefined, "secret-123")).toBe(false);
  });

  it("odrzuca sekrety o różnej długości bez rzucania błędu", () => {
    expect(() => solve("ab", "a".repeat(5000))).not.toThrow();
    expect(solve("ab", "a".repeat(5000))).toBe(false);
  });

  it("traktuje dwa puste sekrety jako brak konfiguracji, nie dopasowanie", () => {
    expect(solve("", "")).toBe(false);
  });
});
