# Typy warunkowe i `infer`

Typ warunkowy to `if` na poziomie typów:

```ts
type IsString<T> = T extends string ? "tak" : "nie";

type A = IsString<"abc">;   // "tak"
type B = IsString<number>;  // "nie"
```

`T extends U` czytaj jako „czy `T` jest przypisywalny do `U`”, nie „czy dziedziczy po”.

## Rozdzielność (distributive conditional types)

Gdy sprawdzany typ jest **nagim parametrem typu**, a argumentem jest unia, warunek liczy
się **osobno dla każdego składnika**, a wyniki wracają jako unia:

```ts
type MyExclude<T, U> = T extends U ? never : T;

type R = MyExclude<"a" | "b" | "c", "a">;
// liczy się jako: (("a" extends "a") ? never : "a") | (… "b" …) | (… "c" …)
// = never | "b" | "c" = "b" | "c"
```

`never` w unii znika — to dlatego `Exclude` w ogóle działa.

Rozdzielność wyłączasz, opakowując oba typy w krotkę:

```ts
type IsNever<T> = [T] extends [never] ? true : false;   // bez nawiasów: nigdy nie zadziała
```

Bez `[ ]` przy `T = never` warunek… nie wykona się wcale (rozdzielność po pustej unii daje
`never`). To najczęstsze źródło „czemu mój typ zwraca never”.

## `infer` — złap typ w locie

W gałęzi `extends` można **wyłuskać** fragment typu:

```ts
type ElementType<T> = T extends readonly (infer E)[] ? E : never;
type MyReturnType<F> = F extends (...args: never[]) => infer R ? R : never;
type MyParameters<F> = F extends (...args: infer P) => unknown ? P : never;

type A = ElementType<number[]>;                  // number
type B = MyReturnType<() => Date>;               // Date
type C = MyParameters<(a: string) => void>;      // [a: string]
```

`infer X` deklaruje zmienną typową dostępną tylko w gałęzi „prawda”.

## Rekurencja

Typ warunkowy może wołać sam siebie — tak działa `Awaited`:

```ts
type MyAwaited<T> = T extends Promise<infer V> ? MyAwaited<V> : T;

type A = MyAwaited<Promise<Promise<number>>>;   // number
```

## Filtrowanie kluczy po typie wartości

Połączenie mapped type + conditional + indeksowania unią kluczy:

```ts
type KeysOfType<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T];
type PickByType<T, V> = Pick<T, KeysOfType<T, V>>;

interface Row { id: number; name: string; score: number }
type Numeric = PickByType<Row, number>;   // { id: number; score: number }
```

Mapped type podmienia **wartość** na nazwę klucza (albo `never`), a `[keyof T]` na końcu
zbiera te wartości w unię — `never` znowu znika.

## Kiedy używać

- Gdy typ wyniku **zależy** od typu wejścia (`ElementType`, `Awaited`, `ReturnType`).
- Gdy chcesz przefiltrować unię (`Exclude`, `Extract`) albo klucze obiektu po typie
  wartości.
- Gdy naprawiasz mapped type, który nie powinien wchodzić w tablice (`DeepPartial` z 08).

## Kiedy unikać

- Gdy wystarczy przeciążenie funkcji albo unia rozłączna — typ warunkowy w sygnaturze
  publicznej API bywa nieczytelny w komunikatach błędów.
- Głęboka rekurencja warunkowa na dużych typach spowalnia kompilację (limit rekurencji TS
  to ~1000 poziomów, ale problemy zaczynają się dużo wcześniej).
- Gdy warunek sprawdza `any` — `any extends X` daje **obie** gałęzie (unię), co zwykle
  zaskakuje.

## Pułapki

- Rozdzielność działa tylko dla **nagiego** parametru (`T extends …`). `T[]` czy `[T]` już
  nie rozdziela.
- `boolean` to `true | false`, więc warunek na `boolean` rozdzieli się na dwa — łatwo
  dostać `true | false` zamiast oczekiwanej jednej gałęzi.
- `never` jako argument rozdzielnego typu warunkowego daje `never` (warunek się nie liczy).
- `infer` w kilku miejscach tego samego typu daje **unię** kandydatów w pozycji
  kowariantnej i **przecięcie** w kontrawariantnej.
- `T extends (...args: any[]) => infer R` z `any` przechodzi wszystko; w kursie używamy
  `never[]` w pozycji parametrów, bo funkcje są kontrawariantne po argumentach.

Źródła: TypeScript Handbook — „Conditional Types”, „Distributive Conditional Types”,
„Inferring Within Conditional Types”, „Mapped Types”; type-challenges (Exclude, Awaited,
ReturnType, PickByType).
