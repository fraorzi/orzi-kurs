import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("document middleware filtrujący findMany", () => {
  it("wymusza published i dołącza tenant, zachowując istniejące filtry", () => {
    expect(solve("findMany", { filters: { category: "news" } }, "t1")).toEqual({
      status: "published",
      filters: { category: "news", tenantId: "t1" },
    });
  });

  it("nie dotyka innych akcji Document Service", () => {
    expect(solve("create", { data: { title: "x" } }, "t1")).toEqual({ data: { title: "x" } });
    expect(solve("findOne", { documentId: "doc-1" }, "t1")).toEqual({ documentId: "doc-1" });
    expect(solve("update", {}, "t1")).toEqual({});
  });

  it("działa, gdy findMany nie ma jeszcze filters", () => {
    expect(solve("findMany", {}, "t2")).toEqual({
      status: "published",
      filters: { tenantId: "t2" },
    });
  });

  it("nadpisuje status draft na published nawet gdy ktoś próbował go wymusić", () => {
    expect(solve("findMany", { status: "draft" }, "t1")).toMatchObject({ status: "published" });
  });

  it("nie mutuje przekazanego obiektu params", () => {
    const params = { filters: { category: "news" } };
    const result = solve("findMany", params, "t1");
    expect(params).toEqual({ filters: { category: "news" } });
    expect(result).not.toBe(params);
  });
});
