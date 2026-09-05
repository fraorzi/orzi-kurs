# Hard - znormalizowany magazyn danych (indeksy zamiast szukania w tablicy)

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Z API dostajesz płaskie listy artykułów i autorów. Budujesz z nich **znormalizowany store**:
słowniki po `id` (dostęp O(1)) plus indeks „artykuły danego autora”. Cały store jest
`readonly`.

## Typy

```ts
interface Article { readonly id: number; readonly title: string; readonly authorId: number }
interface Author  { readonly id: number; readonly name: string }

interface Store {
  readonly articles: Readonly<Record<number, Article>>;
  readonly authors:  Readonly<Record<number, Author>>;
  readonly byAuthor: Readonly<Record<number, readonly number[]>>;  // authorId → id artykułów
}
```

`Article`, `Author` i `Store` masz zadeklarować w `starter.ts` dokładnie w tym kształcie.

## 1. `buildStore(articles: readonly Article[], authors: readonly Author[]): Store`

- `articles` i `authors` indeksowane po `id`,
- `byAuthor[authorId]` zawiera id artykułów **w kolejności wejściowej**,
- autor bez artykułów **nie ma** wpisu w `byAuthor`,
- artykuł wskazujący na nieistniejącego autora i tak trafia do `articles` oraz do `byAuthor`.

## 2. `articlesOf(store: Store, authorId: number): readonly Article[]`

Artykuły autora w kolejności z `byAuthor`. Nieznany autor → pusta tablica.

## 3. `authorOf(store: Store, articleId: number): Author | null`

Autor artykułu albo `null` - gdy nie ma artykułu **albo** gdy jego autor nie istnieje
w store. Bez `!` i bez `as`.

## 4. `titlesByAuthorName(store: Store): Record<string, readonly string[]>`

Mapa `nazwa autora → tytuły jego artykułów` (tylko autorzy, którzy mają artykuły).

```ts
titlesByAuthorName(store); // { "Ala": ["Wstęp", "Koniec"], "Ola": ["Środek"] }
```

## Dlaczego tak

Naiwny wariant (`articles.find(a => a.id === id)` w pętli po autorach) to O(n·m).
Store buduje indeksy raz i odpytuje je w czasie stałym - to ten sam ruch, co `Map`
zamiast `Array.includes` w tracku js.
