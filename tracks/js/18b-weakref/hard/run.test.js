import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { createWeakValueMap } from "./starter.js";

const src = readFileSync(new URL("./starter.js", import.meta.url), "utf8");

describe("createWeakValueMap", () => {
  it("get zwraca zapisany obiekt (dopóki jest trzymany)", () => {
    const m = createWeakValueMap();
    const user = { id: 10, name: "Ala" };
    m.set("u10", user);
    expect(m.get("u10"), "przy osiągalnym obiekcie deref() ma zwrócić dokładnie tę wartość").toBe(user);
  });

  it("has odróżnia istniejący wpis od braku", () => {
    const m = createWeakValueMap();
    const obj = { v: 1 };
    m.set("a", obj);
    expect(m.has("a")).toBe(true);
    expect(m.has("brak"), "dla nieznanego klucza has ma zwrócić false").toBe(false);
  });

  it("get dla nieznanego klucza zwraca undefined", () => {
    const m = createWeakValueMap();
    expect(m.get("nie-ma")).toBeUndefined();
  });

  it("ponowny set nadpisuje wartość pod tym samym kluczem", () => {
    const m = createWeakValueMap();
    const first = { v: 1 };
    const second = { v: 2 };
    m.set("k", first);
    m.set("k", second);
    expect(m.get("k"), "drugi set ma zastąpić wartość pod kluczem 'k'").toBe(second);
  });

  it("trzyma wartości słabo i sprząta rejestrem (WeakRef + FinalizationRegistry)", () => {
    expect(
      /WeakRef/.test(src) && /FinalizationRegistry/.test(src),
      "wartości mają być trzymane przez WeakRef, a wpisy sprzątane przez FinalizationRegistry",
    ).toBe(true);
  });
});
