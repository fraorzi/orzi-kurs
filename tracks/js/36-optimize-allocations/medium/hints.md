## Hint 1

`{ ...acc, ...o }` kopiuje wszystkie klucze zebrane do tej pory przy każdym kroku — im
większy `acc`, tym drożej. Zamiast tworzyć nowy obiekt co iterację, nakładaj kolejne
obiekty na **jeden** cel.

## Hint 2

```js
export function mergeAll(objects) {
  const result = {};
  for (const o of objects) {
    Object.assign(result, o);
  }
  return result;
}
```

`Object.assign(result, o)` dopisuje klucze `o` do `result` w miejscu — łączny koszt to
suma liczby kluczy, czyli O(n). Cel to świeży `{}`, więc obiekty wejściowe zostają nietknięte.
