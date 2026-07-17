import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

describe("Waliduj endpoint WebSocket", () => {
  it("spełnia kontrakt elective", async () => {
    const result = solve(
      "wss://events.example/socket",
      ["events.v1", "events.v1"],
      true,
    );
    expect(result.protocols).toEqual(["events.v1"]);
    expect(result.url.hostname).toBe("events.example");
    expect(() => solve("ws://events.example", [], true)).toThrow(/wss/);
    expect(() => solve("wss://user:pass@events.example", [], true)).toThrow(
      /Credentials/,
    );
  });
});
