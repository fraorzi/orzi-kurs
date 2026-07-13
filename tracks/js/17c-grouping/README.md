# Grupowanie i indeksowanie

Dwie codzienne operacje na kolekcjach: **grupowanie** (podziel elementy na kubełki wg klucza)
i **indeksowanie** (zbuduj mapę klucz → element, żeby szukać w O(1) zamiast skanować listę).

## `Object.groupBy` i `Map.groupBy` (ES2024)

Grupują elementy iterowalne wg wartości zwracanej przez funkcję klucza:

```js
const words = ["apple", "avocado", "banana", "cherry"];

Object.groupBy(words, (w) => w[0]);
// { a: ["apple", "avocado"], b: ["banana"], c: ["cherry"] }

Map.groupBy([1, 2, 3, 4], (n) => (n % 2 ? "odd" : "even"));
// Map { "odd" => [1, 3], "even" => [2, 4] }
```

Różnice:

| | `Object.groupBy` | `Map.groupBy` |
|---|---|---|
| zwraca | obiekt (null-prototype) | `Map` |
| klucze | zawsze **stringi** (klucz jest rzutowany) | **dowolne** (liczby, obiekty, symbole) |
| kiedy | klucz jest naturalnie stringiem | klucz jest liczbą/obiektem albo chcesz metod `Map` |

Uwaga: `Object.groupBy` zwraca obiekt bez prototypu (`Object.create(null)`) — nie ma na nim
`hasOwnProperty` ani `toString`, za to nie ma kolizji z odziedziczonymi kluczami.

## Indeksowanie: `Map` zamiast wielokrotnego `.find()`

Częsty antywzorzec: dla każdego elementu jednej listy szukasz pasującego w drugiej przez
`.find()`. To O(n·m) — kwadratowo, gdy obie rosną:

```js
// wolno: find po całej liście users dla KAŻDEGO zamówienia
orders.map((o) => ({ ...o, user: users.find((u) => u.id === o.userId) }));
```

Zbuduj indeks **raz** i odpytuj go w O(1):

```js
const byId = new Map(users.map((u) => [u.id, u])); // O(m)
orders.map((o) => ({ ...o, user: byId.get(o.userId) })); // O(n) × O(1)
```

To ten sam pomysł co „join" w bazie danych po stronie aplikacji: zamień skanowanie na
wyszukiwanie po kluczu.

## Kiedy używać

- **`groupBy`** — raporty, agregacje, podział danych na sekcje UI (np. wg daty, kategorii).
- **indeks `Map`** — gdy wielokrotnie szukasz elementu po kluczu, zwłaszcza w pętli albo
  przy łączeniu dwóch kolekcji.

## Kiedy unikać

- Dla jednorazowego wyszukania w małej liście `.find()` jest prostsze — budowa `Map`/grupy
  też kosztuje pamięć i przejście.
- `Object.groupBy`, gdy potrzebujesz zachować **nie-stringowe** klucze — użyj `Map.groupBy`.

## Pułapki

- `Object.groupBy` rzutuje klucz na string: `1` i `"1"` wpadną do tej samej grupy.
- Wynik `Object.groupBy` ma `null` jako prototyp — metody `Object.prototype` na nim nie działają.
- Budując indeks `Map` przy duplikatach kluczy **ostatni wygrywa** (nadpisuje) — jeśli
  chcesz wszystkie, grupuj (`groupBy`) zamiast indeksować.
