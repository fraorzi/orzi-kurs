## Hint 1

`const CURRENCY: string = "PLN"` sam sobie strzela w stopę: adnotacja `: string` rozszerza
typ literalny do `string`. `const` bez adnotacji zachowuje literał `"PLN"`.

## Hint 2

Tablica w `const` to nadal mutowalny `string[]`. Żeby dostać `readonly ["admin", "editor",
"viewer"]`, dopisz `as const` na końcu literału tablicowego.

## Hint 3

Unię elementów krotki dostajesz przez indeksowanie typem `number`:

```ts
export type Role = (typeof ROLES)[number];
```

`typeof ROLES` w pozycji typu to „typ wartości ROLES”, a `[number]` — „jakikolwiek indeks”.

## Hint 4

`formatPrice`: `amount.toFixed(2)` zwraca stringa z dwoma miejscami po przecinku
(zaokrągla). Sklej szablonem: `` `${amount.toFixed(2)} ${currency}` ``.
