# Optymalizacja runtime bez utraty kontraktów typów

TypeScript nie przyspiesza kodu po kompilacji. Optymalizacja nadal dotyczy algorytmów,
alokacji i liczby wywołań, ale refaktor nie może przypadkiem poszerzyć publicznego API,
usunąć `readonly` ani zgubić relacji między generykami.

W tym zagadnieniu startery są kompletne i zwracają poprawne wyniki. Trzeba zmienić
implementację tak, aby przeszła także test oznaczony `[quality]`.

## Indeks zamiast skanowania

`find` wewnątrz `map` daje O(n·m). Jeśli wiele rekordów odwołuje się do tej samej
kolekcji po ID, zbuduj `Map` raz:

```ts
const byId = new Map(products.map((product) => [product.id, product]));
return lines.map((line) => byId.get(line.productId) ?? null);
```

Typ `Map<string, Product>` zachowuje informację o kluczu i wartości, a wejścia mogą
pozostać `readonly`.

## Jedno przejście

Grupowanie przez „unikalne klucze, a potem `filter` dla każdego klucza” wielokrotnie
wywołuje selektor. Pętla z `Map<K, number>` liczy każdą pozycję raz i nadal zachowuje
generyczny typ klucza `K`.

## Cache z limitem

Memoizacja ma sens tylko dla czystych obliczeń i poprawnego klucza cache. Długowieczny
cache bez limitu może stać się wyciekiem pamięci. Prosty LRU odświeża ostatnio użyty
wpis przez usunięcie i ponowne wstawienie go do `Map`.

## Kiedy używać

- gdy profiler lub licznik pokazuje powtarzaną pracę,
- przy joinach danych po ID i agregacjach dużych kolekcji,
- dla kosztownych, czystych selektorów o stabilnym kluczu cache.

## Kiedy unikać

- dla małych, stałych kolekcji bez zmierzonego problemu,
- gdy callback jest nieczysty albo klucz nie opisuje całego wejścia,
- gdy optymalizacja wymaga osłabienia publicznych typów do `any` lub mutowania wejścia.

## Pułapki

- `Map.get()` zwraca `undefined`, które może też być legalnym wynikiem domenowym,
- cache bez limitu rośnie przez cały czas życia procesu,
- lokalna mutacja `Map` jest bezpieczna, ale mutacja wejściowej tablicy już nie,
- szybsza implementacja nadal musi zachować kolejność i semantykę brakujących danych,
- benchmark czasu jest bardziej podatny na szum niż licznik pracy.

Źródła: TypeScript Handbook — Object Types, Type Compatibility; MDN Map oraz
Performance API.
