import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Napraw lookup id vs documentId", () => {
  it("spełnia kontrakt produkcyjny", async () => {
    expect(solve([{ id: 9, documentId: "article-doc", title: "A" }], "article-doc")?.id).toBe(9);
  });
});

