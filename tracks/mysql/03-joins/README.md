# JOIN i cardinality

Każdy JOIN to decyzja o trzech rzeczach naraz: który warunek łączy
wiersze, co się dzieje z wierszem bez dopasowania i czy relacja 1:N
może zwielokrotnić lewą stronę. Trzy przykłady z tego tematu:

- **Zapomniany warunek relacji.** `FROM orders, customers` (przecinkowy
  join bez `ON`/`WHERE`) to iloczyn kartezjański — każdy wiersz lewej
  tabeli sparowany z każdym wierszem prawej. `INNER JOIN ... ON` robi
  to samo świadomie: zachowuje tylko pary, dla których warunek jest
  prawdziwy, i odrzuca NULL-e oraz uszkodzone odwołania bez błędu.
- **Filtr prawej tabeli w WHERE.** `LEFT JOIN orders o ON ... WHERE
  o.status = 'paid'` wygląda jak "opcjonalna relacja", ale `WHERE` po
  `LEFT JOIN` porównuje też wiersze z NULL po stronie `orders` —
  `NULL = 'paid'` daje UNKNOWN, więc klient bez opłaconych zamówień
  znika z wyniku zamiast pokazać się z zerem. Warunek opcjonalnej
  relacji musi siedzieć w `ON`, nie w `WHERE`.
- **Self join i korzeń hierarchii.** `employees e JOIN employees m ON
  m.id = e.manager_id` sparowane jako `INNER JOIN` gubi CEO — nie ma on
  managera, więc nigdy nie dopasuje się po stronie `m`. `LEFT JOIN`
  zachowuje go z `manager_email = NULL`, bo brak managera to legalny
  stan, nie błąd danych.

## Kiedy używać

- `INNER JOIN`, gdy wiersz bez dopasowania nie ma sensu w wyniku —
  zamówienie bez istniejącego klienta nie powinno trafić na listę.
- `LEFT JOIN`, gdy chcesz zachować lewą stronę niezależnie od tego, czy
  znalazło się dopasowanie — raport per klient, per kategoria, per
  urządzenie, gdzie "zero" jest informacją, nie brakiem wiersza.
- Self join z dwoma aliasami, gdy relacja łączy tabelę samą ze sobą —
  hierarchia pracowników, kategorie z rodzicem, poprzedni wiersz tej
  samej encji.

## Kiedy unikać

- Nie licz na to, że `WHERE` po `LEFT JOIN` "tylko filtruje" — każdy
  warunek na kolumnie prawej tabeli w `WHERE` może po cichu zamienić
  `LEFT JOIN` w `INNER JOIN`, jeśli warunek nie jest odporny na NULL.
- Nie łącz tabel przecinkiem w `FROM` bez jawnego `ON` — nawet gdy
  dodasz warunek do `WHERE`, czytelnik zapytania musi się domyślić,
  które predykaty są warunkiem joina, a które filtrem.
- Nie zakładaj, że jeden self join po `manager_id` da Ci całą
  hierarchię — zwraca tylko bezpośredniego rodzica; głębsze poziomy
  wymagają kolejnych joinów albo rekurencyjnego CTE (temat 05).

## Pułapki

- Relacja 1:N po stronie `LEFT JOIN` zwielokrotnia wiersze lewej
  tabeli — klient z trzema zamówieniami pojawi się trzy razy, jeżeli
  nie zagregujesz wyniku (`COUNT`, `GROUP BY`) albo świadomie chcesz
  płaski wynik jeden-wiersz-na-zamówienie.
- `COUNT(o.id)` liczy tylko niepuste wartości — dla niedopasowanego
  wiersza `LEFT JOIN` (`o.id IS NULL`) daje `0`, ale `COUNT(*)` w tej
  samej sytuacji dałby `1`, bo liczy wiersze wyniku, nie wartości
  kolumny.
- Uszkodzone odwołanie (klucz obcy wskazujący na nieistniejący
  rekord) zachowuje się identycznie jak NULL dla `LEFT JOIN` — obie
  sytuacje dają brak dopasowania, więc zapytanie nie odróżni "brak
  managera" od "manager usunięty, ale referencja została".
- Self join bez czytelnych aliasów (`e`, `m` zamiast `employees1`,
  `employees2` bez znaczenia domenowego) czyni zapytanie nieczytelnym
  już przy trzeciej kolumnie — nazwij aliasy według roli, nie kolejności.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [JOIN Clause](https://dev.mysql.com/doc/refman/8.4/en/join.html)
- [Outer Join Simplification](https://dev.mysql.com/doc/refman/8.4/en/outer-join-simplification.html)
- [Aggregate Function Descriptions](https://dev.mysql.com/doc/refman/8.4/en/aggregate-functions.html)
