# Medium — głęboka kopia i niemutowalny zapis w głąb

Zaimplementuj w `starter.js` dwie funkcje.

## 1. `deepClone(value)`

Zwróć **głęboką** kopię wartości przy użyciu `structuredClone` — zagnieżdżone obiekty
i tablice mają być niezależne, a typy takie jak `Date` zachowane (w przeciwieństwie do
`JSON.parse(JSON.stringify(...))`).

```js
const orig = { user: { tags: ["a"] }, created: new Date(2020, 0, 1) };
const copy = deepClone(orig);
copy.user.tags.push("b"); // nie dotyka orig
orig.user.tags;           // ["a"]
copy.created instanceof Date; // true
```

## 2. `setIn(obj, path, value)`

Zwróć **nowy** obiekt z wartością ustawioną pod zagnieżdżoną ścieżką `path` (tablica
kluczy). Kopiuj tylko obiekty na ścieżce (structural sharing) — reszta współdzielona,
oryginał nietknięty.

```js
const state = { user: { name: "Ala", address: { city: "Wwa" } } };
const next = setIn(state, ["user", "address", "city"], "Kraków");
next.user.address.city; // "Kraków"
state.user.address.city; // "Wwa" — oryginał bez zmian
```
