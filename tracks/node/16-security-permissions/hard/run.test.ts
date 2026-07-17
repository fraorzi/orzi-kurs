import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("bezpieczna serializacja diagnostyczna", () => {
  it("redaguje wrażliwe klucze na każdej głębokości", () => {
    const result = solve({
      user: "ala",
      config: { apiToken: "t", nested: { Authorization: "Bearer x" } },
    }) as Record<string, unknown>;
    expect(result.user).toBe("ala");
    const config = result.config as Record<string, unknown>;
    expect(config.apiToken).toBe("[REDACTED]");
    expect((config.nested as Record<string, unknown>).Authorization).toBe(
      "[REDACTED]",
    );
  });

  it("ucina strukturę poniżej maxDepth znacznikiem", () => {
    const deep = { a: { b: { c: { d: "za głęboko" } } } };
    const result = solve(deep, 2) as Record<string, unknown>;
    const b = (result.a as Record<string, unknown>).b as Record<string, unknown>;
    expect(b.c).toBe("[TRUNCATED]");
  });

  it("przycina tablice do maxItems i oznacza ucięcie", () => {
    expect(solve([1, 2, 3, 4, 5, 6, 7], 3, 5)).toEqual([
      1, 2, 3, 4, 5, "[TRUNCATED]",
    ]);
    expect(solve([1, 2], 3, 5)).toEqual([1, 2]);
  });

  it("nie mutuje wejścia", () => {
    const input = { secretKey: "s", list: [1, 2, 3, 4, 5, 6] };
    solve(input);
    expect(input.secretKey).toBe("s");
    expect(input.list).toHaveLength(6);
  });
});
