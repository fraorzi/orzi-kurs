import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("ścieżka względem modułu", () => {
  it("rozwiązuje plik obok modułu", () => {
    expect(solve("file:///app/src/index.js", "./data.json")).toBe(
      "/app/src/data.json",
    );
  });

  it("rozwiązuje segment nadrzędny ../", () => {
    expect(solve("file:///app/src/index.js", "../config.yml")).toBe(
      "/app/config.yml",
    );
  });

  it("nazwa bez prefiksu ./ działa tak samo", () => {
    expect(solve("file:///app/src/index.js", "helper.ts")).toBe(
      "/app/src/helper.ts",
    );
  });

  it("ostatni segment bazy (nazwa modułu) jest zastępowany, nie doklejany", () => {
    const result = solve("file:///app/src/index.js", "./x.txt");
    expect(result).not.toContain("index.js");
  });
});
