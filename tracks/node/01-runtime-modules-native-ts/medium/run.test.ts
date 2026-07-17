import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Sprawdź kod dla type stripping", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(solve("enum Role { Admin }", "app.ts")).toContain("enum");
    expect(solve("const x: number = 1", "app.ts")).toEqual([]);
    expect(solve("export const App = () => <main />", "app.tsx")).toContain(
      "tsx",
    );
  });
});
