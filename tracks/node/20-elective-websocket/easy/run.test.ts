import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("walidacja endpointu WebSocket", () => {
  it("akceptuje wss z poprawnymi subprotokołami", () => {
    const result = solve("wss://api.example.com/feed", ["events.v1"], true);
    expect(result.url).toBeInstanceOf(URL);
    expect(result.url.protocol).toBe("wss:");
    expect(result.protocols).toEqual(["events.v1"]);
  });

  it("odrzuca schematy inne niż ws/wss", () => {
    expect(() => solve("https://api.example.com", [], false)).toThrow();
    expect(() => solve("ftp://api.example.com", [], false)).toThrow();
  });

  it("w produkcji wymaga wss, na dev dopuszcza ws", () => {
    expect(() => solve("ws://localhost:8080", [], true)).toThrow();
    expect(solve("ws://localhost:8080", [], false).url.port).toBe("8080");
  });

  it("odrzuca credentials w URL", () => {
    expect(() => solve("wss://user:pass@api.example.com", [], true)).toThrow();
    expect(() => solve("wss://user@api.example.com", [], true)).toThrow();
  });

  it("deduplikuje subprotokoły i odrzuca nieznane", () => {
    expect(
      solve("wss://x.test", ["events.v1", "events.v1", "json.v1"], true)
        .protocols,
    ).toEqual(["events.v1", "json.v1"]);
    expect(() => solve("wss://x.test", ["admin.v1"], true)).toThrow();
  });
});
