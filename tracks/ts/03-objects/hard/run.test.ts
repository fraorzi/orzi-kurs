import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  buildStore,
  articlesOf,
  authorOf,
  titlesByAuthorName,
  type Article,
  type Author,
  type Store,
} from "./starter";

const ARTICLES: readonly Article[] = [
  { id: 10, title: "Wstęp", authorId: 1 },
  { id: 11, title: "Środek", authorId: 2 },
  { id: 12, title: "Koniec", authorId: 1 },
];

const AUTHORS: readonly Author[] = [
  { id: 1, name: "Ala" },
  { id: 2, name: "Ola" },
  { id: 3, name: "Ela" },
];

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("Article i Author mają wyłącznie pola readonly", () => {
    type _a = Expect<
      Equal<
        Article,
        { readonly id: number; readonly title: string; readonly authorId: number }
      >
    >;
    type _b = Expect<
      Equal<Author, { readonly id: number; readonly name: string }>
    >;
    expect(ARTICLES[0].title).toBe("Wstęp");
  });

  it("Store trzyma słowniki po id i indeks byAuthor", () => {
    type _s = Expect<
      Equal<
        Store,
        {
          readonly articles: Readonly<Record<number, Article>>;
          readonly authors: Readonly<Record<number, Author>>;
          readonly byAuthor: Readonly<Record<number, readonly number[]>>;
        }
      >
    >;
    expect(Object.keys(buildStore(ARTICLES, AUTHORS).articles)).toHaveLength(3);
  });

  it("store jest niemutowalny", () => {
    const store = buildStore(ARTICLES, AUTHORS);
    const illegal = (): void => {
      // @ts-expect-error articles jest readonly
      store.articles = {};
      // @ts-expect-error wpis w słowniku jest readonly
      store.authors[1] = { id: 1, name: "Podmieniona" };
    };
    expect(illegal).toBeTypeOf("function");
    expect(store.authors[1].name).toBe("Ala");
  });
});

describe("buildStore", () => {
  it("indeksuje artykuły i autorów po id", () => {
    const store = buildStore(ARTICLES, AUTHORS);
    expect(store.articles[11]).toEqual({
      id: 11,
      title: "Środek",
      authorId: 2,
    });
    expect(store.authors[3]).toEqual({ id: 3, name: "Ela" });
  });

  it("byAuthor trzyma id artykułów w kolejności wejściowej", () => {
    const store = buildStore(ARTICLES, AUTHORS);
    expect(
      store.byAuthor[1],
      "kolejność ma odpowiadać kolejności artykułów na wejściu",
    ).toEqual([10, 12]);
  });

  it("autor bez artykułów nie ma wpisu w byAuthor", () => {
    const store = buildStore(ARTICLES, AUTHORS);
    expect(
      store.byAuthor[3],
      "pusty wpis to zbędny szum — indeks ma zawierać tylko autorów z artykułami",
    ).toBeUndefined();
  });

  it("artykuł osieroconego autora nadal trafia do indeksu", () => {
    const store = buildStore(
      [{ id: 99, title: "Sierota", authorId: 42 }],
      AUTHORS,
    );
    expect(store.articles[99].title).toBe("Sierota");
    expect(store.byAuthor[42]).toEqual([99]);
  });

  it("puste wejście daje pusty store", () => {
    const store = buildStore([], []);
    expect(store.articles).toEqual({});
    expect(store.authors).toEqual({});
    expect(store.byAuthor).toEqual({});
  });
});

describe("articlesOf", () => {
  it("zwraca artykuły autora w kolejności z indeksu", () => {
    const store = buildStore(ARTICLES, AUTHORS);
    expect(articlesOf(store, 1).map((a) => a.title)).toEqual([
      "Wstęp",
      "Koniec",
    ]);
  });

  it("autor bez artykułów daje pustą tablicę", () => {
    const store = buildStore(ARTICLES, AUTHORS);
    expect(articlesOf(store, 3)).toEqual([]);
  });

  it("nieznany autor daje pustą tablicę, nie wyjątek", () => {
    const store = buildStore(ARTICLES, AUTHORS);
    expect(articlesOf(store, 999)).toEqual([]);
  });
});

describe("authorOf", () => {
  it("zwraca autora artykułu", () => {
    const store = buildStore(ARTICLES, AUTHORS);
    expect(authorOf(store, 12)).toEqual({ id: 1, name: "Ala" });
  });

  it("nieznany artykuł daje null", () => {
    const store = buildStore(ARTICLES, AUTHORS);
    expect(authorOf(store, 999)).toBeNull();
  });

  it("artykuł z nieistniejącym autorem daje null", () => {
    const store = buildStore(
      [{ id: 99, title: "Sierota", authorId: 42 }],
      AUTHORS,
    );
    expect(
      authorOf(store, 99),
      "indeks może wskazywać na autora, którego nie ma — brak wpisu to null, nie undefined",
    ).toBeNull();
  });
});

describe("titlesByAuthorName", () => {
  it("mapuje nazwę autora na tytuły jego artykułów", () => {
    const store = buildStore(ARTICLES, AUTHORS);
    expect(titlesByAuthorName(store)).toEqual({
      Ala: ["Wstęp", "Koniec"],
      Ola: ["Środek"],
    });
  });

  it("pomija autorów bez artykułów", () => {
    const store = buildStore(ARTICLES, AUTHORS);
    expect(titlesByAuthorName(store).Ela).toBeUndefined();
  });

  it("pomija artykuły bez istniejącego autora", () => {
    const store = buildStore(
      [...ARTICLES, { id: 99, title: "Sierota", authorId: 42 }],
      AUTHORS,
    );
    expect(Object.keys(titlesByAuthorName(store)).sort()).toEqual([
      "Ala",
      "Ola",
    ]);
  });
});
