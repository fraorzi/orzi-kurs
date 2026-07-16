# Hard — konfiguracja tylko do odczytu i typy z niej wyprowadzone

Moduł konfiguracji aplikacji. Wartości podane są w `starter.ts` — Twoim zadaniem jest
zrobić z nich **niemutowalną stałą** i wyprowadzić z niej wszystkie typy, a potem napisać
dwie funkcje operujące na tych typach.

## 1. `CONFIG`

`as const` na całym obiekcie (zagnieżdżone pola też mają być `readonly`, a `features` —
readonly tuple).

```ts
CONFIG.api.timeoutMs;  // typ: 5000, nie number
CONFIG.features;       // typ: readonly ["search", "export", "darkMode"]
```

## 2. Typy wyprowadzone (żadnego przepisywania ręcznie)

```ts
type Config      = ...; // typ całego CONFIG
type FeatureFlag = ...; // "search" | "export" | "darkMode"  (z CONFIG.features)
type ApiConfig   = ...; // typ CONFIG.api
```

## 3. `hasFeature(flag: FeatureFlag): boolean`

Czy flaga jest w `CONFIG.features`.

```ts
hasFeature("search");   // true
```

Poza unią `FeatureFlag` nic nie wejdzie — `hasFeature("sms")` ma być błędem typu.

## 4. `describeApi(api: ApiConfig): string`

```ts
describeApi(CONFIG.api); // "https://api.example.com (timeout 5000ms, 3 próby)"
```

Funkcja przyjmuje `ApiConfig`, więc musi działać na obiekcie `readonly` — nie mutuj wejścia.

## 5. `withTimeout(api: ApiConfig, timeoutMs: number): { baseUrl: string; timeoutMs: number; retries: number }`

Zwraca **nowy, mutowalny** obiekt konfiguracji z podmienionym `timeoutMs`. Oryginał zostaje
nietknięty — to jest sedno zadania: `readonly` blokuje zapis, więc jedyna droga to kopia.

```ts
withTimeout(CONFIG.api, 100); // { baseUrl: "https://api.example.com", timeoutMs: 100, retries: 3 }
```
