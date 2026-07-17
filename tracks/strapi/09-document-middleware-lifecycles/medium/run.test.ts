import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Deduplikuj efekty lifecycle", () => {
  it("spełnia kontrakt warstwy backendowej", async () => {
    const event = { documentId: "doc", action: "publish", locale: "pl" };
    expect(solve([event, event, { ...event, locale: "en" }])).toEqual([event, { ...event, locale: "en" }]);
  });
});

