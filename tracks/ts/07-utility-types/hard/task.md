# Hard — stan formularza wyprowadzony z modelu

Zbuduj mały, generyczny stan formularza: dla **dowolnego** obiektu wartości ma powstać
komplet flag „dotknięte" i mapa błędów. Cała struktura ma być wyprowadzona z `T` przez
utility types — bez powtarzania nazw pól.

## 1. Typy

```ts
type FieldErrors<T> = ...;   // { name?: string; age?: string } dla T = { name: string; age: number }

interface FormState<T extends object> {
  readonly values: ...;      // T, ale wszystkie pola tylko do odczytu
  readonly touched: ...;     // komplet kluczy T → boolean
  readonly errors: FieldErrors<T>;
}
```

Uwaga: `errors` ma być mapą **klucz pola → komunikat (string)**, w której każdy klucz jest
opcjonalny (`Partial` + `Record`), a nie kopią `T`.

## 2. Funkcje

```ts
createForm<T extends object>(initial: T): FormState<T>
// values = kopia initial, touched = wszystkie pola false, errors = {}

setField<T extends object, K extends keyof T>(state: FormState<T>, key: K, value: T[K]): FormState<T>
// nowy stan: podmienione values[key], touched[key] = true, errors[key] USUNIĘTY

setErrors<T extends object>(state: FormState<T>, errors: FieldErrors<T>): FormState<T>
// nowy stan z podmienioną mapą błędów (values i touched bez zmian)

isDirty<T extends object>(state: FormState<T>): boolean
// czy cokolwiek zostało dotknięte

pick<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K>
omit<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K>
```

`pick` i `omit` to runtime'owe odpowiedniki utility types o tych samych nazwach —
**typ wyniku ma się zgadzać z tym, co faktycznie zwracasz**.

## Przykład

```ts
interface Profile { name: string; age: number; active: boolean }

const form = createForm<Profile>({ name: "Ala", age: 30, active: true });
// values:  { name: "Ala", age: 30, active: true }
// touched: { name: false, age: false, active: false }
// errors:  {}

const withError = setErrors(form, { age: "za młody" });
const next = setField(withError, "age", 31);
// next.values.age   → 31
// next.touched.age  → true
// next.errors.age   → undefined   ← edycja pola kasuje jego błąd
// isDirty(next)     → true
// form.values.age   → 30          ← stan wejściowy nietknięty

pick({ name: "Ala", age: 30, active: true }, ["name", "age"]);  // typ: { name: string; age: number }
omit({ name: "Ala", age: 30, active: true }, ["age"]);          // typ: { name: string; active: boolean }
```

## Ograniczenia

- Każda funkcja zwraca **nowy** obiekt — żadnej mutacji argumentów.
- `state.values.age = 31` ma być **błędem typu** (pola są `readonly`).
- `setField(form, "age", "31")` ma być błędem typu (`T[K]` pilnuje typu wartości).
- `pick(profile, ["nieistnieje"])` ma być błędem typu (`K extends keyof T`).
