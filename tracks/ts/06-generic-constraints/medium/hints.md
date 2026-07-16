## Hint 1

`pluck` i `indexBy` to ta sama para parametrów co `getProp` z easy, tylko na liście:
`<T extends object, K extends keyof T>`. Typ wyniku `pluck` to `T[K][]`, a `indexBy` —
`Map<T[K], T>`.

## Hint 2

„Wygrywa ostatni” w `indexBy` dostajesz za darmo: `map.set(klucz, element)` w pętli po
elementach po prostu nadpisuje wcześniejszy wpis.

## Hint 3

`PropertyKey` to wbudowany alias `string | number | symbol` — dokładnie to, czym można
indeksować obiekt i kluczować mapę. Ograniczenie `K extends PropertyKey` odrzuci funkcję
zwracającą `boolean`.

## Hint 4

Zliczanie: `counts.set(key, (counts.get(key) ?? 0) + 1)`. `??` zamiast `||` — dla licznika
`0` jest poprawną wartością, a `||` potraktowałoby ją jak brak.

## Hint 5

W `sumBy` ograniczenie jednego parametru typu odwołuje się do drugiego:

```ts
function sumBy<K extends PropertyKey, T extends Record<K, number>>(
  items: readonly T[],
  key: K,
): number
```

`Record<K, number>` znaczy „obiekt, który ma pole `K` typu `number`”. Kolejność jest
wymuszona: `T` używa `K`, więc `K` musi być zadeklarowane wcześniej. Sumę licz przez
`reduce` z wartością początkową `0` — bez niej pusta tablica rzuci wyjątkiem.
