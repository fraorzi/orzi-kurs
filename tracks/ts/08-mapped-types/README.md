# Mapped types — własne utility types

Utility types z zagadnienia 07 (`Partial`, `Readonly`, `Pick`) nie są magią wbudowaną
w kompilator. To zwykłe **mapped types** — pętle po kluczach typu. Zaraz je napiszesz sam.

## Składnia

```ts
type MyPartial<T> = { [K in keyof T]?: T[K] };
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };
```

Czytaj jak pętlę: „dla każdego klucza `K` w `keyof T` zrób pole o typie …”. `T[K]` to typ
pola pod tym kluczem (indexed access).

## Modyfikatory: `readonly` i `?`

Modyfikatory można **dodawać** (`+`, domyślne) i **usuwać** (`-`):

```ts
type Mutable<T> = { -readonly [K in keyof T]: T[K] };   // zdejmuje readonly
type Required<T> = { [K in keyof T]-?: T[K] };          // zdejmuje opcjonalność
```

To jedyny sposób, żeby zdjąć `readonly` albo `?` — nie ma na to innej składni.

## Mapped type homomorficzny

Gdy piszesz `[K in keyof T]`, mapowanie jest **homomorficzne**: zachowuje istniejące
modyfikatory pól (`readonly`, `?`) i przechodzi przez tablice oraz krotki, zamiast
zamieniać je w zwykły obiekt.

```ts
type Boxed<T> = { [K in keyof T]: { value: T[K] } };
type A = Boxed<{ a: string }>;      // { a: { value: string } }
type B = Boxed<[string, number]>;   // [{ value: string }, { value: number }]  ← krotka przeżyła
```

Gdy zamiast `keyof T` użyjesz czegoś innego (np. `[K in K2]`), ta własność znika.

## Zmiana nazw kluczy: klauzula `as`

```ts
type Prefixed<T> = { [K in keyof T & string as `data-${K}`]: T[K] };
```

Klucz zwrócony jako `never` **znika** z wyniku — tak filtruje się pola (szerzej:
zagadnienie 10).

## `Prettify` — sztuczka na czytelność

Przecięcia (`A & B`) są poprawne, ale w podpowiedziach edytora wyglądają fatalnie i nie
porównują się z „płaskim” obiektem. Mapped type po `keyof` je spłaszcza:

```ts
type Prettify<T> = { [K in keyof T]: T[K] } & {};

type Ugly = { a: string } & { b: number };      // { a: string } & { b: number }
type Nice = Prettify<Ugly>;                     // { a: string; b: number }
```

## Kiedy używać

- Gdy potrzebujesz wariantu istniejącego typu (wszystko opcjonalne, wszystko readonly,
  wszystko w `Promise`) — zamiast pisać drugi interfejs, który się rozjedzie.
- Gdy chcesz wymusić komplet: `Record<Role, Handler>` nie pozwoli zapomnieć o roli.
- Gdy typ ma wynikać z danych (konfiguracji, mapy stałych), a nie odwrotnie.

## Kiedy unikać

- Nie buduj mapped type'u, gdy wystarczy wbudowany utility type — `Partial<T>` czyta się
  lepiej niż ręczna pętla.
- Głęboka rekurencja (`DeepPartial` na wielkim modelu) potrafi zauważalnie spowolnić
  kompilację. Rób ją świadomie i płytko, gdy się da.
- Mapped type nad unią rozłączną rozłoży ją na jeden obiekt i zniszczy dyskryminację —
  wtedy potrzebujesz distributive conditional type (zagadnienie 09).

## Pułapki

- `{ [K in keyof T]: … }` po typie z index signature (`Record<string, X>`) da z powrotem
  index signature — nie da się „wyliczyć” z niej konkretnych kluczy.
- `Required<T>` zdejmuje `?`, ale **nie** usuwa `undefined` z typu wartości:
  `{ a?: string | undefined }` → `{ a: string | undefined }`.
- Mapowanie po `keyof T` pomija symbole tylko wtedy, gdy je odfiltrujesz (`keyof T & string`).
  Inaczej klucze symboliczne zostają — i template literal na nich nie zadziała.
- Mapped type nie kopiuje metod klasy wraz z `this` — to tylko struktura, nie prototyp.

Źródła: TypeScript Handbook — „Mapped Types”, „Key Remapping via as”, „Indexed Access
Types”; Total TypeScript — „Prettify / Flatten pattern”.
