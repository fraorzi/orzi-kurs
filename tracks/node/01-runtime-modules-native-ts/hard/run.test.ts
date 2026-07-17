import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Rozwiąż warunkowy export", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(
      solve({ node: "./node.js", default: "./web.js" }, ["node", "import"]),
    ).toBe("./node.js");
    expect(solve({ import: "./esm.js", default: "./x.js" }, ["node"])).toBe(
      "./x.js",
    );
    expect(() => solve({}, ["node"])).toThrow(/default/);
  });
});
