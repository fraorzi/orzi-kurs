## Hint 1

Ograniczenie zapisujesz przez `extends` w liście parametrów typu:

```ts
function longest<T extends { length: number }>(a: T, b: T): T { … }
```

Dopiero to pozwala sięgnąć po `a.length` w ciele funkcji.

## Hint 2

Remis rozstrzyga operator: `a.length >= b.length ? a : b` zwróci `a`, gdy długości są
równe. Wersja z `>` zwróciłaby `b`.

## Hint 3

Para „obiekt + jego klucz” to `T extends object, K extends keyof T`, a typ pola to
**indexed access type** `T[K]`:

```ts
function getProp<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

Bez `K extends keyof T` kompilator nie pozwoli na `obj[key]` — nie ma dowodu, że taki klucz
istnieje.

## Hint 4

Domyślny parametr typu wygląda jak domyślny argument: `type ApiResponse<T = null> = …`.
Wtedy `ApiResponse` (bez nawiasów ostrych) znaczy `ApiResponse<null>` — i takiego typu
zwracanego użyj w `noContent`.
