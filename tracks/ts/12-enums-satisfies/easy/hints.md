## Hint 1

Adnotacja `: Record<string, string>` rozszerza wartości do `string` i pozwala odwołać się
do klucza, którego nie ma. `satisfies` naprawia to drugie (klucze są znane), ale wartości
i tak dostaną typ z kontekstu (`string`). Literały ratuje dopiero `as const`:

```ts
export const ROUTES = {
  home: "/",
  …
} as const satisfies Record<string, string>;
```

Zapamiętaj kolejność: `as const` zamraża, `satisfies` sprawdza.

## Hint 2

Skoro `ROUTES` nie zostało rozszerzone, klucze są znane:

```ts
export type RouteName = keyof typeof ROUTES;
```

## Hint 3

`pathOf` to jedno indeksowanie: `return ROUTES[name];`. Typ zwracany `string` jest w porządku —
poszczególne trasy są jego podtypami.

## Hint 4

Przy `THEME` chodzi o dwie rzeczy naraz: zamrożenie literałów (`as const`) i sprawdzenie
kształtu (`satisfies ThemeConfig`). Kolejność jest jedyna słuszna:

```ts
export const THEME = { … } as const satisfies ThemeConfig;
```

Gdybyś napisał samo `: ThemeConfig`, pole `mode` miałoby typ `"light" | "dark"` i test
o literalnym `"dark"` by nie przeszedł.
