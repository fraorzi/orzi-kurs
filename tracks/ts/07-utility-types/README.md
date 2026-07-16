# Utility types — gotowe transformacje typów

TypeScript daje kilkanaście globalnych typów pomocniczych, które przekształcają istniejący
typ w nowy. To nic magicznego — każdy z nich to zwykły typ mapowany albo warunkowy
zdefiniowany w `lib.es5.d.ts` (w zagadnieniach 08 i 09 napiszesz je sam). Sens jest jeden:
**jedno źródło prawdy**. Model masz w jednym miejscu, a DTO, patch i podgląd z niego
wyprowadzasz, zamiast przepisywać pola po raz trzeci.

```ts
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
}
```

## `Partial<T>` i `Required<T>`

`Partial` robi wszystkie pola opcjonalnymi, `Required` — odwrotnie.

```ts
type UserPatch = Partial<User>;    // { id?: number; name?: string; … }
type FullUser = Required<UserPatch>; // z powrotem wszystko wymagane
```

Typowe zastosowanie `Partial`: ciało żądania `PATCH` (przysyłasz tylko zmienione pola)
i domyślne opcje (`function init(options: Partial<Options> = {})`).

## `Readonly<T>`

Wszystkie pola `readonly` — zapis do nich staje się błędem kompilacji (w runtime nic się
nie zmienia; `Object.freeze` to osobna, runtime'owa sprawa).

```ts
type Frozen = Readonly<User>;
```

## `Pick<T, K>` i `Omit<T, K>`

`Pick` wybiera podzbiór kluczy, `Omit` wyrzuca podane klucze.

```ts
type UserPreview = Pick<User, "id" | "name">;   // { id: number; name: string }
type NewUser = Omit<User, "id">;                // wszystko poza id
```

Składają się jak klocki:

```ts
type UserPatch = Partial<Omit<User, "id">>;     // patch: bez id, reszta opcjonalna
```

## `Record<K, V>`

Obiekt o kluczach `K` i wartościach `V`. Gdy `K` jest unią literałów, kompilator wymusza
**komplet** kluczy — to najprostszy sposób na wyczerpującą mapę.

```ts
type Role = User["role"];
type RoleCounts = Record<Role, number>;
// { admin: number; editor: number; viewer: number } — brak "viewer" to błąd

type Cache = Record<string, User>;   // luźny słownik
```

## `Exclude<T, U>`, `Extract<T, U>`, `NonNullable<T>`

Operacje na **uniach** (nie na obiektach — to najczęstsza pomyłka):

```ts
type Kind = "click" | "key" | "close";

type Active = Exclude<Kind, "close">;      // "click" | "key"
type Closing = Extract<Kind, "close">;     // "close"
type Value = NonNullable<string | null>;   // string
```

Działa też na uniach obiektów — stąd wyciąganie wariantu z unii dyskryminowanej:

```ts
type AppEvent =
  | { kind: "click"; x: number; y: number }
  | { kind: "key"; key: string }
  | { kind: "close" };

type ClickEvent = Extract<AppEvent, { kind: "click" }>;
// { kind: "click"; x: number; y: number }
```

## Typy wyprowadzone z kodu: `ReturnType`, `Parameters`, `Awaited`

Nie deklaruj typu wyniku funkcji drugi raz — wyciągnij go z samej funkcji. `typeof f`
w pozycji typu daje typ funkcji, a te utility go rozbierają:

```ts
async function findUser(id: number, withPosts: boolean): Promise<User | null> { … }

type Args = Parameters<typeof findUser>;                 // [id: number, withPosts: boolean]
type Result = ReturnType<typeof findUser>;               // Promise<User | null>
type Loaded = Awaited<ReturnType<typeof findUser>>;      // User | null
type Found = NonNullable<Loaded>;                        // User
```

`Awaited<T>` zdejmuje `Promise` — **rekurencyjnie**, więc `Awaited<Promise<Promise<string>>>`
to `string`. Modeluje dokładnie to, co robi `await`.

Krotkę z `Parameters` można od razu wstawić jako rest:

```ts
async function findUserOrThrow(...args: Args): Promise<Found> { … }
```

Poza tym są jeszcze `ConstructorParameters<T>`, `InstanceType<T>` (dla klas),
`ThisParameterType<T>`, `OmitThisParameter<T>` oraz stringowe `Uppercase` / `Lowercase` /
`Capitalize` / `Uncapitalize`.

## Kiedy używać

- DTO ↔ model: `Omit<User, "id">` dla wejścia „create", `Partial<Omit<User, "id">>` dla
  „patch". Dodanie pola do modelu automatycznie aktualizuje wszystkie pochodne.
- `Record<Unia, T>` wszędzie tam, gdzie mapa musi pokrywać wszystkie warianty (tłumaczenia,
  liczniki, tablice routingu) — kompilator przypilnuje kompletu.
- `Extract<Unia, { kind: "x" }>` zamiast ręcznego przepisywania wariantu unii.
- `ReturnType` / `Parameters` / `Awaited` do typowania kodu wokół cudzej funkcji (wrapper,
  cache, retry) — kontrakt zostaje w jednym miejscu.

## Kiedy unikać

- Nie buduj wieży `Partial<Omit<Pick<…>>>` w miejscu użycia. Nazwij typy pośrednie —
  komunikaty błędów i podpowiedzi IDE staną się czytelne.
- `Partial<T>` na modelu domenowym „na wszelki wypadek" to strzał w stopę: każde pole staje
  się `T | undefined` i musisz je sprawdzać w każdym miejscu.
- `Record<string, T>` tam, gdzie klucze są znane — tracisz kontrolę literówek. Użyj unii.
- `Required<T>` nie usuwa `null` — usuwa tylko `?` (i `undefined` z typu pola). `null` zdejmuje
  dopiero `NonNullable`.

## Pułapki

- **`Omit` nie sprawdza kluczy.** `Omit<User, "emial">` kompiluje się bez słowa (sygnatura to
  `K extends keyof any`), po prostu nic nie usuwa. `Pick<User, "emial">` już jest błędem
  (`K extends keyof T`). Jeśli chcesz bezpiecznego `Omit`, opakuj:
  `type StrictOmit<T, K extends keyof T> = Omit<T, K>`.
- **`Omit` spłaszcza unię dyskryminowaną.** `Omit<AppEvent, "kind">` nie rozdziela się po
  wariantach — dostaniesz jeden obiekt z części wspólnej. Do pracy na wariantach użyj
  `Extract` / `Exclude` (albo własnego rozdzielnego typu, zagadnienie 09).
- **`Exclude` / `Extract` działają na uniach, nie na polach.** `Exclude<User, "id">` to `User`
  (bo `User` nie jest przypisywalny do `"id"`), a nie „User bez id". Do pól służy `Omit`.
- **`Partial` i `Readonly` są płytkie.** Zagnieżdżony obiekt zostaje wymagany i mutowalny.
  Wersje głębokie napiszesz w zagadnieniu 08.
- **`ReturnType<f>` to błąd — potrzebne jest `ReturnType<typeof f>`.** Pierwsze podaje
  *wartość* tam, gdzie oczekiwany jest *typ*.
- `Record<Role, number>` wymaga kompletu kluczy przy tworzeniu obiektu, ale odczyt
  `counts[role]` daje `number` (nie `number | undefined`) — dopóki nie włączysz
  `noUncheckedIndexedAccess`.

Źródła: TypeScript Handbook — „Utility Types", „Type Manipulation" (Keyof, Indexed Access,
Conditional Types); `lib.es5.d.ts` (definicje `Pick`, `Exclude`, `Awaited`);
Total TypeScript — „Utils Folder" / „Deriving types from values".
