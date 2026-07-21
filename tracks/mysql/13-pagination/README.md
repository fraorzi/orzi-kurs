# Stabilna paginacja

`LIMIT`/`OFFSET` bez pełnego `ORDER BY` jest niedeterministyczne z
definicji — MySQL nie gwarantuje żadnej kolejności bez jawnego
sortowania, więc przy remisach (dwa wiersze z identycznym `created_at`)
kolejne odświeżenie tej samej strony może zwrócić inną kolejność, mimo że
dane się nie zmieniły. Rozwiązanie jest tanie: dodaj kolumnę jednoznacznie
identyfikującą wiersz (zwykle `id`) jako ostatni klucz sortowania, w tym
samym kierunku co reszta `ORDER BY`.

`OFFSET` ma osobny, poważniejszy koszt: żeby zwrócić stronę 500, silnik
musi odczytać i odrzucić 499 stron przed nią — koszt rośnie liniowo z
głębokością strony, niezależnie od tego, czy trafienie jest przez indeks
czy nie. **Keyset pagination** (cursor-based) zamienia "odrzuć N wierszy"
na "zacznij od tego punktu": klient przesyła ostatnią widzianą wartość
kluczy sortujących (`created_at`, `id`), a zapytanie filtruje
`(created_at, id) < (kursor_created_at, kursor_id)` — porównanie krotki
(`ROW`), nie dwóch niezależnych warunków. To rozróżnienie ma znaczenie przy
remisach: samo `created_at < kursor_created_at` gubi wiersze, które dzielą
znacznik czasu z kursorem, ale mają mniejsze `id`.

W środowisku wielonajemcowym cursor i indeks muszą zaczynać się od
predykatu równości (`tenant_id = ?`) — indeks `(tenant_id, created_at,
id)` obsługuje jednocześnie izolację najemcy i porządek strony, a pominięcie
`tenant_id` w warunku obok kursora ujawnia wiersze innych najemców, które
akurat mieszczą się w oknie czasowym.

## Kiedy używać

- Offset z pełnym `ORDER BY` (włącznie z unikalnym tie-breakerem) — dla
  płytkich list z numeracją stron (1, 2, 3...), gdzie użytkownik skacze
  między stronami.
- Keyset/cursor pagination — dla feedów, list czatu, infinite scroll:
  głębokość strony nie ma górnej granicy, a klient i tak przechowuje tylko
  "dalej"/"wstecz", nie numer strony.
- Indeks złożony `(tenant_id, sort_col, id)` zawsze, gdy paginacja działa w
  kontekście najemcy/właściciela danych.

## Kiedy unikać

- Nie licz stron przez `OFFSET` na tabelach rosnących bez ograniczenia —
  strona 10 000 skanuje i odrzuca 10 000 × rozmiar strony wierszy za
  każdym razem.
- Nie buduj cursora z samej kolumny sortującej, jeśli nie jest ona
  unikalna — bez tie-breakera cursor gubi lub duplikuje wiersze przy
  remisach.
- Nie mieszaj kierunków sortowania między kolumnami tie-breakera a główną
  kolumną porządkującą — `created_at DESC, id ASC` psuje monotoniczność
  potrzebną do poprawnego cursora.

## Pułapki

- `ORDER BY created_at DESC` bez `id` w drugiej pozycji: przy remisach
  kolejność zależy od planu wykonania (filesort czy skan indeksu), nie od
  jawnej reguły — dwa uruchomienia tego samego zapytania na tych samych
  danych mogą zwrócić różną kolejność.
- Cursor zbudowany z porównania dwóch niezależnych warunków zamiast krotki
  (`created_at < x OR (created_at = x AND id < y)` zamiast `(created_at,
  id) < (x, y)`) jest poprawny logicznie, ale łatwiej o błąd przy ręcznym
  zapisie — porównanie krotki (`ROW`) wyraża to samo krócej i trudniej o
  literówkę w priorytecie warunków.
- Wiersz samego kursora nigdy nie powinien wrócić w wyniku — porównanie
  musi być ostre (`<`/`>`), nie `<=`/`>=`.
- W kontekście wielonajemcowym filtr `tenant_id` musi stać w tym samym
  `WHERE` co warunek kursora i w tej samej (pierwszej) pozycji indeksu —
  osobno sprawdzany "gdzieś dalej" nie chroni przed przeciekiem danych
  innego najemcy w oknie czasowym kursora.
- `LIMIT`/`OFFSET` poza zasięgiem dostępnych wierszy nie jest błędem — to
  po prostu pusty wynik; nie trzeba go specjalnie obsługiwać w SQL.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [LIMIT Query Optimization](https://dev.mysql.com/doc/refman/8.4/en/limit-optimization.html)
- [ORDER BY Optimization](https://dev.mysql.com/doc/refman/8.4/en/order-by-optimization.html)
- [Row Constructor Optimization](https://dev.mysql.com/doc/refman/8.4/en/row-constructor-optimization.html)
- [Multiple-Column Indexes](https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html)
