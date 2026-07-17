import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Wykryj drift typów generowanych", () => {
  it("spełnia kontrakt Strapi 5", async () => {
    expect(solve({ a: "1", b: "2" }, { a: "1", b: "old", c: "3" })).toEqual(["b", "c"]);
  });
});

