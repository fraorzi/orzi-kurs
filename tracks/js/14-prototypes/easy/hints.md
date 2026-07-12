## Hint 1

`createWithDefaults`: `Object.create(defaults)` tworzy obiekt z zadanym
prototypem; własne właściwości dokopiuj `Object.assign`. `readSource`: dwa
sprawdzenia — `Object.hasOwn` (własna?) i operator `in` (gdziekolwiek
w łańcuchu?).

## Hint 2

```js
export function createWithDefaults(defaults, own) {
  return Object.assign(Object.create(defaults), own);
}

export function readSource(obj, key) {
  if (Object.hasOwn(obj, key)) return "own";
  return key in obj ? "inherited" : "missing";
}
```
