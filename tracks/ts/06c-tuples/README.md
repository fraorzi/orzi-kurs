# Krotki i variadic tuple types

Tablica opisuje dowolną liczbę elementów jednego typu. Krotka opisuje konkretne
pozycje i ich znaczenie:

```ts
type Range = [start: number, end: number];
```

Etykiety nie zmieniają zgodności typów, ale poprawiają podpowiedzi edytora i czytelność
API.

## Readonly tuples

Parametr przyjmujący dane powinien zwykle używać `readonly`:

```ts
function width(range: readonly [start: number, end: number]): number {
  return range[1] - range[0];
}
```

Przyjmuje wtedy zarówno mutowalną tuple, jak i wartość utworzoną przez `as const`.

## Rest parameters jako tuple

Lista argumentów funkcji jest krotką:

```ts
type Args = Parameters<typeof fetchUser>;
```

Można ją przechować w mapie komend i rozwinąć:

```ts
function command<K extends CommandName>(
  name: K,
  ...args: CommandArgs[K]
) {}
```

## Variadic tuples

Spread w typie łączy listy pozycji:

```ts
type WithContext<Args extends readonly unknown[]> =
  [context: RequestContext, ...Args];
```

To fundament typowania partial application, curry, middleware i funkcji `pipe`.

## Kiedy używać

- wynik parsera z kilkoma stałymi pozycjami,
- argumenty komend, eventów i wrapperów funkcji,
- zip, partial application i małe protokoły.

## Kiedy unikać

- rekordów z wieloma pozycjami, których znaczenia nie da się zapamiętać,
- tuple jako zamiennika obiektu domenowego,
- zwracania mutowalnej tuple, jeśli odbiorca nie powinien zmieniać wyniku.

## Pułapki

- `[number, number]` nie mówi tyle co etykietowane `[start: number, end: number]`,
- zwykłe `string[]` nie ma gwarantowanej pierwszej pozycji,
- mapowanie tuple wymaga zachowania jej kluczy, inaczej wynik rozszerzy się do tablicy,
- sprawdzenie równych długości w typach nie zwalnia z walidacji danych runtime.

Źródła: TypeScript Handbook — Object Types, Rest Arguments; TypeScript 4.0 release
notes — Variadic Tuple Types.
