// TODO
export interface Article {
  id: number;
  title: string;
  authorId: number;
}

// TODO
export interface Author {
  id: number;
  name: string;
}

// TODO
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
  // TODO
  return [];
}

export function authorOf(store: Store, articleId: number): Author | null {
  // TODO
  return null;
}

export function titlesByAuthorName(
  store: Store,
): Record<string, readonly string[]> {
  // TODO
  return {};
}
