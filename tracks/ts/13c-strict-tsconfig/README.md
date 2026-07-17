# Rygorystyczny `tsconfig`

`strict: true` jest bazą, ale dojrzały projekt często potrzebuje dodatkowych flag.
Każda z nich usuwa inną klasę fałszywego poczucia bezpieczeństwa.

## `noUncheckedIndexedAccess`

Indeksowanie mapy lub tablicy może zwrócić brak:

```ts
const users: Record<string, User> = {};
users["missing"]; // User | undefined
```

Bez flagi typem jest samo `User`, mimo że runtime zwróci `undefined`.

## `exactOptionalPropertyTypes`

Pole opcjonalne oznacza brak klucza, a nie automatycznie wartość `undefined`:

```ts
type Patch = { name?: string };
const patch: Patch = { name: undefined }; // błąd z flagą
```

Jeśli `undefined` jest wartością domenową, zapisz ją jawnie: `name?: string | undefined`.

## `noPropertyAccessFromIndexSignature`

Dla pola pochodzącego wyłącznie z index signature wymaga zapisu nawiasowego:

```ts
env["API_URL"];
```

To odróżnia znane pole od dowolnego klucza.

## `useUnknownInCatchVariables`

Błąd w `catch` ma typ `unknown`, bo JavaScript pozwala rzucić dowolną wartość. Zanim
odczytasz `.message`, sprawdź `error instanceof Error`.

## `verbatimModuleSyntax`

Importy typów muszą być jawne:

```ts
import { createJob, type Job } from "./jobs";
```

Kompilator nie zgaduje już, które importy usunąć. Kod lepiej odpowiada rzeczywistemu
ESM i zasadom bundlera.

## Kiedy używać

- nowych aplikacji i bibliotek,
- migracji, w której każdą flagę można włączyć osobno i poprawić błędy,
- kodu intensywnie indeksującego mapy lub budującego patche.

## Kiedy unikać

- wyłączania flagi globalnie z powodu jednego problematycznego pliku,
- masowego dodawania `!` i `as`, żeby „przejść migrację”,
- włączania wielu flag bez testów regresji i podziału zmian na etapy.

## Pułapki

- `array[0]!` ucisza błąd, ale nie tworzy elementu,
- `field?: T` i `field: T | undefined` mają inną semantykę,
- import typu użyty jako wartość zniknie w runtime,
- `catch (error)` nie gwarantuje instancji `Error`.

Źródła: TSConfig Reference oraz TypeScript 4.4 i 5.0 release notes.
