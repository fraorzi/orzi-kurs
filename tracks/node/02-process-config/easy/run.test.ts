import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Parsuj jawne argumenty CLI", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(solve(["--port", "8080", "--host=0.0.0.0", "--json"])).toEqual({
      port: 8080,
      host: "0.0.0.0",
      json: true,
    });
    expect(() => solve(["--port", "0"])).toThrow(/port/);
    expect(() => solve(["--wat"])).toThrow(/Nieznany/);
  });
});
