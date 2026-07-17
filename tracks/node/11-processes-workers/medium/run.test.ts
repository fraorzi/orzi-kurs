import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Wybierz mechanizm pracy", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(solve({ kind: "network", estimatedMs: 500 })).toBe("async");
    expect(solve({ kind: "external", estimatedMs: 5 })).toBe("child_process");
    expect(solve({ kind: "cpu", estimatedMs: 50 })).toBe("worker");
  });
});
