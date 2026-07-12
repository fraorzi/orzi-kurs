## Hint 1

Wszystkie trzy to idiom entries → transformacja → fromEntries z README.
`multiplyNumeric` mapuje wartości warunkowo, `pick` filtruje pary po kluczu,
`invert` odwraca pary `[k, v]` na `[v, k]`.

## Hint 2

```js
Object.fromEntries(
  Object.entries(obj).map(([key, value]) =>
    [key, typeof value === "number" ? value * 2 : value]),
);
```

`pick`: `keys.filter((k) => k in obj).map((k) => [k, obj[k]])` →
`Object.fromEntries`. `invert`: `.map(([k, v]) => [v, k])`.
