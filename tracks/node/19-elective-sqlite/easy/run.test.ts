import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("parametryzowane zapytanie", () => {
  it("buduje domyślne zapytanie bez filtra statusu", () => {
    expect(solve({})).toEqual({
      sql: "SELECT * FROM jobs ORDER BY created_at DESC LIMIT $limit",
      params: { $limit: 50 },
    });
  });

  it("status trafia do parametrów, nie do SQL", () => {
    const { sql, params } = solve({ status: "failed'; DROP TABLE jobs;--" });
    expect(sql).toContain("WHERE status = $status");
    expect(sql).not.toContain("DROP TABLE");
    expect(params.$status).toBe("failed'; DROP TABLE jobs;--");
  });

  it("sortowanie spoza allow-listy jest odrzucane", () => {
    expect(() => solve({ order: "id; DROP TABLE jobs" })).toThrow();
    expect(solve({ order: "priority" }).sql).toContain("ORDER BY priority DESC");
  });

  it("limit jest walidowany co do typu i zakresu", () => {
    expect(() => solve({ limit: 0 })).toThrow();
    expect(() => solve({ limit: 101 })).toThrow();
    expect(() => solve({ limit: 10.5 })).toThrow();
    expect(solve({ limit: 100 }).params.$limit).toBe(100);
  });
});
