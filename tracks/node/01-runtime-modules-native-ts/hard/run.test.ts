import { describe, expect, it } from "vitest";
import { solve } from "./starter";

const map = {
  node: "./dist/node.js",
  import: "./dist/esm.js",
  default: "./dist/index.js",
};

describe("wybór warunkowego exportu", () => {
  it("zwraca pierwszy warunek obecny w mapie, wg kolejności conditions", () => {
    expect(solve(map, ["node", "import"])).toBe("./dist/node.js");
    expect(solve(map, ["import", "node"])).toBe("./dist/esm.js");
  });

  it("pomija warunki nieobecne w mapie", () => {
    expect(solve(map, ["browser", "worker", "import"])).toBe("./dist/esm.js");
  });

  it("wraca do default, gdy żaden warunek nie pasuje", () => {
    expect(solve(map, ["browser", "deno"])).toBe("./dist/index.js");
  });

  it("rzuca dla mapy bez default i bez dopasowania", () => {
    expect(() => solve({ node: "./dist/node.js" }, ["browser"])).toThrow();
  });
});
