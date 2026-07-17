import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Rozpoznaj format modułu", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(solve("worker.mts", "commonjs")).toBe("esm");
    expect(solve("config.cts", "module")).toBe("cjs");
    expect(solve("index.ts", "module")).toBe("esm");
  });
});
