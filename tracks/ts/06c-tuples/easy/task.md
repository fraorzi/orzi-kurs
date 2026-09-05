# Easy - parser zakresu

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zdefiniuj etykietowane typy:

```ts
type Range = readonly [start: number, end: number];
type ParseRangeResult =
  | [ok: true, range: Range]
  | [ok: false, message: string];
```

`parseRange("10..20")` ma zwrócić sukces. Odrzuć niepoprawny format, wartości
niecałkowite oraz zakres, w którym start jest większy od końca.

`rangeLength` zwraca długość zakresu włącznie, więc `[10, 10]` ma długość 1.
