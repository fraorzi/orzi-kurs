# Easy [D] — brakujący await

W `starter.js` są dwie funkcje `async` z **brakującym `await`**. Napraw je (dodaj `await`
tam, gdzie trzeba), nie zmieniając reszty logiki.

## 1. `loadName(fetchUser)`

Ma zwrócić `name` użytkownika zwróconego przez `fetchUser()` (funkcja async).

```js
await loadName(async () => ({ name: "Ala" })); // "Ala"
```

## 2. `loadTotal(fetchA, fetchB)`

Ma zwrócić sumę dwóch wartości pobranych async.

```js
await loadTotal(async () => 2, async () => 3); // 5
```

Obie „prawie działają" — bez `await` trzymają obietnicę zamiast wartości. Uruchom testy
i zobacz, co realnie zwracają.
