import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import type { Equal, Expect } from "@harness/type-assert";
import {
  LOG_LEVEL,
  shouldLog,
  levelName,
  parseLevel,
  type LevelName,
  type LevelValue,
} from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("LevelName to unia kluczy LOG_LEVEL", () => {
    type _t = Expect<Equal<LevelName, "debug" | "info" | "warn" | "error">>;
    expect(Object.keys(LOG_LEVEL)).toHaveLength(4);
  });

  it("LevelValue to unia wartości LOG_LEVEL", () => {
    type _t = Expect<Equal<LevelValue, 10 | 20 | 30 | 40>>;
    expect(LOG_LEVEL.warn).toBe(30);
  });

  it("nieznany poziom jest błędem typu", () => {
    const illegal = (): void => {
      // @ts-expect-error "krzyk" nie jest poziomem logowania
      shouldLog("krzyk", "info");
      // @ts-expect-error 25 nie jest wartością żadnego poziomu
      levelName(25);
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("parseLevel zwraca zawężony typ, nie string", () => {
    const parsed = parseLevel("warn");
    if (parsed !== null) {
      const name: LevelName = parsed;
      expect(name).toBe("warn");
    }
    expect(parsed).toBe("warn");
  });
});

describe("shouldLog", () => {
  it("przepuszcza wiadomość powyżej progu", () => {
    expect(shouldLog("info", "warn")).toBe(true);
    expect(shouldLog("debug", "error")).toBe(true);
  });

  it("odrzuca wiadomość poniżej progu", () => {
    expect(shouldLog("info", "debug")).toBe(false);
  });

  it("próg jest włącznie", () => {
    expect(
      shouldLog("error", "error"),
      "warunek to >=, nie > — poziom równy progowi ma przechodzić",
    ).toBe(true);
  });
});

describe("levelName", () => {
  it("mapuje wartość na nazwę", () => {
    expect(levelName(30)).toBe("warn");
    expect(levelName(10)).toBe("debug");
  });
});

describe("parseLevel", () => {
  it("przepuszcza znaną nazwę poziomu", () => {
    expect(parseLevel("warn")).toBe("warn");
  });

  it("nie normalizuje wielkości liter", () => {
    expect(
      parseLevel("WARN"),
      "walidacja ma być dosłowna — inaczej wprowadzasz cichą konwersję danych",
    ).toBeNull();
  });

  it("nieznana nazwa daje null", () => {
    expect(parseLevel("krzyk")).toBeNull();
    expect(parseLevel("")).toBeNull();
  });
});

describe("ograniczenia zadania", () => {
  it("starter nie używa enum, as ani any", () => {
    const source = readFileSync(new URL("./starter.ts", import.meta.url), "utf8");
    const stripped = source.replace(/\/\/.*$/gm, "");
    expect(
      /\benum\b/.test(stripped),
      "enum emituje kod do bundle'a i nie działa przy type-strippingu — tu ćwiczymy wariant bez niego",
    ).toBe(false);
    expect(
      /\bas\s+(?!const\b)[A-Za-z{[]/.test(stripped),
      "`as` nic nie sprawdza — walidacja stringa z zewnątrz ma być prawdziwa",
    ).toBe(false);
    expect(/\bany\b/.test(stripped)).toBe(false);
  });
});
