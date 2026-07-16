export interface Article {
  readonly id: number;
  readonly title: string;
  readonly authorId: number;
}

export interface Author {
  readonly id: number;
  readonly name: string;
}

export interface Store {
  readonly articles: Readonly<Record<number, Article>>;
  readonly authors: Readonly<Record<number, Author>>;
  readonly byAuthor: Readonly<Record<number, readonly number[]>>;
}

export function buildStore(
  articles: readonly Article[],
  authors: readonly Author[],
): Store {
  const articleIndex: Record<number, Article> = {};
  const authorIndex: Record<number, Author> = {};
  const byAuthor: Record<number, number[]> = {};

  for (const author of authors) {
    authorIndex[author.id] = author;
  }

  for (const article of articles) {
    articleIndex[article.id] = article;
    const ids = byAuthor[article.authorId] ?? [];
    ids.push(article.id);
    byAuthor[article.authorId] = ids;
  }

  return { articles: articleIndex, authors: authorIndex, byAuthor };
}

export function articlesOf(store: Store, authorId: number): readonly Article[] {
  const ids = store.byAuthor[authorId] ?? [];
  const found: Article[] = [];
  for (const id of ids) {
    const article = store.articles[id];
    if (article) found.push(article);
  }
  return found;
}

export function authorOf(store: Store, articleId: number): Author | null {
  const article = store.articles[articleId];
  if (!article) return null;
  return store.authors[article.authorId] ?? null;
}

export function titlesByAuthorName(
  store: Store,
): Record<string, readonly string[]> {
  const result: Record<string, string[]> = {};
  for (const [authorId, ids] of Object.entries(store.byAuthor)) {
    const author = store.authors[Number(authorId)];
    if (!author) continue;
    const titles: string[] = [];
    for (const id of ids) {
      const article = store.articles[id];
      if (article) titles.push(article.title);
    }
    result[author.name] = titles;
  }
  return result;
}
