import { describe, expect, it } from "vitest";
import { solve, type Event } from "./starter";

const publishPl: Event = { documentId: "doc", action: "publish", locale: "pl" };

describe("deduplikacja efektów lifecycle", () => {
  it("łączy identyczne zdarzenia, ale zachowuje osobne locale jako uprawnione wpisy", () => {
    const publishEn: Event = { ...publishPl, locale: "en" };
    expect(solve([publishPl, publishPl, publishEn])).toEqual([publishPl, publishEn]);
  });

  it("nie łączy tego samego documentId, gdy action jest różna", () => {
    const update: Event = { ...publishPl, action: "update" };
    expect(solve([publishPl, update])).toEqual([publishPl, update]);
  });

  it("redukuje wielokrotny duplikat (3x to samo zdarzenie) do jednego wpisu", () => {
    expect(solve([publishPl, { ...publishPl }, { ...publishPl }])).toEqual([publishPl]);
  });

  it("zachowuje kolejność wejściową, gdy duplikat pojawia się po innym zdarzeniu", () => {
    const update: Event = { ...publishPl, action: "update" };
    expect(solve([publishPl, update, publishPl])).toEqual([publishPl, update]);
  });

  it("pusta lista zdarzeń daje pustą listę wyjściową", () => {
    expect(solve([])).toEqual([]);
  });
});
