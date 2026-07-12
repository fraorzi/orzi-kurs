## Hint 1

`Object.defineProperty(obj, key, descriptor)` — w deskryptorze podajesz `value` i flagi.
Pamiętaj: przy `defineProperty` pominięte flagi domyślnie są `false`, więc ustaw jawnie te,
które mają być `true`.

## Hint 2

```js
export function defineConstant(obj, key, value) {
  Object.defineProperty(obj, key, {
    value,
    writable: false,
    enumerable: true,   // stała ma być widoczna, tylko niezmienna
    configurable: false,
  });
  return obj;
}

export function hide(obj, key, value) {
  Object.defineProperty(obj, key, {
    value,
    writable: true,
    enumerable: false,  // klucz zniknie z Object.keys i JSON
    configurable: true,
  });
  return obj;
}
```
