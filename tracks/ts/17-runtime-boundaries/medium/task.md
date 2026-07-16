# Medium — kompozycja parsera tablicy

Zaimplementuj generyczne:

```ts
type Parser<T> = (value: unknown) => ParseResult<T>;
parseArray(input, parseItem): ParseResult<T[]>
```

Parser:

- odrzuca wartość niebędącą tablicą błędem `"expected array"`,
- parsuje każdy element,
- zbiera wszystkie błędy, poprzedzając je indeksem: `"[2]: expected number"`,
- zachowuje kolejność wyników,
- nie zwraca częściowego sukcesu.

Dołącz prosty `parsePositiveInteger`.
