## Hint 1

Wartość domyślna zamiast parametru opcjonalnego: `greeting = "Cześć"`. Typ wywnioskuje się
jako `string`, a w ciele funkcji nie musisz sprawdzać `undefined`.

## Hint 2

Parametr rest zbiera resztę argumentów do tablicy: `function sum(...numbers: number[])`.
Sumę policzysz `reduce`'em z wartością początkową `0` — to ona obsługuje wywołanie bez
argumentów.

## Hint 3

Typ funkcji zapisuje się strzałką:

```ts
export type Mapper = (value: number, index: number) => number;
```

Callback z jednym parametrem nadal pasuje do tego typu — TS pozwala przekazać funkcję
o mniejszej arności.

## Hint 4

`never` to typ zwracany funkcji, która nigdy nie wraca normalnie. Wystarczy `throw`
w ciele — TS zaakceptuje adnotację `: never`, jeśli żadna ścieżka nie kończy się
`return`em.
