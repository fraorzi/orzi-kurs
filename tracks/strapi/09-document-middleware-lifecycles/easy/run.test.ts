import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Filtruj odczyt w Document Service middleware", () => {
  it("spełnia kontrakt warstwy backendowej", async () => {
    expect(solve("findMany", { filters: { category: "news" } }, "t1")).toEqual({ status: "published", filters: { category: "news", tenantId: "t1" } });
    expect(solve("create", { data: {} }, "t1")).toEqual({ data: {} });
  });
});

