# Subtelne błędy logiczne

To zagadnienie **debugowe**: starter zawiera kompletny, ale **błędny** kod z realnego
kanonu pomyłek. Twoim zadaniem jest znaleźć i naprawić błąd tak, by testy przeszły —
nie przepisywać wszystkiego od zera. Każdy poziom to inna klasa błędu.

## Off-by-one (błąd o jeden)

Najczęstsza pomyłka w pętlach i indeksowaniu: `<` zamiast `<=`, `length` zamiast
`length - 1`, start od 1 zamiast 0.

```js
// źle: pomija ostatni indeks
for (let i = 0; i < arr.length; i++) sum += arr[i];   // OK dla sumy
const last = arr[arr.length];                          // źle! → undefined
const last2 = arr[arr.length - 1];                     // dobrze
```

## Mutacja podczas iteracji

Usuwanie elementów z tablicy w pętli `for` rosnącej **przesuwa** kolejne elementy pod
już przetworzone indeksy — część zostaje pominięta:

```js
for (let i = 0; i < arr.length; i++) {
  if (bad(arr[i])) arr.splice(i, 1); // po splice arr[i] to już następny element,
}                                     // ale i++ go przeskakuje
```

Naprawa: iteruj od końca, użyj `filter` (nowa tablica) albo cofnij `i--` po usunięciu.

## Stale closure w pętli (wspólna zmienna)

Funkcje tworzone w pętli domykają **tę samą** zmienną, jeśli żyje ona poza ciałem
iteracji. Po pętli wszystkie widzą jej końcową wartość:

```js
const fns = [];
let i = 0;
while (i < 3) {
  fns.push(() => i); // wszystkie trzymają referencję do TEJ SAMEJ i
  i++;
}
fns[0](); // 3, nie 0!
```

Naprawa: skopiuj wartość do zmiennej lokalnej **w** iteracji (`const k = i`) albo użyj
`for (let j = ...)`, gdzie `let` tworzy nowe wiązanie na każdą iterację.

## Przypadkowa złożoność O(n²)

Kod poprawny, ale wolny: `includes`/`indexOf`/zagnieżdżona pętla robią pełne przeszukanie
przy każdym elemencie. Dla dużych wejść — kwadratowo. Naprawa: `Set`/`Map` daje `has`
w O(1), więc całość spada do O(n). Ten poziom łapie benchmark skalowania.

## Kiedy to używasz w praktyce

- Czytanie cudzego kodu i code review — te wzorce to najczęstsze uwagi.
- Debugowanie „działa na małych danych, psuje się na dużych" (off-by-one, mutacja)
  albo „działa, ale wolno" (O(n²)).

## Kiedy unikać

- Nie przepisuj całej funkcji, zanim nie zawęzisz błędu testem lub minimalnym przykładem.
- Nie poprawiaj objawu dodatkowym warunkiem, jeśli źródłem jest mutacja podczas iteracji.
- Nie nazywaj mikro-optymalizacją zmiany, która naprawia złożoność O(n²) na rosnących danych.

## Pułapki (jak szukać)

- Uruchom test, przeczytaj **komunikat** — mówi, co konkretnie się nie zgadza.
- Sprawdź warunki brzegowe: pierwszy/ostatni element, pusta tablica, duplikaty.
- Przy „wolno" — nie zgaduj mikro-optymalizacji; szukaj pętli w pętli / `includes`
  w pętli i zamień na strukturę z szybkim `has`.
