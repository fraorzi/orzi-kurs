import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Twórz logi strukturalne", () => {
  it("spełnia kontrakt zadania", async () => {
    const line = solve(
      {
        level: "info",
        message: "request",
        requestId: "r1",
        fields: { status: 200, token: "abc", skip: undefined },
      },
      () => "2026-01-01T00:00:00.000Z",
    );
    expect(JSON.parse(line)).toEqual({
      timestamp: "2026-01-01T00:00:00.000Z",
      level: "info",
      message: "request",
      requestId: "r1",
      status: 200,
      token: "[REDACTED]",
    });
    expect(line.endsWith("\n")).toBe(true);
  });
});
