import { describe, expect, it } from "vitest";
import { solve } from "./starter";

const docs = [
  { documentId: "d", status: "draft" as const, title: "Szkic", slug: "d", secret: "x" },
  { documentId: "p", status: "published" as const, title: "Gotowe", slug: "p", secret: "y" },
];

describe("filtr statusu i sanitizacja pól", () => {
  it("publiczny wynik pomija drafty", () => {
    expect(solve(docs, "public")).toEqual([
      { documentId: "p", status: "published", title: "Gotowe", slug: "p" },
    ]);
  });

  it("editor widzi drafty, ale nadal bez pól spoza allow-listy", () => {
    const result = solve(docs, "editor");
    expect(result).toHaveLength(2);
    expect(JSON.stringify(result)).not.toContain("secret");
  });

  it("żadna rola nie przepuszcza sekretu", () => {
    expect(JSON.stringify(solve(docs, "public"))).not.toContain("secret");
    expect(JSON.stringify(solve(docs, "editor"))).not.toContain("x");
  });

  it("zachowuje kolejność i allow-listę pól dla editora", () => {
    expect(solve(docs, "editor")[0]).toEqual({
      documentId: "d",
      status: "draft",
      title: "Szkic",
      slug: "d",
    });
  });
});
