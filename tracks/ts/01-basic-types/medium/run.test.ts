import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  STATUS,
  LABELS,
  nextStatus,
  describeStatus,
  type Status,
} from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("STATUS trzyma literały, nie string", () => {
    type _t = Expect<
      Equal<
        typeof STATUS,
        {
          readonly draft: "draft";
          readonly review: "review";
          readonly published: "published";
        }
      >
    >;
    expect(STATUS.draft).toBe("draft");
  });

  it("Status jest unią wartości mapy STATUS", () => {
    type _t = Expect<Equal<Status, "draft" | "review" | "published">>;
    const s: Status = "published";
    expect(Object.values(STATUS)).toContain(s);
  });

  it("LABELS ma etykietę dla każdego statusu (Record<Status, string>)", () => {
    type _t = Expect<Equal<typeof LABELS, Record<Status, string>>>;
    expect(
      Object.keys(LABELS).sort(),
      "Record<Status, string> wymusza komplet kluczy — brak jednego to błąd typu",
    ).toEqual(["draft", "published", "review"]);
  });

  it("nieznany status jest odrzucany przez typ", () => {
    // @ts-expect-error "deleted" nie należy do unii Status
    const s: Status = "deleted";
    expect(s).toBe("deleted");
  });
});

describe("nextStatus", () => {
  it("przesuwa draft na review", () => {
    expect(nextStatus("draft")).toBe("review");
  });

  it("przesuwa review na published", () => {
    expect(nextStatus("review")).toBe("published");
  });

  it("published jest stanem końcowym — zwraca sam siebie", () => {
    expect(
      nextStatus("published"),
      "po published nie ma kolejnego statusu — funkcja ma zwrócić published",
    ).toBe("published");
  });
});

describe("describeStatus", () => {
  it("skleja etykietę z LABELS i status w nawiasie", () => {
    expect(describeStatus("review")).toBe("W recenzji (review)");
  });

  it("działa dla każdego statusu z unii", () => {
    expect(describeStatus("draft")).toBe("Szkic (draft)");
    expect(describeStatus("published")).toBe("Opublikowany (published)");
  });
});
