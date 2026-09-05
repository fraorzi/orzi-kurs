# Medium - wybiórcze modyfikatory i spłaszczanie przecięć

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Typowy problem konfiguracji: część pól ma sensowne wartości domyślne, więc wywołujący może
je pominąć - ale w środku modułu chcemy mieć komplet.

## 1. `Prettify<T>`

Spłaszcza przecięcie do jednego, czytelnego obiektu.

```ts
type Ugly = { a: string } & { b: number };
type Nice = Prettify<Ugly>;   // { a: string; b: number }
```

## 2. `Optional<T, K extends keyof T>`

`T`, w którym klucze `K` stają się opcjonalne (reszta bez zmian). Wynik ma być **płaski**
(użyj `Prettify`).

```ts
interface Config { url: string; timeoutMs: number; retries: number }

type Input = Optional<Config, "timeoutMs" | "retries">;
// { url: string; timeoutMs?: number; retries?: number }
```

## 3. `RequiredOnly<T, K extends keyof T>`

Odwrotność: wszystko opcjonalne **poza** kluczami `K`.

```ts
type Patch = RequiredOnly<Config, "url">;
// { url: string; timeoutMs?: number; retries?: number }
```

Uwaga: `Patch` i `Input` mają w tym przykładzie ten sam kształt, ale wynikają z innych
reguł - sprawdź to na typie o trzech różnych polach.

## 4. `applyDefaults`

```ts
applyDefaults<T extends object, K extends keyof T>(
  input: Optional<T, K>,
  defaults: Pick<T, K>,
): T
```

Uzupełnia brakujące pola wartościami domyślnymi i zwraca **komplet** `T`.

```ts
const defaults = { timeoutMs: 5000, retries: 3 };

applyDefaults<Config, "timeoutMs" | "retries">({ url: "/api" }, defaults);
// { url: "/api", timeoutMs: 5000, retries: 3 }

applyDefaults<Config, "timeoutMs" | "retries">({ url: "/api", retries: 0 }, defaults);
// { url: "/api", timeoutMs: 5000, retries: 0 }   ← 0 to wartość, nie brak
```

## Ograniczenia

- Pole obecne z wartością `undefined` traktuj jak **brak** pola (bierze się domyślna).
- `applyDefaults` nie mutuje ani `input`, ani `defaults`.
- Wartość `0`, `""` i `false` w `input` **wygrywa** z domyślną (żadnego `||`).
