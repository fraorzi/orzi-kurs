import { describe, expect, it } from "vitest";
import { solve, type Entry } from "./starter";

const REPOSITORY: Entry[] = [
  { id: 7, documentId: "doc-a", locale: "pl", status: "draft", title: "A draft PL" },
  { id: 8, documentId: "doc-a", locale: "pl", status: "published", title: "A published PL" },
  { id: 9, documentId: "doc-a", locale: "en", status: "published", title: "A published EN" },
  { id: 10, documentId: "doc-b", locale: "pl", status: "published", title: "B published PL" },
];

describe("zachowanie tożsamości dokumentu w repozytorium", () => {
  it("wybiera wpis po documentId, locale i status razem", () => {
    expect(solve(REPOSITORY, "doc-a", "pl", "published")?.id).toBe(8);
  });

  it("rozróżnia dokumenty o tym samym locale i status", () => {
    expect(solve(REPOSITORY, "doc-b", "pl", "published")?.id).toBe(10);
  });

  it("rozróżnia wersje tego samego dokumentu po locale", () => {
    expect(solve(REPOSITORY, "doc-a", "en", "published")?.id).toBe(9);
  });

  it("nie myli numerycznego id z documentId", () => {
    expect(solve(REPOSITORY, "8", "pl", "published")).toBeNull();
  });

  it("zwraca null, gdy żądana kombinacja locale/status nie istnieje", () => {
    expect(solve(REPOSITORY, "doc-a", "de", "published")).toBeNull();
    expect(solve(REPOSITORY, "doc-b", "pl", "draft")).toBeNull();
  });
});
