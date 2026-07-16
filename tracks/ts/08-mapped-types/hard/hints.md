## Hint 1

Rekurencja w mapped typie wygląda dokładnie tak, jak się spodziewasz — typ woła sam siebie
na wartości pola:

```ts
type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
```

Nie potrzeba warunku „czy to obiekt”: mapowanie homomorficzne (`[K in keyof T]`) na
prymitywie zwraca ten sam prymityw, a na tablicy — tablicę.

## Hint 2

`DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> }`. Na tablicy `?` nałoży się na
każdy indeks, więc `string[]` stanie się `(string | undefined)[]`. To nie błąd w Twoim
kodzie — test tego właśnie oczekuje. Poprawka wymaga typu warunkowego (zagadnienie 09).

## Hint 3

`deepFreeze` działa **w miejscu**: najpierw zejdź w głąb (`Object.values` / elementy
tablicy), potem zamroź bieżący poziom. Odwrotna kolejność też zadziała, ale wtedy łatwo
zapomnieć, że `Object.freeze` jest płytkie.

Prymitywy zwróć bez zmian — `Object.freeze(1)` nic nie robi, ale rekurencja po nich nie ma
sensu.

## Hint 4

Rozpoznawanie „zwykłego obiektu” (nie tablicy, nie `null`):

```ts
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
```

`typeof null === "object"` — bez sprawdzenia `!== null` rekurencja wejdzie w `null`.

## Hint 5

`deepMerge` łatwiej napisać na nietypowanym poziomie (`Record<string, unknown>`) i dopiero
na wyjściu zrobić jedno `as T`:

- kopiuj bazę (`{ ...base }`) — nigdy nie zapisuj do niej,
- pomiń pola `undefined`,
- gdy **oba** (bieżąca wartość i wartość z patcha) są zwykłymi obiektami — scal
  rekurencyjnie,
- w każdym innym przypadku (prymityw, tablica, `null`) — nadpisz.
