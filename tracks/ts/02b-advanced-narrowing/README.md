# Zaawansowane zawężanie

Zawężanie nie kończy się na `typeof`. W większym projekcie warunki warto zamykać
w małych, testowalnych funkcjach, które przenoszą wiedzę o typie między warstwami.

## Predykaty typu

Predykat `value is T` mówi kompilatorowi, co jest prawdą po zwróceniu `true`:

```ts
function isPresent<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}
```

Od TS 5.5 prosty predykat może zostać wywnioskowany:

```ts
function isString(value: unknown) {
  return typeof value === "string";
}

const strings = values.filter(isString); // string[]
```

Nie każdy warunek kwalifikuje się do inferencji. Jeśli funkcja mutuje parametr,
ma wiele niejednoznacznych zwrotów albo jawnie deklaruje `boolean`, potrzebny może
być jawny predykat.

## Assertion functions

Funkcja `asserts value is T` nie zwraca flagi. Kończy się normalnie tylko wtedy,
gdy wartość spełnia kontrakt; w przeciwnym razie rzuca:

```ts
function assertUser(value: unknown): asserts value is User {
  if (!isUser(value)) throw new TypeError("Niepoprawny użytkownik");
}
```

To dobry wzorzec na granicy konfiguracji, requestu lub adaptera. Po asercji reszta
kodu pracuje już na konkretnym typie.

## Wyczerpanie unii

`assertNever` zmienia brakującą gałąź w błąd kompilacji:

```ts
function assertNever(value: never): never {
  throw new Error(`Nieobsługiwany wariant: ${JSON.stringify(value)}`);
}
```

Wywołuj go po obsłużeniu wszystkich wariantów unii rozłącznej. Dodanie nowej akcji
wskaże wszystkie miejsca wymagające aktualizacji.

## Kiedy używać

- predykatów do wielokrotnie używanego warunku i filtrowania kolekcji,
- assertion functions po jednorazowym sprawdzeniu nieufnych danych,
- `never` w reducerach, parserach protokołu i obsłudze stanów.

## Kiedy unikać

- predykatu, którego ciało nie dowodzi deklarowanego typu,
- assertion function w bibliotece, która powinna zwrócić kontrolowany wynik błędu,
- `as T` jako zamiennika walidacji.

## Pułapki

- TypeScript ufa treści `value is T`; błędny predykat jest równie niebezpieczny jak `as`.
- `filter(Boolean)` zwykle nie daje precyzyjnego typu i usuwa też `0` oraz `""`.
- `asserts condition` i `asserts value is T` rozwiązują różne problemy.
- `default: return ...` ukrywa brak obsługi nowego wariantu; użyj `never`.

Źródła: TypeScript Handbook — Narrowing, Functions; TypeScript 5.5 release notes.
