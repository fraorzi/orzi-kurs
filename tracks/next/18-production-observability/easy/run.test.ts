import { describe, expect, it } from "vitest";
import { readServerEnv } from "./starter";

const valid = {
  DATABASE_URL: "postgresql://db.internal/app",
  SESSION_SECRET: "x".repeat(32),
  OTEL_SERVICE_NAME: " storefront ",
  UNUSED: "do-not-return",
};

describe("readServerEnv", () => {
  it("zwraca minimalną, zamrożoną konfigurację", () => {
    const result = readServerEnv(valid);
    expect(result).toEqual({
      databaseUrl: "postgresql://db.internal/app",
      sessionSecret: "x".repeat(32),
      otelServiceName: "storefront",
    });
    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.keys(result)).toHaveLength(3);
  });

  it("raportuje nazwy wszystkich błędnych pól bez wartości", () => {
    expect(() => readServerEnv({
      DATABASE_URL: "mysql://secret-host/db",
      SESSION_SECRET: "too-short-secret",
      OTEL_SERVICE_NAME: " ",
      NEXT_PUBLIC_SESSION_SECRET: "visible-secret",
    })).toThrow(/DATABASE_URL.*SESSION_SECRET.*OTEL_SERVICE_NAME.*NEXT_PUBLIC_SESSION_SECRET/);
    try {
      readServerEnv({ NEXT_PUBLIC_DATABASE_URL: "postgresql://user:password@host/db" });
    } catch (error) {
      expect(String(error)).not.toContain("password");
    }
  });
});
