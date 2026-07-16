## Hint 1

`KeysOfType` łączy trzy rzeczy: mapped type, warunek i indeksowanie unią kluczy.

```ts
type KeysOfType<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T];
```

Mapped type podmienia wartość pola na **nazwę klucza** (albo `never`), a `[keyof T]` na
końcu wyciąga wszystkie te wartości jako unię. `never` z unii znika sam.

Modyfikator `-?` jest ważny: bez niego pola opcjonalne dodałyby `undefined` do wyniku.

## Hint 2

Mając `KeysOfType`, reszta to jedna linijka:

```ts
type PickByType<T, V> = Pick<T, KeysOfType<T, V>>;
type OmitByType<T, V> = Omit<T, KeysOfType<T, V>>;
```

## Hint 3

`DeepPartialSafe` to typ warunkowy z trzema gałęziami — i **kolejność ma znaczenie**:

```ts
type DeepPartialSafe<T> =
  T extends (infer E)[] ? DeepPartialSafe<E>[]
  : T extends object ? { [K in keyof T]?: DeepPartialSafe<T[K]> }
  : T;
```

Tablicę sprawdzaj pierwszą — tablica też spełnia `extends object`, więc odwrotna kolejność
wpuściłaby ją w gałąź obiektową i wróciłaby pułapka z zagadnienia 08.

## Hint 4

W gałęzi tablicowej rekurencja idzie po **elemencie** (`DeepPartialSafe<E>[]`), a nie po
całej tablicy — dzięki temu `{ id: number }[]` staje się `{ id?: number }[]`, ale sama
tablica nie dostaje `undefined` w elementach.

## Hint 5

`pickByType` w runtime to pętla po `Object.entries` z filtrem przez strażnik:

```ts
if (guard(value)) out[key] = value;
```

Nie sprawdzaj `if (value)` — `0`, `""` i `false` mają przejść, jeśli strażnik je akceptuje.
