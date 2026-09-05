# Easy - własne Exclude, Extract, NonNullable

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Napisz cztery typy warunkowe (bez używania wbudowanych odpowiedników) i jedną funkcję.

## Typy

```ts
type MyExclude<T, U>    // z unii T usuwa składniki przypisywalne do U
type MyExtract<T, U>    // z unii T zostawia tylko składniki przypisywalne do U
type MyNonNullable<T>   // usuwa null i undefined
type ElementType<T>     // typ elementu tablicy (także readonly)
```

```ts
MyExclude<"a" | "b" | "c", "a">;              // "b" | "c"
MyExtract<string | number | boolean, string>; // string
MyNonNullable<string | null | undefined>;     // string
ElementType<number[]>;                        // number
ElementType<readonly string[]>;               // string
ElementType<string>;                          // never   (to nie tablica)
```

## Funkcja

```ts
compact<T>(items: readonly T[]): MyNonNullable<T>[]
```

Usuwa `null` i `undefined` z listy. Typ wyniku ma być **bez** tych składników.

```ts
const values: (string | null)[] = ["a", null, "b"];
const clean = compact(values);   // typ: string[]
clean;                           // ["a", "b"]

compact([0, null, false, ""]);   // [0, false, ""]   ← 0, false i "" ZOSTAJĄ
```

## Ograniczenia

- `compact` nie mutuje wejścia i zachowuje kolejność.
- Odsiewasz wyłącznie `null` i `undefined` - nie „wszystko, co falsy”.
