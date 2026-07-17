import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

describe("Zbuduj parametryzowane zapytanie", () => {
  it("spełnia kontrakt elective", async () => {
    expect(solve({ status: "queued", limit: 20, order: "priority" })).toEqual({
      sql: "SELECT * FROM jobs WHERE status = $status ORDER BY priority DESC LIMIT $limit",
      params: { $status: "queued", $limit: 20 },
    });
    expect(() => solve({ order: "id; DROP TABLE jobs" })).toThrow(/sortowanie/);
  });
});
