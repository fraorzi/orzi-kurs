import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

describe("Zaplanuj migracje", () => {
  it("spełnia kontrakt elective", async () => {
    expect(
      solve(1, [
        { version: 3, sql: "c" },
        { version: 2, sql: "b" },
      ]),
    ).toEqual([
      { version: 2, sql: "b" },
      { version: 3, sql: "c" },
    ]);
    expect(() => solve(1, [{ version: 3, sql: "c" }])).toThrow(/Luka/);
    expect(() =>
      solve(0, [
        { version: 1, sql: "a" },
        { version: 1, sql: "b" },
      ]),
    ).toThrow(/wersje/);
  });
});
