# Generyki: ograniczenia, wartości domyślne, wiele parametrów

Zagadnienie 05 pokazało nagi parametr typu (`<T>`). Nagi `T` może być **czymkolwiek**, więc
w ciele funkcji nie wolno o nim niczego założyć — nie odczytasz `.length`, nie zindeksujesz
pola. Ograniczenie (`extends`) to obietnica: „T będzie co najmniej taki”.

## Ograniczenie: `extends`

```ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest("kot", "pies");      // "kot" | "pies"  — literały przeżywają
longest([1, 2], [1, 2, 3]);  // number[]
longest(10, 100);            // błąd: number nie ma pola length
```

`T extends X` NIE znaczy „T jest podklasą X” w sensie OOP — znaczy „T jest przypisywalny
do X”. Wewnątrz funkcji `T` ma **co najmniej** pola z `X`, a na zewnątrz zachowuje swój
dokładny typ: `longest` na dwóch literałach zwraca ich unię (`"kot" | "pies"`), a nie
`{ length: number }` ani `string`. Gdy argumenty mają typ `string`, wynikiem jest `string`.

## `keyof` jako ograniczenie

Najczęstsza para w praktyce: obiekt i jego klucz.

```ts
function getProp<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Ala", age: 30 };
getProp(user, "name");   // string
getProp(user, "wiek");   // błąd: "wiek" nie jest kluczem user
```

`T[K]` to **indexed access type** — „typ pola `K` w `T`”. Dzięki niemu wynik jest dokładny
(`string`), a nie `string | number`.

## Wartości domyślne parametrów typu

```ts
type ApiResponse<T = null> = { status: number; body: T };

type Empty = ApiResponse;          // body: null
type Users = ApiResponse<User[]>;  // body: User[]
```

Domyślny typ działa jak domyślny argument funkcji: pozwala pominąć parametr w typowym
przypadku. Można łączyć z ograniczeniem: `<T extends object = Record<string, never>>`.

## Wiele parametrów typu

```ts
function zip<A, B>(as: readonly A[], bs: readonly B[]): [A, B][] { … }
function mapValues<T extends object, R>(obj: T, fn: (value: T[keyof T]) => R): Record<keyof T, R> { … }
```

Parametry mogą się do siebie odwoływać (`K extends keyof T`), ale kolejność ma znaczenie —
parametr może zależeć tylko od zadeklarowanych **przed** nim.

## Ograniczenie a inferencja — pułapka pustej listy

```ts
function first<T>(items: readonly T[]): T | undefined { return items[0]; }
first([]);              // T = never  → wynik: undefined
first<string>([]);      // T = string → wynik: string | undefined
```

Gdy nie ma z czego wnioskować, TS bierze `never`. To sygnał, że trzeba podać argument typu
jawnie albo przemyśleć sygnaturę.

## Kiedy używać

- `T extends { … }` — gdy w ciele funkcji korzystasz z jakiegoś pola albo metody `T`.
- `K extends keyof T` — gdy funkcja bierze klucz obiektu; wynik `T[K]` jest wtedy dokładny.
- Domyślny parametr typu — gdy 90% wywołań używa tego samego typu (odpowiedź bez ciała,
  domyślny typ błędu w `Result<T, E = string[]>`).
- `T extends PropertyKey` (czyli `string | number | symbol`) — gdy typ ma być kluczem mapy.

## Kiedy unikać

- Ograniczenie „na wszelki wypadek” (`T extends unknown`) nic nie wnosi — to nagi `T`.
- Jeśli funkcja nie używa `T` w **dwóch** miejscach, generyk jest zbędny: parametr `T`
  występujący tylko raz można zastąpić zwykłym typem (zwykle `unknown`).
- Ograniczenie do konkretnej klasy zamiast do kształtu (`T extends User`) zamyka funkcję
  na inne, zgodne strukturalnie dane.

## Pułapki

- `T extends { length: number }` przyjmie `string`, `Array`, ale też `{ length: 3 }` —
  ograniczenie jest strukturalne, nie nominalne.
- `T extends Record<string, unknown>` **odrzuci interfejs**: `interface Events { … }` nie
  ma niejawnej index signature, alias `type Events = { … }` — ma. Dlatego mapy zdarzeń
  i konfiguracji pisze się aliasem, a nie interfejsem.
- `K extends keyof T` przy `T` z index signature (`Record<string, X>`) daje `string`, więc
  ochrona przed literówką znika — `keyof Record<string, X>` to po prostu `string`.
- Domyślny typ nie jest sprawdzany względem ograniczenia w miejscu użycia, tylko w
  deklaracji: `<T extends string = number>` to błąd od razu.
- Ograniczenie nie zmienia typu zwracanego: `function f<T extends object>(x: T): T` zwraca
  dokładnie `T` — jeśli zwrócisz `{ ...x }`, kompilator to przyjmie, choć w runtime
  stracisz prototyp klasy. Ograniczenia sprawdzają kształt, nie tożsamość.

Źródła: TypeScript Handbook — „More on Functions: Generic Functions, Constraints,
Specifying Type Arguments”, „Generics: Generic Constraints, Using Type Parameters in
Generic Constraints, Generic Parameter Defaults”, „Indexed Access Types”.
