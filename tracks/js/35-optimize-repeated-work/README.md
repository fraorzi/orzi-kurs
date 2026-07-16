# Unikanie powtórzonej pracy

Zagadnienie **optymalizacyjne**: starter działa poprawnie, ale wykonuje tę samą pracę
wielokrotnie. Przepisz go tak, by liczył każdą rzecz raz — nie zmieniając kontraktu.
Startery oblewają bramkę wydajności (benchmark **albo** licznik wywołań kosztownej pracy).

## Memoizacja: policz raz, zapamiętaj wynik

Gdy kosztowna funkcja jest wołana wielokrotnie z **tym samym** argumentem, zapamiętaj
wynik w `Map`:

```js
// bez cache: priceOf(id) liczone dla KAŻDEGO zamówienia
orders.reduce((sum, o) => sum + o.qty * priceOf(o.productId), 0);

// z cache: priceOf(id) liczone raz na różny produkt
const cache = new Map();
const getPrice = (id) => {
  if (!cache.has(id)) cache.set(id, priceOf(id));
  return cache.get(id);
};
```

## Wyciągnij niezmiennik poza pętlę

Jeśli wynik jakiegoś obliczenia **nie zależy** od iteracji, policz go **raz** przed pętlą:

```js
// źle: computeStyle(theme) liczone n razy, choć theme się nie zmienia
items.map((item) => ({ ...item, style: computeStyle(theme) }));

// dobrze: raz przed mapowaniem
const style = computeStyle(theme);
items.map((item) => ({ ...item, style }));
```

To samo dotyczy kompilacji regexa (`new RegExp` w pętli), tworzenia `Intl.*` formatterów,
odczytu długości/rozmiaru — wyciągaj to, co stałe.

## Jedno przejście zamiast kilku

Łańcuch `arr.filter(...).map(...).reduce(...)` przechodzi tablicę **trzy razy** i tworzy
tablice pośrednie. Gdy to gorąca ścieżka, jedna pętla robi to raz. Częstszy i groźniejszy
błąd to **przeliczanie prefiksu** w pętli (np. `slice(0, i).reduce(...)` dla każdego `i`) —
to O(n²), które zbija się do O(n) akumulatorem bieżącym.

## Kiedy używać

- Gdy profiler pokazuje wielokrotne wykonanie tej samej kosztownej funkcji.
- Gdy niezmiennik jest liczony wewnątrz pętli mimo stałych argumentów.
- Gdy kolejne przejścia przeliczają te same prefiksy lub budują zbędne dane pośrednie.

## Kiedy NIE optymalizować

- Kosztowna funkcja jest tania albo wołana raz — cache tylko zaciemnia.
- Dane małe — trzy przejścia po 10 elementach nikogo nie bolą; czytelny łańcuch wygrywa.
- Cache bez granic na długo żyjącym obiekcie to **wyciek pamięci** — pamiętaj o limicie
  albo `WeakMap` dla kluczy obiektowych.

## Pułapki

- Memoizacja funkcji **nieczystej** (zależnej od czasu/losowości/stanu) daje złe wyniki —
  cache'uj tylko funkcje czyste (ten sam argument → ten sam wynik).
- Klucz cache musi jednoznacznie identyfikować wejście — dla wielu argumentów zbuduj
  klucz złożony, uważając na kolizje.
- „Wyciągnięty" niezmiennik współdzieli referencję między elementami — OK dla danych
  tylko-do-odczytu, groźne, gdy ktoś je potem mutuje.
- Cache rośnie w nieskończoność → ogranicz rozmiar (LRU) albo użyj `WeakMap`.
