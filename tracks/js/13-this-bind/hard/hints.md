## Hint 1

`myBind`: zwróć zwykłą funkcję z rest parameters, która wywołuje
`fn.apply(ctx, [...preset, ...args])` — this z zewnątrz celowo ignorowane
(dlatego "podwójny bind" nie działa: wewnętrzna funkcja zawsze używa swojego
ctx). `delay`: wrapper musi być zwykłą funkcją (własne this), a wewnątrz
setTimeout użyj arrow, żeby nie zgubić tego this.

## Hint 2

```js
export function myBind(fn, ctx, ...preset) {
  return (...args) => fn.apply(ctx, [...preset, ...args]);
}

export function delay(fn, ms) {
  return function (...args) {
    setTimeout(() => fn.apply(this, args), ms);
  };
}
```

W `delay` kolejność ma znaczenie: `this` i `args` są łapane w chwili wywołania
wrappera, a arrow w setTimeout tylko je domyka.
