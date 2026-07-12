# [O] Optymalizacja: dobór struktury danych

Zagadnienie **optymalizacyjne**: starter zawiera kod, który **działa poprawnie** — przechodzi
testy poprawności — ale jest wolny. Twoim zadaniem jest przepisać go szybciej, **nie
zmieniając kontraktu**. Starter oblewa wyłącznie benchmark skalowania.

Najczęstsza optymalizacja w praktyce to zamiana **skanowania** na **wyszukiwanie po kluczu**.

## `includes` / `indexOf` w pętli → `Set`

`array.includes(x)` przechodzi tablicę od początku — O(n). Wywołane w pętli po drugiej
kolekcji daje O(n·m):

```js
// O(n·m)
a.filter((x) => b.includes(x));

// O(n + m): zbuduj Set raz, pytaj has() w O(1)
const inB = new Set(b);
a.filter((x) => inB.has(x));
```

## `find` / `findIndex` w pętli → indeks `Map`

To samo dla wyszukiwania obiektów po polu — zamiast szukać za każdym razem, zbuduj indeks:

```js
// O(n·m)
ids.map((id) => users.find((u) => u.id === id));

// O(n + m)
const byId = new Map(users.map((u) => [u.id, u]));
ids.map((id) => byId.get(id));
```

`findIndex` do deduplikacji (`arr.findIndex(...) === i`) też jest O(n²) — zastąp go
zbiorem „już widzianych".

## `filter` per kategoria → jedno przejście grupujące

Liczenie/agregacja przez `filter` dla każdej kategorii to O(kategorie·n):

```js
// O(kategorie · n)
categories.map((c) => items.filter((x) => x.cat === c).length);

// O(n): jedno przejście, akumuluj w Map/obiekcie
const counts = {};
for (const x of items) counts[x.cat] = (counts[x.cat] ?? 0) + 1;
```

## Kiedy Set/Map, a kiedy tablica

- **Set/Map**: częste `has`/`get` po kluczu, deduplikacja, indeksowanie, rosnąca kolekcja.
- **Tablica**: mała kolekcja (dla ~kilkunastu elementów `includes` bywa szybsze od budowy
  Setu), iteracja po kolejności, dostęp po indeksie, gdy i tak przechodzisz całość raz.

## Kiedy NIE optymalizować

- Dane są **małe i stałe** (kilkanaście elementów) — czytelność ważniejsza niż nanosekundy.
- Kod nie jest na gorącej ścieżce — nie komplikuj bez pomiaru.
- Najpierw **zmierz** (profiler, benchmark), potem optymalizuj to, co realnie boli.
  „Przedwczesna optymalizacja to źródło zła" — ale kwadratowa złożoność na rosnących
  danych to nie przedwczesność, to bug wydajnościowy.

## Pułapki

- Budowa `Set`/`Map` też kosztuje O(n) — opłaca się, gdy pytasz **wielokrotnie**, nie raz.
- Klucze obiektowe w `Map` działają po referencji — do kluczy „po wartości" użyj stringa/id.
- `Set`/`Map` porównują przez SameValueZero — `NaN` równe `NaN`, ale obiekty po referencji.
- Zamiana na `Set` zmienia typ wyniku — pamiętaj o konwersji z powrotem (`[...set]`), jeśli
  kontrakt wymaga tablicy.
