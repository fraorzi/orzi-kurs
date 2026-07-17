# Granice runtime

Typy znikają po kompilacji. Dane z JSON-a, formularza, bazy i zmiennych środowiskowych
muszą zostać sprawdzone w runtime, zanim staną się typem domenowym.

## Parse, don’t validate

Walidator zwracający `boolean` zmusza kod do zachowania surowej wartości. Parser
zwraca nową wartość o sprawdzonym typie albo opis błędu:

```ts
type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: string[] };
```

Po sukcesie dalsza warstwa nie powtarza warunków.

## Branded types

Identyfikatory o tym samym runtime typie można rozdzielić nominalnie:

```ts
declare const brand: unique symbol;
type UserId = string & { readonly [brand]: "UserId" };
```

Brand powinien powstawać wyłącznie w parserze lub zaufanym konstruktorze. W runtime
nadal jest zwykłym stringiem.

## Kompozycja parserów

`Parser<T> = (value: unknown) => ParseResult<T>` pozwala budować parser tablicy,
obiektu i pól z mniejszych elementów. Błąd powinien wskazywać położenie, np. `[2].id`.

## Kiedy używać

- odpowiedzi HTTP i webhooków,
- parametrów URL, env i danych bazy,
- ID różnych encji o tym samym typie bazowym.

## Kiedy unikać

- brandowania przez publiczne `as UserId`,
- walidowania tych samych danych w każdej funkcji domenowej,
- parsera zwracającego częściowo poprawny obiekt bez jawnej semantyki.

## Pułapki

- brand nie chroni runtime przed ręcznym assertion,
- `typeof NaN === "number"`,
- `Date` z niepoprawnego stringa nadal jest obiektem,
- tablice i `null` spełniają część naiwnych testów obiektu.

Źródła: TypeScript Handbook — Narrowing i Unique Symbols; wzorzec Parse, Don’t
Validate.
