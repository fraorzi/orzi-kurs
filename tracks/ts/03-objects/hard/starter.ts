// TODO: wszystkie pola readonly
export interface Article {
  id: number;
  title: string;
  authorId: number;
}

// TODO: wszystkie pola readonly
export interface Author {
  id: number;
  name: string;
}

// TODO: słowniki po id + indeks byAuthor (authorId → id artykułów), całość readonly
export interface Store {
  articles: unknown;
  authors: unknown;
  byAuthor: unknown;
}

export function buildStore(
  articles: readonly Article[],
  authors: readonly Author[],
): Store {
  // TODO
  return { articles: {}, authors: {}, byAuthor: {} };
}

export function articlesOf(
  store: Store,
  authorId: number,
): readonly Article[] {
  // TODO: artykuły autora w kolejności z byAuthor; nieznany autor → []
  return [];
}

export function authorOf(store: Store, articleId: number): Author | null {
  // TODO: null gdy brak artykułu albo brak jego autora
  return null;
}

export function titlesByAuthorName(
  store: Store,
): Record<string, readonly string[]> {
  // TODO: nazwa autora → tytuły artykułów (tylko autorzy z artykułami)
  return {};
}
