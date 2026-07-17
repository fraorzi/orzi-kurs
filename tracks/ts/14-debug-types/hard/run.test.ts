import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadServiceConfig } from "./starter";

describe("loadServiceConfig", () => {
  it("buduje poprawną konfigurację i domyślny log level", () => {
    expect(
      loadServiceConfig({
        API_URL: "https://api.test",
        PORT: "3000",
      }),
    ).toEqual({
      ok: true,
      config: {
        apiUrl: "https://api.test",
        port: 3000,
        logLevel: "info",
      },
    });
  });

  it("zbiera wszystkie błędy w kolejności", () => {
    expect(
      loadServiceConfig({
        API_URL: "",
        PORT: "3.5",
        LOG_LEVEL: "verbose",
      }),
    ).toEqual({
      ok: false,
      errors: [
        "API_URL is required",
        "PORT must be an integer from 1 to 65535",
        "LOG_LEVEL must be debug, info or error",
      ],
    });
  });

  it.each(["0", "65536", "abc"])("odrzuca PORT=%s", (PORT) => {
    expect(
      loadServiceConfig({ API_URL: "x", PORT }),
    ).toMatchObject({ ok: false });
  });

  it("nie maskuje problemu assertion", () => {
    const source = readFileSync(new URL("./starter.ts", import.meta.url), "utf8");
    expect(source).not.toMatch(/\bas\s+|\bany\b|!\./);
  });
});
