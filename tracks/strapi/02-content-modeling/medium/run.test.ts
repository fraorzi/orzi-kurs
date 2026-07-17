import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Normalizuj powtarzalne komponenty", () => {
  it("spełnia kontrakt Strapi 5", async () => {
    expect(solve([{ id: 1, question: " Q? ", answer: " A " }, { question: "", answer: "x" }])).toEqual([{ question: "Q?", answer: "A" }]);
  });
});

