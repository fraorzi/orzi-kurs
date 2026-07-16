import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  assertRuntimeConfig,
  loadRuntimeConfig,
  type RuntimeConfig,
} from "./starter";

describe("assertRuntimeConfig", () => {
  it("zawęża unknown po zakończeniu bez błędu", () => {
    const value: unknown = {
      apiUrl: "https://api.test",
      port: 3000,
      mode: "development",
    };
    assertRuntimeConfig(value);
    type _value = Expect<Equal<typeof value, RuntimeConfig>>;
    expect(value.port).toBe(3000);
  });

  it.each([
    [null, "config"],
    [[], "config"],
    [{ apiUrl: "", port: 3000, mode: "development" }, "apiUrl"],
    [{ apiUrl: "x", port: 0, mode: "development" }, "port"],
    [{ apiUrl: "x", port: 1.5, mode: "development" }, "port"],
    [{ apiUrl: "x", port: 3000, mode: "test" }, "mode"],
  ])("odrzuca %j i wskazuje %s", (value, field) => {
    expect(() => assertRuntimeConfig(value)).toThrow(field);
  });
});

describe("loadRuntimeConfig", () => {
  it("normalizuje końcowy ukośnik bez mutowania wejścia", () => {
    const input = {
      apiUrl: "https://api.test///",
      port: 443,
      mode: "production",
    };
    expect(loadRuntimeConfig(input)).toEqual({
      ...input,
      apiUrl: "https://api.test",
    });
    expect(input.apiUrl).toBe("https://api.test///");
  });
});
