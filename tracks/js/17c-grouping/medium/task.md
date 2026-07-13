# Medium — grupowanie z dowolnym kluczem (`Map.groupBy`)

Zaimplementuj `groupBy(items, keyFn)` — grupuje elementy wg klucza zwracanego przez `keyFn`
i zwraca **`Map`**. W przeciwieństwie do `Object.groupBy`, klucze mają **zachować swój typ**
(liczby zostają liczbami, obiekty obiektami). Użyj `Map.groupBy`.

```js
groupBy([1, 2, 3, 4, 5], (n) => n % 2);
// Map { 1 => [1, 3, 5], 0 => [2, 4] }   (klucze to liczby 1 i 0, nie "1"/"0")

const users = [
  { name: "Ala", team: 1 },
  { name: "Ola", team: 2 },
  { name: "Ela", team: 1 },
];
groupBy(users, (u) => u.team);
// Map { 1 => [{Ala…}, {Ela…}], 2 => [{Ola…}] }
```

Kolejność elementów w każdej grupie zgodna z wejściem.
