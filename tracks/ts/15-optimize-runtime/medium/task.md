# Medium [O] — generyczne countBy w jednym przebiegu

`countBy(items, getKey)` zwraca `Map<K, number>` z liczbą elementów w każdej grupie.
Starter najpierw wylicza unikalne klucze, a następnie dla każdego klucza ponownie
filtruje całą kolekcję. Wynik i kolejność kluczy są poprawne, lecz selektor `getKey`
jest wołany wielokrotnie.

Przepisz implementację na jedno przejście:

- `getKey` ma zostać wywołany dokładnie raz na element,
- zachowaj kolejność pierwszego wystąpienia kluczy,
- zachowaj generyczny typ `Map<K, number>`,
- obsłuż także klucze `symbol`, `NaN`, `0` i `-0` zgodnie z semantyką `Map`.

Nie zmieniaj sygnatury funkcji.
