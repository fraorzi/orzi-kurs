# Metody tablic

## Mutujące podstawy

Zmieniają tablicę w miejscu:

```js
arr.push(x);        // dodaje na koniec, zwraca nową długość
arr.pop();          // zdejmuje z końca, zwraca zdjęty element
arr.unshift(x);     // dodaje na początek
arr.shift();        // zdejmuje z początku
arr.splice(i, n);   // usuwa n elementów od indeksu i (zwraca usunięte)
arr.splice(i, 0, x) // wstawia x pod indeks i, nic nie usuwając
arr.sort(cmp);      // UWAGA: sortuje W MIEJSCU i zwraca tę samą tablicę
```

## Transformacje (zwracają nową tablicę)

```js
arr.map(fn);        // nowa tablica: fn(element) dla każdego
arr.filter(fn);     // nowa tablica: elementy, dla których fn zwraca truthy
arr.slice(a, b);    // płytka kopia wycinka [a, b)
arr.flat();         // spłaszcza zagnieżdżenia
arr.flatMap(fn);    // map + flat(1)
arr.toSorted(cmp);  // jak sort, ale zwraca NOWĄ tablicę (ES2023)
```

Callback dostaje trzy argumenty: `(element, index, array)`.

## Wyszukiwanie i testy

```js
arr.find(fn);       // pierwszy pasujący element (lub undefined)
arr.findIndex(fn);  // jego indeks (lub -1)
arr.includes(x);    // czy zawiera (SameValueZero, więc NaN działa); UWAGA: O(n)
arr.some(fn);       // czy JAKIKOLWIEK spełnia
arr.every(fn);      // czy WSZYSTKIE spełniają
arr.indexOf(x);     // indeks pierwszego wystąpienia
```

## Agregacja: reduce

Składa tablicę do jednej wartości. Akumulator przechodzi między iteracjami:

```js
[1, 2, 3].reduce((acc, item) => acc + item, 0); // 6

// grupowanie do obiektu:
users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
```

Bez wartości początkowej pierwszy element staje się akumulatorem, a **reduce na pustej
tablicy bez initialValue rzuca `TypeError`** — tak mówi specyfikacja.

## Sortowanie z komparatorem

```js
users.toSorted((a, b) => a.age - b.age);  // rosnąco po age
// cmp < 0 → a przed b; cmp > 0 → b przed a; 0 → bez zmian
```

## Immutability w praktyce

Funkcja, która dostaje tablicę, **nie powinna jej mutować**, chyba że to jej
udokumentowany cel. Kopia: `[...arr]` lub `arr.slice()`. Mutowanie cudzych danych
to klasyczne źródło bugów (w React — niewykryte re-rendery).

## Wydajność

`includes`/`indexOf` w pętli po dużej tablicy = O(n²). Do sprawdzania „czy już było"
używaj `Set` (`has`/`add` — średnio O(1)): deduplikacja przez `Set` jest liniowa.

## Kiedy używać

- `map`, gdy wynik ma dokładnie jeden element na każdy element wejścia.
- `filter`, gdy wybierasz podzbiór, a `find`, gdy potrzebujesz tylko pierwszego trafienia.
- `some`/`every`, gdy pytanie ma odpowiedź logiczną i można zakończyć iterację wcześniej.
- `reduce`, gdy naprawdę składasz kolekcję do jednej wartości lub struktury.

## Kiedy unikać

- Nie używaj `map` wyłącznie dla efektów ubocznych — wtedy intencję lepiej pokazuje pętla.
- Nie wciskaj całej logiki do jednego `reduce`, jeśli prosta pętla jest łatwiejsza do
  przeczytania i debugowania.
- Nie buduj długiego łańcucha tablic pośrednich na gorącej ścieżce bez pomiaru.

## Pułapki

- `sort`, `reverse`, `splice`, `push` i `pop` mutują tablicę; `toSorted` i `slice` nie.
- `includes(NaN)` jest prawdziwe, podczas gdy `indexOf(NaN)` zwraca `-1`.
- Rzadkie tablice pomijają puste sloty w części metod callbackowych.
- Brak wartości początkowej w `reduce` jest szczególnie groźny dla pustej tablicy.
