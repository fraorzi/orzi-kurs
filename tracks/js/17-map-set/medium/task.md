# Medium — anagramy (Map jako indeks) i konwersje Object ↔ Map

## 1. `aclean(arr)` — grupowanie anagramów

Zwróć tablicę słów bez anagramów — z każdej grupy anagramów zostaje **jedno** słowo.
Anagramy to słowa z tych samych liter (ignoruj wielkość liter). Wystarczy dowolny
reprezentant grupy. (Ćwiczenie „Filter anagrams" z javascript.info.)

Wzorzec: kluczem grupy jest słowo z **posortowanymi literami** (po `toLowerCase`).
Użyj `Map`, gdzie klucz = posortowane litery, wartość = słowo.

```js
aclean(["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"]);
// 3 słowa: po jednym z grup {nap,PAN}, {teachers,cheaters,hectares}, {ear,era}
```

## 2. `objectToMap(obj)` i `mapToObject(map)`

Konwersje w obie strony:

- `objectToMap({ a: 1, b: 2 })` → `Map { "a" => 1, "b" => 2 }` (użyj `Object.entries`),
- `mapToObject(new Map([["a", 1]]))` → `{ a: 1 }` (użyj `Object.fromEntries`).

```js
const m = objectToMap({ a: 1, b: 2 });
m.get("a"); // 1
mapToObject(m); // { a: 1, b: 2 }
```
