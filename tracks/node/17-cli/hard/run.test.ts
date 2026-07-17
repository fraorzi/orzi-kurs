import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Formatuj pomoc i błędy", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(solve("logs")).toContain("Usage: logs <file>");
    const error = new Error("Nie można otworzyć", { cause: "EACCES" });
    expect(solve("logs", error)).not.toContain("EACCES");
    expect(solve("logs", error, true)).toContain("EACCES");
  });
});
