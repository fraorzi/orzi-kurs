# `enum` vs obiekt stałych, i `satisfies`

## Problem: zbiór dozwolonych wartości

Trzy sposoby na „status może być jednym z trzech":

```ts
// 1. enum
enum Status { Draft = "draft", Published = "published" }

// 2. obiekt as const + typ wyprowadzony
const STATUS = { draft: "draft", published: "published" } as const;
type Status2 = (typeof STATUS)[keyof typeof STATUS];

// 3. sama unia literałów
type Status3 = "draft" | "published";
```

## Czym `enum` różni się od reszty

`enum` jest **nominalny** — dwa enumy o tych samych wartościach nie są wymienne, a string
`"draft"` nie jest przypisywalny do `Status` (musisz napisać `Status.Draft`). To bywa
zaletą (nie pomylisz statusu z rolą) i wadą (dane z JSON-a trzeba konwertować).

`enum` **istnieje w runtime** — kompiluje się do obiektu. To jedyna konstrukcja TS, która
emituje kod (poza dekoratorami i przestarzałymi namespace'ami). Dlatego:

- nie działa w środowiskach z „type stripping" (Node z `--experimental-strip-types`,
  `erasableSyntaxOnly` w TS 5.8+, Bun, Deno w trybie type-strip),
- zwiększa bundle,
- `const enum` (inline'owany) jest jeszcze bardziej problematyczny — zakazany przy
  `isolatedModules`, którego wymaga każdy bundler.

Numeryczny `enum` ma dodatkowo dziurę: mapowanie odwrotne i przypisywalność liczb.
W starszych TS `const x: NumEnum = 5` przechodziło, choć `5` nie było żadnym wariantem.

## Rekomendacja

Zespół TypeScriptu i praktyka (Total TypeScript, Effective TypeScript) mówią to samo:
**domyślnie obiekt `as const` + unia wyprowadzona**, a `enum` tylko wtedy, gdy naprawdę
potrzebujesz nominalności albo pracujesz z kodem, który już go używa.

## `satisfies` (TS 4.9)

Problem: chcesz **sprawdzić** wartość względem typu, ale **zachować** jej dokładny typ.

```ts
const routes = {
  home: "/",
  post: "/posts/:id",
} satisfies Record<string, string>;

routes.home;   // typ: "/"   ← literał zachowany
routes.other;  // błąd: nie ma takiego klucza
```

Dla porównania:

```ts
const a: Record<string, string> = { home: "/" };
a.home;    // typ: string       ← literał zgubiony
a.cokolwiek; // typ: string     ← klucz zmyślony, brak błędu

const b = { home: "/" } as Record<string, string>;
// `as` nic nie sprawdza — literówki przechodzą
```

Zasada: **adnotacja** rozszerza typ do zadeklarowanego, **`as`** niczego nie sprawdza,
**`satisfies`** sprawdza i nie rozszerza.

## `satisfies` + `as const`

Kolejność ma znaczenie: `as const satisfies T` najpierw zamraża literały, potem sprawdza
zgodność z `T`. Odwrotnie (`satisfies T as const`) się nie kompiluje.

```ts
const CONFIG = {
  retries: 3,
  mode: "dark",
} as const satisfies { retries: number; mode: "dark" | "light" };

CONFIG.mode;   // typ: "dark"
```

## Kiedy używać

- Obiekt `as const` + `(typeof X)[keyof typeof X]` — domyślny wybór dla zamkniętego zbioru
  wartości.
- `satisfies` przy konfiguracjach, mapach tras, tablicach kolumn, tokenach designu —
  wszędzie, gdzie chcesz walidacji kształtu i jednocześnie dokładnych typów.
- `enum` — gdy nominalność jest celem (id-ki różnych encji, których nie wolno pomylić)
  albo gdy narzuca go istniejące API.

## Kiedy unikać

- `const enum` — praktycznie zawsze (niekompatybilny z `isolatedModules`).
- `enum` w kodzie, który ma się parsować bez kompilatora TS (Node type-stripping,
  `erasableSyntaxOnly`).
- `as` w miejscach, gdzie chodziło o walidację — to `satisfies` jest do sprawdzania.

## Pułapki

- `satisfies` nie zmienia typu wartości — jeśli chcesz **wymusić** szerszy typ (np. żeby
  pole dało się później podmienić), potrzebujesz adnotacji.
- Enum stringowy nie przyjmie stringa: `const s: Status = "draft"` to błąd, musi być
  `Status.Draft`. Przy danych z sieci to dodatkowa konwersja (i walidacja).
- `keyof typeof Enum` daje **nazwy** wariantów (`"Draft"`), nie ich wartości (`"draft"`).
- Enum numeryczny generuje mapowanie odwrotne (`Status[0] === "Draft"`), więc
  `Object.keys(enum)` zwraca też liczby — klasyczne źródło bugów w pętlach.

Źródła: TypeScript Handbook — „Enums", „Objects (as const)", release notes TS 4.9
(`satisfies`) i TS 5.8 (`erasableSyntaxOnly`); Total TypeScript — „Enums considered harmful".
