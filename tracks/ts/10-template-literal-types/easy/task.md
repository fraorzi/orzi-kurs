# Easy — nazwy generowane z nazw

Cztery drobne narzędzia, każde oparte na template literal type. Wszystkie funkcje są
generyczne: wołający ma dostać **konkretny literał**, nie `string`.

## 1. `CssVar<Name>` i `cssVar`

```ts
type CssVar<Name extends string> = ...;   // "gap" → "--gap"

cssVar("gap");     // wartość "--gap", typ "--gap"
cssVar("accent");  // wartość "--accent", typ "--accent"
```

## 2. `HandlerName<Event>` i `handlerName`

Nazwa handlera to `on` + zdarzenie z wielkiej litery. Przyda się `Capitalize`.

```ts
type HandlerName<Event extends string> = ...;   // "click" → "onClick"

handlerName("click");  // "onClick"
handlerName("focus");  // "onFocus"
```

## 3. `EnvKey<Name>` i `envKey`

Klucz zmiennej środowiskowej: prefiks `app_`, całość wielkimi literami.

```ts
type EnvKey<Name extends string> = ...;   // "port" → "APP_PORT"

envKey("port");       // "APP_PORT"
envKey("db_host");    // "APP_DB_HOST"
```

## 4. `Variant` i `isVariant`

`SIZES` i `TONES` są już w starterze (`as const`). Wyprowadź z nich:

- `Size` — unia wartości `SIZES` (`"sm" | "md" | "lg"`),
- `Tone` — unia wartości `TONES` (`"primary" | "danger"`),
- `Variant` — **wszystkie** kombinacje `` `${Size}-${Tone}` `` (6 członów, nie przepisuj
  ich ręcznie).

```ts
const v: Variant = "md-danger";   // OK
const w: Variant = "md-warning";  // błąd typu
```

`isVariant(value: string): value is Variant` — type guard dla stringa **z zewnątrz**
(np. z `input`). Ma przepuścić dokładnie te 6 wartości:

```ts
isVariant("sm-primary");      // true
isVariant("xl-primary");      // false — nieznany rozmiar
isVariant("sm");              // false — brak tonu
isVariant("sm-primary-x");    // false — za dużo członów
```

## Dlaczego funkcje wymagają `as`

Sklejenie stringów w runtime zawsze daje `string` — kompilator nie policzy
`"--" + name` na typ `` `--${Name}` ``. Asercja `as` w **ciele** funkcji jest tu poprawna:
stoi w jednym miejscu, a każdy wywołujący dostaje precyzyjny typ za darmo.
