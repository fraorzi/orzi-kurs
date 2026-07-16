# Template literal types

String literal type złożony z kawałków — ta sama składnia co w JS, tylko w pozycji typu:

```ts
type World = "world";
type Greeting = `hello ${World}`;   // "hello world"
```

Sam w sobie mało ciekawy. Siła zaczyna się, gdy w dziurę wstawisz **unię** albo **parametr
generyczny**.

## Unia w dziurze = iloczyn kartezjański

Każda unia w interpolacji rozmnaża wynik na wszystkie kombinacje:

```ts
type Size = "sm" | "md" | "lg";
type Tone = "primary" | "danger";

type Variant = `${Size}-${Tone}`;
// "sm-primary" | "sm-danger" | "md-primary" | "md-danger" | "lg-primary" | "lg-danger"
```

Dwie dziury = mnożenie. `3 × 2 = 6` członów. To bywa zaletą (generujesz wszystkie warianty
zamiast je przepisywać), ale i pułapką — patrz „Pułapki”.

## Cztery typy wbudowane

TS ma cztery **intrinsic** typy do zmiany wielkości liter — działają wyłącznie na typach:

```ts
Uppercase<"my_app">      // "MY_APP"
Lowercase<"MY_APP">      // "my_app"
Capitalize<"click">      // "Click"
Uncapitalize<"OnClick">  // "oNClick"
```

Rozdzielają się po unii (`Capitalize<"click" | "focus">` → `"Click" | "Focus"`) i są
zaimplementowane w kompilatorze przez zwykłe `toUpperCase()` / `toLowerCase()` — **nie są
świadome lokalizacji** (żadnego tureckiego `i`).

## `${string}` jako wzorzec

W dziurze może stać sam `string` — powstaje wtedy typ „dowolny string pasujący do wzorca”:

```ts
type CssVar = `--${string}`;

const a: CssVar = "--gap";     // OK
const b: CssVar = "gap";       // błąd — brak prefiksu
```

Tak samo `` `${number}px` ``, `` `#${string}` ``. To jedyny sposób, żeby w TS wyrazić
„string o określonym kształcie” bez schodzenia do runtime'u.

## Key remapping: `as` w mapped type

Klucze mapowanego typu można **przepisać** klauzulą `as`. W połączeniu z template literalem
generujesz nazwy pól:

```ts
type Getters<T> = {
  [K in keyof T & string as `get${Capitalize<K>}`]: () => T[K];
};

type UserGetters = Getters<{ name: string; age: number }>;
// { getName: () => string; getAge: () => number }
```

`keyof T & string` jest konieczne: `keyof T` może zawierać `symbol` i `number`, a template
literal przyjmuje tylko stringi.

Zwrócenie `never` z klauzuli `as` **usuwa klucz** — tak się filtruje pola:

```ts
type WithoutInternal<T> = {
  [K in keyof T as K extends `_${string}` ? never : K]: T[K];
};

type Public = WithoutInternal<{ id: number; _secret: string }>;  // { id: number }
```

## `infer` na template literalu = parsowanie stringów

W conditional type możesz **rozłożyć** literał na części:

```ts
type ParamName<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ParamName<`/${Rest}`>
    : Path extends `${string}:${infer Param}`
      ? Param
      : never;

type P = ParamName<"/users/:id/posts/:postId">;   // "id" | "postId"
```

Dopasowanie jest **leniwe od lewej**: `${string}` bierze najkrótszy możliwy prefiks. Dzięki
temu pierwsze `:` wygrywa i rekurencja zjada ścieżkę segment po segmencie.

To jest fundament typowanych routerów, `t()` z i18n, ORM-ów i bibliotek do zapytań.

## Runtime nie zna tych typów

Typ mówi `` `on${Capitalize<E>}` ``, ale `event.charAt(0).toUpperCase()` zwraca zwykły
`string` — kompilator nie policzy tego za Ciebie. Na granicy potrzebna jest asercja:

```ts
function handlerName<E extends string>(event: E): `on${Capitalize<E>}` {
  return `on${event.charAt(0).toUpperCase()}${event.slice(1)}` as `on${Capitalize<E>}`;
}

handlerName("click");   // typ: "onClick"
```

To normalne i akceptowalne: `as` stoi w **jednym** miejscu (wewnątrz funkcji), a wszyscy
wywołujący dostają precyzyjny typ za darmo. Odwrotny układ (`as` w każdym wywołaniu) byłby
katastrofą.

## Kiedy używać

- Nazwy generowane z innych nazw: handlery (`onClick`), gettery (`getName`), akcje
  (`SET_USER`), zmienne CSS (`--gap`), klucze cache (`user:42`).
- Kształt stringa jako kontrakt: `` `${number}px` ``, `` `#${string}` ``, `` `/${string}` ``.
- Parsowanie stringów, których treść jest znana w czasie kompilacji — ścieżki routingu,
  klucze tłumaczeń, nazwy kolumn.
- Zamiast ręcznego wypisywania unii, którą da się wyliczyć (6 wariantów `Size × Tone`).

## Kiedy unikać

- Gdy string pochodzi z zewnątrz (fetch, input, `process.env`) — jest wtedy zwykłym
  `string`iem i template literal nic nie da. Najpierw walidacja w runtime, potem typ.
- Gdy unia rozrasta się kombinatorycznie (patrz niżej) — czasem uczciwiej wypisać 6
  wariantów ręcznie niż mnożyć 4 × 5 × 5.
- Do parsowania czegokolwiek naprawdę skomplikowanego (pełny SQL, JSON). Da się, ale
  koszt kompilacji i nieczytelność błędów przewyższają zysk.

## Pułapki

- **Eksplozja kombinatoryczna.** `${A}-${B}-${C}` przy uniach po 10 członów to 1000 typów.
  TS ma twardy limit **100 000** członów unii — po przekroczeniu dostajesz
  „Expression produces a union type that is too complex to represent”.
- **`Capitalize` nie zna lokalizacji** — działa jak `toUpperCase()` w JS, znak po znaku.
- **`keyof T` to nie `string`.** Bez `& string` dostaniesz błąd, bo klucz może być
  `symbol`em.
- **Runtime nie zwęża.** Sklejenie stringów w kodzie zawsze daje `string`; precyzyjny typ
  istnieje tylko dzięki `as` (albo dzięki temu, że wartość jest literałem/`as const`).
- **`never` w `as` kasuje klucz** — to feature, nie bug. Łatwo przez pomyłkę wykasować
  wszystko, jeśli warunek jest odwrócony.

Źródła: TypeScript Handbook — „Template Literal Types” (inference, intrinsic string types,
`PropEventSource`); „Mapped Types” — Key Remapping via `as`; „Conditional Types” — `infer`.
