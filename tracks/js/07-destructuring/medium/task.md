# Medium — destrukturyzacja w akcji

Zaimplementuj w `starter.js` trzy funkcje (dwie pierwsze to zadania
z javascript.info).

## 1. `extractUser(user)`

Z obiektu w stylu `{ name: "John", years: 30 }` wyciągnij **jedną instrukcją
destrukturyzacji**: `name`, `years` oraz `isAdmin` (domyślnie `false`, gdy
brak). Zwróć tablicę `[name, years, isAdmin]`.

```js
extractUser({ name: "John", years: 30 });                 // ["John", 30, false]
extractUser({ name: "Ala", years: 20, isAdmin: true });   // ["Ala", 20, true]
```

## 2. `topSalary(salaries)`

Zadanie „The maximal salary": nazwisko najlepiej opłacanej osoby. Pusty obiekt →
`null`. Użyj `Object.entries` + destrukturyzacji `[name, salary]` w pętli.

```js
topSalary({ John: 100, Pete: 130, Mary: 250 }); // "Mary"
topSalary({});                                   // null
```

## 3. `mergeSettings(defaults, overrides)`

Nowy obiekt: klucze z `overrides` nadpisują `defaults` (spread), **z wyjątkiem**
pola `flags` (tablica) — ma być konkatenacją `defaults.flags` i `overrides.flags`
(każda z nich może nie istnieć). Gdy flag nie ma po żadnej stronie, wynik też
ich nie ma.

```js
mergeSettings(
  { theme: "dark", flags: ["a"] },
  { theme: "light", flags: ["b"] },
);
// { theme: "light", flags: ["a", "b"] }
