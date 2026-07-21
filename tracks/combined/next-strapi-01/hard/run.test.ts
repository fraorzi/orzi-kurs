import { describe, expect, it } from "vitest";
import { updateArticle, type Deps } from "./starter";

const ID = "a1b2c3d4e5f6g7h8i9j0klmn";

function fixture(events: string[], owner = "u1"): Deps {
  return {
    owner: async () => owner,
    update: async () => {
      events.push("update");
    },
    revalidate: (tag) => {
      events.push(tag);
    },
  };
}

describe("Next + Strapi CRUD", () => {
  it("aktualizuje artykuł, przycina tytuł i rewaliduje tagi po zapisie", async () => {
    const events: string[] = [];
    await updateArticle(fixture(events), "u1", ID, " Tytuł ");
    expect(events).toEqual(["update", "article:" + ID, "articles"]);
  });

  it("nie zapisuje cudzego dokumentu", async () => {
    const events: string[] = [];
    await expect(
      updateArticle(fixture(events, "u2"), "u1", ID, "Tytuł"),
    ).rejects.toThrow(/Not found/);
    expect(events).toEqual([]);
  });

  it("odrzuca nieprawidłowy format documentId przed sprawdzeniem ownership", async () => {
    let ownerCalls = 0;
    const deps: Deps = {
      owner: async () => {
        ownerCalls += 1;
        return "u1";
      },
      update: async () => {},
      revalidate: () => {},
    };
    await expect(
      updateArticle(deps, "u1", "not-a-valid-id", "Tytuł"),
    ).rejects.toThrow(/documentId/);
    expect(ownerCalls).toBe(0);
  });

  it("odrzuca tytuł krótszy niż 3 znaki po przycięciu białych znaków", async () => {
    let ownerCalls = 0;
    const deps: Deps = {
      owner: async () => {
        ownerCalls += 1;
        return "u1";
      },
      update: async () => {},
      revalidate: () => {},
    };
    await expect(updateArticle(deps, "u1", ID, "  Ok  ")).rejects.toThrow(
      /title/i,
    );
    expect(ownerCalls).toBe(0);
  });

  it("odrzuca tytuł, który nie jest stringiem", async () => {
    let ownerCalls = 0;
    const deps: Deps = {
      owner: async () => {
        ownerCalls += 1;
        return "u1";
      },
      update: async () => {},
      revalidate: () => {},
    };
    await expect(updateArticle(deps, "u1", ID, 123)).rejects.toThrow(
      /title/i,
    );
    expect(ownerCalls).toBe(0);
  });
});
