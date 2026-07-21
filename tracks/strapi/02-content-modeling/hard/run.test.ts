import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("renderowanie kontraktu dynamic zone", () => {
  it("renderuje hero i gallery z zachowaniem kolejności", () => {
    expect(
      solve([
        { __component: "page.hero", title: "Start" },
        { __component: "page.gallery", images: ["a", "b"] },
      ]),
    ).toEqual(["hero:Start", "gallery:2"]);
  });

  it("renderuje quote", () => {
    expect(solve([{ __component: "page.quote", text: "Cytat dnia" }])).toEqual([
      "quote:Cytat dnia",
    ]);
  });

  it("renderuje galerię bez zdjęć jako gallery:0", () => {
    expect(solve([{ __component: "page.gallery", images: [] }])).toEqual([
      "gallery:0",
    ]);
  });

  it("zachowuje kolejność przy mieszance wszystkich trzech typów", () => {
    expect(
      solve([
        { __component: "page.quote", text: "Q" },
        { __component: "page.hero", title: "H" },
        { __component: "page.gallery", images: ["x"] },
      ]),
    ).toEqual(["quote:Q", "hero:H", "gallery:1"]);
  });

  it("zwraca pustą listę dla pustej dynamic zone", () => {
    expect(solve([])).toEqual([]);
  });
});
