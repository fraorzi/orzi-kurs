# Pętle i iteracja

Cztery podstawowe konstrukcje:

```js
for (let i = 0; i < 5; i++) { ... }  // licznik znany z góry
while (condition) { ... }             // dopóki warunek
do { ... } while (condition);         // jak while, ale ciało wykona się min. raz
for (const item of iterable) { ... }  // po WARTOŚCIACH (tablice, stringi, Map...)
```

## break i continue

`break` przerywa całą pętlę, `continue` — tylko bieżącą iterację:

```js
for (const n of numbers) {
  if (n < 0) continue; // pomiń ujemne
  if (n === 0) break;  // zero kończy przetwarzanie
  process(n);
}
```

W pętlach zagnieżdżonych `break`/`continue` dotyczą **wewnętrznej** pętli.
Język ma etykiety (`outer: for (...)` + `break outer`), ale w praktyce czytelniej
wydzielić wewnętrzną pętlę do osobnej funkcji i użyć `return` — lint tego repo
też woli to podejście.

## for..of vs for..in

- `for..of` iteruje po **wartościach** iterowalnych (tablice, stringi, Map, Set),
- `for..in` iteruje po **kluczach** obiektu (stringi!), łącznie z odziedziczonymi
  enumerowalnymi.

```js
for (const ch of "abc") { ... }        // "a", "b", "c"
for (const key in { a: 1, b: 2 }) { ... } // "a", "b"
```

Po obiekcie zwykle lepiej: `for (const key of Object.keys(obj))` albo
`for (const [key, value] of Object.entries(obj))`.

## Kiedy używać

- `for` z licznikiem: zakresy liczb, iteracja z krokiem, dostęp do sąsiadów,
- `for..of`: każda "przejdź po elementach" — czytelniejsza niż indeksy,
- `while`: nieznana z góry liczba iteracji (aż coś się wydarzy),
- pętla zamiast `map`/`filter`, gdy potrzebujesz wczesnego `break`.

## Kiedy unikać

- `for..in` po tablicach — dostajesz stringowe indeksy, odziedziczone klucze
  i żadnej gwarancji kolejności liczbowej; do tablic: `for..of` albo zwykły `for`,
- ręcznych pętli tam, gdzie `map`/`filter`/`reduce` mówią wprost, co się dzieje,
- `do..while`, gdy zwykły `while` wystarcza — rzadko potrzebujesz "min. raz".

## Pułapki

- warunki off-by-one: `i < n` vs `i <= n` — przetestuj brzegi zakresu,
- modyfikacja tablicy podczas iterowania po niej (usuwanie elementów przesuwa
  indeksy) — iteruj po kopii albo od końca,
- nieskończony `while`, gdy zapomnisz zaktualizować zmienną warunku,
- `for..in` po tablicy z dodanymi właściwościami (`arr.extra = 1`) iteruje też
  po `"extra"`.
