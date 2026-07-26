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

- `once` zachowuje krotkę parametrów i typ wyniku przekazanej funkcji, korzystając z typów
  zdefiniowanych w pierwszej części.
- `resolveAll` przyjmuje readonly tuple, czeka na wszystkie pozycje i zwraca Promise nowej,
  mutowalnej tuple z rozpakowanym typem każdej pozycji.

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
