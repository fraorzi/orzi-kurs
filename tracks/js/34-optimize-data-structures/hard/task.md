# Hard [O] — agregacja: filter per kategoria → jedno przejście

`groupSum(transactions)` zwraca obiekt mapujący kategorię na sumę kwot (`amount`)
transakcji w tej kategorii.

Kod jest **poprawny**, ale wolny: dla **każdej** kategorii filtruje całą tablicę
transakcji (O(kategorie·n)). Gdy kategorii przybywa razem z danymi, robi się to
kwadratowe. Testy poprawności przechodzą — obleje benchmark. Przepisz na jedno przejście.

```js
groupSum([
  { category: "food", amount: 10 },
  { category: "toys", amount: 5 },
  { category: "food", amount: 3 },
]);
// { food: 13, toys: 5 }

groupSum([]); // {}
```

Podpowiedź kierunkowa: czy musisz przeglądać transakcje osobno dla każdej kategorii,
skoro jedno przejście wystarczy, by zsumować wszystko?
