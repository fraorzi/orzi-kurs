import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Waliduj granicę paginacji REST", () => {
  it("spełnia kontrakt Strapi 5", async () => {
    expect(solve({ page: 2, pageSize: 10, pageCount: 3, total: 25 }).total).toBe(25);
    expect(() => solve({ page: 4, pageSize: 10, pageCount: 3, total: 25 })).toThrow(/paginacja/);
  });
});

