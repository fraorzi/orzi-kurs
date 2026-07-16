## Hint 1

Szkielet mapped type'u to pętla po kluczach:

```ts
type MyPartial<T> = { [K in keyof T]?: T[K] };
```

`[K in keyof T]` — dla każdego klucza; `T[K]` — typ pola pod tym kluczem; `?` po nawiasie
kwadratowym — modyfikator opcjonalności.

## Hint 2

`readonly` stawiasz PRZED nawiasem kwadratowym, a `?` PO nim:

```ts
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
```

## Hint 3

Modyfikator ze znakiem minus **zdejmuje** to, co pole miało:

```ts
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
type Required<T> = { [K in keyof T]-?: T[K] };
```

To jedyny sposób na usunięcie `readonly` albo `?`.

## Hint 4

`Nullable` nie zmienia modyfikatorów — zmienia typ wartości: `T[K] | null`. Pole nadal jest
wymagane, tylko wolno w nim trzymać `null`.

## Hint 5

W runtime mapped type nie istnieje — `toDraft` to zwykły spread (`{ ...source }`),
a `clearFields` to pętla po `Object.keys`. Kompilator nie połączy pętli z typem wyniku,
więc na końcu potrzebne jest jedno `as Nullable<T>`.
