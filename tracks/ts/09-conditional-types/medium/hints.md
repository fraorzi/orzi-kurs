## Hint 1

`infer` deklaruje zmienną typową w gałęzi „prawda”:

```ts
type MyReturnType<F> = F extends (...args: never[]) => infer R ? R : never;
type MyParameters<F> = F extends (...args: infer P) => unknown ? P : never;
```

W pozycji parametrów używaj `never[]`, nie `any[]` — funkcje są kontrawariantne po
argumentach, więc `never[]` pasuje do każdej funkcji bez wyłączania kontroli typów.

## Hint 2

`MyAwaited` woła sam siebie, dopóki jest co rozpakowywać:

```ts
type MyAwaited<T> = T extends Promise<infer V> ? MyAwaited<V> : T;
```

Gałąź „fałsz” zwraca `T` (nie `never`) — dzięki temu `MyAwaited<string>` to `string`.

## Hint 3

`FirstParam` przez `infer` w pozycji pierwszego parametru (`(first: infer P, ...rest: never[])`)
**nie zadziała** — dla funkcji z drugim parametrem dopasowanie się nie powiedzie i wyjdzie
`never`. Zrób to dwustopniowo: najpierw wyłuskaj całą krotkę parametrów, potem jej głowę.

```ts
type FirstParam<F> = F extends (...args: infer P) => unknown
  ? P extends [infer First, ...unknown[]] ? First : never
  : never;
```

## Hint 4

W `once` trzymaj **flagę** „czy już wywołano”, a nie sprawdzaj wartości wyniku — inaczej
zapamiętane `undefined` spowoduje ponowne wywołanie.

Flagę ustawiaj **po** powrocie z `fn`: gdy `fn` rzuci, nic nie zapamiętasz i kolejne
wywołanie spróbuje ponownie.

## Hint 5

W `resolveAll` zwróć uwagę na sygnaturę `values: readonly [...T]`. Gdyby było `values: T`,
z literału `[Promise.resolve(1), "x"]` TS wywnioskowałby tablicę unii, a nie krotkę —
i wynik straciłby pozycje. Reszta to `await Promise.all(values)` plus jedno `as` na wyjściu.
