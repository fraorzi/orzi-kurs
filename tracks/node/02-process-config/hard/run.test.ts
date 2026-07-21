import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("redakcja snapshotu env", () => {
  it("redaguje wszystkie cztery wrażliwe wzorce niezależnie od wielkości liter", () => {
    const snapshot = solve({
      API_TOKEN: "t-1",
      app_secret: "s-1",
      DB_PASSWORD: "p-1",
      SIGNING_KEY: "k-1",
    });
    expect(Object.values(snapshot)).toEqual([
      "[REDACTED]",
      "[REDACTED]",
      "[REDACTED]",
      "[REDACTED]",
    ]);
  });

  it("zachowuje niewrażliwe wartości bez zmian", () => {
    expect(solve({ NODE_ENV: "production", PORT: "3000" })).toEqual({
      NODE_ENV: "production",
      PORT: "3000",
    });
  });

  it("pomija wpisy undefined zamiast zamieniać je na tekst", () => {
    const snapshot = solve({ DEFINED: "yes", MISSING: undefined });
    expect(snapshot).toEqual({ DEFINED: "yes" });
    expect("MISSING" in snapshot).toBe(false);
  });

  it("zwraca snapshot niezależny od wejścia", () => {
    const env = { HOST: "localhost" };
    const snapshot = solve(env);
    snapshot.HOST = "zmienione";
    expect(env.HOST).toBe("localhost");
  });
});
