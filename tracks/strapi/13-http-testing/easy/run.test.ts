import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Buduj deterministyczne fixture dokumentu", () => {
  it("spełnia kontrakt produkcyjny", async () => {
    expect(solve()).toEqual({ documentId: "fixturearticle00000000001", locale: "pl", status: "draft", title: "Fixture" });
    expect(solve({ status: "published" })).toMatchObject({ documentId: "fixturearticle00000000001", status: "published" });
  });
});

