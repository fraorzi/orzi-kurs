import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Zamknij wyciek draftu i pól prywatnych", () => {
  it("spełnia kontrakt produkcyjny", async () => {
    const docs = [{ documentId: "d", status: "draft" as const, title: "D", slug: "d", secret: "x" }, { documentId: "p", status: "published" as const, title: "P", slug: "p", secret: "y" }];
    expect(solve(docs, "public")).toEqual([{ documentId: "p", status: "published", title: "P", slug: "p" }]);
    expect(JSON.stringify(solve(docs, "editor"))).not.toContain("secret");
  });
});

