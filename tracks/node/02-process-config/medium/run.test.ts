import { describe, expect, it } from "vitest";
import { solve } from "./starter";

const base = {
  API_URL: "https://api.example.com/v1",
  APP_SECRET: "x".repeat(32),
};

describe("walidacja konfiguracji środowiska", () => {
  it("buduje kompletny, zamrożony config z poprawnego env", () => {
    const config = solve({ ...base, TIMEOUT_MS: "2500" });
    expect(config.apiUrl.hostname).toBe("api.example.com");
    expect(config.timeoutMs).toBe(2500);
    expect(Object.isFrozen(config)).toBe(true);
  });

  it("stosuje domyślny timeout 5000 ms", () => {
    expect(solve(base).timeoutMs).toBe(5000);
  });

  it("odrzuca brakujący lub niepoprawny API_URL", () => {
    expect(() => solve({})).toThrow();
    expect(() => solve({ API_URL: "nie-url" })).toThrow();
  });

  it("odrzuca timeout nieliczbowy i mniejszy niż 100 ms", () => {
    expect(() => solve({ ...base, TIMEOUT_MS: "50" })).toThrow();
    expect(() => solve({ ...base, TIMEOUT_MS: "abc" })).toThrow();
  });

  it("wymaga długiego sekretu tylko w produkcji", () => {
    const short = { ...base, APP_SECRET: "krotki" };
    expect(() => solve({ ...short, NODE_ENV: "production" })).toThrow();
    expect(() => solve(short)).not.toThrow();
  });
});
