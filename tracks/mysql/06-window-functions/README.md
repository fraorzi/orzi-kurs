# Funkcje okienkowe

`GROUP BY` zwija grupę do jednego wiersza — tracisz dostęp do wierszy
źródłowych. Funkcja okienkowa (`... OVER (...)`) liczy agregat albo rangę
**dla każdego wiersza z osobna**, patrząc na sąsiadów zdefiniowanych przez
`PARTITION BY` i `ORDER BY`, ale żadnego wiersza nie usuwa. To pozwala
odpowiedzieć jednym zapytaniem na pytania w stylu "ten wiersz i jego pozycja
w grupie" albo "ten wiersz i wartość poprzedniego" — bez samo-joina.

`PARTITION BY` dzieli wiersze na niezależne okna (np. osobno per klient),
`ORDER BY` wewnątrz `OVER` ustala kolejność, w jakiej okno jest przetwarzane
— **nie** kolejność wynikową zapytania. Wynik nadal wymaga osobnego
`ORDER BY` na końcu zapytania.

Trzy rodziny funkcji zachowują się różnie przy remisach w `ORDER BY`:

- `ROW_NUMBER()` zawsze nadaje unikalne, kolejne numery — przy remisie
  kolejność między remisującymi wierszami zależy od tego, czy `ORDER BY`
  ma tie-breaker (zwykle klucz główny). Bez niego przydział numerów jest
  niedeterministyczny.
- `RANK()` daje remisującym wierszom ten sam rank i **przeskakuje** kolejne
  numery (1, 1, 3).
- `DENSE_RANK()` daje ten sam rank remisującym, ale numeruje bez dziur
  (1, 1, 2).

Rama (`ROWS`/`RANGE`/`GROUPS`) decyduje, które wiersze wchodzą do agregatu.
Domyślna rama dla funkcji z `ORDER BY` to
`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` — przy remisie
w kolumnie sortującej `RANGE` wciąga **wszystkie** wiersze o tej samej
wartości ("peer rows"), więc running total dla dwóch płatności o tym samym
`paid_at` pokaże obu ten sam skumulowany wynik. `ROWS BETWEEN UNBOUNDED
PRECEDING AND CURRENT ROW` liczy fizycznie kolejne wiersze niezależnie od
remisów — to zwykle to, czego oczekuje running total.

## Kiedy używać

- Ranking w obrębie grupy bez gubienia wierszy źródłowych: "który to numer
  zamówienia tego klienta", "który to najlepszy wynik w kategorii".
- Porównanie wiersza z sąsiadem (`LAG`/`LEAD`): delta względem poprzedniego
  pomiaru, wykrycie zmiany statusu między kolejnymi zdarzeniami.
- Running total, ruchoma średnia, udział procentowy wiersza w sumie grupy —
  gdy wynik ma pokazać zarówno wiersz, jak i jego kontekst w grupie.

## Kiedy unikać

- Gdy potrzebujesz tylko zagregowanej wartości na grupę (bez wierszy
  źródłowych) — zwykły `GROUP BY` jest prostszy i tańszy.
- Nie filtruj po wyniku funkcji okienkowej w `WHERE` — window function
  liczy się logicznie po `WHERE`, więc silnik go tam jeszcze nie widzi.
  Filtr po aliasie wymaga podzapytania/CTE i `WHERE` na zewnętrznym poziomie.
- Nie zakładaj, że `ORDER BY` wewnątrz `OVER` sortuje wynik — to osobna
  odpowiedzialność.

## Pułapki

- Remis w `ORDER BY` wewnątrz `OVER` bez tie-breakera (zwykle `id`) czyni
  przydział `ROW_NUMBER()` niedeterministycznym między uruchomieniami.
- Domyślna rama `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` przy
  zduplikowanym kluczu sortowania wciąga wszystkie peer rows naraz —
  running total "przeskakuje" zamiast rosnąć wiersz po wierszu.
- `RANK()` zostawia dziury w numeracji po remisie, `DENSE_RANK()` nie —
  łatwo pomylić, którego użyć do "top N z remisami".
- `mysql2` z `decimalNumbers: false` (ustawienie harnessu) zwraca
  `DECIMAL`/`SUM(DECIMAL)` jako string (`"30.00"`), nie jako liczbę —
  porównanie z liczbą w teście zawsze się nie powiedzie.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [Window Functions](https://dev.mysql.com/doc/refman/8.4/en/window-functions.html)
- [Window Function Descriptions](https://dev.mysql.com/doc/refman/8.4/en/window-function-descriptions.html)
- [Window Function Frame Specification](https://dev.mysql.com/doc/refman/8.4/en/window-function-frames.html)
- [Window Function Usage](https://dev.mysql.com/doc/refman/8.4/en/window-functions-usage.html)
