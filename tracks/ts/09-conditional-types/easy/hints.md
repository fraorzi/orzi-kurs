## Hint 1

Typ warunkowy to `T extends U ? gałąź_prawda : gałąź_fałsz`. Dla `MyExclude` chcemy usunąć
pasujące składniki — usunięcie ze zbioru to zwrócenie `never`:

```ts
type MyExclude<T, U> = T extends U ? never : T;
```

Działa, bo `T` jest **nagim** parametrem: przy unii warunek liczy się osobno dla każdego
składnika, a `never` w unii znika.

## Hint 2

`MyExtract` to ten sam warunek z zamienionymi gałęziami.

## Hint 3

`MyNonNullable<T>` odsiewa dwa konkretne typy: `T extends null | undefined ? never : T`.

## Hint 4

`ElementType` potrzebuje `infer` — deklaruje zmienną typową, którą kompilator dopasuje:

```ts
type ElementType<T> = T extends readonly (infer E)[] ? E : never;
```

`readonly (infer E)[]` łapie też zwykłe tablice (`number[]` jest przypisywalne do
`readonly number[]`), więc jeden warunek wystarcza na oba przypadki.

## Hint 5

`compact` w runtime filtruje po `item !== null && item !== undefined` (nie po `if (item)` —
to wyrzuciłoby `0`, `""` i `false`). TS nie połączy tego filtra z typem wyniku, więc przy
dopisywaniu do wyniku potrzebne będzie `as MyNonNullable<T>`.
