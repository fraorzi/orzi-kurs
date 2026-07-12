# Hard — bezpieczny dostęp i grupowanie

Zaimplementuj w `starter.js` trzy funkcje z lodasha — jego najczęściej używane
narzędzia obiektowe.

## 1. `getPath(obj, path, fallback)`

Semantyka `_.get`: `path` to string `"a.b.c"`. Idź w głąb obiektu; jeśli po
drodze trafisz na `null`/`undefined` — przerwij. `fallback` jest zwracany
**tylko gdy końcowy wynik to `undefined`** — `null` znaleziony na końcu ścieżki
jest zwracany wprost.

```js
const user = { address: { street: null, city: "Łódź" } };
getPath(user, "address.city", "?");   // "Łódź"
getPath(user, "address.street", "?"); // null — null NIE uruchamia fallbacku
getPath(user, "address.zip", "?");    // "?" — undefined uruchamia
getPath({}, "a.b.c", "?");            // "?" — zerwana ścieżka
getPath({ a: 0 }, "a", 5);            // 0 — falsy to pełnoprawna wartość
```

## 2. `mapValues(obj, fn)`

Nowy obiekt: te same klucze, wartości przepuszczone przez `fn(value, key)`.

```js
mapValues({ a: 1, b: 2 }, (v) => v * 10);      // { a: 10, b: 20 }
mapValues({ x: 1 }, (v, k) => `${k}=${v}`);    // { x: "x=1" }
```

## 3. `groupBy(items, keyFn)`

Obiekt: klucz z `keyFn(item)` → tablica elementów w oryginalnej kolejności.

```js
groupBy([6.1, 4.2, 6.3], Math.floor); // { 4: [4.2], 6: [6.1, 6.3] }
groupBy(["one", "two", "three"], (s) => s.length);
// { 3: ["one", "two"], 5: ["three"] }
```
