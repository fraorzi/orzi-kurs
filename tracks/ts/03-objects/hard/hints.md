## Hint 1

Kształt `Store` przepisz z treści zadania jeden do jednego:

```ts
export interface Store {
  readonly articles: Readonly<Record<number, Article>>;
  readonly authors: Readonly<Record<number, Author>>;
  readonly byAuthor: Readonly<Record<number, readonly number[]>>;
}
```

Wewnątrz `buildStore` pracuj na mutowalnych odpowiednikach (`Record<number, Article>`)
i dopiero zwracany obiekt zamknij typem `Store`.

## Hint 2

`byAuthor` budujesz w tej samej pętli, w której indeksujesz artykuły — kolejność wejściowa
zachowa się sama:

```ts
const ids = byAuthor[article.authorId] ?? [];
ids.push(article.id);
byAuthor[article.authorId] = ids;
```

Autor bez artykułów nigdy nie trafi do `byAuthor`, bo pętla idzie po artykułach.

## Hint 3

`Record<number, Article>` kłamie: `store.articles[999]` ma typ `Article`, ale w runtime
jest `undefined`. Dlatego zawsze sprawdzaj wynik odczytu:

```ts
const article = store.articles[articleId];
if (!article) return null;
```

To nie jest paranoja — to jedyny powód, dla którego `authorOf` może zwrócić `null`
dla osieroconego artykułu.

## Hint 4

`titlesByAuthorName`: `Object.entries` na słowniku o kluczach liczbowych zwraca klucze
jako **stringi** (tak działa JS). Zamień z powrotem: `store.authors[Number(authorId)]`.

## Hint 5

Autor bez artykułów nie ma wpisu w `byAuthor`, więc iterując po `byAuthor` (a nie po
`authors`) automatycznie go pomijasz — jeden warunek mniej.
