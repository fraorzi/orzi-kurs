import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Renderuj kontrakt dynamic zone", () => {
  it("spełnia kontrakt Strapi 5", async () => {
    expect(solve([{ __component: "page.hero", title: "Start" }, { __component: "page.gallery", images: ["a", "b"] }])).toEqual(["hero:Start", "gallery:2"]);
  });
});

