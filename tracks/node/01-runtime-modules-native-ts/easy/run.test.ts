import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("format modułu", () => {
  it("jawne rozszerzenia ESM wygrywają z typem pakietu", () => {
    expect(solve("worker.mjs", "commonjs")).toBe("esm");
    expect(solve("worker.mts", "commonjs")).toBe("esm");
  });

  it("jawne rozszerzenia CommonJS wygrywają z typem pakietu", () => {
    expect(solve("config.cjs", "module")).toBe("cjs");
    expect(solve("config.cts", "module")).toBe("cjs");
  });

  it("neutralne rozszerzenia dziedziczą format z package.json", () => {
    expect(solve("index.ts", "module")).toBe("esm");
    expect(solve("index.ts", "commonjs")).toBe("cjs");
    expect(solve("legacy.js", "commonjs")).toBe("cjs");
    expect(solve("app.js", "module")).toBe("esm");
  });

  it("liczy się ostatnie rozszerzenie, nie fragment nazwy", () => {
    expect(solve("service.test.ts", "module")).toBe("esm");
    expect(solve("build.config.cjs.ts", "commonjs")).toBe("cjs");
  });
});
