import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { describeEvent, countFatal, type AnalyticsEvent } from "./starter";

type Pageview = Extract<AnalyticsEvent, { type: "pageview" }>;
type ClickEvent = Extract<AnalyticsEvent, { type: "click" }>;
type ErrorEvent = Extract<AnalyticsEvent, { type: "error" }>;

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("AnalyticsEvent to unia rozłączna, a każdy wariant ma własne pola", () => {
    type _p = Expect<Equal<Pageview, { type: "pageview"; path: string }>>;
    type _c = Expect<
      Equal<ClickEvent, { type: "click"; selector: string; count: number }>
    >;
    type _e = Expect<
      Equal<ErrorEvent, { type: "error"; message: string; fatal: boolean }>
    >;
    expect(describeEvent({ type: "pageview", path: "/" })).toContain("pageview");
  });

  it("wariant pageview nie ma pola selector", () => {
    const event: AnalyticsEvent = { type: "pageview", path: "/" };
    if (event.type === "pageview") {
      // @ts-expect-error pageview nie ma selektora — unia rozłączna, nie worek opcjonalnych pól
      event.selector;
    }
    expect(event.path).toBe("/");
  });

  it("nieznany typ zdarzenia jest odrzucany", () => {
    // @ts-expect-error "scroll" nie jest wariantem AnalyticsEvent
    const event: AnalyticsEvent = { type: "scroll", path: "/" };
    expect(event.type).toBe("scroll");
  });
});

describe("describeEvent", () => {
  it("opisuje pageview ścieżką", () => {
    expect(describeEvent({ type: "pageview", path: "/home" })).toBe(
      "pageview: /home",
    );
  });

  it("opisuje click selektorem i liczbą kliknięć", () => {
    expect(
      describeEvent({ type: "click", selector: "#buy", count: 3 }),
      "format: 'click: <selector> ×<count>' (znak × to U+00D7)",
    ).toBe("click: #buy ×3");
  });

  it("błąd krytyczny dostaje dopisek (krytyczny)", () => {
    expect(
      describeEvent({ type: "error", message: "boom", fatal: true }),
    ).toBe("error: boom (krytyczny)");
  });

  it("błąd niekrytyczny nie dostaje dopisku", () => {
    expect(describeEvent({ type: "error", message: "boom", fatal: false })).toBe(
      "error: boom",
    );
  });
});

describe("countFatal", () => {
  it("liczy wyłącznie błędy krytyczne", () => {
    expect(
      countFatal([
        { type: "pageview", path: "/" },
        { type: "error", message: "a", fatal: true },
        { type: "error", message: "b", fatal: false },
        { type: "click", selector: "#x", count: 1 },
        { type: "error", message: "c", fatal: true },
      ]),
    ).toBe(2);
  });

  it("dla pustej listy zwraca 0", () => {
    expect(countFatal([])).toBe(0);
  });

  it("zdarzenia bez pola fatal nie są liczone", () => {
    expect(
      countFatal([
        { type: "pageview", path: "/" },
        { type: "click", selector: "#x", count: 9 },
      ]),
      "tylko wariant error ma pole fatal — zawężaj po type",
    ).toBe(0);
  });
});
