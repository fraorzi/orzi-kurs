import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Waliduj env na granicy", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(
      solve({ API_URL: "https://api.example", TIMEOUT_MS: "900" }).timeoutMs,
    ).toBe(900);
    expect(() => solve({ API_URL: "x" })).toThrow();
    expect(() =>
      solve({
        API_URL: "https://x.test",
        NODE_ENV: "production",
        APP_SECRET: "short",
      }),
    ).toThrow(/APP_SECRET/);
  });
});
