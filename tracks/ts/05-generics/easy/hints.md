## Hint 1

Parametr typu deklarujesz w nawiasach ostrych **przed** listą parametrów:

```ts
export function identity<T>(value: T): T {
  return value;
}
```

`T` to zmienna na typ — pojawia się w parametrze i w typie zwracanym, i to właśnie łączy
wejście z wyjściem. Gdyby wystąpiła tylko raz, generyk nie miałby sensu.

## Hint 2

W `firstOrNull` wejście jest `readonly T[]` (nie mutujesz), a wynik `T | null`. Pustą listę
rozpoznaj po długości — nie po truthiness elementu, bo `0` i `""` są falsy:

```ts
return items.length > 0 ? items[0] : null;
```

## Hint 3

Alias też bierze parametr typu:

```ts
export type Box<T> = { value: T };
```

`Box` bez argumentu nie jest typem — piszesz `Box<string>`, `Box<T>`. W sygnaturze `box`
parametr typu z funkcji przekazujesz do aliasu: `function box<T>(value: T): Box<T>`.

## Hint 4

Dwa niezależne parametry typu rozdzielasz przecinkiem, a krotkę zapisujesz nawiasem
kwadratowym:

```ts
export function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}
```

Bez adnotacji `[A, B]` kompilator wywnioskowałby z `return` tablicę `(A | B)[]` — czyli
zgubiłby pozycje.
