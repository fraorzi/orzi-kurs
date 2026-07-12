import { describe, it, expect } from "vitest";
import { makeReadTracker } from "./starter.js";

describe("makeReadTracker", () => {
  it("nieoznaczona wiadomość nie jest przeczytana", () => {
    const tracker = makeReadTracker();
    expect(tracker.isRead({ text: "x" })).toBe(false);
  });

  it("po markRead ta sama wiadomość jest przeczytana", () => {
    const tracker = makeReadTracker();
    const msg = { text: "cześć" };
    tracker.markRead(msg);
    expect(tracker.isRead(msg), "markRead ma dodać obiekt do WeakSet, a isRead sprawdzić has").toBe(
      true,
    );
  });

  it("rozpoznaje wiadomości po tożsamości (referencji), nie po treści", () => {
    const tracker = makeReadTracker();
    tracker.markRead({ text: "cześć" });
    expect(
      tracker.isRead({ text: "cześć" }),
      "WeakSet trzyma klucze po referencji — inny obiekt o tej samej treści to inna wiadomość",
    ).toBe(false);
  });

  it("każdy tracker ma niezależny stan", () => {
    const a = makeReadTracker();
    const b = makeReadTracker();
    const msg = { text: "x" };
    a.markRead(msg);
    expect(b.isRead(msg), "drugi tracker ma własny WeakSet — nie widzi oznaczeń pierwszego").toBe(
      false,
    );
  });

  it("oznaczenie prymitywu rzuca TypeError (klucz WeakSet musi być obiektem)", () => {
    const tracker = makeReadTracker();
    expect(
      () => tracker.markRead("nie-obiekt"),
      "WeakSet.add odrzuca prymitywy — dlatego flagi trzyma się tylko dla obiektów",
    ).toThrow(TypeError);
  });
});
