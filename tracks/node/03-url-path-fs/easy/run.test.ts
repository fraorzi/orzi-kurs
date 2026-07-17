import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Zamień URL modułu na ścieżkę", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(
      decodeURIComponent(
        solve("file:///app/src/main.ts", "../data/a%20b.json"),
      ),
    ).toBe("/app/data/a b.json");
    expect(solve("file:///app/src/main.ts", "./x.txt")).toBe("/app/src/x.txt");
  });
});
