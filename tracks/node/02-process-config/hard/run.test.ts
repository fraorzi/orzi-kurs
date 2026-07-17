import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Redaguj diagnostykę procesu", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(
      solve({ NODE_ENV: "test", API_TOKEN: "abc", dbPassword: "xyz" }),
    ).toEqual({
      NODE_ENV: "test",
      API_TOKEN: "[REDACTED]",
      dbPassword: "[REDACTED]",
    });
    expect(solve({ EMPTY: undefined })).toEqual({});
  });
});
