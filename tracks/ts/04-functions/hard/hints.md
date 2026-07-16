## Hint 1

`once` trzyma dwa stany w domknięciu: flagę „już wołane” i zapamiętany wynik. Flaga jest
konieczna — sprawdzanie samego wyniku zawiodłoby dla `0` (falsy).

## Hint 2

`compose(f, g)` zwraca **nową funkcję**, nie wynik:

```ts
return (value: number): number => f(g(value));
```

## Hint 3

Obiekt wywoływalny opisuje się sygnaturą wywołania w interfejsie:

```ts
export interface Memoized {
  (key: string): number;
  readonly hits: number;
  readonly misses: number;
  clear(): void;
}
```

W runtime to zwykła funkcja z doklejonymi polami — funkcje w JS są obiektami.

## Hint 4

Zbuduj funkcję, dopnij do niej pola i zwróć ją:

```ts
const memoized = (key: string): number => { … };
memoized.hits = 0;
memoized.misses = 0;
memoized.clear = (): void => { … };
return memoized;
```

TS wywnioskuje typ `memoized` z przypisań i sprawdzi zgodność z `Memoized` przy `return`.
`readonly` w interfejsie blokuje zapis **z zewnątrz** — wewnątrz modułu pracujesz na
wywnioskowanym typie, więc `memoized.hits += 1` jest w porządku.

## Hint 5

Cache: `Map<string, number>`. Rozróżniaj brak wpisu od wartości `0` — `cache.get(key)`
zwraca `undefined` przy braku, więc sprawdzaj `!== undefined` (albo `cache.has(key)`),
nigdy truthiness.
