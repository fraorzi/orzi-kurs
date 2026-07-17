# Operatory typów

Najbezpieczniejszy kontrakt często nie jest napisany drugi raz — jest wyprowadzony
z istniejącej wartości lub typu.

## `keyof`

`keyof T` tworzy unię kluczy typu:

```ts
type User = { id: number; name: string };
type UserKey = keyof User; // "id" | "name"
```

W generycznej funkcji `K extends keyof T` wiąże klucz z konkretnym obiektem.

## `typeof` w pozycji typu

`typeof value` pobiera statyczny typ wartości:

```ts
const ROUTES = { home: "/", account: "/account" } as const;
type RouteName = keyof typeof ROUTES;
```

Nie jest to runtime `typeof`. Operator typu działa tylko w kodzie typów.

## Indexed access

`T[K]` pobiera typ pola:

```ts
type UserName = User["name"]; // string
type UserValue = User[keyof User]; // number | string
```

Dla tablicy `T[number]` oznacza typ elementu:

```ts
const roles = ["admin", "editor"] as const;
type Role = (typeof roles)[number];
```

## Jedno źródło prawdy

Stały rejestr może jednocześnie zasilać runtime i typy. Dodanie wpisu automatycznie
rozszerza unię kluczy, wartości i argumenty funkcji. To ogranicza rozjazd między
ręcznie utrzymywanym union type a faktyczną konfiguracją.

## Kiedy używać

- rejestry tras, feature flags, event maps i konfiguracja pól,
- bezpieczne accessors i projekcja danych,
- wyprowadzanie typu elementu z readonly tuple.

## Kiedy unikać

- wyprowadzania publicznego API z przypadkowej wartości implementacyjnej,
- wielopiętrowych wyrażeń, których nie da się odczytać bez debugowania,
- `keyof object` jako „dowolnego klucza”; zwykle potrzebujesz konkretnego `T`.

## Pułapki

- `Object.keys()` zwraca `string[]`, bo runtime może zawierać więcej kluczy niż typ,
- `keyof` typu z index signature może dać `string | number`,
- bez `as const` wartości literałowe rozszerzą się do `string` lub `number`,
- `T[K]` może być unią, gdy `K` jest unią kluczy.

Źródła: TypeScript Handbook — Keyof Type Operator, Typeof Type Operator,
Indexed Access Types.
