import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("weryfikacja kardynalności relacji", () => {
  it("akceptuje relację dwukierunkową z inversedBy po stronie właściciela", () => {
    expect(
      solve({ relation: "manyToMany", bidirectional: true, inversedBy: "articles" }),
    ).toBe(true);
  });

  it("odrzuca relację dwukierunkową bez mappedBy ani inversedBy", () => {
    expect(solve({ relation: "manyToMany", bidirectional: true })).toBe(false);
  });

  it("akceptuje mappedBy jako wystarczające wskazanie właściciela", () => {
    expect(
      solve({ relation: "oneToMany", bidirectional: true, mappedBy: "article" }),
    ).toBe(true);
  });

  it("nie wymaga właściciela dla relacji jednokierunkowej", () => {
    expect(solve({ relation: "oneToOne", bidirectional: false })).toBe(true);
  });

  it("odrzuca nieznaną nazwę cardinality", () => {
    expect(solve({ relation: "manyToMany-legacy", bidirectional: false })).toBe(false);
  });
});
