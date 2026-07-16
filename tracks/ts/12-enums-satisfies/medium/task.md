# Medium — obiekt stałych zamiast `enum`

Poziomy logowania. Zamiast `enum LogLevel { Debug = 10, … }` budujemy obiekt `as const`
i wyprowadzamy z niego wszystkie typy — łącznie z tym, co `enum` daje „za darmo”
(odwrotne mapowanie), tylko bez kodu w runtime.

## 1. `LOG_LEVEL`

```ts
{ debug: 10, info: 20, warn: 30, error: 40 }   // as const
```

## 2. Typy

```ts
type LevelName  = ...;  // "debug" | "info" | "warn" | "error"     (klucze)
type LevelValue = ...;  // 10 | 20 | 30 | 40                       (wartości)
```

Oba wyprowadzone z `LOG_LEVEL`, nie przepisane ręcznie.

## 3. `shouldLog(minimum: LevelName, message: LevelName): boolean`

Czy wiadomość o danym poziomie przechodzi przez próg.

```ts
shouldLog("info", "warn");   // true    (30 >= 20)
shouldLog("info", "debug");  // false   (10 < 20)
shouldLog("error", "error"); // true    (próg włącznie)
```

## 4. `levelName(value: LevelValue): LevelName`

Odwrotne mapowanie wartość → nazwa. `enum` numeryczny robi to sam (i przy okazji zaśmieca
`Object.keys`); tutaj piszesz to jawnie.

```ts
levelName(30); // "warn"
```

## 5. `parseLevel(input: string): LevelName | null`

Walidacja danych z zewnątrz (np. `process.env.LOG_LEVEL`). Nieznana nazwa → `null`.

```ts
parseLevel("warn");   // "warn"
parseLevel("WARN");   // null   — bez normalizacji wielkości liter
parseLevel("krzyk");  // null
```

To jest granica systemu typów: `string` z zewnątrz wchodzi tylko przez walidację.
Zabronione: `as`, `any`.
