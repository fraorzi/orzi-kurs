# Easy [D] - wyszukiwanie w pętli zamiast indeksu

Tryb: naprawa. W `starter.js` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

`namesByIds(users, ids)` zwraca nazwy użytkowników w kolejności podanych `ids`.

Kod jest **poprawny, ale kwadratowy**: dla każdego `id` skanuje całą tablicę `users`
(`find` w pętli `map`). Testy poprawności przechodzą - obleje **benchmark skalowania**.
Przepisz tak, by działało w czasie liniowym, nie zmieniając kontraktu.

```js
const users = [
  { id: 1, name: "Ala" },
  { id: 2, name: "Jan" },
];
namesByIds(users, [2, 1, 2]); // ["Jan", "Ala", "Jan"]
```

Podpowiedź kierunkowa: co pozwala odpytać po `id` w czasie stałym, jeśli przygotujesz to
**raz** przed pętlą?
