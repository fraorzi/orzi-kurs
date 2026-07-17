import { describe, expect, it } from "vitest";
import { solve } from "./starter";

const now = () => "2026-07-17T12:00:00.000Z";

describe("structured log line", () => {
  it("buduje pełny wpis NDJSON z timestampem z zegara", () => {
    const line = solve(
      { level: "info", message: "start", requestId: "req-1" },
      now,
    );
    expect(line.endsWith("\n")).toBe(true);
    expect(JSON.parse(line)).toEqual({
      timestamp: "2026-07-17T12:00:00.000Z",
      level: "info",
      message: "start",
      requestId: "req-1",
    });
  });

  it("dołącza płytkie pola i redaguje wrażliwe klucze", () => {
    const parsed = JSON.parse(
      solve(
        {
          level: "warn",
          message: "auth",
          fields: { userId: "u-7", apiToken: "sekret", dbPassword: "haslo" },
        },
        now,
      ),
    );
    expect(parsed.userId).toBe("u-7");
    expect(parsed.apiToken).toBe("[REDACTED]");
    expect(parsed.dbPassword).toBe("[REDACTED]");
  });

  it("pola undefined znikają zamiast serializować się jako null", () => {
    const parsed = JSON.parse(
      solve(
        { level: "info", message: "x", fields: { a: 1, b: undefined } },
        now,
      ),
    );
    expect(parsed.a).toBe(1);
    expect("b" in parsed).toBe(false);
  });

  it("brak requestId oznacza brak klucza", () => {
    const parsed = JSON.parse(solve({ level: "info", message: "x" }, now));
    expect("requestId" in parsed).toBe(false);
  });
});
