# Easy — deskryptory danych: stała i ukryte pole

Zaimplementuj w `starter.js` dwie funkcje używające `Object.defineProperty`.

## 1. `defineConstant(obj, key, value)`

Dodaj do `obj` właściwość `key` o wartości `value`, która jest **niezmienna**:
`writable: false`, `configurable: false`. Zwróć `obj`.

```js
const o = defineConstant({}, "PI", 3.14);
o.PI; // 3.14
// próba nadpisania o.PI = 1 w trybie strict rzuca TypeError; wartość zostaje 3.14
```

## 2. `hide(obj, key, value)`

Dodaj do `obj` właściwość `key` o wartości `value`, która jest **ukryta** przed iteracją
i serializacją: `enumerable: false` (ale odczyt `obj[key]` ma działać). Zwróć `obj`.

```js
const o = hide({ visible: 1 }, "secret", 42);
o.secret;            // 42
Object.keys(o);      // ["visible"] — secret ukryty
JSON.stringify(o);   // '{"visible":1}'
```
