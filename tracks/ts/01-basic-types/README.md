# Typy podstawowe, inferencja i `as const`

TypeScript to JavaScript plus statyczne typy sprawdzane przed uruchomieniem. Kod poniżej
działa identycznie po skompilowaniu (typy są wymazywane), ale kompilator zdąży wcześniej
złapać literówkę, złą liczbę argumentów albo `null`, którego nie obsłużyłeś.

## Adnotacja vs inferencja

Typ możesz **zadeklarować** albo pozwolić kompilatorowi go **wywnioskować**:

```ts
let a: number = 10;  // adnotacja
let b = 10;          // inferencja: number
```

Zasada praktyczna z Handbooka: nie adnotuj tego, co kompilator i tak wie. Adnotuj
**granice** — parametry funkcji, typy zwracane w API publicznym, puste kolekcje
(`const items: string[] = []`, bo z `[]` wyjdzie `never[]`).

## Rozszerzanie typu literalnego (widening)

To najczęstsze zaskoczenie na starcie:

```ts
let x = "PLN";        // typ: string   (let może się zmienić → typ rozszerzony)
const y = "PLN";      // typ: "PLN"    (const nie może → typ literalny)
```

Rozszerzanie dotyczy też właściwości obiektów — obiekt jest mutowalny, więc pola dostają
typy szerokie:

```ts
const cfg = { currency: "PLN" };   // { currency: string }
```

## `as const`

Asercja `as const` mówi: „to jest stała, nic tu się nie zmieni”. Skutki:

- literały zostają literałami (`"PLN"`, nie `string`),
- wszystkie pola stają się `readonly`,
- tablica staje się **readonly tuple** o znanej długości i pozycjach.

```ts
const cfg = { currency: "PLN", retries: 3 } as const;
// { readonly currency: "PLN"; readonly retries: 3 }

const ROLES = ["admin", "editor", "viewer"] as const;
// readonly ["admin", "editor", "viewer"]
```

Dzięki temu jedna stała rodzi typ — bez powtarzania listy w dwóch miejscach:

```ts
type Role = (typeof ROLES)[number];        // "admin" | "editor" | "viewer"
type Currency = (typeof cfg)["currency"];  // "PLN"
```

`typeof` w pozycji typu pyta „jaki typ ma ta wartość” (to nie jest `typeof` z runtime'u),
a `[number]` na krotce znaczy „unia typów wszystkich jej elementów”.

## `keyof` na stałej

Drugi wariant tej samej sztuczki — mapa stałych i unia jej kluczy albo wartości:

```ts
const STATUS = { draft: "draft", published: "published" } as const;
type StatusKey = keyof typeof STATUS;              // "draft" | "published"
type StatusValue = (typeof STATUS)[StatusKey];     // "draft" | "published"
```

## Typy prymitywne, których używasz codziennie

`string`, `number`, `boolean`, `null`, `undefined`, tablice (`string[]`), krotki
(`[number, number]`), obiekty (`{ id: number; name: string }`), unie (`string | null`).
Przy `strict: true` (tak mamy w tym kursie) `null` i `undefined` **nie** wchodzą do
`string` — musisz je obsłużyć.

## Kiedy używać

- `as const` dla konfiguracji, list dozwolonych wartości, map stałych — jedno źródło
  prawdy dla wartości i typu.
- Adnotacja typu zwracanego w funkcjach eksportowanych: kompilator pilnuje wtedy, że
  implementacja nie zmieniła kontraktu po cichu.
- `readonly` tam, gdzie dane nie mają być mutowane (konfiguracja, wynik selektora).

## Kiedy unikać

- Nie adnotuj zmiennych lokalnych z oczywistą inferencją (`const n: number = 1` to szum).
- Nie używaj `as const` na obiektach, które faktycznie mutujesz — dostaniesz błąd przy
  pierwszym przypisaniu.
- Nie sięgaj po `any`, żeby uciszyć błąd. `any` wyłącza kontrolę typów w całym łańcuchu
  wyrażeń (to „zatrucie any”). Jeśli typ jest nieznany — `unknown` i zawężanie.

## Pułapki

- `const x = "PLN"` daje `"PLN"`, ale `const cfg = { c: "PLN" }` daje już `string` —
  literał przeżywa tylko w `const` **na zmiennej**, nie w polu obiektu.
- `as const` nie zamraża w runtime: `Object.freeze` to co innego. TS zabroni zapisu przy
  kompilacji, ale zwykły JS (albo `any`) zapisze bez problemu.
- `readonly ["a", "b"]` nie jest przypisywalne do `string[]` — funkcja przyjmująca tablicę
  musi deklarować `readonly string[]`, jeśli ma przyjmować stałe `as const`.
- `type Role = typeof ROLES[number]` bez nawiasów działa, ale przy złożonych wyrażeniach
  czytelniejsze i bezpieczniejsze jest `(typeof ROLES)[number]`.

Źródła: TypeScript Handbook — „Everyday Types”, „Object Types”, „Literal Types”,
„const assertions” (TS 3.4+); Effective TypeScript, rozdz. „Prefer inference to annotation”.
