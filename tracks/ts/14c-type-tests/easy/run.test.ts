import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { createUser } from "./src/api";

describe("type-tests.ts", () => {
  it("API nadal działa runtime", () => {
    expect(createUser({ name: "Ala", role: "admin" })).toEqual({
      id: 1,
      name: "Ala",
      role: "admin",
    });
  });

  it("zawiera test pozytywny i celowy test negatywny", () => {
    const source = readFileSync(
      new URL("./src/type-tests.ts", import.meta.url),
      "utf8",
    );
    expect(source).toMatch(/Expect<Equal</);
    expect(source).toMatch(/@ts-expect-error.+owner/);
  });
});
