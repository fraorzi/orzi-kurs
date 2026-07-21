# Optymalizacja poprawnych zapytań

Ten temat zaczyna się tam, gdzie poprzedni (debugowanie incydentów)
kończy: zapytanie zwraca **poprawny** wynik — problem jest wyłącznie
w tym, ile pracy silnik wykonuje, żeby go dostarczyć. Trzy powtarzalne
kształty tego problemu: funkcja owinięta wokół indeksowanej kolumny,
podzapytanie policzone osobno dla każdego wiersza zewnętrznego, koszt
paginacji rosnący z numerem strony.

**Sargowalność** (ang. *sargable*, "Search ARGument ABLE") to własność
warunku `WHERE`: czy optymalizator może go użyć do zawężenia zakresu
przeszukiwania indeksu, czy musi wyliczyć wyrażenie dla każdego wiersza
z osobna. `WHERE DATE(created_at) = '2026-01-10'` **nie jest**
sargowalne — `DATE(...)` musi się policzyć dla każdego wpisu indeksu,
więc `EXPLAIN` pokaże pełny przegląd indeksu (`type: index`) zamiast
`range`. `WHERE created_at >= '2026-01-10' AND created_at < '2026-01-11'`
**jest** sargowalne — porównanie bezpośrednio na kolumnie pozwala
zawęzić przeszukiwanie do fragmentu drzewa indeksu.

**Skorelowane podzapytanie w liście `SELECT`** (`(SELECT SUM(...) FROM
... WHERE x = outer.id)`) jest logicznie wykonywane w kontekście każdego
wiersza zapytania zewnętrznego — `EXPLAIN FORMAT=JSON` oznacza taki blok
jako `"dependent": true`. Ten sam wynik policzony jednym `LEFT JOIN` +
`GROUP BY` to jeden zbiorowy przebieg zamiast N osobnych. Silnik
teoretycznie **może** czasem przekształcić proste skorelowane
podzapytania samodzielnie (derived table merging, semi-join), ale nie
jest to gwarantowane dla każdego kształtu — jawny `JOIN` daje pewność
planu, nie nadzieję na optymalizator.

**`LIMIT n OFFSET m`** kosztuje proporcjonalnie do `m`: silnik musi
policzyć i odrzucić `m` wierszy, zanim zacznie zwracać wynik — offset
500 kosztuje pięćdziesiąt razy więcej niż offset 10, niezależnie od tego,
że oba zwracają tyle samo wierszy. **Paginacja keyset** (`WHERE id >
ostatnie_id_poprzedniej_strony ORDER BY id LIMIT n`) zamienia "policz i
odrzuć" na bezpośredni dostęp `range` po indeksie — koszt jest stały,
niezależny od numeru strony. Cena: potrzebujesz unikalnej, uporządkowanej
kolumny jako cursora, i nie da się bezpośrednio "przeskoczyć" na dowolny
numer strony bez znajomości jej granicznego `id`.

## Kiedy używać

- Sargowalnego przepisania warunku zawsze, gdy filtr owija indeksowaną
  kolumnę w funkcję (`DATE()`, `LOWER()`, arytmetyka) — dzień jako
  półotwarty zakres, tekst znormalizowany w osobnej (generated) kolumnie
  zamiast w `WHERE`.
- `JOIN` + `GROUP BY` zamiast skorelowanego podzapytania w `SELECT`,
  gdy agregat zależy tylko od kolumn dostępnych przez prosty warunek
  złączenia.
- Paginacji keyset zamiast `OFFSET`, gdy użytkownik przewija w jedną
  stronę (feed, log, infinite scroll) i nie potrzebuje skoku na dowolny
  numer strony.

## Kiedy unikać

- Nie optymalizuj bez testu regresji, który dowodzi identycznego wyniku
  przed i po zmianie — szybszy plan zwracający inny wynik to bug, nie
  optymalizacja.
- Nie mierz "poprawy" stoperem na małych/niereprezentatywnych danych —
  na kilku wierszach optimizer często i tak wybierze pełny skan; różnica
  planu ujawnia się dopiero na realistycznym rozmiarze tabeli.
- Nie sięgaj po `FORCE INDEX` jako pierwszą reakcję — to maskuje prawdziwą
  przyczynę (nieaktualne statystyki, brakujący indeks, zły kształt
  zapytania) zamiast ją naprawić; wymuszony indeks może być gorszy niż
  wybór optymalizatora na innym rozkładzie danych.

## Pułapki

- Dowód jakości planu przez pomiar czasu wykonania jest zawodny —
  cache, obciążenie maszyny testowej i rozmiar danych zmieniają czas bez
  zmiany planu. Dowód opiera się na `EXPLAIN`: typ dostępu, użyty indeks,
  liczba przeglądanych wierszy, obecność `Using filesort`/`Using
  temporary`.
- Sargowalność łamie się też przy niejawnej konwersji typu — porównanie
  kolumny `VARCHAR` z liczbą albo kolumny `DATETIME` ze stringiem
  w nieobsługiwanym formacie może wymusić przeliczenie po stronie
  kolumny zamiast stałej.
- `EXPLAIN FORMAT=JSON` pokazuje `"dependent": true` dla skorelowanego
  bloku — to najpewniejszy sygnał "to podzapytanie liczy się per
  wiersz", pewniejszy niż samo brzmienie zapytania.
- Paginacja keyset wymaga unikalnego, deterministycznego porządku
  (zwykle klucz główny jako tie-breaker) — bez tego duplikaty/pominięcia
  wierszy przy remisach sortowania są tylko kwestią czasu.
- Optymalizacja, która zmienia kontrakt wyniku (inna kolejność przy
  remisach, inne zachowanie na `NULL`, inny zestaw wierszy na brzegu
  zakresu), nie jest optymalizacją — jest inną funkcją, która przypadkiem
  bywa szybsza.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [EXPLAIN Output Format](https://dev.mysql.com/doc/refman/8.4/en/explain-output.html)
- [Range Optimization](https://dev.mysql.com/doc/refman/8.4/en/range-optimization.html)
- [Optimizing Subqueries](https://dev.mysql.com/doc/refman/8.4/en/subquery-optimization.html)
- [LIMIT Query Optimization](https://dev.mysql.com/doc/refman/8.4/en/limit-optimization.html)
- [Avoiding Full Table Scans](https://dev.mysql.com/doc/refman/8.4/en/optimizing-database-structure.html)
