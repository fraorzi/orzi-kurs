# Medium - naprawa kłamliwego parsera generycznego

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Usuń API `fromJson<T>(json): T`, które pozwala wywołującemu obiecać dowolny typ bez
walidacji.

Zaimplementuj:

```ts
type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };

parseJson<T>(json: string, parse: (value: unknown) => T): ParseResult<T>
```

- niepoprawny JSON daje `"invalid json"`,
- błąd parsera będący `Error` daje jego message,
- inna rzucona wartość daje `"invalid value"`,
- parser otrzymuje `unknown`.
