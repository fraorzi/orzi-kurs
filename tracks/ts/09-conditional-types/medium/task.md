# Medium — `infer` na funkcjach i obietnicach

Napisz typy, które wyłuskują fragmenty innych typów, i funkcje, które z nich korzystają.
Nie używaj wbudowanych `ReturnType`, `Parameters` ani `Awaited`.

## Typy

```ts
type MyReturnType<F>   // typ zwracany funkcji
type MyParameters<F>   // krotka parametrów funkcji
type MyAwaited<T>      // typ po rozpakowaniu Promise (także zagnieżdżonych)
type FirstParam<F>     // typ pierwszego parametru; brak parametrów → never
```

```ts
MyReturnType<() => Date>;                    // Date
MyParameters<(a: string, b: number) => void>;// [a: string, b: number]
MyAwaited<Promise<Promise<number>>>;         // number
MyAwaited<string>;                           // string   (nie-Promise zostaje sobą)
FirstParam<(id: number, all?: boolean) => void>;  // number
FirstParam<() => void>;                      // never
```

## Funkcje

```ts
once<F extends (...args: never[]) => unknown>(fn: F): (...args: MyParameters<F>) => MyReturnType<F>
// wywołuje fn najwyżej raz; kolejne wywołania oddają zapamiętany wynik (bez ponownego wywołania fn)

resolveAll<T extends readonly unknown[]>(values: readonly [...T]): Promise<{ [K in keyof T]: MyAwaited<T[K]> }>
// czeka na wszystkie wartości; te, które nie są obietnicami, przepuszcza bez zmian
```

Zwróć uwagę na `readonly [...T]` w `resolveAll`: samo `values: T` sprawia, że z literału
tablicowego TS wywnioskuje **tablicę** (`(Promise<number> | string)[]`), a nie krotkę —
i wynik straciłby pozycje. Zapis wariadyczny wymusza inferencję krotki.

```ts
const load = once((id: number) => ({ id }));
load(1);   // { id: 1 }
load(2);   // { id: 1 }   ← fn wywołane tylko raz

await resolveAll([Promise.resolve(1), "x", Promise.resolve(true)]);
// [1, "x", true]   (typ: [number, string, boolean])
```

## Zasady

- `once` zapamiętuje wynik **pierwszego** wywołania, łącznie z `undefined`.
- Gdy `fn` rzuci wyjątkiem, `once` **nie** zapamiętuje niczego — kolejne wywołanie próbuje
  ponownie.
- `resolveAll` zachowuje kolejność i nie mutuje wejścia.

## Wskazówka

W pozycji parametrów funkcji generycznej używaj `never[]`, nie `any[]`:
`F extends (...args: never[]) => unknown`. Funkcje są kontrawariantne po argumentach, więc
`never[]` przyjmuje każdą funkcję, a `any` wyłączyłoby kontrolę typów.
