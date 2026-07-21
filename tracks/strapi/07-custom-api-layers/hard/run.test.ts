import { describe, expect, it } from "vitest";
import { solve, type Repo } from "./starter";

describe("niezmiennik w custom service zmiany sluga", () => {
  it("normalizuje slug i cofa dokument do draftu po zapisie", async () => {
    const updates: object[] = [];
    const result = await solve(
      {
        exists: async () => false,
        update: async (_id, data) => {
          updates.push(data);
          return data;
        },
      },
      "doc",
      " Nowy-Slug ",
    );
    expect(result).toEqual({ slug: "nowy-slug", status: "draft" });
    expect(updates).toEqual([{ slug: "nowy-slug", status: "draft" }]);
  });

  it("odrzuca slug zajęty i nie woła update", async () => {
    const updates: object[] = [];
    const repo: Repo = {
      exists: async () => true,
      update: async (_id, data) => {
        updates.push(data);
        return data;
      },
    };
    await expect(solve(repo, "doc", "used")).rejects.toThrow(/zajęty/);
    expect(updates).toEqual([]);
  });

  it("odrzuca nieprawidłowy format sluga przed sprawdzeniem konfliktu", async () => {
    let existsCalled = false;
    const repo: Repo = {
      exists: async () => {
        existsCalled = true;
        return false;
      },
      update: async (_id, data) => data,
    };
    await expect(solve(repo, "doc", "Nowy--Slug")).rejects.toThrow(/slug/i);
    expect(existsCalled).toBe(false);
  });

  it("wyklucza edytowany dokument z porównania konfliktu", async () => {
    let excludedId: string | undefined;
    const repo: Repo = {
      exists: async (_slug, exceptId) => {
        excludedId = exceptId;
        return false;
      },
      update: async (_id, data) => data,
    };
    await solve(repo, "doc-42", "moj-slug");
    expect(excludedId).toBe("doc-42");
  });

  it("odrzuca slug z wiodącym myślnikiem", async () => {
    await expect(
      solve({ exists: async () => false, update: async (_id, data) => data }, "doc", "-zly-slug"),
    ).rejects.toThrow(/slug/i);
  });
});
